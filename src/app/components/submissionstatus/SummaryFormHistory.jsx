"use client";

import React, { useState, useEffect } from "react";

import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  updateFormData,
  setCurrentStep,
  getFileName,
} from "../../../redux/slices/submissionFormSlice";
import "../../styles/forms/Forms.css";

import axios from "axios";
import { useRouter } from "next/router";

function SummaryFormHistory({ id }) {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchFormData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/api/forms/${id}`);
          setFormData(response.data);
        } catch (error) {
          setError("Failed to load data.");
        } finally {
          setLoading(false);
        }
      };

      fetchFormData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!formData) {
    return <div>No data found.</div>;
  }

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
              <strong>Monetary Source:</strong> {formData.monetarySource1}
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
              <strong>Monetary Source:</strong> {formData.monetarySource2}
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
            <Table className="PIforms-table" striped>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Response</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Does the proposed research include research subjects whose
                    identity may be revealed?
                  </td>
                  <td>{formData.identity}</td>
                </tr>
                <tr>
                  <td>Is the subject unable to consent?</td>
                  <td>{formData.consent}</td>
                </tr>
                <tr>
                  <td>Is the subject under 18 years old?</td>
                  <td>{formData.under18}</td>
                </tr>
                <tr>
                  <td>
                    Is the subject in a dependent relationship with any of the
                    research team?
                  </td>
                  <td>{formData.dependent}</td>
                </tr>
                <tr>
                  <td>Is the subject from an ethnic minority group?</td>
                  <td>{formData.ethnic}</td>
                </tr>
                <tr>
                  <td>
                    Does the subject have an intellectual or mental impairment?
                  </td>
                  <td>{formData.intellectual}</td>
                </tr>
                <tr>
                  <td>Is the subject pregnant?</td>
                  <td>{formData.pregnant}</td>
                </tr>
                <tr>
                  <td>
                    Does the research include a new treatment, medical procedure
                    or test?
                  </td>
                  <td>{formData.treatment}</td>
                </tr>
                <tr>
                  <td>
                    Does the research involve the collection of biological
                    samples including tissue extraction?
                  </td>
                  <td>{formData.biological}</td>
                </tr>
                <tr>
                  <td>Does the research use ionizing radiation?</td>
                  <td>{formData.radiation}</td>
                </tr>
                <tr>
                  <td>
                    Does the research cause pain or psychological distress?
                  </td>
                  <td>{formData.distress}</td>
                </tr>
                <tr>
                  <td>Does the research include inducements?</td>
                  <td>{formData.inducements}</td>
                </tr>
                <tr>
                  <td>
                    Does the research involve the collection of sensitive
                    information?
                  </td>
                  <td>{formData.sensitive}</td>
                </tr>
                <tr>
                  <td>Does the research include deception?</td>
                  <td>{formData.deception}</td>
                </tr>
                <tr>
                  <td>
                    Does the research involve assisted reproductive technology?
                  </td>
                  <td>{formData.reproductive}</td>
                </tr>
                <tr>
                  <td>
                    Does the research involve human genetic or genomic studies?
                  </td>
                  <td>{formData.genetic}</td>
                </tr>
                <tr>
                  <td>Does the research involve stem cell research?</td>
                  <td>{formData.stemcell}</td>
                </tr>
                <tr>
                  <td>Are there any biosafety issues?</td>
                  <td>{formData.biosafety}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Container>

        <Container className="PIforms-rescont">
          <Row>
            <h1 className="PIforms-resconthead">Potential Risks</h1>
          </Row>
          <Col>
            <p className="PIforms-formtext">
              <strong>Level of Risk Involved:</strong> {formData.riskLevel}
            </p>
          </Col>

          <Row>
            <h1 className="PIforms-resconthead">Risks apply to</h1>
          </Row>
          <Col>
            <Table className="PIforms-table" striped>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Response</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Research Team:</td>
                  <td>
                    {formData.researchTeam === false
                      ? "No"
                      : formData.researchTeam}
                  </td>
                </tr>
                <tr>
                  <td>Research Subjects:</td>
                  <td>
                    {formData.researchSubjects === false
                      ? "No"
                      : formData.researchSubjects}
                  </td>
                </tr>
                <tr>
                  <td>Wider Community:</td>
                  <td>
                    {formData.widerCommunity === false
                      ? "No"
                      : formData.widerCommunity}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Container>

        <Container className="PIforms-rescont">
          <Row>
            <h1 className="PIforms-resconthead">Potential Benefits:</h1>
          </Row>
          <Col>
            <Table className="PIforms-table" striped>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Response</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Multi-institutional Project:</td>
                  <td>{formData.multiInstitutional}</td>
                </tr>
                <tr>
                  <td>Conflict of Interest:</td>
                  <td>{formData.conflictInterest}</td>
                </tr>
                <tr>
                  <td>Direct benefit from participants:</td>
                  <td>
                    {formData.benefitParticipants === false
                      ? "No"
                      : formData.benefitParticipants}
                  </td>
                </tr>
                <tr>
                  <td>
                    Generalizable knowledge about participants’ condition or
                    disorder:
                  </td>
                  <td>
                    {formData.generalizableKnowledge === false
                      ? "No"
                      : formData.generalizableKnowledge}
                  </td>
                </tr>
                <tr>
                  <td>
                    Generalizable knowledge about diseases or condition under
                    study:
                  </td>
                  <td>
                    {formData.generalizableKnowledgeDisease === false
                      ? "No"
                      : formData.generalizableKnowledgeDisease}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Container>
      </Container>
    </div>
  );
}

export default SummaryFormHistory;
