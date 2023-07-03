import React, { useState } from 'react';
import './BotonMedicamentos.css';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import icono from './pills.svg';

function BotonMedicamentos({ medicamentoATomar }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderMedicamentos = () => {
    return (
      <tbody>
        {medicamentoATomar.map((med) => {
          const fecha = new Date(med.FechaHora);
          const hora = fecha.getUTCHours();

          return (
            <tr key={med.id}>
              <td>{hora}</td>
              <td>{med.NombreMedicamento}</td>
              <td>
                <Form>
                  {['radio'].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                      <Form.Check
                        type={type}
                        checked={med.TomoMedicacion}
                        id={`default-${type}`}
                        label={``}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <>
      <div className="Rectangle-27" onClick={handleShow}>
        <img className="icon" src={icono} alt="icono" />
        <span className="-sp-H2-Titillium-Web">Medicamentos diarios</span>
      </div>
      <Modal className="modal1" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="tituloModal2"> {'<  '} Hoy {'  >'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered>
            <thead>
              <tr>
                <th>Hora</th>
                <th>Medicamento</th>
                <th></th>
              </tr>
            </thead>
            {renderMedicamentos()}
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BotonMedicamentos;
