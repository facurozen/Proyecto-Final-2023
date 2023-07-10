import React, { useState } from 'react';
import './Home.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Home() {
    return (
        <>
            <span class="Fechas-relevantes">
                Fechas relevantes
            </span>
        <Row>
          <Col>
          <div class="Rectangle-63"> </div>
          </Col>
          <Col>
          <div class="Rectangle-64"> </div>
          </Col>
        </Row>
        <Row>
        <Col>
          <div class="Rectangle-65"> </div>
          </Col>
          <Col>
          <div class="Rectangle-66"> </div>
          </Col>
        </Row>
        </>
    );
}
export default Home;