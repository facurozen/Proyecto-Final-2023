import './App.css';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import logoPersona from '../images/jose.jpeg';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import BotonPerfilMedico from '../BotonPerfilMedico/BotonPerfilMedico';

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 
  const [medicamentoATomar, setMedicamentosATomar] = useState([]);
  const [value, setValue] = React.useState(0);


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
      <div className="square">
        <img src={logoPersona} alt="Foto de perfil" className="profile-image" />
        <div className="name">José Lopez</div>
      </div>
      <Button variant="primary" onClick={handleShow}>
        Medicamentos semanales
      </Button>

      <BotonPerfilMedico/>
      <Modal className='modal1' show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className='tituloModal'> {'<  '} Hoy {'  >'}</Modal.Title>
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
            const fecha = new Date(med.FechaHora);
            var hora=fecha.getUTCHours();
            return (<tr>
            <td>{hora}</td>
            <td>{med.NombreMedicamento}</td>
            <td> <Form>
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
                </Form></td>
            </tr>
            )
          })
        }
      </tbody>
    </Table></Modal.Body>
      </Modal>
        <BottomNavigation className="logos"
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} />
          <BottomNavigationAction label="Calendario" icon={<CalendarMonthRoundedIcon />} />
          <BottomNavigationAction label="Visitas" icon={<PeopleRoundedIcon />} />
          <BottomNavigationAction label="Perfil" icon={<PersonRoundedIcon />} />
        </BottomNavigation>
        </div>

    

      
  );
}

export default App;
