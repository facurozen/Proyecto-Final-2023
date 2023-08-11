import React from "react";
import "./AgendaVisitas.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function formatTime(timeString) {
  const date = new Date(timeString);
  date.setUTCHours(date.getUTCHours()); 
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}


function AgendaVisitas({ visitas, onDeleteVisita }) {
  const sortedVisitas = visitas.sort((a, b) => {
    return formatTime(a.HoraDeLlegada).localeCompare(formatTime(b.HoraDeLlegada));
  });

  const groupedVisitas = [];
  let currentGroup = [];

  for (let i = 0; i < sortedVisitas.length; i++) {
    const currentVisita = sortedVisitas[i];
    const currentLlegada = formatTime(currentVisita.HoraDeLlegada);

    const nextVisita = sortedVisitas[i + 1];
    const nextLlegada = nextVisita ? formatTime(nextVisita.HoraDeLlegada) : null;

    currentGroup.push(currentVisita);

    if (nextLlegada !== currentLlegada) {
      groupedVisitas.push(currentGroup);
      currentGroup = [];
    }
  }

  return (
    <>
      <span className="Agenda-de-visitas">Agenda de visitas</span>
      <hr />
      <span className="Wed15-Septemper">Mier, 15 Abril</span>
      <Container>
        {groupedVisitas.map((group, index) => (
          <Row key={index}>
            <Col>
              {group.map((vis, innerIndex) => {
                const formattedLlegada = formatTime(vis.HoraDeLlegada);

                return (
                  <div className="Rectangle-9" key={innerIndex}>
                    <div className="TimeWrapper">
                      <p className="Horarios">{formattedLlegada}</p>
                    </div>
                    <h2 className="nombreVisita">{`Visita de ${vis.Nombre}`}</h2>
                  </div>
                );
              })}
            </Col>
          </Row>
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
