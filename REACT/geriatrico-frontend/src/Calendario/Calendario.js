import React, { useState } from "react";
import "./Calendario.css"; // Asegúrate de crear un archivo CSS para los estilos

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function Calendario() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const monthName = new Intl.DateTimeFormat("default", { month: "long" }).format(new Date(year, month, 1));

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={() => setMonth(month - 1)}>{"<"}</button>
        <h2>{monthName} {year}</h2>
        <button onClick={() => setMonth(month + 1)}>{">"}</button>
      </div>
      <div className="weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="days">
        {Array.from({ length: firstDayOfMonth }, (_, index) => (
          <div key={`empty-${index}`} className="empty"></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => (
          <div key={`day-${index}`} className="day">
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendario;

