import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { CodeSquare, DoorOpen, ArrowRightCircle } from "react-bootstrap-icons";

export function Capacitaciones() {
  const [res, SetRes] = useState([]);

  useEffect(() => {
    fetchCapacitaciones();
  }, []);

  const LoadResponse = () => {
    printCotenido();
  };
  const fetchCapacitaciones = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(
      `http://localhost/galaxiacliente/public/api/sanctum/capacitaciones`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        SetRes(data.capacitaciones);
      })
      .catch((error) => console.log("error", error));
  };

  const htmltoprint = `
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer ${localStorage.getItem("token")}"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  fetch("http://localhost/galaxiacliente/public/api/sanctum/capacitaciones", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log("error", error));
  `;

  const printCotenido = () => {
    console.log(res);
    let ht = "";
    res.forEach((capacitacion) => {
      const { nombre } = capacitacion;
      ht += `
     <div class="col-12 col-md-6 col-lg-12 m-2">
        <div class="tecnologies card shadow-sm rounded bg-white">
          <div class="card-body text-center">
            <b>${nombre}</b>
          </div>
        </div>     
     </div>
      `;
    });
    document.querySelector("#response").innerHTML = ht;
  };
  return (
    <Row className="">
      <Col className="col-12 col-lg-8 mb-4">
        <Card className="shadow-sm">
          <Card.Header>
            <Row>
              <Col>
                <DoorOpen className="text-primary" /> <b>Fetch JavaScript</b>
              </Col>
              <Col className="text-end">
                <Button
                  variant="outline-primary"
                  onClick={(e) => LoadResponse()}
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
      <Col className="col-12 col-lg-4 mb-4">
        <Card className="border-0 bg-trnsparent">
          <Card.Header className="shadow-sm border bg-white rounded">
            <CodeSquare className="text-primary" /> <b>Response</b>
          </Card.Header>
          <Card.Body className="bg-light">
            <Row id="response" className="d-flex justify-content-around"></Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Capacitaciones;
