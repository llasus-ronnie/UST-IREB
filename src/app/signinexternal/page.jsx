"use client";

import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  FormLabel,
  Button,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import bg from "../../../public/images/signin/bg.png";
import USTLogo from "../../../public/images/signin/USTLogo.png";
import "../styles/signin/SignIn.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";

function SignIn() {
  return (
    <div className="thomasian-cont">
      <Helmet>
        <title>Sign In</title>
        <style>{"body { background-color: #ECF0F1; }"}</style>
      </Helmet>

      <Container>
        <Row className="thomasian-cont-border g-0">
          <Col>
            <Image src={bg} alt="" className="thomasian-bg" />
          </Col>
          <Col className="thomasian-SignInHeader">
            <div className="thomasian-Sign">
              <Image src={USTLogo} alt="" className="thomasian-logo" />
              <h1 className="d-inline">
                <b>UST IREB</b> Research Portal
              </h1>
            </div>

            <h1 className="thomasian-signin">Sign In</h1>

            <Form>
              <FormGroup>
                <div className="thomasian-formtext">
                  <FormLabel>Email</FormLabel>
                  <input type="text" className="form-control" />
                  <FormLabel>Password</FormLabel>
                  <input type="password" className="form-control" />
                </div>

                <Row className="align-items-center">
                  <Col>
                    <div className="thomasian-captchasign-container">
                      <ReCAPTCHA
                        className="thomasian-captchasign"
                        sitekey="6LfgAgkqAAAAAC_WvkqfnkIF-NUvwHnVOPyDkD2G"
                        size="normal"
                      />
                    </div>
                  </Col>
                  <Col>
                    <Button
                      variant="outline-warning"
                      href="/"
                      className="thomasian-btnlogin"
                    >
                      Log In
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
            </Form>

            <hr></hr>

            <div className="thomasian-help">
              <p className="d-inline" style={{ margin: "5px" }}>
                <a href="#" style={{ color: "#8B8B8B" }}>
                  Terms of Service
                </a>
              </p>
              <p className="d-inline" style={{ margin: "5px" }}>
                <a href="#" style={{ color: "#8B8B8B" }}>
                  Privacy Policy
                </a>
              </p>
              <p className="d-inline" style={{ margin: "5px" }}>
                <a href="#" style={{ color: "#8B8B8B" }}>
                  Help
                </a>
              </p>
              <p className="d-inline" style={{ margin: "5px" }}>
                <a href="/" style={{ color: "#FCBF15" }}>
                  Return to Home
                </a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignIn;
