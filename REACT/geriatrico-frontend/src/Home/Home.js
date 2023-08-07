import React from "react";
import "./Home.css";
import { Container, Row, Col } from "react-bootstrap";
import Fecha from "../Fecha/Fecha";
import logo from "../images/logo.png";
import menu from "../images/comida.jpg";

function Home({ fechasRelevantes }) {
  const mitad = Math.ceil(fechasRelevantes.length / 2);
  const primeraMitad = fechasRelevantes.slice(0, mitad);
  const segundaMitad = fechasRelevantes.slice(mitad);

  return (
    <div className="home-container">
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

      <div className="menu-semanal-rectangulo">
        <div className="menu">
          <img alt="" src={menu} />
        </div>
        <div className="menu-text">
          <p>Menu Semanal</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
