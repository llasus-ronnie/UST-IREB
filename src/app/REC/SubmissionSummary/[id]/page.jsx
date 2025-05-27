"use client";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/forms/Forms.css";

const page = ({ params }) => {
  const [forms, setForms] = useState(null);
  const [subformId, setSubformId] = useState(null);

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/");
    const id = pathSegments[pathSegments.length - 1];
    setSubformId(id);
  }, []);

  useEffect(() => {
    if (!subformId) return;

    async function getForms() {
      try {
        const response = await axios.get("/api/forms", {
          params: { subformId: subformId },
        });
        const userForms = response.data.forms;
        setForms(userForms[0]);
      } catch (error) {
        toast.error("Error fetching data:", error);
      }
    }

    getForms();
  }, [subformId]);

  return (
    <Container className="PIforms-cont1">
      <Row className="justify-content-center">
        <h1 className="PIforms-header">Summary of Proposal</h1>
      </Row>

      {/* form information */}
      <Container className="PIforms-rescont">
        <Row>
          <h1 className="PIforms-resconthead">Research Classification</h1>
        </Row>
        <Col>
          <p className="PIforms-formtext">
            <strong>Institution:</strong> {forms?.institution}
          </p>
          <p className="PIforms-formtext">
            <strong>Research Ethics Committee:</strong>{" "}
            {forms?.researchEthicsCommittee}
          </p>
        </Col>
      </Container>

      {/* Primary Researcher */}
      <Container className="PIforms-rescont">
        <Row>
          <h1 className="PIforms-resconthead">Primary Researcher</h1>
        </Row>

        <Col>
          <p className="PIforms-formtext">
            <strong>Full Name:</strong> {forms?.fullName}
          </p>
          <p className="PIforms-formtext">
            <strong>Email:</strong> {forms?.email}
          </p>
          <p className="PIforms-formtext">
            <strong>Phone:</strong> {forms?.phone}
          </p>
          <p className="PIforms-formtext">
            <strong>Institution Affiliation:</strong>{" "}
            {forms?.institutionAffiliation}
          </p>
        </Col>
      </Container>

      <Container className="PIforms-rescont">
        <Row>
          <h1 className="PIforms-resconthead">Research Details</h1>
        </Row>
        <Col>
          <p className="PIforms-formtext">
            <strong>Title:</strong> {forms?.title}
          </p>
          <p className="PIforms-formtext">
            <strong>Background:</strong> {forms?.background}
          </p>
          <p className="PIforms-formtext">
            <strong>Objectives:</strong> {forms?.objectives}
          </p>
          <p className="PIforms-formtext">
            <strong>Expected Outcomes:</strong> {forms?.expectedOutcomes}
          </p>
          <p className="PIforms-formtext">
            <strong>Keywords:</strong> {forms?.keywords}
          </p>
          <p className="PIforms-formtext">
            <strong>Study Type:</strong> {forms?.studyType}
          </p>
          <p className="PIforms-formtext">
            <strong>Start Date:</strong> {forms?.startDate}
          </p>
          <p className="PIforms-formtext">
            <strong>End Date:</strong> {forms?.endDate}
          </p>
          <p className="PIforms-formtext">
            <strong>Primary Sponsor:</strong> {forms?.primarySponsor}
          </p>
          <p className="PIforms-formtext">
            <strong>Secondary Sponsor:</strong> {forms?.secondarySponsor}
          </p>
          <p className="PIforms-formtext">
            <strong>Multi-Country Research:</strong>{" "}
            {forms?.multiCountryResearch ? "Yes" : "No"}
          </p>
          <p className="PIforms-formtext">
            <strong>Multi-Site Research:</strong>{" "}
            {forms?.multiSiteResearch ? "Yes" : "No"}
          </p>
          <p className="PIforms-formtext">
            <strong>Region:</strong> {forms?.region}
          </p>
          <p className="PIforms-formtext">
            <strong>Research Field:</strong> {forms?.researchField}
          </p>
          <p className="PIforms-formtext">
            <strong>Involves Human Subjects:</strong>{" "}
            {forms?.involvesHumanSubjects ? "Yes" : "No"}
          </p>
          <p className="PIforms-formtext">
            <strong>Proposal Type:</strong> {forms?.proposalType}
          </p>
          <p className="PIforms-formtext">
            <strong>Data Collection:</strong> {forms?.dataCollection}
          </p>
          <p className="PIforms-formtext">
            <strong>Proposal Reviewed By Other Committee:</strong>{" "}
            {forms?.proposalReviewedByOtherCommittee ? "Yes" : "No"}
          </p>
          <p className="PIforms-formtext">
            <strong>Monetary Source:</strong> {forms?.monetarySource1}
          </p>
          <p className="PIforms-formtext">
            <strong>Amount in PHP:</strong> {forms?.amountInPHP}
          </p>
          <p className="PIforms-formtext">
            <strong>Other Source:</strong> {forms?.otherSource}
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
            <strong>Monetary Source:</strong> {forms?.monetarySource2}
          </p>
          <p className="PIforms-formtext">
            <strong>Amount in Philippines Peso (Php):</strong>{" "}
            {forms?.amountInPHP}
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
                <td>{forms?.identity}</td>
              </tr>
              <tr>
                <td>Is the subject unable to consent?</td>
                <td>{forms?.consent}</td>
              </tr>
              <tr>
                <td>Is the subject under 18 years old?</td>
                <td>{forms?.under18}</td>
              </tr>
              <tr>
                <td>
                  Is the subject in a dependent relationship with any of the
                  research team?
                </td>
                <td>{forms?.dependent}</td>
              </tr>
              <tr>
                <td>Is the subject from an ethnic minority group?</td>
                <td>{forms?.ethnic}</td>
              </tr>
              <tr>
                <td>
                  Does the subject have an intellectual or mental impairment?
                </td>
                <td>{forms?.intellectual}</td>
              </tr>
              <tr>
                <td>Is the subject pregnant?</td>
                <td>{forms?.pregnant}</td>
              </tr>
              <tr>
                <td>
                  Does the research include a new treatment, medical procedure
                  or test?
                </td>
                <td>{forms?.treatment}</td>
              </tr>
              <tr>
                <td>
                  Does the research involve the collection of biological samples
                  including tissue extraction?
                </td>
                <td>{forms?.biological}</td>
              </tr>
              <tr>
                <td>Does the research use ionizing radiation?</td>
                <td>{forms?.radiation}</td>
              </tr>
              <tr>
                <td>Does the research cause pain or psychological distress?</td>
                <td>{forms?.distress}</td>
              </tr>
              <tr>
                <td>Does the research include inducements?</td>
                <td>{forms?.inducements}</td>
              </tr>
              <tr>
                <td>
                  Does the research involve the collection of sensitive
                  information?
                </td>
                <td>{forms?.sensitive}</td>
              </tr>
              <tr>
                <td>Does the research include deception?</td>
                <td>{forms?.deception}</td>
              </tr>
              <tr>
                <td>
                  Does the research involve assisted reproductive technology?
                </td>
                <td>{forms?.reproductive}</td>
              </tr>
              <tr>
                <td>
                  Does the research involve human genetic or genomic studies?
                </td>
                <td>{forms?.genetic}</td>
              </tr>
              <tr>
                <td>Does the research involve stem cell research?</td>
                <td>{forms?.stemcell}</td>
              </tr>
              <tr>
                <td>Are there any biosafety issues?</td>
                <td>{forms?.biosafety}</td>
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
            <strong>Level of Risk Involved:</strong> {forms?.riskLevel}
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
                  {forms?.researchTeam === false ? "No" : forms?.researchTeam}
                </td>
              </tr>
              <tr>
                <td>Research Subjects:</td>
                <td>
                  {forms?.researchSubjects === false
                    ? "No"
                    : forms?.researchSubjects}
                </td>
              </tr>
              <tr>
                <td>Wider Community:</td>
                <td>
                  {forms?.widerCommunity === false
                    ? "No"
                    : forms?.widerCommunity}
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
                <td>{forms?.multiInstitutional}</td>
              </tr>
              <tr>
                <td>Conflict of Interest:</td>
                <td>{forms?.conflictInterest}</td>
              </tr>
              <tr>
                <td>Direct benefit from participants:</td>
                <td>
                  {forms?.benefitParticipants === false
                    ? "No"
                    : forms?.benefitParticipants}
                </td>
              </tr>
              <tr>
                <td>
                  Generalizable knowledge about participants’ condition or
                  disorder:
                </td>
                <td>
                  {forms?.generalizableKnowledge === false
                    ? "No"
                    : forms?.generalizableKnowledge}
                </td>
              </tr>
              <tr>
                <td>
                  Generalizable knowledge about diseases or condition under
                  study:
                </td>
                <td>
                  {forms?.generalizableKnowledgeDisease === false
                    ? "No"
                    : forms?.generalizableKnowledgeDisease}
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Container>
    </Container>
  );
};

export default page;
