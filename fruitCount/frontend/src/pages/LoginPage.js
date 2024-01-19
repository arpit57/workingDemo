import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../forms/LoginForm";
import "../styles/login.scss";
import useMediaQuery from "@mui/material/useMediaQuery";

function LoginPage() {
  const sizeSmall = useMediaQuery("(max-width:992px)");

  return (
    <Container fluid className="login-container">
      <Row className="login-row">
        {!sizeSmall && (
          <Col className="login-left-col">
            <div className="login-left-col-inner-container">
              <img
                src={require("../assets/images/logo.webp")}
                alt="logo"
                width="100%"
              />
              <p>
                <span>"</span>Building world's best computer vision products
                <span>"</span>
              </p>
            </div>
          </Col>
        )}

        <Col className="login-right-col">
          <div className="login-right-col-inner-container">
            {sizeSmall ? (
              <div className="login-conditional-container">
                <img
                  src={require("../assets/images/logo.webp")}
                  alt="logo"
                  width="100%"
                />
                <p>
                  <span>"</span>Building world's best computer vision products
                  <span>"</span>
                </p>
              </div>
            ) : (
              <img src={require("../assets/images/Lock.png")} alt="lock" />
            )}
            <LoginForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
