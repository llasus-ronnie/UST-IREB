"use client";
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
import React, { useState } from "react";
import StepBar from "../components/stepbar/StepBar";
import Navbar from "../components/navbar/Navbar";

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
      <Navbar />
      <Container className="PIforms-cont1">
        <StepBar currentPage={currentPage} />
        <Row className="justify-content-center">
          <h1 className="PIforms-header">Research Ethics Committee</h1>
          <p className="PIforms-text">
            The assignment of an ethics committee is based on the classification
            of the proposal. Institution based research proposals are
            automatically assigned to RECs affiliated to the Researcher's
            institution. In the absence of an affiliated REC, the research
            proposal will be assigned to one of the accredited REC within the
            region of the researcher's institution. Community based research
            proposals are assigned to accredited RECs within the region where
            the research will be conducted. If the researcher's institution has
            an affiliated REC, the proposal will automatically be assigned there
            for review, otherwise the proposal will be assigned orderly to one
            of the accredited RECs within the indicated region.
          </p>
        </Row>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Container className="PIforms-rescont">
            <Row>
              <h1 className="PIforms-resconthead">Research Classification</h1>
            </Row>

            <Row>
              <FormLabel className="PIforms-formtext">Institution</FormLabel>
              <FormSelect
                className="form-control PIforms-select"
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
                  className="form-control PIforms-formtext"
                  placeholder="Please specify"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                  required
                />
              )}

              <FormLabel className="PIforms-formtext">
                Research Ethics Committee
              </FormLabel>
              <FormSelect
                className="form-control PIforms-select"
                value={researchEthicsCommittee}
                onChange={handleResearchEthicsCommitteeChange}
                required
              >
                <option disabled value="">
                  Choose...
                </option>
                <option value="UST Hospital">UST Hospital</option>
                <option value="Faculty of Pharmacy">Faculty of Pharmacy</option>
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
            </Row>
          </Container>
          <hr></hr>
          <h1 className="PIforms-header">Submission Checklist</h1>
          <p className="PIforms-text">
            Indicate that this proposal is ready to be considered by the Review
            Committee by checking off the following <br></br> (comments to the
            Secretary can be added at Step 4).
          </p>
          <Container className="PIforms-checkcont">
            <Row className="justify-content-center">
              <Col md="8">
                <FormCheck
                  type="checkbox"
                  className="PIforms-formcheck"
                  label="I agree to provide soft copies of the protocol and supplementary files of my research."
                  required
                />

                <FormCheck
                  type="checkbox"
                  className="PIforms-formcheck"
                  label="I understand that this submission will be forwarded to a REC for review"
                  required
                />

                <FormCheck
                  type="checkbox"
                  className="PIforms-formcheck"
                  label="I understand that my research will be monitored by UST IREB and will be treated with confidentiality."
                  required
                />
              </Col>
            </Row>
          </Container>
          <Row
            style={{ marginTop: "20px", paddingBottom: "20px" }}
            className="justify-content-evenly"
          >
            <Button variant="outline-secondary" className="PIforms-formbtn">
              Close
            </Button>
            <Button
              type="submit"
              variant="outline-warning"
              className="PIforms-formbtn"
            >
              Save & Continue
            </Button>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default SubmissionFormsP1;
