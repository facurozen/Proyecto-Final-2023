import React, { useState } from "react";
import "./Fecha.css";
import { Modal, Button } from "react-bootstrap"; 

function Fecha({ fechasRelevantes }) {
  const [selectedFecha, setSelectedFecha] = useState(null); 
  const [showModal, setShowModal] = useState(false); 

  const openModal = (fecha) => {
    const date = new Date(fecha.Fecha);
    const formattedDate = `${date.getUTCDate()}-${date.getUTCMonth() + 1}-${date.getUTCFullYear()}`;
    
    const fechaConFormato = { ...fecha, Fecha: formattedDate };
    
    setSelectedFecha(fechaConFormato);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedFecha(null);
    setShowModal(false);
  };

  return (
    <div className="fecha-container">
      {fechasRelevantes.map((fr) => {
        const fecha = new Date(fr.Fecha);
        const dia = fecha.getUTCDate();
        const mes = fecha.toLocaleString("default", { month: "short" });
        const horaString = fr.Hora;
        let hora = new Date(horaString).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        if (hora === "00:00") {
          hora = "Todo el día";
        }

        return (
          <div
            className="fecha-cuadrado"
            key={fr.id}
            onClick={() => openModal(fr)} 
          >
            <p className="fecha-dia">
              {dia} de {mes}
            </p>
            <p className="fecha-texto">{fr.Texto}</p>
            <p className="fecha-hora">{hora}</p>
          </div>
        );
      })}

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <h1 className="TituloModal">{selectedFecha?.Texto}</h1>
        </Modal.Header>
        <Modal.Body>
          <h3 className="FechaModal">{selectedFecha?.Fecha}</h3>
          <p>{selectedFecha?.Info}</p>
          <img className="imagenFecha" src={selectedFecha?.Imagen} alt={selectedFecha?.Texto}/>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Fecha;
