import React from "react";
import { Container, Row } from "react-bootstrap";
import "../../styles/signin/SignInOption.css";

function SignInFooter() {
  return (
    <Container className="signin-footer">
      <Row>
        <a href="/home">
          <img src="/images/signin/home.png" alt="home" className="home-icon" />
          Return to Home
        </a>
      </Row>
    </Container>
  );
}

export default SignInFooter;
