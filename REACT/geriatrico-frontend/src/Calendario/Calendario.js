import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Box, Typography } from "@mui/material";
import format from "date-fns/format";
import isSameDay from "date-fns/isSameDay";
import axios from "axios"; // Asegúrate de tener axios instalado

function Calendario() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [occupiedDates, setOccupiedDates] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);

  useEffect(() => {
    fetchOccupiedDates(); // Cargar las fechas ocupadas inicialmente
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchAvailableHours(date); // Llamada para obtener las horas disponibles
  };

  const isDateOccupied = (date) => {
    return occupiedDates.some((occupiedDate) => isSameDay(occupiedDate, date));
  };

  const fetchOccupiedDates = async () => {
    try {
      const response = await axios.get("/FechasDisponibles"); // Cambia la URL a la correcta
      const visitas = response.data;
      const occupiedDates = visitas.map((visita) => new Date(visita.Fecha));
      setOccupiedDates(occupiedDates);
    } catch (error) {
      console.error("Error fetching occupied dates:", error);
    }
  };

  const fetchAvailableHours = (date) => {
    const hoursInDay = Array.from({ length: 9 }, (_, index) => index + 12);
    const occupiedHours = occupiedDates
      .filter((occupiedDate) => isSameDay(occupiedDate, date))
      .map((occupiedDate) => occupiedDate.getHours());

    const availableHours = hoursInDay.filter(
      (hour) => !occupiedHours.includes(hour)
    );

    setAvailableHours(availableHours);
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
          {availableHours.length === 0 ? (
            <Typography variant="body1" align="center">
              No hay horas disponibles para esta fecha.
            </Typography>
          ) : (
            availableHours.map((hour) => (
              <Typography variant="body1" align="center" key={hour}>
                Hora: {hour}:00
              </Typography>
            ))
          )}
        </Box>
      )}
    </div>
  );
}

export default Calendario;
