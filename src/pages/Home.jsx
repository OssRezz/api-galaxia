import React from "react";
import { Col, Image } from "react-bootstrap";

export default function Home() {
  return (
    <Col className="col-12 mt-0  pt-0 d-flex justify-content-center px-0">
      <Image
        src="https://blog.postman.com/wp-content/uploads/2021/08/postman-api-first-world-1200x675-1.png"
        fluid={true}
        style={{ marginTop: "-70px" }}
        loading="lazy"
      />
    </Col>
  );
}
