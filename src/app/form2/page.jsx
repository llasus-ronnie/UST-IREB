"use client";

import React, { useState } from "react";
import { Helmet } from "react-helmet";
import StepBar from "../components/stepbar/StepBar";
import Navbar from "../components/navbar/Navbar";
import {
  Container,
  Col,
  Row,
  Form,
  FormLabel,
  FormSelect,
  FormControl,
  Button,
} from "react-bootstrap";

function SubmissionFormsP2() {
  const [validated, setValidated] = useState(false);
  const currentPage = 2;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      window.location.href = "/SubmissionFormsP3";
    }
    setValidated(true);
  };

  return (
    <div>
      <Helmet>
        <title>Submission Forms</title>
        <style>{"body { background-color: #ECF0F1; }"}</style>
      </Helmet>
      <Navbar />
      <StepBar currentPage={currentPage} />
      <Container className="cont1">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h1 className="headtext">1. Researcher Information</h1>

          <Container className="rescont2">
            <Row>
              <h1 className="resconthead">Primary Researcher</h1>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <FormLabel className="formtext">Full Name</FormLabel>
                <FormControl
                  type="text"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a name.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">Email</FormLabel>
                <FormControl
                  type="email"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">Phone Number</FormLabel>
                <FormControl
                  type="tel"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid phone number.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">
                  Institutional Affiliation
                </FormLabel>
                <FormControl
                  type="text"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your institutional affiliation.
                </Form.Control.Feedback>
              </Col>
            </Row>

            <Row style={{ marginTop: "20px" }}>
              <h1 className="resconthead">Additional Researcher</h1>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <FormLabel className="formtext">Full Name</FormLabel>
                <FormControl type="text" className="form-control formtext" />
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">Email</FormLabel>
                <FormControl type="email" className="form-control formtext" />
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">Phone Number</FormLabel>
                <FormControl type="tel" className="form-control formtext" />
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">
                  Institutional Affiliation
                </FormLabel>
                <FormControl type="text" className="form-control formtext" />
              </Col>
            </Row>

            <Row
              style={{ marginTop: "20px", paddingBottom: "20px" }}
              className="justify-content-around"
            >
              <Button variant="outline-secondary" className="formbtn">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outline-warning"
                className="formbtn"
              >
                Add Researcher
              </Button>
            </Row>
          </Container>

          <hr></hr>
          <h1 className="headtext">2. Title and Summary Proposal</h1>

          <Container className="rescont2">
            <Row>
              <h1 className="resconthead">Research Proposal</h1>
            </Row>
            <Row>
              <Col xs={12}>
                <FormLabel className="formtext">Title</FormLabel>
                <FormControl
                  type="text"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a title.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12}>
                <FormLabel className="formtext">Background</FormLabel>
                <FormControl
                  as="textarea"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a background.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12}>
                <FormLabel className="formtext">Objectives</FormLabel>
                <FormControl
                  as="textarea"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide objectives.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12}>
                <FormLabel className="formtext">
                  Expected Outcomes and Use of Result
                </FormLabel>
                <FormControl
                  as="textarea"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide expected outcomes and use of result.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12}>
                <FormLabel className="formtext">Keywords</FormLabel>
                <FormControl
                  type="text"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide keywords.
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Container>

          <hr></hr>
          <h1 className="headtext">3. Proposal Details</h1>

          <Container className="rescont2">
            <Row>
              <h1 className="resconthead">Proposal Details</h1>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <FormLabel className="formtext">Study Type</FormLabel>
                <FormSelect required>
                  <option>Qualitative</option>
                  <option>Quantitative</option>
                  <option>Mixed Methods</option>
                </FormSelect>
                <Form.Control.Feedback type="invalid">
                  Please select a study type.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">Start Date</FormLabel>
                <FormControl
                  type="date"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a start date.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">End Date</FormLabel>
                <FormControl
                  type="date"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide an end date.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">Primary Sponsor</FormLabel>
                <FormControl
                  type="text"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a primary sponsor.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">Secondary Sponsor</FormLabel>
                <FormControl
                  type="text"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a secondary sponsor.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">
                  Multi-country Research
                </FormLabel>
                <FormControl
                  type="text"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please specify if it involves multi-country research.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">Multi-site Research</FormLabel>
                <FormControl
                  type="text"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please specify if it involves multi-site research.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">Region</FormLabel>
                <FormControl
                  type="text"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a region.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">Research Field</FormLabel>
                <FormControl
                  type="text"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a research field.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">
                  Involves Human Subjects
                </FormLabel>
                <FormControl
                  type="text"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please specify if it involves human subjects.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">Proposal Type</FormLabel>
                <FormControl
                  type="text"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a proposal type.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">Data Collection</FormLabel>
                <FormControl
                  type="text"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please specify the data collection method.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">
                  Proposal Reviewed by Other Committee?
                </FormLabel>
                <FormSelect required>
                  <option>Yes</option>
                  <option>No</option>
                </FormSelect>
                <Form.Control.Feedback type="invalid">
                  Please specify if the proposal has been reviewed by another
                  committee.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">Monetary Source</FormLabel>
                <FormControl
                  type="text"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a monetary source.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">
                  Amount in Philippine Peso
                </FormLabel>
                <FormControl
                  type="text"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide the amount in Philippine Peso.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">Other Source</FormLabel>
                <FormControl
                  type="text"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide another source of funding.
                </Form.Control.Feedback>
              </Col>
            </Row>

            <Row
              style={{ marginTop: "20px", paddingBottom: "20px" }}
              className="justify-content-around"
            >
              <Button variant="outline-secondary" className="formbtn">
                Back
              </Button>
              <Button
                type="submit"
                variant="outline-warning"
                className="formbtn"
              >
                Save & Continue
              </Button>
            </Row>
          </Container>
        </Form>
      </Container>
    </div>
  );
}

export default SubmissionFormsP2;
