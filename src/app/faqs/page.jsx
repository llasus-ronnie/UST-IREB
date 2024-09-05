"use client";
import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

import "../styles/faqs/faqs.css";
// import { Helmet } from "react-helmet";

import { Container, Row, Col, Accordion } from "react-bootstrap";

function FAQs() {
  return (
    <>
      <div className="header">
        <Navbar />
      </div>

      {/* <Helmet>
        <title>FAQs</title>
        <style>{"body { background-color: #ECF0F1; }"}</style>
      </Helmet> */}

      <div style={{ paddingTop: "2em" }} className="faqheader">
        <h1 className="text-center">Frequently Asked Questions</h1>
      </div>

      <Row className="faqdivider" />

      <Container>
        <Accordion style={{ paddingTop: "2em" }}>
          <Accordion.Item eventKey="0">
            <Accordion.Header className="accheader">
              What is the UST Research Ethics Online System?
            </Accordion.Header>
            <Accordion.Body className="accbody">
              The UST Research Ethics Online System is a platform that allows
              researchers to submit their research proposals and have them
              reviewed by the UST Research Ethics Committee.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header className="accheader">
              Question 2
            </Accordion.Header>
            <Accordion.Body className="accbody">
              The UST Research Ethics Online System is a platform that allows
              researchers to submit their research proposals and have them
              reviewed by the UST Research Ethics Committee.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header className="accheader">
              Question 3
            </Accordion.Header>
            <Accordion.Body className="accbody">
              The UST Research Ethics Online System is a platform that allows
              researchers to submit their research proposals and have them
              reviewed by the UST Research Ethics Committee.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
}

export default FAQs;
