import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, ListGroup, Accordion } from "react-bootstrap";
import {
  CodeSquare,
  DoorOpen,
  ArrowRightCircle,
  QuestionDiamond,
} from "react-bootstrap-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const htmltoprint = `const myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer ${localStorage.getItem("token")}"
);
myHeaders.append("headers", "Content-Type: application/pdf");
const requestOptions = {
  method: "POST",
  headers: myHeaders,
};

fetch(
  "https://www.galaxiaseguridadltda.com.co/galaxiacliente/public/api/sanctum/capacitaciones/download?capacitacion_id=1&archivo_nombre=10312022012543-1.pdf",
  requestOptions
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.log("error", error));`;
const objectId = `{
    capacitacion_id : 1,
    archivo_nombre :"10282022095747-2.pdf"
}`;
export function Archivo() {
  const [pdf, SetPdf] = useState("");
  useEffect(() => {
    ValidatedToken();
  });

  const ValidatedToken = () => {
    if (localStorage.getItem("token") == null) {
      return MySwal.fire({
        title: "Token null",
        html: "Inicia sesion para obtener un nuevo token",
        icon: "info",
      });
    }
  };

  const getPdf = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
    myHeaders.append("headers", "Content-Type: application/pdf");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
    };

    fetch(
      "https://www.galaxiaseguridadltda.com.co/galaxiacliente/public/api/sanctum/capacitaciones/download?capacitacion_id=1&archivo_nombre=10312022012543-1.pdf",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        SetPdf(data.data);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Row className="">
      <Col className="col-12 mb-4">
        <Card className="shadow-sm">
          <Card.Header>
            <Row>
              <Col>
                <DoorOpen className="text-primary" /> <b>Fetch JavaScript</b>
              </Col>
              <Col className="text-end">
                <Button
                  variant="outline-primary"
                  onClick={(e) => getPdf()}
                  className="btn-sm"
                >
                  Probar <ArrowRightCircle size={20} />
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <pre>{htmltoprint}</pre>
          </Card.Body>
        </Card>
      </Col>
      <Col className="col-12  mb-4">
        <Card>
          <Card.Header>
            <CodeSquare className="text-primary" /> <b>Response</b>
          </Card.Header>
          <Card.Body className="d-flex justify-content-center">
            <iframe
              width="70%"
              src={`data:application/pdf;base64,${pdf}`}
              type="application/pdf"
              frameBorder="1"
              style={{ height: "100vh" }}
            ></iframe>
          </Card.Body>
        </Card>
      </Col>
      <Col className="col-12 mb-4">
        <Card className="shadow-sm">
          <Card.Header>
            <QuestionDiamond className="text-primary" /> <b>Guia de uso</b>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col className="col-12 d-flex justify-content-start mb-2">
                <b>Url</b>:{" "}
                <div className="mx-1 text-danger">
                  /public/api/sanctum/capacitaciones/download
                </div>
              </Col>
              <Col className="col-12 d-flex justify-content-start mb-2">
                <b>Metodo</b>: <div className="mx-1 text-danger">POST</div>
              </Col>
              <Col className="col-12 d-flex justify-content-start">
                <b>Parámetros</b>:{" "}
              </Col>
              <Col className="col-12 mb-2">
                <pre>{objectId}</pre>
              </Col>
              <Card.Title>Casos de uso</Card.Title>
              <Col>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <b>Si todo es correcto</b>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ListGroup className="mb-3">
                        <ListGroup.Item>
                          <b>status</b>: Estado de la petición, en ese caso de
                          uso 200, Todo Ok.
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <b>message</b>: Mensaje de la peticion
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <b>data</b>: pdf en formato base64
                        </ListGroup.Item>
                      </ListGroup>
                      <Col className="text-primary">
                        <pre>
                          src="
                          {`data:application/pdf;base64,base64_response_data`}"
                        </pre>
                      </Col>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Archivo;
