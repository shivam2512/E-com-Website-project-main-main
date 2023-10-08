import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  function contactHandler() {
    navigate("/contact");
  }

  function homeHandler() {
    navigate("/");
  }

  return (
    <>
      <Container className="py-3">
        <h2 className="text-dark text-center mt-2 mb-4">About Us</h2>
        <Row className="gap-4">
          <Col>
            <img
              src="https://images.unsplash.com/photo-1517814761483-6769dab4e9c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
              alt=""
              className="w-100 rounded shadow"
            />
          </Col>
          <Col md={true} className="d-flex align-items-center">
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                pulvinar lectus in lacinia scelerisque. Cras maximus magna eros,
                quis sodales massa interdum ut. Mauris rhoncus nunc eu elit
                mattis aliquet. Mauris gravida interdum ex ac efficitur. Nullam
                molestie leo leo, ac euismod sem suscipit non. Nunc et elit nec
                quam
              </p>
              <Button variant="outline-dark" size="sm" onClick={homeHandler}>
                Home
              </Button>{" "}
              <Button variant="dark" size="sm" onClick={contactHandler}>
                Contact US
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default About;
