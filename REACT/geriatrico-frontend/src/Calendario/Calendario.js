import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Box, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import format from "date-fns/format";
import axios from "axios";
import isSameDay from "date-fns/isSameDay";
import parseISO from "date-fns/parseISO";

function Calendario() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [horasOcupadas, setHorasOcupadas] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [nombreApellido, setNombreApellido] = useState("");

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
    return horasOcupadas.some(
      (occupiedDate) => isSameDay(parseISO(occupiedDate.Fecha), date)
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchAvailableHours(date);
  };

  const fetchAvailableHours = (date) => {
    const hoursInDay = [12, 13, 14, 15, 16, 17, 18, 19, 20];

    const occupiedHours = horasOcupadas
      .filter((occupiedDate) =>
        isSameDay(parseISO(occupiedDate.Fecha), date)
      )
      .map((occupiedDate) => occupiedDate.HoraDeLlegada.getHours());

    const availableHours = hoursInDay.filter(
      (hour) => !occupiedHours.includes(hour)
    );

    setAvailableHours(availableHours);
  };

  const handleHourSelection = (hour) => {
    setSelectedHour(hour);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedHour(null);
    setDialogOpen(false);
    setNombreApellido("");
  };

  const handleReservar = () => {
    // Aquí puedes implementar la lógica para reservar la hora con el nombre y apellido
    console.log(`Reservaste la hora: ${selectedHour}:00 con nombre: ${nombreApellido}`);
    handleDialogClose();
  };

  return (
    <div className="calendario-container">
      <Typography variant="h4" align="center" gutterBottom>
        Calendario de visitas
      </Typography>
      <Box display="flex" justifyContent="center">
        <Calendar
          value={selectedDate}
          onChange={handleDateChange}
          tileClassName={({ date }) =>
            isDateOccupied(date) ? "occupied" : undefined
          }
        />
      </Box>
      {selectedDate && (
        <Box mt={2}>
          <Typography variant="h6" align="center" gutterBottom>
            Horas disponibles para el {format(selectedDate, "dd/MM/yyyy")}
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            {availableHours.map((hour) => (
              <Button
                variant="outlined"
                color="secondary" // Cambia a color rojo
                key={hour}
                onClick={() => handleHourSelection(hour)}
                sx={{ margin: 1 }} // Añade un poco de margen al botón
              >
                Hora: {hour}:00
              </Button>
            ))}
          </Box>
        </Box>
      )}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Reservar Hora</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre y Apellido"
            fullWidth
            value={nombreApellido}
            onChange={(e) => setNombreApellido(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleReservar} color="primary">
            Reservar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Calendario;
