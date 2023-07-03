import React, { useState } from 'react';
import './BotonKinesio.css';
import icono from './sort-ascending.svg'; 
import Modal from 'react-bootstrap/Modal';

function BotonKinesio({kinesiologia}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderKinesiologia = () => {
    if (Array.isArray(kinesiologia)) {
      return kinesiologia.map((kinesio) => {  
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
    <img className="icon" src={icono} alt="icono"/>
    <span class="-sp-H2-Titillium-Web">
    Kinesiologia
    </span>
    </div>
    <Modal className="modal1" show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title className="tituloModal"> Kinesiologia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderKinesiologia()};
        </Modal.Body>
      </Modal>
    </>
    
  );
}
export default BotonKinesio;
