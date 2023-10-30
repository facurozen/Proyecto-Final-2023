import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FechasRelevantes() {
  const [fechasRelevantes, setFechasRelevantes] = useState([]);
  const [nuevaFecha, setNuevaFecha] = useState({
    Fecha: '',
    Texto: '',
    Hora: '',
    Imagen: '',
    Info: '',
  });

  useEffect(() => {
    const obtenerFechasRelevantes = async () => {
      const url = "http://localhost:5000/FechasRelevantes";
      axios.get(url).then((res) => {
        setFechasRelevantes(res.data);
      });
    };
    obtenerFechasRelevantes();
  }, []);

  const agregarFechaRelevante = () => {
    // Verifica que los campos requeridos estén llenos
    if (nuevaFecha.Fecha && nuevaFecha.Texto && nuevaFecha.Hora && nuevaFecha.Imagen) {
      // Envía la nueva fecha al servidor y, después de la confirmación exitosa, agrega la fecha a la lista
      const url = "http://localhost:5000/NuevoFechasRelevantes";
      axios.post(url, nuevaFecha).then((res) => {
        if (res.status === 200) {
          setFechasRelevantes([...fechasRelevantes, { Id: res.data.Id, ...nuevaFecha }]);
          // Reinicia los campos del formulario
          setNuevaFecha({
            Fecha: '',
            Texto: '',
            Hora: '',
            Imagen: '',
            Info: '',
          });
        }
      });
    }
  };

  const eliminarFechaRelevante = (id) => {
    // Envía la solicitud para eliminar la fecha al servidor y, después de la confirmación exitosa, quítala de la lista
    const url = `http://localhost:5000/EliminarFechasRelevantes/${id}`;
    axios.delete(url).then((res) => {
      if (res.status === 200) {
        setFechasRelevantes(fechasRelevantes.filter((fecha) => fecha.Id !== id));
      }
    });
  };

  return (
    <div>
      <h2>Fechas Relevantes</h2>
      <ul>
        {fechasRelevantes.map((item) => (
          <li key={item.Id}>
            {item.Texto}
            <button onClick={() => eliminarFechaRelevante(item.Id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div>
        <form>
          <input
            type="date"
            value={nuevaFecha.Fecha}
            onChange={(e) => setNuevaFecha({ ...nuevaFecha, Fecha: e.target.value })}
            required
          />
          <input
            type="text"
            value={nuevaFecha.Texto}
            onChange={(e) => setNuevaFecha({ ...nuevaFecha, Texto: e.target.value })}
            placeholder="Texto"
            required
          />
          <input
            type="time"
            value={nuevaFecha.Hora}
            onChange={(e) => setNuevaFecha({ ...nuevaFecha, Hora: e.target.value })}
            required
          />
          <input
            type="url"
            value={nuevaFecha.Imagen}
            onChange={(e) => setNuevaFecha({ ...nuevaFecha, Imagen: e.target.value })}
            placeholder="URL de la Imagen"
            required
          />
          <input
            type="text"
            value={nuevaFecha.Info}
            onChange={(e) => setNuevaFecha({ ...nuevaFecha, Info: e.target.value })}
            placeholder="Información Adicional"
          />
          <button type="button" onClick={agregarFechaRelevante}>Agregar Fecha</button>
        </form>
      </div>
    </div>
  );
}

export default FechasRelevantes;
