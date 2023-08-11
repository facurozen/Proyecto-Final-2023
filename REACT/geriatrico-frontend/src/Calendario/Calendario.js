import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Backdrop,
  Modal,
} from "@mui/material";
import format from "date-fns/format";
import axios from "axios";
import isSameDay from "date-fns/isSameDay";
import parseISO from "date-fns/parseISO";
import "./Calendario.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Calendario() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [horasOcupadas, setHorasOcupadas] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);
  const [nombreApellido, setNombreApellido] = useState("");
  const [showReservationForm, setShowReservationForm] = useState(false);

  useEffect(() => {
    obtenerHorasOcupadas();
  }, []);

  const obtenerHorasOcupadas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/FechasOcupadas");
      setHorasOcupadas(response.data);
    } catch (error) {
      console.error("Error fetching occupied dates:", error);
    }
  };

  const isDateOccupied = (date) => {
    return horasOcupadas.some((occupiedDate) =>
      isSameDay(parseISO(occupiedDate.Fecha), date)
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchAvailableHours(date);
  };

  const fetchAvailableHours = (date) => {
    const hoursInDay = [12, 13, 14, 15, 16, 17, 18, 19, 20];

    const occupiedHours = horasOcupadas
      .filter((occupiedDate) => isSameDay(parseISO(occupiedDate.Fecha), date))
      .map((occupiedDate) => occupiedDate.HoraDeLlegada.getHours());

    const availableHours = hoursInDay.filter(
      (hour) => !occupiedHours.includes(hour)
    );

    setAvailableHours(availableHours);
  };

  const handleDateTouch = (date) => {
    setSelectedDate(date);
    fetchAvailableHours(date);
    setShowReservationForm(true);
  };

  const handleReservar = async () => {
    try {
      if (selectedHour !== null) {
        const selectedHourUTC = new Date(selectedDate);
        selectedHourUTC.setUTCHours(selectedHour, 0, 0);
        selectedHourUTC.setUTCMinutes(selectedHourUTC.getUTCMinutes()-256);
        // Make a POST request to add a new visit
        await axios.post('http://localhost:5000/NuevaVisita', {
          Nombre: nombreApellido,
          Fecha: selectedDate.toISOString().split('T')[0],
          HoraDeLlegada: selectedHourUTC.toISOString().substr(11, 8),
          Ocupado: '1',
          IdPaciente: 1, // Replace with the actual patient ID
        });
  
        // Fetch updated list of occupied dates
        await obtenerHorasOcupadas();
  
        // Close the reservation form
        handleClose();
      }
    } catch (error) {
      console.error('Error adding visit:', error);
    }
  };

  const handleClose = () => {
    setShowReservationForm(false);
    setNombreApellido("");
    setSelectedHour(null);
  };

  return (
    <div className="calendario-container">
      <Box display="flex" alignItems="center" mt={2} ml={2}>
        <Link to="/agendaVisitas" style={{ color: "black" }}>
          <ArrowBackIcon style={{ color: "black" }} />
        </Link>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          style={{ marginLeft: "8px", color: "black" }}
        ></Typography>
      </Box>
      <Typography variant="h4" align="center" gutterBottom>
        Calendario de visitas
      </Typography>
      <Box display="flex" justifyContent="center">
        <Calendar
          value={selectedDate}
          onChange={handleDateChange}
          onClickDay={handleDateTouch}
          tileClassName={({ date }) =>
            isDateOccupied(date) ? "occupied" : undefined
          }
        />
      </Box>
      <Modal
        open={showReservationForm}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Box width="80%" maxWidth="400px" p={2} bg="white" borderRadius="8px">
            <Typography
              align="center"
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Agendar Visita
            </Typography>
            <Box mt={2}>
              <TextField
                label="Nombre y Apellido"
                fullWidth
                value={nombreApellido}
                onChange={(e) => setNombreApellido(e.target.value)}
              />
            </Box>
            <Box mt={2}>
              <TextField
                select
                label="Seleccionar Hora"
                fullWidth
                value={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
                style={{ background: "white" }}
              >
                {availableHours.map((hour) => (
                  <MenuItem key={hour} value={hour}>
                    {hour}:00 Hs.
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box mt={2} display="flex" justifyContent="center">
              <Button
                onClick={handleReservar}
                color="primary"
                variant="contained"
              >
                Agendar visita
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Calendario;
