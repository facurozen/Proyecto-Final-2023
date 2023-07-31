import React from "react";
import "./Fecha.css";

function Fecha({ fechasRelevantes }) {
  if (Array.isArray(fechasRelevantes)) {
    return fechasRelevantes.map((fr) => {
      const fecha = new Date(fr.Fecha);
      const dia = fecha.getUTCDate();

      // Obtener la hora a partir de la cadena en formato "HH:mm:ss"
      const horaString = fr.Hora; // Supongamos que fr.Hora es una cadena como "2023-07-31T14:30:00"
      const hora = new Date(horaString).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (hora === "00:00") {
        hora = "Todo el dia";
      }

      return (
        <div className="fecha-cuadrado" key={fr.id}>
          <p>{dia}</p>
          <p>{fr.Texto}</p>
          <p>{hora}</p>
          {/* Aplicar estilos para cambiar el tamaño de la imagen */}
          <img src={fr.Imagen} alt="Imagen" style={{ height: "20px", width: "20px" }} />
        </div>
      );
    });
  }
}

export default Fecha;
