import React, { useState } from 'react';
import './BotonKinesio.css';
import icono from './sort-ascending.svg'; 

function BotonKinesio() {
  return (
    <>
    <div class="Rectangle-27">
    <img className="icon" src={icono} alt="icono"/>
    <span class="-sp-H2-Titillium-Web">
    Kinesiologia
    </span>
    </div>
    </>
    
  );
}

export default BotonKinesio;