import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Actividades() {
  const [actividades, setActividades] = useState([]);
  const [nuevaActividad, setNuevaActividad] = useState('');
  const [actividadModificada, setActividadModificada] = useState(null);

  const obtenerActividades = async () => {
    const url = "http://localhost:5000/Actividades";
    const result = await axios.get(url);
    setActividades(result.data);
  };

  useEffect(() => {
    obtenerActividades();
  }, []);

  const agregarActividad = async () => {
    if (nuevaActividad) {
      const url = "http://localhost:5000/insertActividades";
      await axios.post(url, { Nombre: nuevaActividad });
      obtenerActividades();
      setNuevaActividad('');
    }
  };

  const eliminarActividad = async (idActividad) => {
    const url = `http://localhost:5000/deleteActividades/${idActividad}`;
    await axios.delete(url);
    obtenerActividades();
  };

  const modificarActividad = async () => {
    if (actividadModificada) {
      const url = "http://localhost:5000/editarActividades";
      await axios.put(url, { Id: actividadModificada.Id, Nombre: actividadModificada.Nombre });
      obtenerActividades();
      setActividadModificada(null);
    }
  };

  return (
    <div className="actividades-container">
      <h3>Lista de Actividades</h3>
      <Row className="actividades-form">
        <Col>
          <Form.Control
            type="text"
            value={nuevaActividad}
            onChange={(e) => setNuevaActividad(e.target.value)}
            placeholder="Nueva Actividad"
            className="actividades-input"
          />
        </Col>
        <Col className="actividades-btn">
          <Button variant="primary" onClick={agregarActividad}>Agregar Nueva</Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre de la Actividad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {actividades.map(actividad => (
            <tr key={actividad.Id}>
              <td>
                {actividadModificada && actividadModificada.Id === actividad.Id ? (
                  <Form.Control
                    type="text"
                    value={actividadModificada.Nombre}
                    onChange={(e) => setActividadModificada({ ...actividadModificada, Nombre: e.target.value })}
                  />
                ) : (
                  actividad.Nombre
                )}
              </td>
              <td>
                {actividadModificada ? (
                  <Button variant="success" onClick={modificarActividad}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                ) : (
                  <div className="actividades-action-btns">
                    <Button variant="primary" onClick={() => setActividadModificada(actividad)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button variant="danger" onClick={() => eliminarActividad(actividad.Id)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
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

export default Actividades;
