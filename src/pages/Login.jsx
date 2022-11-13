import React, { useState } from "react";
import { Row, Col, Card, Button, Form, Accordion, ListGroup } from "react-bootstrap";
import { CodeSquare, DoorOpen, ArrowRightCircle, QuestionDiamond } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export function Login() {
  const [auth, setAuth] = useState({
    identification: "",
    password: "",
  });

  const [res, SetRes] = useState("");

  const IniciarSesion = () => {
    if (auth.identification == "" || auth.password == "") {
      MySwal.fire({
        title: "Validation error",
        html: "The user id and the password are required",
        icon: "error",
      });
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `https://www.galaxiaseguridadltda.com.co/galaxiacliente/public/api/login?identification=${parseInt(auth.identification)}&password=${
        auth.password
      }`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.usuario.id);
        SetRes(data);
      });
  };

  const handleState = (name, value) => {
    setAuth({ ...auth, [name]: value });
  };

  const objectId = `
  {
    identification: 1036957215,
    password: 1234,
  };`;

  const validationObject = `
  {
    "status": 404,
    "message": "Errores de validación",
    "errors": {
        "identification": [
            "El campo identification es requerido"
        ],
        "password": [
            "El campo password es requerido"
        ]
    }
  }`;

  const passwordError = `
  {
    "status": 404,
    "message": "Errores de validación",
    "errors": {
        "password": [
            "El campo password es requerido"
        ]
    }
  }`;

  const loginJson = `
  {
    "status": 200,
    "message": "Login exitoso.",
    "token": "3|Sg9UGFUhkuZVcFNVRLYla3ln1znxmOs0nbwBUfcZ",
    "usuario": {
        "id": 1,
        "name": "James Osorio Florez",
        "identification": "1036957215",
        "email": "OssRezz.13@gmail.com",
        "sede": 2,
        "cargo": null
    }
  }`;
  return (
    <Row className="d-flex align-items-center justify-content-center">
      <Col className="col-12 col-lg-4 mb-4">
        <Card className="shadow-sm">
          <Card.Header>
            <DoorOpen className="text-primary" /> <b>Login form</b>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Identification</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter identification"
                  onChange={(e) => handleState("identification", e.target.value)}
                  value={auth.identification}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => handleState("password", e.target.value)}
                  value={auth.password}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col className="col-12 col-lg-1 d-flex justify-content-center align-items-center mb-4">
        <Button variant="outline-primary" onClick={(e) => IniciarSesion()} className="border-0">
          <ArrowRightCircle size={40} />
        </Button>
      </Col>
      <Col className="col-12 col-lg-7 mb-4">
        <Card className="shadow-sm">
          <Card.Header>
            <CodeSquare className="text-primary" /> <b>Response</b>
          </Card.Header>
          <Card.Body className="d-flex justify-content-center">
            <Row>
              <pre>{JSON.stringify(res == "" ? "Press the button to make a request." : res, null, 2)}</pre>
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
              <Col className="col-12 d-flex justify-content-start mb-2">
                <b>Url</b>: <div className="mx-1 text-danger">public/api/login</div>
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
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <b>Si los parámetros no existen o no tiene informacion</b>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ListGroup>
                        <ListGroup.Item>
                          <b>status</b>: estado de la petición, en este caso de uso 404.
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <b>Message</b>: Errores de validación.
                        </ListGroup.Item>
                      </ListGroup>
                      <Col>
                        <pre>{validationObject}</pre>
                      </Col>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <b>Si el número de identificación no existe</b>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ListGroup>
                        <ListGroup.Item>
                          <b>status</b>: estado de la petición, en este caso de uso 404. No se encontró el recurso
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <b>message</b>: Mensaje de respuesta. En este caso nos dice que no existe el usuario.
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <b>errors</b>: Campos que tienen errores en la información
                        </ListGroup.Item>
                      </ListGroup>
                      <Col>
                        <pre>{passwordError}</pre>
                      </Col>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      <b>Si la contraseña es incorrecta</b>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ListGroup>
                        <ListGroup.Item>
                          <b>status</b>: estado de la petición, en este caso de uso 404. No se encontró el recurso
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <b>message</b>: Mensaje de respuesta. En este caso nos dice que la password es incorrecta.
                        </ListGroup.Item>
                      </ListGroup>
                      <Col>
                        <pre>{passwordError}</pre>
                      </Col>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                      <b>Si todo es correcto</b>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ListGroup>
                        <ListGroup.Item>
                          <b>status</b>: Estado de la petición, en ese caso de uso 200, Todo Ok.
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <b>message</b>: Estado de la petición, en ese caso de uso 200, Todo Ok
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <b>token</b>: Token de autorización al sistema
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <b>usuario</b>: Datos del usuario autenticado
                        </ListGroup.Item>
                      </ListGroup>
                      <Col>
                        <pre>{loginJson}</pre>
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

export default Login;
