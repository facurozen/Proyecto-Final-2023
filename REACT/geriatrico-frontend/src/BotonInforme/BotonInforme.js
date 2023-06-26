import React, { useState } from 'react';
import './BotonInforme.css';
import notas from './notes.svg'; 

function BotonInforme() {
  return (
    <>
      <div class="Rectangle-27">
      <img className="icon" src={notas} alt="notas"/>
        <span class="-sp-H2-Titillium-Web">
          Informe
        </span>
      </div>
    </>

  );
}

export default BotonInforme;
