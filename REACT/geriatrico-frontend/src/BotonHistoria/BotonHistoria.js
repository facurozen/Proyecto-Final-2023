import React, { useState } from 'react';
import './BotonHistoria.css';
import HealthCross from './health-cross.svg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function BotonHistoria({ historiaClinica }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Invierte el orden de la historia clínica para mostrarla de la más reciente a la más antigua
  const historiaClinicaInvertida = Array.isArray(historiaClinica) ? [...historiaClinica].reverse() : [];

  const renderHistoria = () => {
    return historiaClinicaInvertida.map((hist) => {
      const fecha = new Date(hist.Fecha);
      const dia = fecha.getUTCDate();
      const mes = fecha.getUTCMonth() + 1;
      const ano = fecha.getUTCFullYear();
      return (
        <div className='fechas' key={hist.ID}> {/* Asegúrate de agregar una clave única */}
          <p className="textoHist"> {dia}/{mes}/{ano}: {hist.Texto}</p>
        </div>
      );
    });
  };

  return (
    <>
      <div className="Rectangle-27" onClick={handleShow}>
        <img className="icon" src={HealthCross} alt="Health Cross" />
        <span className="-sp-H2-Titillium-Web">Historia Clinica</span>
      </div>
      <Modal className="modal1" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="tituloModal"> Historia Clinica</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderHistoria()}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BotonHistoria;
