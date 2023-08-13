import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "../Home/Home";
import Perfil from "../Perfil/Perfil";
import AgendaVisitas from "../AgendaVisitas/AgendaVisitas";
import Calendario from "../Calendario/Calendario";
import NavBar from "../NavBar/NavBar";

function App() {
  const [medicamentoATomar, setMedicamentosATomar] = useState([]);
  const [historiaClinica, sethistoriaClinica] = useState([]);
  const [informe, setInforme] = useState([]);
  const [kinesiologia, setKinesiologia] = useState([]);
  const [fechasRelevantes, setFechasRelevantes] = useState([]);
  const [visitas, setVisitas] = useState([]);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const obtenerMedicamentosATomar = async () => {
      const url = "http://localhost:5000/MedicamentoATomar/1";
      const result = await axios.get(url);
      setMedicamentosATomar(result.data);
    };
    obtenerMedicamentosATomar();
  }, []);

  useEffect(() => {
    const obtenerHistoria = async () => {
      const url = "http://localhost:5000/HistoriaClinica/1";
      axios.get(url).then((res) => {
        sethistoriaClinica(res.data);
      });
    };
    obtenerHistoria();
  }, []);

  useEffect(() => {
    const obtenerInforme = async () => {
      const url = "http://localhost:5000/Informe/1";
      axios.get(url).then((res) => {
        setInforme(res.data);
      });
    };
    obtenerInforme();
  }, []);

  useEffect(() => {
    const obtenerKinesiologia = async () => {
      const url = "http://localhost:5000/Kinesiologia/1";
      axios.get(url).then((res) => {
        setKinesiologia(res.data);
      });
    };
    obtenerKinesiologia();
  }, []);

  useEffect(() => {
    const obtenerFechasRelevantes = async () => {
      const url = "http://localhost:5000/FechasRelevantes";
      axios.get(url).then((res) => {
        setFechasRelevantes(res.data);
      });
    };
    obtenerFechasRelevantes();
  }, []);

  useEffect(() => {
    const obtenerVisitas = async () => {
      const url = "http://localhost:5000/Visitas";
      axios.get(url).then((res) => {
        setVisitas(res.data);
      });
    };
    obtenerVisitas();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/perfil"
            element={
              <Perfil
                informe={informe}
                medicamentoATomar={medicamentoATomar}
                historiaClinica={historiaClinica}
                kinesiologia={kinesiologia}
              />
            }
          />
          <Route
            path="/"
            element={<Home fechasRelevantes={fechasRelevantes} />}
          />
          <Route
            path="/agendaVisitas"
            element={<AgendaVisitas visitas={visitas} />}
          />
          <Route path="/calendario" element={<Calendario />} />
        </Routes>
        <NavBar /> {/* Agrega el NavBar abajo de todo */}
      </BrowserRouter>
    </div>
    
  );
}

export default App;
