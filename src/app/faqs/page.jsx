"use client";
import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

import "../styles/faqs/faqs.css";

import { Container, Row, Accordion } from "react-bootstrap";

function FAQs() {
  return (
    <>
      <div className="header">
        <Navbar />
      </div>

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

          <Accordion.Item eventKey="3">
            <Accordion.Header className="accheader">
              Question 4
            </Accordion.Header>
            <Accordion.Body className="accbody">
              The UST Research Ethics Online System is a platform that allows
              researchers to submit their research proposals and have them
              reviewed by the UST Research Ethics Committee.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header className="accheader">
              Question 5
            </Accordion.Header>
            <Accordion.Body className="accbody">
              The UST Research Ethics Online System is a platform that allows
              researchers to submit their research proposals and have them
              reviewed by the UST Research Ethics Committee.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

      </Container>

      <div style={{ marginTop: "3em"}} className="footer">
        <Footer />
      </div>
    </>
  );
}

export default FAQs;
