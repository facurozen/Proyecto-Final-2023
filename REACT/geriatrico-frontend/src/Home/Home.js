import React, { useState } from "react";
import "./Home.css";
import { Container, Row, Col } from "react-bootstrap";
import Fecha from "../Fecha/Fecha";
import logo from "../images/logo.png";
import menu from "../images/comida.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Home({ fechasRelevantes }) {
  const [currentPage, setCurrentPage] = useState(0); // Página actual

  // Número de fechas a mostrar en cada página
  const itemsPerPage = 4;

  // Calcular el índice de inicio y fin para la página actual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Obtener las fechas relevantes para la página actual
  const visibleFechasRelevantes = fechasRelevantes.slice(startIndex, endIndex);

  // Función para ir a la página siguiente
  const nextPage = () => {
    if (startIndex + itemsPerPage < fechasRelevantes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para ir a la página anterior
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="home-container">
      <img alt="" src={logo} className="logo" />

      <Row>
        <Col>
          <Fecha fechasRelevantes={visibleFechasRelevantes} />
        </Col>
      </Row>

      <div className="pagination-buttons">
        <button onClick={prevPage} disabled={currentPage === 0}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button
          onClick={nextPage}
          disabled={startIndex + itemsPerPage >= fechasRelevantes.length}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

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
