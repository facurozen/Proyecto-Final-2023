import React, { useState } from "react";
import "./AgendaVisitas.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function AgendaVisitas({ visitas, onDeleteVisita }) {
  function formatTime(timeString) {
    const date = new Date(timeString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  }

  // Ordena las visitas por fecha en orden descendente (de más reciente a más antigua)
  const sortedVisitas = [...visitas].sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha));

  const groupedVisitas = {};
  sortedVisitas.forEach((visita) => {
    const fecha = new Date(visita.Fecha); // Convierte la fecha a un objeto Date
    const fechaStr = fecha.toISOString().split("T")[0]; // Obtiene la fecha en formato ISO

    if (!groupedVisitas[fechaStr]) {
      groupedVisitas[fechaStr] = [];
    }
    groupedVisitas[fechaStr].push(visita);
  });

  return (
    <>
      <div className="Agenda-de-visitas">Agenda de visitas</div>
      <hr />
      <Container className="VisitasContainer">
        {Object.keys(groupedVisitas).map((fecha) => (
          <div key={fecha}>
            <h2 className="FechaVisitas">{fecha}</h2>
            <div>
              {groupedVisitas[fecha].map((vis, index) => {
                const formattedLlegada = formatTime(vis.HoraDeLlegada);

                return (
                  <div className="Rectangle-9" key={index}>
                    <div className="TimeWrapper">
                      <p className="Horarios">{formattedLlegada}</p>
                    </div>
                    <h2 className="nombreVisita">{`Visita de ${vis.Nombre}`}</h2>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </Container>
      <div className="ButtonWrapper">
        <Link to="/calendario" className="AgendarButton NoUnderlineLink">
          Agendar visita
        </Link>
      </div>
    </>
  );
}

export default AgendaVisitas;
