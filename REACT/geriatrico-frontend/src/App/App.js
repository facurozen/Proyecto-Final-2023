import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logoPersona from '../images/jose.jpeg';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import BotonInforme from '../BotonInforme/BotonInforme';
import BotonMedicamentos from '../BotonMedicamentos/BotonMediamentos';
import BotonHistoria from '../BotonHistoria/BotonHistoria';
import BotonKinesio from '../BotonKinesio/BotonKinesio';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {
  const [medicamentoATomar, setMedicamentosATomar] = useState([]);
  const [historiaClinica, sethistoriaClinica] = useState([]);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const obtenerMedicamentosATomar = async () =>{
      const url = 'http://localhost:5000/MedicamentoATomar/1';
      const result = await axios.get(url);
      setMedicamentosATomar(result.data);
    }
    obtenerMedicamentosATomar()
  }, []);

  useEffect(() => {
    const obtenerHistoria = async () =>{
      const url = 'http://localhost:5000/HistoriaClinica/1';
      axios.get(url)
      .then(res => {
        sethistoriaClinica(res.data);
      })
    }
    obtenerHistoria()
  }, []);
  return (
      <div className="App">
      <div className="square">
        <img src={logoPersona} alt="Foto de perfil" className="profile-image" />
        <div className="name">José Lopez</div>
      </div>

      <div className="Rounded-Rectangle">
      <span className="SeguimientoSemanal">
        Seguimiento semanal
      </span>
      <Row>
        <Col><BotonInforme/></Col>
        <Col><BotonMedicamentos medicamentoATomar={medicamentoATomar} /></Col>
      </Row>
      <Row>
        <Col><BotonHistoria historiaClinica={historiaClinica}/></Col>
        <Col><BotonKinesio/></Col>
      </Row>
     </div>
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
