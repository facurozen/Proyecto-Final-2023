import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logoPersona from '../images/jose.jpeg';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Perfil from '../Perfil/Perfil';
import Home from '../Home/Home';



function App() {
  const [medicamentoATomar, setMedicamentosATomar] = useState([]);
  const [historiaClinica, sethistoriaClinica] = useState([]);
  const [informe, setInforme] = useState([]);
  const [kinesiologia, setKinesiologia] = useState([]);
  const [fechasRelevantes, setFechasRelevantes] = useState([]);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const obtenerMedicamentosATomar = async () => {
      const url = 'http://localhost:5000/MedicamentoATomar/1';
      const result = await axios.get(url);
      setMedicamentosATomar(result.data);
    }
    obtenerMedicamentosATomar()
  }, []);

  useEffect(() => {
    const obtenerHistoria = async () => {
      const url = 'http://localhost:5000/HistoriaClinica/1';
      axios.get(url)
        .then(res => {
          sethistoriaClinica(res.data);
        })
    }
    obtenerHistoria()
  }, []);

  useEffect(() => {
    const obtenerInforme = async () => {
      const url = 'http://localhost:5000/Informe/1';
      axios.get(url)
        .then(res => {
          setInforme(res.data);
        })
    }
    obtenerInforme()
  }, []);

  useEffect(() => {
    const obtenerKinesiologia = async () => {
      const url = 'http://localhost:5000/Kinesiologia/1';
      axios.get(url)
        .then(res => {
          setKinesiologia(res.data);
        })
    }
    obtenerKinesiologia()
  }, []);

  useEffect(() => {
    const obtenerFechasRelevantes = async () => {
      const url = 'http://localhost:5000/FechasRelevantes';
      axios.get(url)
        .then(res => {
          setFechasRelevantes(res.data);
        })
    }
    obtenerFechasRelevantes()
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/perfil" element={<Perfil informe={informe} medicamentoATomar={medicamentoATomar} historiaClinica={historiaClinica} kinesiologia={kinesiologia} />} />
          <Route path="/home" element={<Home fechasRelevantes={fechasRelevantes} />}></Route>
        </Routes>
      </BrowserRouter>{/*
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
      </BottomNavigation>*/}
    </div>
  );
}

export default App;
