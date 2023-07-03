import React, { useState } from 'react';
import './BotonInforme.css';
import notas from './notes.svg';
import Modal from 'react-bootstrap/Modal';

function BotonInforme({ informe }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderInforme = () => {
    if (Array.isArray(informe)) {
      return informe.map((inf) => {  
          <div className='fechas'>
            <p> hola </p>
          </div>
        
      });
    }
    return null;
  }

  return (
    <>
      <div class="Rectangle-27" onClick={handleShow}>
        <img className="icon" src={notas} alt="notas" />
        <span class="-sp-H2-Titillium-Web">
          Informe
        </span>
      </div>
      <Modal className="modal1" show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title className="tituloModal"> Informe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderInforme()};
        </Modal.Body>
      </Modal>
    </>
  );
}
export default BotonInforme;

