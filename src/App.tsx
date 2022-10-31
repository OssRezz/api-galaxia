import React, { useEffect, useState } from "react";
import { Col, Container, Row, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Examenes from "./pages/Examenes.jsx";
import Capacitaciones from "./pages/Capacitaciones.jsx";
import CapacitacionesById from "./pages/CapacitacionesById";
import Archivo from "./pages/Archivo.jsx";
import Home from "./pages/Home.jsx";
import { SendFill } from "react-bootstrap-icons";

function App() {
  const [urlPath, setUrlPath] = useState("");
  useEffect(() => {
    setPatchFunction(window.location.pathname);
  });

  const setPatchFunction = (value: string) => {
    setUrlPath(value);
  };

  return (
    <BrowserRouter>
      <Container fluid>
        <Row className="mb-4">
          <Col className="col-12">
            <Navbar
              bg="white"
              expand="lg"
              className="shadow-sm p-2 mb-5 bg-white rounded"
            >
              <Navbar.Brand href="#">
                <b>API</b> <SendFill className="text-primary" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link
                    to="/"
                    as={Link}
                    className={urlPath === "/" ? "active text-primary" : ""}
                    onClick={() => setPatchFunction("/")}
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link
                    to="/login"
                    as={Link}
                    className={
                      urlPath === "/login" ? "active text-primary" : ""
                    }
                    onClick={() => setPatchFunction("/login")}
                  >
                    Login
                  </Nav.Link>
                  <NavDropdown title="Capacitaciones" id="basic-nav-dropdown">
                    <NavDropdown.Item>
                      <Nav.Link
                        to="/capacitaciones"
                        as={Link}
                        className={
                          urlPath === "/capacitaciones"
                            ? "active text-primary"
                            : ""
                        }
                        onClick={() => setPatchFunction("/capacitaciones")}
                      >
                        Lista
                      </Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Nav.Link
                        to="/capacitaciones-id"
                        as={Link}
                        className={
                          urlPath === "/capacitaciones-id"
                            ? "active text-primary"
                            : ""
                        }
                        onClick={() => setPatchFunction("/capacitaciones-id")}
                      >
                        By id
                      </Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Nav.Link
                        to="/archivo"
                        as={Link}
                        className={
                          urlPath === "/archivo" ? "active text-primary" : ""
                        }
                        onClick={() => setPatchFunction("/archivo")}
                      >
                        Archivo
                      </Nav.Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link
                    to="/examenes"
                    as={Link}
                    className={
                      urlPath === "/examenes" ? "active text-primary" : ""
                    }
                    onClick={() => setPatchFunction("/examenes")}
                  >
                    Examenes
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/capacitaciones" element={<Capacitaciones />} />
              <Route
                path="/capacitaciones-id"
                element={<CapacitacionesById />}
              />
              <Route path="/archivo" element={<Archivo />} />
              <Route path="/examenes" element={<Examenes />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
