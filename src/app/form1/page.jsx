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
  FormSelect,
  FormLabel,
  FormCheck,
  Button,
} from "react-bootstrap";

function SubmissionFormsP1() {
  const [institution, setInstitution] = useState("");
  const [showTextbox, setShowTextbox] = useState(false);
  const [researchEthicsCommittee, setResearchEthicsCommittee] = useState("");
  const [validated, setValidated] = useState(false);
  const currentPage = 1;

  const handleInstitutionChange = (event) => {
    const selectedValue = event.target.value;
    setInstitution(selectedValue);
    setShowTextbox(selectedValue === "Other");
  };

  const handleResearchEthicsCommitteeChange = (event) => {
    setResearchEthicsCommittee(event.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      window.location.href = "/form2";
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
        <Row className="justify-content-center">
          <p className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Row>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Container className="rescont">
            <Row>
              <h1 className="resconthead">Research Classification</h1>
            </Row>

            <Row>
              <Col>
                <FormLabel className="formtext">Institution</FormLabel>
                <FormSelect
                  className="form-control formtext"
                  value={institution}
                  onChange={handleInstitutionChange}
                  required
                >
                  <option disabled value="">
                    Choose...
                  </option>
                  <option value="University of Santo Tomas">
                    University of Santo Tomas
                  </option>
                  <option value="Other">Other</option>
                </FormSelect>
                {showTextbox && (
                  <input
                    type="text"
                    className="form-control formtext"
                    placeholder="Please specify"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                    required
                  />
                )}
              </Col>
              <Col>
                <FormLabel className="formtext">
                  Research Ethics Committee
                </FormLabel>
                <FormSelect
                  className="form-control formtext"
                  value={researchEthicsCommittee}
                  onChange={handleResearchEthicsCommitteeChange}
                  required
                >
                  <option disabled value="">
                    Choose...
                  </option>
                  <option value="UST Hospital">UST Hospital</option>
                  <option value="Faculty of Pharmacy">
                    Faculty of Pharmacy
                  </option>
                  <option value="Graduate School">Graduate School</option>
                  <option value="College of Nursing">College of Nursing</option>
                  <option value="College of Rehabilitation Sciences">
                    College of Rehabilitation Sciences
                  </option>
                  <option value="Faculty of Medicine and Surgery">
                    Faculty of Medicine and Surgery
                  </option>
                  <option value="Senior High School">Senior High School</option>
                  <option value="College of Education">
                    College of Education
                  </option>
                  <option value="Faculty of Engineering">
                    Faculty of Engineering
                  </option>
                  <option value="College of Information and Computing Sciences">
                    College of Information and Computing Sciences
                  </option>
                </FormSelect>
              </Col>
            </Row>
          </Container>
          <hr></hr>
          <h1 className="textcheck">Submission Checklist</h1>
          <p className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <FormCheck
                  type="checkbox"
                  className="formcheck"
                  label="I agree to provide soft copies of the protocol and supplementary files of my research."
                  required
                />

                <FormCheck
                  type="checkbox"
                  className="formcheck"
                  label="I understand that this submission will be forwarded to a REC for review"
                  required
                />

                <FormCheck
                  type="checkbox"
                  className="formcheck"
                  label="I understand that my research will be monitored by UST IREB and will be treated with confidentiality."
                  required
                />

                <Row
                  style={{ marginTop: "20px", paddingBottom: "20px" }}
                  className="justify-content-evenly"
                >
                  <Button variant="outline-secondary" className="formbtn">
                    Close
                  </Button>
                  <Button
                    type="submit"
                    variant="outline-warning"
                    className="formbtn"
                  >
                    Save & Continue
                  </Button>
                </Row>
              </Col>
            </Row>
          </Container>
        </Form>
      </Container>
    </div>
  );
}

export default SubmissionFormsP1;
