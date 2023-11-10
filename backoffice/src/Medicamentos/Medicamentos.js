import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import './Medicamentos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [nuevoMedicamento, setNuevoMedicamento] = useState('');
  const [medicamentoModificado, setMedicamentoModificado] = useState(null);

  const obtenerMedicamentos = async () => {
    const url = "http://localhost:5000/Medicamentos";
    const result = await axios.get(url);
    setMedicamentos(result.data);
  };

  useEffect(() => {
    obtenerMedicamentos();
  }, []);

  const agregarMedicamento = async () => {
    if (nuevoMedicamento) {
      const url = "http://localhost:5000/NuevoMedicamento";
      await axios.post(url, { NombreMedicamento: nuevoMedicamento });
      obtenerMedicamentos();
      setNuevoMedicamento('');
    }
  };

  const eliminarMedicamento = async (idMedicamento) => {
    const url = `http://localhost:5000/EliminarMedicamento/${idMedicamento}`;
    await axios.delete(url);
    obtenerMedicamentos();
  };

  const modificarMedicamento = async () => {
    if (medicamentoModificado) {
      const url = `http://localhost:5000/EditarMedicamento/${medicamentoModificado.IdMedicamento}`;
      await axios.put(url, { NombreMedicamento: medicamentoModificado.NombreMedicamento });
      obtenerMedicamentos();
      setMedicamentoModificado(null);
    }
  };

  return (
    <div className="med-container">
      <h3>Lista de Medicamentos</h3>
      <Row className="med-form">
        <Col>
          <Form.Control
            type="text"
            value={nuevoMedicamento}
            onChange={(e) => setNuevoMedicamento(e.target.value)}
            placeholder="Nuevo Medicamento"
            className="med-input"
          />
        </Col>
        <Col className="med-btn">
          <Button variant="primary" onClick={agregarMedicamento}>Agregar Nuevo</Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre del Medicamento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map(medicamento => (
            <tr key={medicamento.IdMedicamento}>
              <td>
                {medicamentoModificado && medicamentoModificado.IdMedicamento === medicamento.IdMedicamento ? (
                  <Form.Control
                    type="text"
                    value={medicamentoModificado.NombreMedicamento}
                    onChange={(e) => setMedicamentoModificado({ ...medicamentoModificado, NombreMedicamento: e.target.value })}
                  />
                ) : (
                  medicamento.NombreMedicamento
                )}
              </td>
              <td>
                {medicamentoModificado ? (
                  <Button variant="success" onClick={modificarMedicamento}>Guardar Cambios</Button>
                ) : (
                  <div className="med-action-btns">
                    <Button variant="primary" onClick={() => setMedicamentoModificado(medicamento)}><FontAwesomeIcon icon={faEdit} /></Button>
                    <Button variant="danger" onClick={() => eliminarMedicamento(medicamento.IdMedicamento)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Medicamentos;
