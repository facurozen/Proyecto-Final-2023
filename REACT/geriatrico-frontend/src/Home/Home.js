import React from "react";
import "./Home.css";
import { Container, Row, Col } from "react-bootstrap";
import Fecha from "../Fecha/Fecha";
import logo from "../images/logo.png";
import menu from "../images/comida.jpg";

function Home({ fechasRelevantes }) {
  // Dividir el arreglo de fechas en dos partes
  const mitad = Math.ceil(fechasRelevantes.length / 2);
  const primeraMitad = fechasRelevantes.slice(0, mitad);
  const segundaMitad = fechasRelevantes.slice(mitad);

  return (
    <div className="home-container">
      {/* Centrar el logo en la parte superior */}
      <img alt="" src={logo} className="logo" />

      
        <span className="Titulo-Fechas-relevantes"> Julio</span>
        <Row>
          <Col>
            <Fecha fechasRelevantes={primeraMitad} />
          </Col>
          <Col>
            <Fecha fechasRelevantes={segundaMitad} />
          </Col>
        </Row>

      {/* Rectángulo en la parte inferior */}
      <div className="menu-semanal-rectangulo">
        <img alt="" src={menu} className="menu"/>
        <h2>Menu Semanal</h2>
        <p>
          El menu de esta semana es muy variado, con muchas opciones para elegir.
        </p>
      </div>
    </div>
  );
}

export default Home;
