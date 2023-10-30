// MenuSemanal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MenuSemanal() {
  const [menuSemanal, setMenuSemanal] = useState([]);
/*
  useEffect(() => {
    axios.get('/menu-semanal')
      .then(response => setMenuSemanal(response.data))
      .catch(error => console.error(error));
  }, []);
*/
  return (
    <div>
      <h2>Menú Semanal</h2>
      <ul>
        {menuSemanal.map(item => (
          <li key={item.Id}>{item.NombrePlato}</li>
        ))}
      </ul>
      {/* Agrega botones o funcionalidad para agregar, eliminar o modificar elementos del menú */}
    </div>
  );
}

export default MenuSemanal;
