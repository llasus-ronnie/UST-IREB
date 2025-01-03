"use client";

import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../../styles/forms/Forms.css";
import Step from "../stepbar/Step";

export default function StepBar({ steps = [] }) {
  return (
    <Container>
      <Row className="stepbar-nav">
        {steps.map((step, i) => (
          <Col
            key={i}
            className="d-flex flex-column align-items-center text-center stepbar-colpad"
          >
            <Step step={step} isLastStep={i === steps.length - 1} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
