import './App.css';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import logoHome from '../images/home.png';
import logoCalendar from '../images/calendar.PNG';
import logoVisitas from '../images/visitas.PNG';
import logoPerfil from '../images/perfil.PNG';

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
    <Router>
      <div className="App">
      <Button variant="primary" onClick={handleShow}>
        Medicamentos semanales
      </Button>

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
      <nav className="navbar navbar-container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <img src={logoHome} alt="Home" className="logo" />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/calendar" className="nav-link">
                <img src={logoCalendar} alt="Calendar" className="logo" />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/visitas" className="nav-link">
                <img src={logoVisitas} alt="Visitas" className="logo" />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/perfil" className="nav-link">
                <img src={logoPerfil} alt="Perfil" className="logo" />
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/">
            {/* Contenido para la página de inicio */}
          </Route>
          <Route path="/calendar">
            {/* Contenido para la página de calendar */}
          </Route>
          <Route path="/visitas">
            {/* Contenido para la página de visitas */}
          </Route>
          <Route path="/perfil">
            {/* Contenido para la página de perfil */}
          </Route>
        </Routes>
        </div>
    </Router>
    

      
  );
}

export default App;
