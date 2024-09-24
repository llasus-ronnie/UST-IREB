"use client";

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

function SummaryPage() {
  // Access form data from the Redux store
  const formData = useSelector((store) => store.submissionForm.formData);

  return (
    <div>
      <Container className="PIforms-cont1">
        <Row className="justify-content-center">
          <h1 className="PIforms-header">Summary of Submission</h1>
        </Row>
        <Container className="PIforms-rescont3">
          <Row>
            <Col>
              <h2 className="PIforms-resconthead">Research Classification</h2>
              <p className="PIforms-formtext">
                <strong>Institution:</strong> {formData.institution}
              </p>
              <p className="PIforms-formtext">
                <strong>Research Ethics Committee:</strong>{" "}
                {formData.researchEthicsCommittee}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="PIforms-resconthead">Submission Checklist</h2>
              <p className="PIforms-formtext">
                <strong>Agree to provide soft copies:</strong>{" "}
                {formData.agreeSoftCopies ? "Yes" : "No"}
              </p>
              <p className="PIforms-formtext">
                <strong>Understand submission process:</strong>{" "}
                {formData.understandSubmission ? "Yes" : "No"}
              </p>
              <p className="PIforms-formtext">
                <strong>Understand confidentiality:</strong>{" "}
                {formData.understandConfidentiality ? "Yes" : "No"}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="PIforms-resconthead">Uploaded Files</h2>
              <p className="PIforms-formtext">
                <strong>File Type:</strong> {formData.fileType}
              </p>
              <p className="PIforms-formtext">
                <strong>File Name:</strong> {formData.fileName}
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default SummaryPage;
