import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function MenuSemanal() {
  const [menuSemanal, setMenuSemanal] = useState([]);
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [nuevoPlato, setNuevoPlato] = useState('');
  const [menuModificado, setMenuModificado] = useState(null);

  const obtenerMenuSemanal = async () => {
    const url = "http://localhost:5000/Menu";
    const result = await axios.get(url);
    const menuFormateado = result.data.map(menu => {
      return {
        ...menu,
        Fecha: formatFecha(menu.Fecha)
      };
    });
    setMenuSemanal(menuFormateado);
  };

  useEffect(() => {
    obtenerMenuSemanal();
  }, []);

  const agregarMenu = async () => {
    if (nuevaFecha && nuevoPlato) {
      const url = "http://localhost:5000/NuevoMenu";
      await axios.post(url, { Fecha: nuevaFecha, Plato: nuevoPlato });
      obtenerMenuSemanal();
      setNuevaFecha('');
      setNuevoPlato('');
    }
  };

  const eliminarMenu = async (idMenu) => {
    const url = `http://localhost:5000/EliminarMenu/${idMenu}`;
    await axios.delete(url);
    obtenerMenuSemanal();
  };

  const modificarMenu = async () => {
    if (menuModificado) {
      const url = `http://localhost:5000/EditarMenu/${menuModificado.Id}`;
      await axios.put(url, { Fecha: menuModificado.Fecha, Plato: menuModificado.Plato });
      obtenerMenuSemanal();
      setMenuModificado(null);
    }
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  return (
    <div className="menu-container">
      <h3>Menú Semanal</h3>
      <Row className="menu-form">
        <Col>
          <Form.Control
            type="text"
            value={nuevaFecha}
            onChange={(e) => setNuevaFecha(e.target.value)}
            placeholder="Nueva Fecha"
            className="menu-input"
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            value={nuevoPlato}
            onChange={(e) => setNuevoPlato(e.target.value)}
            placeholder="Nuevo Plato"
            className="menu-input"
          />
        </Col>
        <Col className="menu-btn">
          <Button variant="primary" onClick={agregarMenu}>Agregar Nuevo</Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Plato</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {menuSemanal.map(menu => (
            <tr key={menu.Id}>
              <td>
                {menuModificado && menuModificado.Id === menu.Id ? (
                  <Form.Control
                    type="text"
                    value={menuModificado.Fecha}
                    onChange={(e) => setMenuModificado({ ...menuModificado, Fecha: e.target.value })}
                  />
                ) : (
                  menu.Fecha
                )}
              </td>
              <td>
                {menuModificado && menuModificado.Id === menu.Id ? (
                  <Form.Control
                    type="text"
                    value={menuModificado.Plato}
                    onChange={(e) => setMenuModificado({ ...menuModificado, Plato: e.target.value })}
                  />
                ) : (
                  menu.Plato
                )}
              </td>
              <td>
                {menuModificado ? (
                  <Button variant="success" onClick={modificarMenu}>Guardar Cambios</Button>
                ) : (
                  <div className="menu-action-btns">
                    <Button variant="primary" onClick={() => setMenuModificado(menu)}><FontAwesomeIcon icon={faEdit} /></Button>
                    <Button variant="danger" onClick={() => eliminarMenu(menu.Id)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
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

export default MenuSemanal;
