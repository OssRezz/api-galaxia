import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Accordion,
  ListGroup,
} from "react-bootstrap";
import {
  CodeSquare,
  DoorOpen,
  ArrowRightCircle,
  QuestionDiamond,
} from "react-bootstrap-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export function Examenes() {
  const [capacitacion, setCapacitacion] = useState({
    capacitacion_id: "",
  });

  const [res, SetRes] = useState("");

  const Peticion = () => {
    if (capacitacion.capacitacion_id == "") {
      MySwal.fire({
        title: "Validation error",
        html: "El id de la capacitacion es requerido",
        icon: "error",
      });
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("headers", "Content-Type: application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(
      `https://www.galaxiaseguridadltda.com.co/galaxiacliente/public/api/sanctum/examen/${capacitacion.capacitacion_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        SetRes(data);
      });
  };

  const handleState = (name, value) => {
    setCapacitacion({ ...capacitacion, [name]: value });
  };

  const objectId = `
  {
    capacitacion_id: 1,
  };`;

  const validationObject = `
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer 19|3e5UNlcYc2GJcbwCRm0LWlOJDxw7vgIluM16kSci"
  );
  myHeaders.append("headers", "Content-Type: application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  fetch(
    "https://www.galaxiaseguridadltda.com.co/galaxiacliente/public/api/sanctum/examen/1",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      SetRes(data);
    });
  }`;

  return (
    <Row className="d-flex align-items-center justify-content-center">
      <Col className="col-12 col-lg-4 mb-4">
        <Card className="shadow-sm">
          <Card.Header>
            <Row className="d-flex justify-content-around align-items-center">
              <Col>
                <DoorOpen className="text-primary" />{" "}
                <b>Examen de la capacitacion</b>
              </Col>
              <Col className="text-end">
                <Button
                  variant="outline-primary"
                  onClick={(e) => Peticion()}
                  className="border-0"
                >
                  <ArrowRightCircle size={40} />
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Id de la capacitacion</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Id de la capacitacion"
                  onChange={(e) =>
                    handleState("capacitacion_id", e.target.value)
                  }
                  value={capacitacion.capacitacion_id}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>

      <Col className="col-12 mb-4">
        <Card className="shadow-sm">
          <Card.Header>
            <CodeSquare className="text-primary" /> <b>Response</b>
          </Card.Header>
          <Card.Body className="d-flex justify-content-center">
            <Row style={{ wordWrap: "break-word" }}>
              <pre>
                {JSON.stringify(
                  res == "" ? "Press the button to make a request." : res,
                  null,
                  2
                )}
              </pre>
            </Row>
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
              <Row className="d-flex align-items-center">
                <Col className="col-12 col-lg-6">
                  <Col className="col-12 d-flex justify-content-start mb-2 ">
                    <b>Url</b>:{" "}
                    <div className="mx-1 text-danger">public/api/examen/1</div>
                  </Col>
                  <Col className="col-12 d-flex justify-content-start mb-2">
                    <b>Metodo</b>: <div className="mx-1 text-danger">GET</div>
                  </Col>
                  <Col className="col-12 d-flex justify-content-start">
                    <b>Parámetros</b>:{" "}
                  </Col>
                  <Col className="col-12 mb-2">
                    <pre>{objectId}</pre>
                  </Col>
                </Col>
                <Col className="col-12 col-lg-6">
                  <em>
                    <b>Fetch JavaScript</b>
                  </em>
                  <pre>{validationObject}</pre>
                </Col>
              </Row>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Examenes;
