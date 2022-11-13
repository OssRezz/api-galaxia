import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { ListStars, QuestionDiamond, ClipboardFill } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FetchCapacitaciones, { Examen, ExamenByCapacitacion } from "../api/capacitaciones.js";
import CardCapacitaciones from "../components/PrintCapacitaciones.js";
import PreguntasExamen from "../components/PrintExamen.js";
const MySwal = withReactContent(Swal);

export function Examenes() {
  const [capacitacion, setCapacitacion] = useState(null);
  const [intento, setIntento] = useState(null);
  const [res, SetRes] = useState("");
  const [arrayPreguntas, SetArrayPreguntas] = useState("");
  let examen = [];

  useEffect(() => {
    FetchCapacitaciones().then((response) => {
      printCotenido(response);
    });
  }, []);

  window.showExamen = (id) => {
    setCapacitacion(id);
    ExamenByCapacitacion(id, localStorage.getItem("user")).then((response) => {
      if (response.status === 200) {
        SetArrayPreguntas(response.data.preguntas);
        SetRes(response.data.preguntas);
        setIntento(response.data.intento);
        PrintExamen(response.data.preguntas);
        return;
      }

      clean("#lista_preguntas");
      return Swal.fire({
        text: `${response.message}`,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    });
  };

  window.Agregar_Respuesta = (e) => {
    if (Validar_Calificacion(e.name)) {
      return Actualizar_Calificacion(e.name, e.value);
    }
    examen.push({
      id_pregunta: e.name,
      respuesta: e.value,
    });
  };

  const Validar_Calificacion = (res) => {
    let validar = examen.filter((exa) => exa.id_pregunta === res);
    if (validar.length === 0) {
      return false;
    }
    return true;
  };

  const Actualizar_Calificacion = (id_pregunta, respuesta) => {
    var foundIndex = examen.findIndex((x) => x.id_pregunta === id_pregunta);
    examen[foundIndex].respuesta = respuesta;
  };

  const Calificar = () => {
    let numero_preguntas = res.length;
    let numero_respuestas = examen.length;
    if (numero_preguntas === 0 || numero_preguntas !== numero_respuestas) {
      return Swal.fire({
        text: "Debe responder todas las preguntas.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    if (intento === null || capacitacion === null || localStorage.getItem("user") === null) {
      return Swal.fire({
        text: "Error.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    Examen(capacitacion, localStorage.getItem("user"), intento, JSON.stringify(examen)).then((response) => {
      clean("#lista_preguntas");
      examen = [];
      setIntento(null);
      SetArrayPreguntas([]);
      let score = response.data.calificacion;
      return Swal.fire({
        title: "<strong>¡Examen completo!</strong>",
        icon: `${score < 60 ? "error" : "success"}`,
        html: `Respuestas correctas: <b>${response.data.correctas}</b><br>
        Respuestas incorrectas: <b>${response.data.incorrectas}</b> <br>
        Calificacion: <b>${response.data.calificacion}</b> <br>
        `,
        confirmButtonText: "Aceptar",
      });
    });
  };

  const printCotenido = (arrayCap) => {
    if (arrayCap.length === 0) {
      MySwal.fire({
        title: "Token null",
        html: "Inicia sesion para obtener un nuevo token",
        icon: "info",
      });
      return;
    }
    CardCapacitaciones(arrayCap).then((res) => {
      document.querySelector("#response").innerHTML = res;
    });
  };

  const PrintExamen = (preguntasArray) => {
    clean("#lista_preguntas");
    PreguntasExamen(preguntasArray).then((res) => {
      document.querySelector("#lista_preguntas").innerHTML = res;
    });
  };

  function clean(cleanHtml) {
    const aux = document.querySelector(cleanHtml);

    while (aux.firstChild) {
      aux.removeChild(aux.firstChild);
    }
  }

  const objectId = `
  {
    user_id: 1,
  };`;

  const validationObject = `
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
  myHeaders.append("headers", "Content-Type: application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  fetch("https://www.galaxiaseguridadltda.com.co/galaxiacliente/public/api/sanctum/examen/1?user_id=1", requestOptions)
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
  }`;

  return (
    <Row className="d-flex justify-content-center">
      <Col className="col-12 col-lg-6 mb-4">
        <Card className="shadow-sm">
          <Card.Header>
            <ListStars className="text-primary" /> <b>Lista de capacitaciones</b>
          </Card.Header>
          <Card.Body>
            <Row id="response" className="d-flex justify-content-around"></Row>
          </Card.Body>
        </Card>
      </Col>
      <Col className="col-12 col-lg-6 mb-4">
        <Card className="shadow-sm">
          <Card.Header>
            <ClipboardFill className="text-primary" /> <b>Examen de la capacitacion</b>
          </Card.Header>
          <Card.Body>
            <div className="row" id="lista_preguntas"></div>
            <Col className="text-end">
              <Button variant="primary" onClick={() => Calificar()} hidden={arrayPreguntas.length === 0 ? true : false}>
                Calificar
              </Button>
            </Col>
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
                    <b>Url</b>: <div className="mx-1 text-danger">public/api/examen/1?user_id=1</div>
                  </Col>
                  <Col className="col-12 d-flex justify-content-start mb-2">
                    <b>Metodo</b>: <div className="mx-1 text-danger">GET</div>
                  </Col>
                  <Col className="col-12 d-flex justify-content-start">
                    <b>Parámetros</b>:{" "}
                  </Col>
                  <Col className="col-12 mb-2">
                    <pre>
                      <code>{objectId}</code>
                    </pre>
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
