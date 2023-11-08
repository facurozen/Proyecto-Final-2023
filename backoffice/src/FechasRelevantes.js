import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import './Medicamentos/Medicamentos.css';
function FechasRelevantes() {
  const [fechasRelevantes, setFechasRelevantes] = useState([]);
  const [nuevaFechaRelevante, setNuevaFechaRelevante] = useState({
    Fecha: '',
    Texto: '',
    Hora: '',
    Imagen: '',
    Info: '',
  });
  const [fechaModificada, setFechaModificada] = useState(null);

  const obtenerFechas = async () => {
    const url = "http://localhost:5000/FechasRelevantes";
    const result = await axios.get(url);
    setFechasRelevantes(result.data);
  };

  useEffect(() => {
    obtenerFechas();
  }, []);

  const agregarFecha = async () => {
    if (nuevaFechaRelevante.Fecha && nuevaFechaRelevante.Texto && nuevaFechaRelevante.Hora && nuevaFechaRelevante.Imagen) {
      const url = "http://localhost:5000/NuevoFechasRelevantes";
      await axios.post(url, nuevaFechaRelevante);
      obtenerFechas();
      setNuevaFechaRelevante({
        Fecha: '',
        Texto: '',
        Hora: '',
        Imagen: '',
        Info: '',
      });
    }
  };

  const eliminarFechasRelevantes = async (id) => {
    const url = `http://localhost:5000/EliminarFechasRelevantes/${id}`;
    await axios.delete(url);
    obtenerFechas();
  };

  const modificarFecha = async () => {
    if (fechaModificada) {
      const url = `http://localhost:5000/EditarFechasRelevantes/${fechaModificada.Id}`;
      await axios.put(url, { nombreFecha: fechaModificada.nombreFecha });
      obtenerFechas();
      setFechaModificada(null);
    }
  };

  return (
    <div>
      <h3>Fechas Relevantes</h3>
      <Row>
        <Col>
          <Form.Control
            type="date"
            value={nuevaFechaRelevante.Fecha}
            onChange={(e) => setNuevaFechaRelevante({ ...nuevaFechaRelevante, Fecha: e.target.value })}
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            value={nuevaFechaRelevante.Texto}
            onChange={(e) => setNuevaFechaRelevante({ ...nuevaFechaRelevante, Texto: e.target.value })}
            placeholder="Texto"
          />
        </Col>
        <Col>
          <Form.Control
            type="time"
            value={nuevaFechaRelevante.Hora}
            onChange={(e) => setNuevaFechaRelevante({ ...nuevaFechaRelevante, Hora: e.target.value })}
          />
        </Col>
        <Col>
          <Form.Control
            type="url"
            value={nuevaFechaRelevante.Imagen}
            onChange={(e) => setNuevaFechaRelevante({ ...nuevaFechaRelevante, Imagen: e.target.value })}
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            value={nuevaFechaRelevante.Info}
            onChange={(e) => setNuevaFechaRelevante({ ...nuevaFechaRelevante, Info: e.target.value })}
            placeholder="Información"
          />
        </Col>
        <Col>
          <Button variant="primary" onClick={agregarFecha}>Agregar</Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Texto</th>
            <th>Hora</th>
            <th>Imagen</th>
            <th>Información</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {fechasRelevantes.map((fecha) => (
            <tr key={fecha.Id}>
              <td>
                {fechaModificada && fechaModificada.Id === fecha.Id ? (
                  <Form.Control
                    type="date"
                    value={fechaModificada.Fecha}
                    onChange={(e) => setFechaModificada({ ...fechaModificada, Fecha: e.target.value })}
                  />
                ) : (
                  fecha.Fecha
                )}
              </td>
              <td>
                {fechaModificada && fechaModificada.Id === fecha.Id ? (
                  <Form.Control
                    type="text"
                    value={fechaModificada.Texto}
                    onChange={(e) => setFechaModificada({ ...fechaModificada, Texto: e.target.value })}
                  />
                ) : (
                  fecha.Texto
                )}
              </td>
              <td>
                {fechaModificada && fechaModificada.Id === fecha.Id ? (
                  <Form.Control
                    type="time"
                    value={fechaModificada.Hora}
                    onChange={(e) => setFechaModificada({ ...fechaModificada, Hora: e.target.value })}
                  />
                ) : (
                  fecha.Hora
                )}
              </td>
              <td>
                {fechaModificada && fechaModificada.Id === fecha.Id ? (
                  <Form.Control
                    type="url"
                    value={fechaModificada.Imagen}
                    onChange={(e) => setFechaModificada({ ...fechaModificada, Imagen: e.target.value })}
                  />
                ) : (
                  <a href={fecha.Imagen} target="_blank" rel="noopener noreferrer">Ver Imagen</a>
                )}
              </td>
              <td>
                {fechaModificada && fechaModificada.Id === fecha.Id ? (
                  <Form.Control
                    type="text"
                    value={fechaModificada.Info}
                    onChange={(e) => setFechaModificada({ ...fechaModificada, Info: e.target.value })}
                  />
                ) : (
                  fecha.Info
                )}
              </td>
              <td>
                {fechaModificada ? (
                  <Button variant="success" onClick={modificarFecha}>Guardar Cambios</Button>
                ) : (
                  <div>
                    <Button variant="primary" onClick={() => setFechaModificada(fecha)}>Editar</Button>
                    <Button variant="danger" onClick={() => eliminarFechasRelevantes(fecha.Id)}>Eliminar</Button>
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

export default FechasRelevantes;