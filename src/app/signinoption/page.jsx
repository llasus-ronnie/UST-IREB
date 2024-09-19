"use client";
//css
import "../styles/signin/SignInOption.css";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Col, Row, Button } from "react-bootstrap";
import Head from "next/head";
import SignInFooter from "../components/siginin/SignInFooter";

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
                <Link href="../PrimaryInvestigator/SignInThomasian" passHref>
                  <Button className="signin-option">
                    Thomasian <br /> Primary Investigator
                  </Button>
                </Link>

                <Link href="../PrimaryInvestigator/SignInExternal" passHref>
                  <Button className="signin-option">
                    External <br /> Primary Investigator
                  </Button>
                </Link>
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
