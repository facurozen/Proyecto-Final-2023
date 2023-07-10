import React, { useState } from 'react';
import './Perfil.css';
import '../App/App.css';
import logoPersona from '../images/jose.jpeg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BotonInforme from '../BotonInforme/BotonInforme';
import BotonMedicamentos from '../BotonMedicamentos/BotonMediamentos';
import BotonHistoria from '../BotonHistoria/BotonHistoria';
import BotonKinesio from '../BotonKinesio/BotonKinesio';

function Perfil({informe, medicamentoATomar, historiaClinica, kinesiologia }) {
    <> 
    <div className="square">
        <img src={logoPersona} alt="Foto de perfil" className="profile-image" />
        <div className="name">José Lopez</div>
      </div>

      <div className="Rounded-Rectangle">
        <div class="SegmentedPicker">
          <div class="_SegmentedPicker-option2">
            <span class="Informe">
              Informe
            </span>
          </div>
          <div class="_SegmentedPicker-option">
            <span class="Actividades">
              Actividades
            </span>
          </div>
          
        </div>
        <div className="SeguimientoSemanal" >
          <span>
            Seguimiento semanal
          </span>
        </div>

        <Row>
          <Col><BotonInforme informe={informe} /></Col>
          <Col><BotonMedicamentos medicamentoATomar={medicamentoATomar} /></Col>
        </Row>
        <Row>
          <Col><BotonHistoria historiaClinica={historiaClinica} /></Col>
          <Col><BotonKinesio kinesiologia={kinesiologia} /></Col>
        </Row>
      </div>

</>
}
export default Perfil;