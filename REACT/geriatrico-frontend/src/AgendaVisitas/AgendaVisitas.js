import React from "react";
import "./AgendaVisitas.css";
import { Container, Row, Col } from "react-bootstrap";


function AgendaVisitas({ visitas }) {

    const renderVisitas = () => {
        if (Array.isArray(visitas)) {
            return visitas.map((vis) => {
                return (
                <h2 className="nombreVisita">
                `Visita de {vis.Nombre}`</h2>
                )
            });
        }
        return null;
    }

    return (
        <div>

            <Row>
                <Col>
                    <div class="Rectangle-9">
                        {renderVisitas()}
                    </div>

                </Col>
                <Col>
                <div class="Rectangle-9">
                        {renderVisitas()}
                    </div>
                </Col>
            </Row>


        </div>
    );
}

export default AgendaVisitas;
