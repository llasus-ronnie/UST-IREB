"use client";

import React, { use, useState } from "react";
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
import Link from "next/link";
import { useRouter } from 'next/router';

function SubmissionFormsP2() {
  const [validated, setValidated] = useState(false);
  const currentPage = 2;

  //backend
  const [primaryFullName, setPrimaryFullName] = useState("");
  const [primaryEmail, setPrimaryEmail] = useState ("");
  const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState("");
  const [primaryInstAffil, setPrimaryInstAffil] = useState("");

  const [additionalFullName, setAdditionalFullName] = useState("");
  const [additionalEmail, setAdditionalEmail] = useState ("");
  const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState("");
  const [additionalInstAffil, setAdditionalInstAffil] = useState("");

  const [title, setTitle] = useState('');
  const [background, setBackground] = useState('');
  const [objectives, setObjectives] = useState('');
  const [outcomes, setOutcomes] = useState('');
  const [keywords, setKeywords] = useState('');
  const [studyType, setStudyType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [primarySponsor, setPrimarySponsor] = useState('');
  const [secondarySponsor, setSecondarySponsor] = useState('');
  const [multiCountryResearch, setMultiCountryResearch] = useState('');
  const [multiSiteResearch, setMultiSiteResearch] = useState('');
  const [region, setRegion] = useState('');
  const [researchField, setResearchField] = useState('');
  const [involvesHumanSubjects, setInvolvesHumanSubjects] = useState('');
  const [proposalType, setProposalType] = useState('');
  const [dataCollection, setDataCollection] = useState('');
  const [reviewedByOtherCommittee, setReviewedByOtherCommittee] = useState('');
  const [monetarySource, setMonetarySource] = useState('');
  const [amountInPeso, setAmountInPeso] = useState('');
  const [otherSource, setOtherSource] = useState('');

  const handleForms = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else{
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
        otherSource
      };
      alert("Data Saved");
        localStorage.setItem("researcherData", JSON.stringify(researcherData));
        window.location.href = "/form3";
          }
          setValidated(true);
  }
  
  //end of backend
  return (
    <div>
      <Helmet>
        <title>Submission Forms</title>
        <style>{"body { background-color: #ECF0F1; }"}</style>
      </Helmet>
      <Navbar />
      <StepBar currentPage={currentPage} />
      <Container className="cont1">
        <Form noValidate validated={validated}>
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
                  value = {primaryFullName}
                  onChange={(e)=> setPrimaryFullName (e.target.value)}
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
                  value= {primaryEmail}
                  onChange={(e)=> setPrimaryEmail(e.target.value)}
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
                  value = {primaryPhoneNumber}
                  onChange={(e)=> setPrimaryPhoneNumber(e.target.value)}
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
                  value = {primaryInstAffil}
                  onChange={(e)=> setPrimaryInstAffil(e.target.value)}
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
                <FormControl 
                type="text" 
                className="form-control formtext"
                value={additionalFullName}
                onChange={(e)=> setAdditionalFullName(e.target.value)}
                />
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">Email</FormLabel>
                <FormControl type="email" className="form-control formtext"
                value={additionalEmail}
                onChange={(e)=> setAdditionalEmail(e.target.value)}
                />
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">Phone Number</FormLabel>
                <FormControl 
                type="number" 
                className="form-control formtext" 
                value={additionalPhoneNumber}
                onChange={(e)=> setAdditionalPhoneNumber(e.target.value)}
                />
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">
                  Institutional Affiliation
                </FormLabel>
                <FormControl 
                type="text" 
                className="form-control formtext" 
                value={additionalInstAffil}
                onChange={(e)=> setAdditionalInstAffil(e.target.value)}
                />
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

                  value={title}
                  onChange={e => setTitle(e.target.value)}
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
                  value={background}
                  onChange={e => setBackground(e.target.value)}
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

                  value={objectives}
                  onChange={e => setObjectives(e.target.value)}
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
                  value={outcomes}
                  onChange={e => setOutcomes(e.target.value)}
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

                  value={keywords}
                  onChange={e => setKeywords(e.target.value)}
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
                <FormSelect required
                value={studyType}
                onChange={e => setStudyType(e.target.value)}>
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

                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
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

                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
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

                  value={primarySponsor}
                  onChange={e => setPrimarySponsor(e.target.value)}
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

                  value={secondarySponsor}
                  onChange={e => setSecondarySponsor(e.target.value)}
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

                  value={multiCountryResearch}
                  onChange={e => setMultiCountryResearch(e.target.value)}
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

                  value={multiSiteResearch}
                  onChange={e => setMultiSiteResearch(e.target.value)}
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

                  value={region}
                  onChange={e => setRegion(e.target.value)}
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

                  value={researchField}
                  onChange={e => setResearchField(e.target.value)}
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

                  value={involvesHumanSubjects}
                  onChange={e => setInvolvesHumanSubjects(e.target.value)}
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

                  value={proposalType}
                  onChange={e => setProposalType(e.target.value)}
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

                  value={dataCollection}
                  onChange={e => setDataCollection(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please specify the data collection method.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">
                  Proposal Reviewed by Other Committee?
                </FormLabel>
                <FormSelect required
                value={reviewedByOtherCommittee}
                onChange={e => setReviewedByOtherCommittee(e.target.value)}
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
                <FormLabel className="formtext">Monetary Source</FormLabel>
                <FormControl
                  type="text"
                  className="form-control formtext"
                  required

                  value={monetarySource}
                  onChange={e => setMonetarySource(e.target.value)}
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

                  value={amountInPeso}
                  onChange={e => setAmountInPeso(e.target.value)}
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

                  value={otherSource}
                  onChange={e => setOtherSource(e.target.value)}
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
                  onClick={handleForms}
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
