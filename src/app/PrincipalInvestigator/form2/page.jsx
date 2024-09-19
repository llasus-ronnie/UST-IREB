"use client";
import {
  Container,
  Col,
  Row,
  Form,
  FormLabel,
  FormSelect,
  FormControl,
  Button,
  Table,
} from "react-bootstrap";
import React, { use, useState } from "react";
import StepBar from "../../components/stepbar/StepBar";
import Navbar from "../../components/navbar/Navbar";

import Link from "next/link";
import { useRouter } from "next/router";

function SubmissionFormsP2() {
  const [validated, setValidated] = useState(false);
  const currentPage = 2;

  //backend
  const [primaryFullName, setPrimaryFullName] = useState("");
  const [primaryEmail, setPrimaryEmail] = useState("");
  const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState("");
  const [primaryInstAffil, setPrimaryInstAffil] = useState("");

  const [additionalFullName, setAdditionalFullName] = useState("");
  const [additionalEmail, setAdditionalEmail] = useState("");
  const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState("");
  const [additionalInstAffil, setAdditionalInstAffil] = useState("");

  const [title, setTitle] = useState("");
  const [background, setBackground] = useState("");
  const [objectives, setObjectives] = useState("");
  const [outcomes, setOutcomes] = useState("");
  const [keywords, setKeywords] = useState("");
  const [studyType, setStudyType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [primarySponsor, setPrimarySponsor] = useState("");
  const [secondarySponsor, setSecondarySponsor] = useState("");
  const [multiCountryResearch, setMultiCountryResearch] = useState("");
  const [multiSiteResearch, setMultiSiteResearch] = useState("");
  const [region, setRegion] = useState("");
  const [researchField, setResearchField] = useState("");
  const [involvesHumanSubjects, setInvolvesHumanSubjects] = useState("");
  const [proposalType, setProposalType] = useState("");
  const [dataCollection, setDataCollection] = useState("");
  const [reviewedByOtherCommittee, setReviewedByOtherCommittee] = useState("");
  const [monetarySource, setMonetarySource] = useState("");
  const [amountInPeso, setAmountInPeso] = useState("");
  const [otherSource, setOtherSource] = useState("");

  const handleForms = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      e.preventDefault();
      const researcherData = {
        primaryFullName,
        primaryEmail,
        primaryPhoneNumber,
        primaryInstAffil,
        additionalFullName,
        additionalEmail,
        additionalPhoneNumber,
        additionalInstAffil,
        title,
        background,
        objectives,
        outcomes,
        keywords,
        studyType,
        startDate,
        endDate,
        primarySponsor,
        secondarySponsor,
        multiCountryResearch,
        multiSiteResearch,
        region,
        researchField,
        involvesHumanSubjects,
        proposalType,
        dataCollection,
        reviewedByOtherCommittee,
        monetarySource,
        amountInPeso,
        otherSource,
      };
      alert("Data Saved");
      localStorage.setItem("researcherData", JSON.stringify(researcherData));
      window.location.href = "/../form3";
    }
    setValidated(true);
  };

  //end of backend
  return (
    <div>
      <Navbar />
      <Container className="PIforms-cont1">
        <StepBar currentPage={currentPage} />
        <Form noValidate validated={validated}>
          <h1 className="PIforms-headtext">1. Researcher Information</h1>

          <Container className="PIforms-rescont2">
            <Row>
              <h1 className="PIforms-resconthead">Primary Researcher</h1>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">Full Name</FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext2"
                  required
                  value={primaryFullName}
                  onChange={(e) => setPrimaryFullName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a name.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">Email</FormLabel>
                <FormControl
                  type="email"
                  className="form-control PIforms-formtext2"
                  value={primaryEmail}
                  onChange={(e) => setPrimaryEmail(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Phone Number
                </FormLabel>
                <FormControl
                  type="tel"
                  className="form-control PIforms-formtext2"
                  required
                  value={primaryPhoneNumber}
                  onChange={(e) => setPrimaryPhoneNumber(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid phone number.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Institutional Affiliation
                </FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext2"
                  required
                  value={primaryInstAffil}
                  onChange={(e) => setPrimaryInstAffil(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your institutional affiliation.
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Container>

          <Container className="PIforms-rescont2">
            <Row>
              <h1 className="PIforms-resconthead">Additional Researcher</h1>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">Full Name</FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext2"
                  value={additionalFullName}
                  onChange={(e) => setAdditionalFullName(e.target.value)}
                />
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">Email</FormLabel>
                <FormControl
                  type="email"
                  className="form-control PIforms-formtext2"
                  value={additionalEmail}
                  onChange={(e) => setAdditionalEmail(e.target.value)}
                />
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Phone Number
                </FormLabel>
                <FormControl
                  type="number"
                  className="form-control PIforms-formtext2"
                  value={additionalPhoneNumber}
                  onChange={(e) => setAdditionalPhoneNumber(e.target.value)}
                />
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Institutional Affiliation
                </FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext2"
                  value={additionalInstAffil}
                  onChange={(e) => setAdditionalInstAffil(e.target.value)}
                />
              </Col>
            </Row>

            <Row
              style={{ marginTop: "20px" }}
              className="justify-content-around"
            >
              <Button variant="outline-secondary" className="PIforms-formbtn">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outline-warning"
                className="PIforms-formbtn"
              >
                Add Researcher
              </Button>
            </Row>
          </Container>

          <hr />
          <h1 className="PIforms-headtext">2. Title and Summary Proposal</h1>

          <Container className="PIforms-rescont2">
            <Row>
              <h1 className="PIforms-resconthead">Research Proposal</h1>
            </Row>
            <Row>
              <Col xs={12}>
                <FormLabel className="PIforms-formtext3">Title</FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext3"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a title.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12}>
                <FormLabel className="PIforms-formtext3">Background</FormLabel>
                <FormControl
                  as="textarea"
                  className="form-control PIforms-formtext3"
                  required
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a background.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12}>
                <FormLabel className="PIforms-formtext3">Objectives</FormLabel>
                <FormControl
                  as="textarea"
                  className="form-control PIforms-formtext3"
                  required
                  value={objectives}
                  onChange={(e) => setObjectives(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide objectives.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12}>
                <FormLabel className="PIforms-formtext3">
                  Expected Outcomes and Use of Result
                </FormLabel>
                <FormControl
                  as="textarea"
                  className="form-control PIforms-formtext3"
                  required
                  value={outcomes}
                  onChange={(e) => setOutcomes(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide expected outcomes and use of result.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12}>
                <FormLabel className="PIforms-formtext3">Keywords</FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext3"
                  required
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide keywords.
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Container>

          <hr />
          <h1 className="PIforms-headtext">3. Proposal Details</h1>

          <Container className="PIforms-rescont2">
            <Row>
              <h1 className="PIforms-resconthead">Proposal Details</h1>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">Study Type</FormLabel>
                <FormSelect
                  required
                  value={studyType}
                  onChange={(e) => setStudyType(e.target.value)}
                  className="PIforms-formtext2"
                >
                  <option>Qualitative</option>
                  <option>Quantitative</option>
                  <option>Mixed Methods</option>
                </FormSelect>
                <Form.Control.Feedback type="invalid">
                  Please select a study type.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">Start Date</FormLabel>
                <FormControl
                  type="date"
                  className="form-control PIforms-formtext2"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a start date.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">End Date</FormLabel>
                <FormControl
                  type="date"
                  className="form-control PIforms-formtext2"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide an end date.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Primary Sponsor
                </FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext2"
                  required
                  value={primarySponsor}
                  onChange={(e) => setPrimarySponsor(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a primary sponsor.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Secondary Sponsor
                </FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext2"
                  required
                  value={secondarySponsor}
                  onChange={(e) => setSecondarySponsor(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a secondary sponsor.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Multi-country Research
                </FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext2"
                  required
                  value={multiCountryResearch}
                  onChange={(e) => setMultiCountryResearch(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please specify if it involves multi-country research.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Multi-site Research
                </FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext2"
                  required
                  value={multiSiteResearch}
                  onChange={(e) => setMultiSiteResearch(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please specify if it involves multi-site research.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">Region</FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext2"
                  required
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a region.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Research Field
                </FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext2"
                  required
                  value={researchField}
                  onChange={(e) => setResearchField(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a research field.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Involves Human Subjects
                </FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext2"
                  required
                  value={involvesHumanSubjects}
                  onChange={(e) => setInvolvesHumanSubjects(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please specify if it involves human subjects.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Proposal Type
                </FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext2"
                  required
                  value={proposalType}
                  onChange={(e) => setProposalType(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a proposal type.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Data Collection
                </FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext2"
                  required
                  value={dataCollection}
                  onChange={(e) => setDataCollection(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please specify the data collection method.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Proposal Reviewed by Other Committee?
                </FormLabel>
                <FormSelect
                  required
                  value={reviewedByOtherCommittee}
                  onChange={(e) => setReviewedByOtherCommittee(e.target.value)}
                >
                  <option>Yes</option>
                  <option>No</option>
                </FormSelect>
                <Form.Control.Feedback type="invalid">
                  Please specify if the proposal has been reviewed by another
                  committee.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Monetary Source
                </FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext2"
                  required
                  value={monetarySource}
                  onChange={(e) => setMonetarySource(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a monetary source.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Amount in Philippine Peso
                </FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext2"
                  required
                  value={amountInPeso}
                  onChange={(e) => setAmountInPeso(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide the amount in Philippine Peso.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Other Source
                </FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext2"
                  required
                  value={otherSource}
                  onChange={(e) => setOtherSource(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide another source of funding.
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Container>

          <hr />

          <h1 className="PIforms-headtext">
            4. Sources of Monetary or Material Support
          </h1>

          <Container className="PIforms-rescont2">
            <Row>
              <h1 className="PIforms-resconthead">
                Sources of Monetary or Material Support
              </h1>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Monetary Source
                </FormLabel>
                <FormControl
                  type="text"
                  className="form-control PIforms-formtext2"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a monetary source.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Amount in Philippine Peso (Php)
                </FormLabel>
                <FormControl
                  type="number"
                  className="form-control PIforms-formtext2"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide an amount.
                </Form.Control.Feedback>
              </Col>

              <Row
                style={{ marginTop: "20px" }}
                className="justify-content-around"
              >
                <Button variant="outline-secondary" className="PIforms-formbtn">
                  Remove
                </Button>
                <Button
                  type="submit"
                  variant="outline-warning"
                  className="PIforms-formbtn"
                >
                  Add More Source
                </Button>
              </Row>
            </Row>
          </Container>

          <hr />

          <h1 className="PIforms-headtext">5. Assessment Questionnaire</h1>

          <Container className="PIforms-rescont2">
            <Row>
              <h1 className="PIforms-resconthead">Assessment Questionnaire</h1>
            </Row>

            <Table className="PIforms-table" striped>
              <thead>
                <tr>
                  <th>Does the proposed research include research subjects:</th>
                  <th>Yes</th>
                  <th>No</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Whose identity may be revealed during the research process?
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="identity"
                      value="yes"
                    />
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="identity"
                      value="no"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Unable to consent?</td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="consent"
                      value="yes"
                    />
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="consent"
                      value="no"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Under 18 years old?</td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="under18"
                      value="yes"
                    />
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="under18"
                      value="no"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    In a dependent relationship with any of the research team?{" "}
                    <br />
                    (e.g. a researcher is the treating physician of one of the
                    research participants)
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="dependent"
                      value="yes"
                    />
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="dependent"
                      value="no"
                    />
                  </td>
                </tr>
                <tr>
                  <td>From an ethnic minority group?</td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="ethnic"
                      value="yes"
                    />
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="ethnic"
                      value="no"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Wtih intellectual or mental impairment?</td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="intellectual"
                      value="yes"
                    />
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="intellectual"
                      value="no"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Who are pregnant?</td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="pregnant"
                      value="yes"
                    />
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="pregnant"
                      value="no"
                    />
                  </td>
                </tr>
              </tbody>

              <thead>
                <tr>
                  <th>Does the research include:</th>
                  <th>{""}</th>
                  <th>{""}</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>A new treatment, medical procedure or test?</td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="treatment"
                      value="yes"
                    />
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="treatment"
                      value="no"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    Collection of biological samples including tissue
                    extraction?
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="biological"
                      value="yes"
                    />
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="biological"
                      value="no"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Use of ionizing radiation?</td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="radiation"
                      value="yes"
                    />
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="radiation"
                      value="no"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Pain or psychological distress?</td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="distress"
                      value="yes"
                    />
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="distress"
                      value="no"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Inducements?</td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="inducements"
                      value="yes"
                    />
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="inducements"
                      value="no"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Collection of sensitive information?</td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="sensitive"
                      value="yes"
                    />
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="sensitive"
                      value="no"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Deception?</td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="deception"
                      value="yes"
                    />
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="deception"
                      value="no"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Assisted reproductive technology?</td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="reproductive"
                      value="yes"
                    />
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="reproductive"
                      value="no"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Human genetic or genomic studies?</td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="genetic"
                      value="yes"
                    />
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="genetic"
                      value="no"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Stemcell research?</td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="stemcell"
                      value="yes"
                    />
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="stemcell"
                      value="no"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Biosafety issue?</td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="biosafety"
                      value="yes"
                    />
                  </td>
                  <td>
                    <Form.Check
                      required
                      type="radio"
                      name="biosafety"
                      value="no"
                    />
                  </td>
                </tr>
              </tbody>
            </Table>

            <Row style={{ marginTop: "20px" }}>
              <Col>
                <h2>Potential Risks:</h2>
                <FormLabel className="PIforms-formtext2">
                  Level of Risk involved in the Research
                </FormLabel>
                <FormSelect className="PIforms-select2" required />
                <Form.Control.Feedback type="invalid">
                  Please select the level of risk.
                </Form.Control.Feedback>

                <br />

                <p>Risks apply to</p>
                <Form.Check type="checkbox" label="Research Team" />
                <Form.Check type="checkbox" label="Research Subjects" />
                <Form.Check type="checkbox" label="Wider Community" />
              </Col>

              <Col>
                <h2>Potential Benefits:</h2>
                <p className="PIforms-formtext2">
                  Benefits from the research project
                </p>

                <Table className="PIforms-table">
                  <tbody>
                    <tr>
                      <td>Multi-institutional Project</td>
                      <td>
                        <Form.Check
                          inline
                          type="radio"
                          label="Yes"
                          name="multi"
                          required
                        />
                      </td>
                      <td>
                        <Form.Check
                          inline
                          type="radio"
                          label="No"
                          name="multi"
                          required
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>Conflict of Interest</td>
                      <td>
                        <Form.Check
                          inline
                          type="radio"
                          label="Yes"
                          name="interest"
                          required
                        />
                      </td>
                      <td>
                        <Form.Check
                          inline
                          type="radio"
                          label="No"
                          name="interest"
                          required
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>

                <Form.Check
                  type="checkbox"
                  label="Direct benefit from participants"
                />
                <Form.Check
                  type="checkbox"
                  label="Generalizable knowledge about participants’ condition or disorder"
                />
                <Form.Check
                  type="checkbox"
                  label="Generalizable knowledge about diseases or condition under study"
                />
              </Col>
            </Row>
          </Container>

          <Row
            style={{ marginTop: "20px", paddingBottom: "20px" }}
            className="justify-content-around"
          >
            <Button variant="outline-secondary" className="PIforms-formbtn">
              Back
            </Button>
            <Button
              type="submit"
              variant="outline-warning"
              className="PIforms-formbtn"
              onClick={handleForms}
            >
              Save & Continue
            </Button>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default SubmissionFormsP2;
