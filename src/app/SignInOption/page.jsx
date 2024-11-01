"use client";

import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import Head from "next/head";
import SignInFooter from "../components/siginin/SignInFooter";

//css
import "../styles/signin/SignInOption.css";

function SignInOption() {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      <div className="signin-wrapper">
        <Container className="signin-container">
          <Row>
            <Col md={4} className="p-0 left-column">
              <img
                src="/images/signin/bg-2.png"
                alt="bg2"
                className="signin-background"
              />
            </Col>
            <Col md={8} className="p-0 right-column">
              <Container className="signin-header">
                <img
                  src="/images/signin/USTLogo.png"
                  alt="logo"
                  className="signin-logo"
                />
                <h1 className="d-inline">
                  UST IREB <b> Research Portal </b>
                </h1>
              </Container>

              <Container className="signin-title">
                <h1>Sign In</h1>
                <p>Kindly select your category to login.</p>
              </Container>

              <Container className="signin-options">
                <a href="../PrincipalInvestigator/SignInThomasian">
                  <Button className="signin-option">
                    Thomasian <br /> Principal Investigator
                  </Button>
                </a>

                <a href="../PrincipalInvestigator/SignInExternal">
                  <Button className="signin-option">
                    External <br /> Principal Investigator
                  </Button>
                </a>
              </Container>

              <Row className="signin-hr">
                <hr />
                <SignInFooter />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SignInOption;
