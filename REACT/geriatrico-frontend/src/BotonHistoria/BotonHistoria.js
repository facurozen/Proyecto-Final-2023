import React, { useState } from 'react';
import './BotonHistoria.css';
import HealthCross from './health-cross.svg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function BotonHistoria({ historiaClinica }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderHistoria = () => {
    if (Array.isArray(historiaClinica)) {
      return historiaClinica.map((hist) => {
        const fecha = new Date(hist.Fecha);
        const dia = fecha.getUTCDate();
        const mes = fecha.getUTCMonth() + 1;
        const ano = fecha.getUTCFullYear();
        return (
          <div className='fechas'>
            <p class="textoHist"> {dia}/{mes}/{ano}: {hist.Texto}</p>
          </div>
        )
      });
    }
    return null;

  }
  return (
    <>
      <div className="Rectangle-27 " onClick={handleShow}>
        <img className="icon" src={HealthCross} alt="Health Cross" />
        <span className="-sp-H2-Titillium-Web">Historia Clinica</span>
      </div>
      <Modal className="modal1" show={show} onHide={handleClose} >
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
