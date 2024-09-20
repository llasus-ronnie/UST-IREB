"use client";

import React, { use, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../navbar/Navbar";
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
import { useRouter } from "next/router";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  updateFormData,
  setCurrentStep,
  addResearcher,
} from "../../../redux/slices/submissionFormSlice";
import AdditionalResearcher from "./AdditionalResearcher";

function SubmissionFormsP2() {
  //form validation
  const [validated, setValidated] = useState(false);

  //dispatch function
  const dispatch = useDispatch();

  //initial states from store
  const currentPage = useSelector((store) => store.submissionForm.currentStep);
  const formData = useSelector((store) => store.submissionForm.formData);
  const additionalResearcher = useSelector(
    (store) => store.submissionForm.additionalResearcher
  );
  console.log(formData, currentPage);

  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      ...formData,
    },
  });

  async function processForm(data) {
    dispatch(updateFormData(data));
    dispatch(setCurrentStep(currentPage + 1));
  }

  const handlePrevious = () => {
    dispatch(setCurrentStep(currentPage - 1));
  };

  //add a researcher
  const handleAddResearcher = () => {
    dispatch(addResearcher());
  };

  //dispatching reducers from store
  // async function processForm(data){
  //   dispatch (updateFormData(data));
  //   try {
  //   const response = await fetch("/api/forms", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),  // Use the data from react-hook-form
  //   });

  //   console.log(response);
  // } catch (error) {
  //   console.error("Error submitting form:", error);
  // }
  // }

  // const handleFormSubmission = async (e) => {

  const handleProcessData = (data, index) => {
    // Update the form data in Redux for the specific researcher by index
    const updatedData = {
      additionalFullName: data[`additionalFullName${index + 1}`],
      additionalEmail: data[`additionalEmail${index + 1}`],
      additionalPhone: data[`additionalPhone${index + 1}`],
      additionalInstitutionAffiliation:
        data[`additionalInstitutionAffiliation${index + 1}`],
    };

    dispatch(updateFormData({ additionalResearcher: updatedData }));
  };

  return (
    <div>
      <Helmet>
        <title>Submission Forms</title>
        <style>{"body { background-color: #ECF0F1; }"}</style>
      </Helmet>
      <Container className="PIforms-cont1">
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit(processForm)}
        >
          <h1 className="PIforms-headtext">1. Researcher Information</h1>

          <Container className="PIforms-rescont2">
            <Row>
              <h1 className="PIforms-resconthead">Primary Researcher</h1>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">Full Name</FormLabel>
                <FormControl
                  {...register("fullName")}
                  type="text"
                  className="form-control PIforms-formtext2"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a name.
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">Email</FormLabel>
                <FormControl
                  {...register("email")}
                  type="email"
                  className="form-control PIforms-formtext2"
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
                  {...register("phone")}
                  type="tel"
                  className="form-control PIforms-formtext2"
                  required
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
                  {...register("institutionAffiliation")}
                  type="text"
                  className="form-control PIforms-formtext2"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your institutional affiliation.
                </Form.Control.Feedback>
              </Col>
            </Row>

            {/* additional researcher  */}
            <Container className="PIforms-rescont2">
              <Row>
                <h1 className="PIforms-resconthead">Additional Researcher</h1>
              </Row>

              <Row>
                <Col xs={12} md={6}>
                  <FormLabel className="PIforms-formtext2">Full Name</FormLabel>
                  <FormControl
                    {...register("additionalFullName")}
                    type="text"
                    className="form-control PIforms-formtext2"
                  />
                </Col>

                <Col xs={12} md={6}>
                  <FormLabel className="PIforms-formtext2">Email</FormLabel>
                  <FormControl
                    {...register("additionalEmail")}
                    type="email"
                    className="form-control PIforms-formtext2"
                  />
                </Col>

                <Col xs={12} md={6}>
                  <FormLabel className="PIforms-formtext2">
                    Phone Number
                  </FormLabel>
                  <FormControl
                    {...register("additionalPhone")}
                    type="number"
                    className="form-control PIforms-formtext2"
                  />
                </Col>

                <Col xs={12} md={6}>
                  <FormLabel className="PIforms-formtext2">
                    Institutional Affiliation
                  </FormLabel>
                  <FormControl
                    {...register("additionalInstitutionAffiliation")}
                    type="text"
                    className="form-control PIforms-formtext2"
                  />
                </Col>
              </Row>

              <Row
                style={{ marginTop: "20px", paddingBottom: "20px" }}
                className="justify-content-around"
              >
                {additionalResearcher.map((_, index) => (
                  <AdditionalResearcher
                    register={register} // Pass the register method here
                    index={index} // Pass the index to register unique inputs
                    key={index}
                    addResearcher={addResearcher}
                  />
                ))}

                <Button variant="outline-secondary" className="PIforms-formbtn">
                  Cancel
                </Button>
                <Button
                  variant="outline-warning"
                  className="PIforms-formbtn"
                  onClick={handleAddResearcher}
                >
                  Add Researcher
                </Button>
              </Row>
            </Container>

            <hr></hr>
            <h1 className="PIforms-headtext">2. Title and Summary Proposal</h1>

            <Container className="PIforms-rescont2">
              <Row>
                <h1 className="PIforms-resconthead">Research Proposal</h1>
              </Row>
              <Row>
                <Col xs={12}>
                  <FormLabel className="PIforms-formtext3">Title</FormLabel>
                  <FormControl
                    {...register("title")}
                    type="text"
                    className="form-control PIforms-formtext3"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a title.
                  </Form.Control.Feedback>
                </Col>

                <Col xs={12}>
                  <FormLabel className="PIforms-formtext3">
                    Background
                  </FormLabel>
                  <FormControl
                    {...register("background")}
                    as="textarea"
                    className="form-control PIforms-formtext3"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a background.
                  </Form.Control.Feedback>
                </Col>

                <Col xs={12}>
                  <FormLabel className="PIforms-formtext3">
                    Objectives
                  </FormLabel>
                  <FormControl
                    {...register("objectives")}
                    as="textarea"
                    className="form-control PIforms-formtext3"
                    required
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
                    {...register("expectedOutcomes")}
                    as="textarea"
                    className="form-control PIforms-formtext3"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide expected outcomes and use of result.
                  </Form.Control.Feedback>
                </Col>

                <Col xs={12}>
                  <FormLabel className="PIforms-formtext3">Keywords</FormLabel>
                  <FormControl
                    {...register("keywords")}
                    type="text"
                    className="form-control PIforms-formtext3"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide keywords.
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Container>

            <hr></hr>
            <h1 className="PIforms-headtext">3. Proposal Details</h1>

            <Container className="PIforms-rescont2">
              <Row>
                <h1 className="PIforms-resconthead">Proposal Details</h1>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <FormLabel className="PIforms-formtext2">
                    Study Type
                  </FormLabel>
                  <FormSelect
                    {...register("studyType")}
                    required
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
                  <FormLabel className="PIforms-formtext2">
                    Start Date
                  </FormLabel>
                  <FormControl
                    {...register("startDate")}
                    type="date"
                    className="form-control PIforms-formtext2"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a start date.
                  </Form.Control.Feedback>
                </Col>

                <Col xs={12} md={6}>
                  <FormLabel className="PIforms-formtext2">End Date</FormLabel>
                  <FormControl
                    {...register("endDate")}
                    type="date"
                    className="form-control PIforms-formtext2"
                    required
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
                    {...register("primarySponsor")}
                    type="text"
                    className="form-control PIforms-formtext2"
                    required
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
                    {...register("secondarySponsor")}
                    type="text"
                    className="form-control PIforms-formtext2"
                    required
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
                    {...register("multiCountryResearch")}
                    type="text"
                    className="form-control PIforms-formtext2"
                    required
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
                    {...register("multiSiteResearch")}
                    type="text"
                    className="form-control PIforms-formtext2"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please specify if it involves multi-site research.
                  </Form.Control.Feedback>
                </Col>

                <Col xs={12} md={6}>
                  <FormLabel className="PIforms-formtext2">Region</FormLabel>
                  <FormControl
                    {...register("region")}
                    type="text"
                    className="form-control PIforms-formtext2"
                    required
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
                    {...register("researchField")}
                    type="text"
                    className="form-control PIforms-formtext2"
                    required
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
                    {...register("involvesHumanSubjects")}
                    type="text"
                    className="form-control PIforms-formtext2"
                    required
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
                    {...register("proposalType")}
                    type="text"
                    className="form-control PIforms-formtext2"
                    required
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
                    {...register("dataCollection")}
                    type="text"
                    className="form-control PIforms-formtext2"
                    required
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
                    {...register("proposalReviewedByOtherCommittee")}
                    required
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
                    {...register("monetarySource")}
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
                    Amount in Philippine Peso
                  </FormLabel>
                  <FormControl
                    {...register("amountInPHP")}
                    type="text"
                    className="form-control PIforms-formtext2"
                    required
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
                    {...register("otherSource")}
                    type="text"
                    className="form-control PIforms-formtext2"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide another source of funding.
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Container>

            <Row
              style={{ marginTop: "20px", paddingBottom: "20px" }}
              className="justify-content-around"
            >
              <Button
                variant="outline-secondary"
                className="PIforms-formbtn"
                onClick={handlePrevious}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="outline-warning"
                className="PIforms-formbtn"
              >
                Save & Continue
              </Button>
            </Row>
          </Container>

          {/* additional forms */}
          {/* <hr />

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
          </Row> */}
        </Form>
      </Container>
    </div>
  );
}

export default SubmissionFormsP2;
