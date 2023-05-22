import './App.css';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 
  const [medicamentoATomar, setMedicamentosATomar] = useState([]);

  useEffect(() => {
    const obtenerMedicamentosATomar = async () =>{
      const url = 'http://localhost:5000/MedicamentoATomar/1';
      const result = await axios.get(url);
      setMedicamentosATomar(result.data);
      console.log(result.data);
    }
    obtenerMedicamentosATomar()
  }, []);
  
  return (
    <div className="App">
      <Button variant="primary" onClick={handleShow}>
        Medicamentos semanales
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Medicamentos</Modal.Title>
        </Modal.Header>
        <Modal.Body><Table bordered>
      <thead>
        <tr>
          <th>Hora</th>
          <th>Medicamento</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          medicamentoATomar.map((med) => {
            return (<tr>
            <td> {med.FechaHora}</td>
            <td>{med.NombreMedicamento}</td>
            <td>{med.TomoMedicacion}</td>
            </tr>
            )
          })
        }
      </tbody>
    </Table></Modal.Body>
      </Modal>
      </div>
  );
}

export default App;
