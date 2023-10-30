// Actividades.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Actividades() {
  const [actividades, setActividades] = useState([]);
/*
  useEffect(() => {
    // Realiza una solicitud al servidor para obtener las actividades
    axios.get('/actividades')
      .then(response => setActividades(response.data))
      .catch(error => console.error(error));
  }, []);*/

  return (
    <div>
      <h2>Actividades</h2>
      <ul>
        {actividades.map(actividad => (
          <li key={actividad.Id}>{actividad.Nombre}</li>
        ))}
      </ul>
      {/* Agrega botones o funcionalidad para agregar, eliminar o modificar actividades */}
    </div>
  );
}

export default Actividades;
