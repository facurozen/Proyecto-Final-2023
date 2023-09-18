import React, { useState } from "react";
import "./BotonKinesio.css";
import icono from "./sort-ascending.svg";
import Modal from "react-bootstrap/Modal";

function BotonKinesio({ kinesiologia }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderKinesiologia = () => {
    if (Array.isArray(kinesiologia)) {
      return kinesiologia.map((kine, index) => {
        const fechaInicio = new Date(kine.FechaInicio);
        const fechaHoy = new Date(kine.FechaHoy);
        const diaInicio = fechaInicio.getUTCDate();
        const mesInicio = fechaInicio.getUTCMonth() + 1;
        const anoInicio = fechaInicio.getUTCFullYear();
        const diaHoy = fechaHoy.getUTCDate();
        const mesHoy = fechaHoy.getUTCMonth() + 1;
        const anoHoy = fechaHoy.getUTCFullYear();
        return (
          <div key={index}>
            <p className="textoKine">
              Inicio de tratamiento: {diaInicio}/{mesInicio}/{anoInicio}
            </p>
            <p className="subTextoKine">{kine.Texto}</p>
            <p className="textoKine">Profesional a cargo: {kine.Medico}</p>
            <p className="textoKine">
              Fecha de registro: {diaHoy}/{mesHoy}/{anoHoy}
            </p>
          </div>
        );
      });
    }
    return null;
  };

  return (
    <>
      <div className="Rectangle-27" onClick={handleShow}>
        <img className="icon" src={icono} alt="icono" />
        <span className="-sp-H2-Titillium-Web">Kinesiologia</span>
      </div>
      <Modal className="modal1" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="tituloModal">Kinesiologia</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderKinesiologia()}</Modal.Body>
      </Modal>
    </>
  );
}

export default BotonKinesio;
