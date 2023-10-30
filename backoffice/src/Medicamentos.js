import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [nuevoMedicamento, setNuevoMedicamento] = useState('');
  const [medicamentoModificado, setMedicamentoModificado] = useState(null);

  const obtenerMedicamentos = async () => {
    const url = "http://localhost:5000/Medicamentos";
    const result = await axios.get(url);
    setMedicamentos(result.data);
  };

  useEffect(() => {
    obtenerMedicamentos();
  }, []);

  const agregarMedicamento = async () => {
    if (nuevoMedicamento) {
      const url = "http://localhost:5000/NuevoMedicamento";
      await axios.post(url, { NombreMedicamento: nuevoMedicamento });
      obtenerMedicamentos(); // Actualiza la lista después de agregar un medicamento
      setNuevoMedicamento('');
    }
  };

  const eliminarMedicamento = async (idMedicamento) => {
    const url = `http://localhost:5000/EliminarMedicamento/${idMedicamento}`;
    await axios.delete(url);
    obtenerMedicamentos(); // Actualiza la lista después de eliminar un medicamento
  };

  const modificarMedicamento = async () => {
    if (medicamentoModificado) {
      const url = `http://localhost:5000/EditarMedicamento/${medicamentoModificado.IdMedicamento}`;
      await axios.put(url, { NombreMedicamento: medicamentoModificado.NombreMedicamento });
      obtenerMedicamentos(); // Actualiza la lista después de modificar un medicamento
      setMedicamentoModificado(null);
    }
  };

  return (
    <div>
      <h2>Medicamentos</h2>
      <ul>
        {medicamentos.map(medicamento => (
          <li key={medicamento.IdMedicamento}>
            {medicamentoModificado && medicamentoModificado.IdMedicamento === medicamento.IdMedicamento ? (
              <input
                type="text"
                value={medicamentoModificado.NombreMedicamento}
                onChange={(e) => setMedicamentoModificado({ ...medicamentoModificado, NombreMedicamento: e.target.value })}
              />
            ) : (
              medicamento.NombreMedicamento
            )}
            <button onClick={() => setMedicamentoModificado(medicamento)}>Editar</button>
            <button onClick={() => eliminarMedicamento(medicamento.IdMedicamento)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={nuevoMedicamento}
          onChange={(e) => setNuevoMedicamento(e.target.value)}
          placeholder="Nuevo Medicamento"
        />
        <button onClick={agregarMedicamento}>Agregar Medicamento</button>
        {medicamentoModificado && (
          <button onClick={modificarMedicamento}>Guardar Cambios</button>
        )}
      </div>
    </div>
  );
}

export default Medicamentos;
