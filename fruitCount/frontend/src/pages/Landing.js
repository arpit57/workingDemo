import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/landing.scss";
import LoginForm from "../forms/LoginForm";
import LockIcon from "@mui/icons-material/Lock";
import { IconButton } from "@mui/material";

function Landing() {
  return (
    <Container fluid className="landing">
      <Row>
        <Col md={6} className="login-left-col">
          <div className="login-left-col-inner-container">
            <img
              src={require("../assets/images/login/logo.png")}
              alt="logo"
              width={200}
            />
            <p>
              <span>"</span>
              Building world's best computer vision products<span>"</span>
            </p>
          </div>
        </Col>
        <Col className="login-right-col">
          <div className="login-form-container">
            <IconButton sx={{ border: "1px solid #000", padding: "10px" }}>
              <LockIcon sx={{ width: "50px", height: "50px" }} />
            </IconButton>
            <LoginForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Landing;
