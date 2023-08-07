import React from "react";
import "./Fecha.css";

function Fecha({ fechasRelevantes }) {
  if (Array.isArray(fechasRelevantes)) {
    return (
      <div className="fecha-container">
        {fechasRelevantes.map((fr) => {
          const fecha = new Date(fr.Fecha);
          const dia = fecha.getUTCDate();

          let horaString = fr.Hora; 
          let hora = new Date(horaString).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          if (hora === "00:00") {
            hora = "Todo el dia";
          }

          return (
            <div className="fecha-cuadrado" key={fr.id}>
              <p className="fecha-dia">{dia}</p>
              <p className="fecha-texto">{fr.Texto}</p>
              <p className="fecha-hora">{hora}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Fecha;
