import React, { useState } from "react";
import "./Home.css";
import { Container, Row, Col } from "react-bootstrap";
import Fecha from "../Fecha/Fecha";
import logo from "../images/logo.png";
import menu from "../images/comida.jpg";
import { Modal, Typography, Button } from "@mui/material";

function Home({ fechasRelevantes }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedFecha, setSelectedFecha] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Declarar itemsPerPage antes de su uso
  const itemsPerPage = 4;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleFechasRelevantes = fechasRelevantes.slice(startIndex, endIndex);

  const nextPage = () => {
    if (startIndex + itemsPerPage < fechasRelevantes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openModal = (fecha) => {
    setSelectedFecha(fecha);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFecha(null);
    setModalOpen(false);
  };

  return (
    <div className="home-container">
      <img alt="" src={logo} className="logo" />

      <Row>
        <Col>
          <Fecha fechasRelevantes={visibleFechasRelevantes} onFechaClick={openModal} />
        </Col>
      </Row>

      <div className="pagination-buttons">
        <button onClick={nextPage} disabled={startIndex + itemsPerPage >= fechasRelevantes.length}>
          &lt;
        </button>
        <button onClick={prevPage}disabled={currentPage === 0} >
          &gt;
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

      <Modal open={modalOpen} onClose={closeModal}>
        <div className="modal-content">
          {selectedFecha && (
            <>
              <Typography variant="h4">{selectedFecha.Texto}</Typography>
              <Typography variant="body1">{selectedFecha.Fecha}</Typography>
              <Typography variant="body2">{selectedFecha.Hora}</Typography>
              <img src={selectedFecha.Imagen} alt={selectedFecha.Texto} />
            </>
          )}
          <Button onClick={closeModal}>Cerrar</Button>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
