import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';

function Actividades() {
  const [actividades, setActividades] = useState([]);
  const [nuevoActividad, setNuevoActividad] = useState('');
  const [actividadModificado, setActividadModificado] = useState(null);

  const obtenerActividades = async () => {
    const url = "http://localhost:5000/Actividades";
    const result = await axios.get(url);
    setActividades(result.data);
  };

  useEffect(() => {
    obtenerActividades();
    console.log(setActividades.data);
  }, []);

  const agregarActividad = async () => {
    if (nuevoActividad) {
      const url = "http://localhost:5000/insertActividades";
      await axios.post(url, { NombreActividad: nuevoActividad });
      obtenerActividades();
      setNuevoActividad('');
    }
  };

  const eliminarActividad = async (Id) => {
    const url = `http://localhost:5000/deleteActividades/${Id}`;
    await axios.delete(url);
    obtenerActividades();
  };

  const modificarActividad = async () => {
    if (actividadModificado) {
      const url = `http://localhost:5000/editarActividades/${actividadModificado.Id}`;
      await axios.put(url, { NombreActividad: actividadModificado.NombreActividad });
      obtenerActividades();
      setActividadModificado(null);
    }
  };

  return (
    <div className="med-container">
      <h3>Lista de Actividades</h3>
      <Row className="med-form">
        <Col>
          <Form.Control
            type="text"
            value={nuevoActividad}
            onChange={(e) => setNuevoActividad(e.target.value)}
            placeholder="Nueva Actividad"
            className="med-input"
          />
        </Col>
        <Col className="med-btn">
          <Button variant="primary" onClick={agregarActividad}>Agregar</Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre de la actividad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {actividades.map((actividad) => (
            <tr key={actividad.Id}>
              <td>
                {actividadModificado && actividadModificado.Id === actividad.Id ? (
                  <Form.Control
                    type="text"
                    value={actividadModificado.NombreActividad}
                    onChange={(e) => setActividadModificado({ ...actividadModificado, NombreActividad: e.target.value })}
                  />
                ) : (
                  actividad.NombreActividad
                )}
              </td>
              <td>
                {actividadModificado ? (
                  <Button variant="success" onClick={modificarActividad}>Guardar Cambios</Button>
                ) : (
                  <div className="med-action-btns">
                    <Button variant="primary" onClick={() => setActividadModificado(actividad)}>Editar</Button>
                    <Button variant="danger" onClick={() => eliminarActividad(actividad.Id)}>Eliminar</Button>
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
