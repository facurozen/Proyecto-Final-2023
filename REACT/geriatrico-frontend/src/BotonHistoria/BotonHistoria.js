import React, { useState } from 'react';
import './BotonHistoria.css';
import HealthCross from './health-cross.svg'; 
import Modal from 'react-bootstrap/Modal';


function BotonHistoria({historiaClinica}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const renderHistoria = () => {
      if (Array.isArray(historiaClinica)) {
      return historiaClinica.map((hist) => {
        const fecha = new Date(hist.Fecha);
        const dia = fecha.getUTCDate();
        const mes = fecha.getUTCMonth()+1;
        return (
          <p> {dia}/{mes}: {hist.Texto}</p>
        )
      });
    }
    return null;
   
  }
  return (
    <div className="Rectangle-27 " onClick={handleShow}>
      <Modal className="modal1" show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title className="tituloModal"> Historia Clinica</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {renderHistoria()};
          </Modal.Body>
        </Modal>
      <img className="icon" src={HealthCross} alt="Health Cross" />
      <span className="-sp-H2-Titillium-Web">Historia Clinica</span>
    </div>
  );
}

export default BotonHistoria;
