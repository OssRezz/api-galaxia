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
                    to="/api-galaxia"
                    as={Link}
                    className={
                      urlPath === "/api-galaxia" ? "active text-primary" : ""
                    }
                    onClick={() => setPatchFunction("/api-galaxia")}
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link
                    to="/api-galaxia/login"
                    as={Link}
                    className={
                      urlPath === "/api-galaxia/login"
                        ? "active text-primary"
                        : ""
                    }
                    onClick={() => setPatchFunction("/api-galaxia/login")}
                  >
                    Login
                  </Nav.Link>
                  <NavDropdown title="Capacitaciones" id="basic-nav-dropdown">
                    <NavDropdown.Item>
                      <Nav.Link
                        to="/api-galaxia/capacitaciones"
                        as={Link}
                        className={
                          urlPath === "/api-galaxia/capacitaciones"
                            ? "active text-primary"
                            : ""
                        }
                        onClick={() =>
                          setPatchFunction("/api-galaxia/capacitaciones")
                        }
                      >
                        Lista
                      </Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Nav.Link
                        to="/api-galaxia/capacitaciones-id"
                        as={Link}
                        className={
                          urlPath === "/api-galaxia/capacitaciones-id"
                            ? "active text-primary"
                            : ""
                        }
                        onClick={() => setPatchFunction("/api-galaxia/capacitaciones-id")}
                      >
                        By id
                      </Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Nav.Link
                        to="/api-galaxia/archivo"
                        as={Link}
                        className={
                          urlPath === "/api-galaxia/archivo" ? "active text-primary" : ""
                        }
                        onClick={() => setPatchFunction("/api-galaxia/archivo")}
                      >
                        Archivo
                      </Nav.Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link
                    to="/api-galaxia/examenes"
                    as={Link}
                    className={
                      urlPath === "/api-galaxia/examenes" ? "active text-primary" : ""
                    }
                    onClick={() => setPatchFunction("/api-galaxia/examenes")}
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
              <Route path="/api-galaxia" element={<Home />} />
              <Route path="/api-galaxia/login" element={<Login />} />
              <Route path="/api-galaxia/capacitaciones" element={<Capacitaciones />} />
              <Route
                path="/api-galaxia/capacitaciones-id"
                element={<CapacitacionesById />}
              />
              <Route path="/api-galaxia/archivo" element={<Archivo />} />
              <Route path="/api-galaxia/examenes" element={<Examenes />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
