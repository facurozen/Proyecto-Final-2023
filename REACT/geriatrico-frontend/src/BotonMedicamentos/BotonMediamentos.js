import React, { useState, useRef, useEffect } from 'react';
import './BotonMedicamentos.css';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import icono from './pills.svg';

function BotonMedicamentos({ medicamentoATomar }) {
  const [show, setShow] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const modalRef = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleModalEntered = () => {
    if (modalRef.current) {
      modalRef.current.scrollTop = modalRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  const renderMedicamentos = () => {
    let currentDate = null;

    // Ordenar medicamentos por fecha más reciente primero
    const sortedMedicamentos = [...medicamentoATomar].sort((a, b) => {
      const dateA = new Date(a.FechaHora);
      const dateB = new Date(b.FechaHora);
      return dateB - dateA;
    });

    return (
      <tbody>
        {sortedMedicamentos.map((med) => {
          const fecha = new Date(med.FechaHora);
          const hora = fecha.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          const formattedDate = fecha.toLocaleDateString();
          const showDateHeader = currentDate !== formattedDate;

          if (showDateHeader) {
            currentDate = formattedDate;
          }

          return (
            <React.Fragment key={med.id}>
              {showDateHeader && (
                <tr>
                  <th colSpan="3" className="date-header">
                    {formattedDate}
                  </th>
                </tr>
              )}
              <tr>
                <td className="hora-cell">{hora}</td>
                <td className="medicamento-cell">{med.NombreMedicamento}</td>
                <td>
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <Form.Check
                          type={type}
                          id={`default-${type}`}
                          checked={med.TomoMedicacion}
                          label=""
                        />
                      </div>
                    ))}
                  </Form>
                </td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    );
  };

  const handleModalScroll = () => {
    if (modalRef.current) {
      setScrollPosition(modalRef.current.scrollTop);
    }
  };

  return (
    <>
      <div className="Rectangle-27" onClick={handleShow}>
        <img className="icon" src={icono} alt="icono" />
        <span className="-sp-H2-Titillium-Web">Medicamentos diarios</span>
      </div>
      <Modal
        className="modal1"
        show={show}
        onHide={handleClose}
        onEntered={handleModalEntered}
        onScroll={handleModalScroll}
        ref={modalRef}
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Table className="medicamentos-table">
            <thead>
              <tr>
                <th className="hora-cell">
                  <span className="hora-title">Hora</span>
                </th>
                <th className="medicamento-cell titulo-medicamento">Medicamento</th>
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
