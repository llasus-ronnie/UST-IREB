"use client";

import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import {
  updateFormData,
  setCurrentStep,
  getFileName,
} from "../../../redux/slices/submissionFormSlice";

function SummaryForm() {
  // Access form data from the Redux store
  const formData = useSelector((store) => store.submissionForm.formData);
  const additionalResearchers = useSelector(
    (store) => store.submissionForm.additionalResearchers
  );
  const dispatch = useDispatch();

  const handlePrevious = () => {
    dispatch(setCurrentStep(currentPage - 1));
  };


  return (
    <div>
      <Container className="PIforms-cont1">
        <Row className="justify-content-center">
          <h1 className="PIforms-header">Summary of Proposal</h1>
        </Row>

        <Container className="PIforms-rescont">
          <Row>
            <h1 className="PIforms-resconthead">Research Classification</h1>
          </Row>
          <Col>
            <p className="PIforms-formtext">
              <strong>Institution:</strong> {formData.institution}
            </p>
            <p className="PIforms-formtext">
              <strong>Research Ethics Committee:</strong>{" "}
              {formData.researchEthicsCommittee}
            </p>
          </Col>
        </Container>

        <Container className="PIforms-rescont">
          <Row>
            <h1 className="PIforms-resconthead">Primary Researcher</h1>
          </Row>

          <Col>
            <p className="PIforms-formtext">
              <strong>Full Name:</strong> {formData.fullName}
            </p>
            <p className="PIforms-formtext">
              <strong>Email:</strong> {formData.email}
            </p>
            <p className="PIforms-formtext">
              <strong>Phone:</strong> {formData.phone}
            </p>
            <p className="PIforms-formtext">
              <strong>Institution Affiliation:</strong>{" "}
              {formData.institutionAffiliation}
            </p>
          </Col>
        </Container>

        {additionalResearchers && additionalResearchers.length > 0 && (
          <Container className="PIforms-rescont">
            {additionalResearchers.map((researcher, index) => (
              <Row key={index}>
                <h1 className="PIforms-resconthead">Researcher {index + 1}</h1>
                <Col>
                  <p className="PIforms-formtext">
                    <strong>Full Name:</strong> {researcher.additionalFullName}
                  </p>
                  <p className="PIforms-formtext">
                    <strong>Email:</strong> {researcher.additionalEmail}
                  </p>
                  <p className="PIforms-formtext">
                    <strong>Phone:</strong> {researcher.additionalPhone}
                  </p>
                  <p className="PIforms-formtext">
                    <strong>Institution Affiliation:</strong>{" "}
                    {researcher.additionalInstitutionAffiliation}
                  </p>
                </Col>
              </Row>
            ))}
          </Container>
        )}

        <Container className="PIforms-rescont">
          <Row>
            <h1 className="PIforms-resconthead">Research Details</h1>
          </Row>
          <Col>
            <p className="PIforms-formtext">
              <strong>Title:</strong> {formData.title}
            </p>
            <p className="PIforms-formtext">
              <strong>Background:</strong> {formData.background}
            </p>
            <p className="PIforms-formtext">
              <strong>Objectives:</strong> {formData.objectives}
            </p>
            <p className="PIforms-formtext">
              <strong>Expected Outcomes:</strong> {formData.expectedOutcomes}
            </p>
            <p className="PIforms-formtext">
              <strong>Keywords:</strong> {formData.keywords}
            </p>
            <p className="PIforms-formtext">
              <strong>Study Type:</strong> {formData.studyType}
            </p>
            <p className="PIforms-formtext">
              <strong>Start Date:</strong> {formData.startDate}
            </p>
            <p className="PIforms-formtext">
              <strong>End Date:</strong> {formData.endDate}
            </p>
            <p className="PIforms-formtext">
              <strong>Primary Sponsor:</strong> {formData.primarySponsor}
            </p>
            <p className="PIforms-formtext">
              <strong>Secondary Sponsor:</strong> {formData.secondarySponsor}
            </p>
            <p className="PIforms-formtext">
              <strong>Multi-Country Research:</strong>{" "}
              {formData.multiCountryResearch ? "Yes" : "No"}
            </p>
            <p className="PIforms-formtext">
              <strong>Multi-Site Research:</strong>{" "}
              {formData.multiSiteResearch ? "Yes" : "No"}
            </p>
            <p className="PIforms-formtext">
              <strong>Region:</strong> {formData.region}
            </p>
            <p className="PIforms-formtext">
              <strong>Research Field:</strong> {formData.researchField}
            </p>
            <p className="PIforms-formtext">
              <strong>Involves Human Subjects:</strong>{" "}
              {formData.involvesHumanSubjects ? "Yes" : "No"}
            </p>
            <p className="PIforms-formtext">
              <strong>Proposal Type:</strong> {formData.proposalType}
            </p>
            <p className="PIforms-formtext">
              <strong>Data Collection:</strong> {formData.dataCollection}
            </p>
            <p className="PIforms-formtext">
              <strong>Proposal Reviewed By Other Committee:</strong>{" "}
              {formData.proposalReviewedByOtherCommittee ? "Yes" : "No"}
            </p>
            <p className="PIforms-formtext">
              <strong>Monetary Source:</strong> {formData.monetarySource}
            </p>
            <p className="PIforms-formtext">
              <strong>Amount in PHP:</strong> {formData.amountInPHP}
            </p>
            <p className="PIforms-formtext">
              <strong>Other Source:</strong> {formData.otherSource}
            </p>
          </Col>
        </Container>

        <Container className="PIforms-rescont">
          <Row>
            <h1 className="PIforms-resconthead">
              Sources of Monetary or Material Support
            </h1>
          </Row>
          <Col>
            <p className="PIforms-formtext">
              <strong>Monetary Source:</strong> {formData.monetarySource}
            </p>
            <p className="PIforms-formtext">
              <strong>Amount in Philippines Peso (Php):</strong>{" "}
              {formData.amountInPHP}
            </p>
          </Col>
        </Container>

        <Container className="PIforms-rescont">
          <Row>
            <h1 className="PIforms-resconthead">Assessment Questionnaire</h1>
          </Row>
          <Col>
            {/* <p className="PIforms-formtext">
              <strong>File Type:</strong> {formData.mainFile}
            </p>
            <p className="PIforms-formtext">
              <strong>File Input:</strong> {formData.fileName}
            </p> 
            
            yung mahabang questionnaire here
            */}
          </Col>
        </Container>

        <Container className="PIforms-rescont">
          <Row>
            <h1 className="PIforms-resconthead">Uploaded Files</h1>
          </Row>
          <Col>
            <p className="PIforms-formtext">
              <strong>File Type:</strong> {formData.mainFile}
            </p>
            <p className="PIforms-formtext">
              <strong>File Input:</strong> {formData.fileName}
            </p>
          </Col>
        </Container>

        <Row
          style={{ marginTop: "20px", paddingBottom: "20px" }}
          className="justify-content-around"
        >
          <Button
            variant="outline-secondary"
            className="PIforms-formbtn"
            // href="/"
            onClick={handlePrevious}
          >
            Back to Home
          </Button>
          <Button
            href="../PrincipalInvestigator/SubmissionList"
            variant="outline-warning"
            className="PIforms-formbtn"
          >
            View Submission
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default SummaryForm;
