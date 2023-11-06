import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Medicamentos from './Medicamentos/Medicamentos.js';
import Actividades from './Actividades';
import MenuSemanal from './MenuSemanal';
import FechasRelevantes from './FechasRelevantes';

function App() {
  return (
    <Router>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/home">Heart to Heart</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link as={Link} to="/medicamentos">Medicamentos</Nav.Link>
              <Nav.Link as={Link} to="/actividades">Actividades</Nav.Link>
              <Nav.Link as={Link} to="/menu-semanal">Menu semanal</Nav.Link>
              <Nav.Link as={Link} to="/fechas-relevantes">Fechas relevantes</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/medicamentos" element={<Medicamentos />} />
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/menu-semanal" element={<MenuSemanal />} />
        <Route path="/fechas-relevantes" element={<FechasRelevantes />} />
      </Routes>
    </Router>
  );
}

export default App;
