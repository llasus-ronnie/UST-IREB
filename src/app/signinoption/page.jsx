"use client";

import Link from 'next/link';
import { Button } from "react-bootstrap";
import Image from 'next/image';
import { Container, Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import bg2 from "../../../public/images/signin/bg.png";
import USTLogo from "../../../public/images/signin/USTLogo.png";
import "../styles/signin/SignInOption.css";
import "bootstrap/dist/css/bootstrap.min.css";

function SignInOption() {
  return (
    <>
      <Helmet>
        <title>Sign In</title>
        <style>{"body { background-color: #ECF0F1; }"}</style>
      </Helmet>

      <div className="signin-wrapper">
        <Container className="signin-container">
          <Row>
            <Col md={4} className="p-0 left-column">
              <Image src={bg2} alt="bg2" className="signin-background" />
            </Col>
            <Col md={8} className="p-0 right-column">
              <Container className="signin-header">
                <Image src={USTLogo} alt="logo" className="signin-logo" />
                <h1 className="d-inline">
                  UST IREB <b> Research Portal </b>
                </h1>
              </Container>

              <Container className="signin-title">
                <h1>Sign In</h1>
                <p>Kindly select your category to login.</p>
              </Container>

              <Container className="signin-options">
                <Link href="/signin" passHref>
                  <Button className="signin-option">
                    Thomasian <br /> Primary Investigator
                  </Button>
                </Link>

                <Link href="/signinexternal">
                <Button className="signin-option">
                  External <br /> Primary Investigator
                </Button>
                </Link>
              </Container>

              <Row className="signin-hr">
                <hr />
              </Row>

              <Container className="signin-footer">
                <Row>
                  {/* <a href="/">
                    <Image src={home} alt="home" className="home-icon" />
                    Return to Home
                  </a> */}
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SignInOption;
