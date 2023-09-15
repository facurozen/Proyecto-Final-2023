import React, { useState } from "react";
import "./Home.css";
import { Container, Row, Col } from "react-bootstrap";
import Fecha from "../Fecha/Fecha";
import logo from "../images/logo.png";
import menu from "../images/comida.jpg";
import { Modal, Typography, Button } from "@mui/material"; // Importa el Modal y otros componentes de @mui/material

function Home({ fechasRelevantes }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedFecha, setSelectedFecha] = useState(null); // Estado para la fecha seleccionada
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la apertura/cierre del modal

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

  // Función para abrir el modal con la información de la fecha seleccionada
  const openModal = (fecha) => {
    setSelectedFecha(fecha);
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedFecha(null);
    setModalOpen(false);
  };

  return (
    <div className="home-container">
      <img alt="" src={logo} className="logo" />

      <Row>
        <Col>
          <Fecha
            fechasRelevantes={visibleFechasRelevantes}
            onFechaClick={openModal} // Pasa la función para abrir el modal como prop
          />
        </Col>
      </Row>

      <div className="pagination-buttons">
        <button onClick={prevPage} disabled={currentPage === 0}>
          &lt; 
        </button>
        <button
          onClick={nextPage}
          disabled={startIndex + itemsPerPage >= fechasRelevantes.length}
        >
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

      {/* Modal para mostrar la información de la fecha */}
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
