import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
    const fechasFormateadas = result.data.map(fecha => ({
      ...fecha,
      Fecha: formatFecha(fecha.Fecha),
    }));
    setFechasRelevantes(fechasFormateadas);
  };

  useEffect(() => {
    obtenerFechas();
  }, []);

  const agregarFecha = async () => {
    if (
      nuevaFechaRelevante.Fecha &&
      nuevaFechaRelevante.Texto &&
      nuevaFechaRelevante.Hora &&
      nuevaFechaRelevante.Imagen
    ) {
      const fechaFormateada = `${nuevaFechaRelevante.Fecha}T${nuevaFechaRelevante.Hora}:00`;
      const url = "http://localhost:5000/NuevoFechasRelevantes";
  
      await axios.post(url, {
        ...nuevaFechaRelevante,
        Fecha: fechaFormateada,
      });
  
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
      await axios.put(url, {
        Fecha: fechaModificada.Fecha,
        Texto: fechaModificada.Texto,
        Hora: fechaModificada.Hora,
        Imagen: fechaModificada.Imagen,
        Info: fechaModificada.Info,
      });
      obtenerFechas();
      setFechaModificada(null);
    }
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  return (
    <div>
      <h3>Fechas Relevantes</h3>
      <Row>
        <Col>
          <Form.Control
            type="date"
            value={nuevaFechaRelevante.Fecha}
            onChange={(e) =>
              setNuevaFechaRelevante({
                ...nuevaFechaRelevante,
                Fecha: e.target.value,
              })
            }
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            value={nuevaFechaRelevante.Texto}
            onChange={(e) =>
              setNuevaFechaRelevante({
                ...nuevaFechaRelevante,
                Texto: e.target.value,
              })
            }
            placeholder="Texto"
          />
        </Col>
        <Col>
          <Form.Control
            type="time"
            value={nuevaFechaRelevante.Hora}
            onChange={(e) =>
              setNuevaFechaRelevante({
                ...nuevaFechaRelevante,
                Hora: e.target.value,
              })
            }
          />
        </Col>
        <Col>
          <Form.Control
            type="url"
            value={nuevaFechaRelevante.Imagen}
            onChange={(e) =>
              setNuevaFechaRelevante({
                ...nuevaFechaRelevante,
                Imagen: e.target.value,
              })
            }
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            value={nuevaFechaRelevante.Info}
            onChange={(e) =>
              setNuevaFechaRelevante({
                ...nuevaFechaRelevante,
                Info: e.target.value,
              })
            }
            placeholder="Información"
          />
        </Col>
        <Col>
          <Button variant="primary" onClick={agregarFecha}>
            Agregar
          </Button>
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
                {formatFecha(fecha.Fecha)}
              </td>
              <td>
                {fecha.Texto}
              </td>
              <td>
                {fecha.Hora}
              </td>
              <td>
                <a
                  href={fecha.Imagen}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Imagen
                </a>
              </td>
              <td>
                {fecha.Info}
              </td>
              <td>
                <div>
                  <Button
                    variant="primary"
                    onClick={() => setFechaModificada(fecha)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => eliminarFechasRelevantes(fecha.Id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default FechasRelevantes;
