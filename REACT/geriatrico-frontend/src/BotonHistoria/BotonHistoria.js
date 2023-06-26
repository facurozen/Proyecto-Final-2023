import React from 'react';
import './BotonHistoria.css';
import HealthCross from './health-cross.svg'; 

function BotonHistoria() {
  return (
    <div className="Rectangle-27 ">
      <img className="icon" src={HealthCross} alt="Health Cross" />
      <span className="-sp-H2-Titillium-Web">Historia Clinica</span>
    </div>
  );
}

export default BotonHistoria;
