"use client";

import React, { use, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import StepBar from "../stepbar/StepBar";
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
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {updateFormData, setCurrentStep, addResearcher} from "../../../redux/slices/submissionFormSlice";
import AdditionalResearcher from "./AdditionalResearcher";




function SubmissionFormsP2() {
  //form validation
  const [validated, setValidated] = useState(false);

  //dispatch function
  const dispatch = useDispatch();

  //initial states from store
  const currentPage = useSelector((store) => store.submissionForm.currentStep);
  const formData = useSelector((store) => store.submissionForm.formData);
  const additionalResearcher = useSelector((store) => store.submissionForm.additionalResearcher);
  console.log(formData, currentPage);

  const {
    handleSubmit,
    register,
    watch
  } = useForm({
    defaultValues: {
      ...formData
    }
  });

  // async function processForm(data){
  //   dispatch (updateFormData(data));
  //   dispatch(setCurrentStep(currentPage+1));
  // }

  const handlePrevious = () => {
    dispatch(setCurrentStep(currentPage - 1));
  };

  //add a researcher
  const handleAddResearcher = () => {
    dispatch(addResearcher());
  }

    //dispatching reducers from store
    async function processForm(data){
      dispatch (updateFormData(data));
      try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),  // Use the data from react-hook-form
      });

      console.log(response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    }
  
  // const handleFormSubmission = async (e) => {  

  

  const handleProcessData = (data, index) => {
    // Update the form data in Redux for the specific researcher by index
    const updatedData = {
      additionalFullName: data[`additionalFullName${index + 1}`],
      additionalEmail: data[`additionalEmail${index + 1}`],
      additionalPhone: data[`additionalPhone${index + 1}`],
      additionalInstitutionAffiliation: data[`additionalInstitutionAffiliation${index + 1}`],
    };
    
    dispatch(updateFormData({ additionalResearcher: updatedData }));
  };
  
  return (
    <div>
      <Helmet>
        <title>Submission Forms</title>
        <style>{"body { background-color: #ECF0F1; }"}</style>
      </Helmet>
      <StepBar currentPage={currentPage} />
      <Container className="cont1">
        <Form noValidate validated={validated} onSubmit={handleSubmit(processForm)}>
          <h1 className="headtext">1. Researcher Information</h1>

          <Container className="rescont2">
            <Row>
              <h1 className="resconthead">Primary Researcher</h1>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <FormLabel className="formtext">Full Name</FormLabel>
                <FormControl
                {...register("fullName")}
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
                {...register("email")}
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
                {...register("phone")}
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
                {...register("institutionAffiliation")}
                  type="text"
                  className="form-control formtext"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your institutional affiliation.
                </Form.Control.Feedback>
              </Col>
            </Row>

            {/* additional researcher  */}
            <Row style={{ marginTop: "20px" }}>
              <h1 className="resconthead">Additional Researcher</h1>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <FormLabel className="formtext">Full Name</FormLabel>
                <FormControl 
                {...register("additionalFullName")}
                type="text" 
                className="form-control formtext"
                />
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">Email</FormLabel>
                <FormControl
                {...register("additionalEmail")}
                  type="email" 
                  className="form-control formtext"
                />
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">Phone Number</FormLabel>
                <FormControl
                {...register("additionalPhone")}
                type="number" 
                className="form-control formtext" 
                />
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="formtext">
                  Institutional Affiliation
                </FormLabel>
                <FormControl
                {...register("additionalInstitutionAffiliation")}
                type="text" 
                className="form-control formtext" 
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

              <Button variant="outline-secondary" className="formbtn">
                Cancel
              </Button>
              <Button
                variant="outline-warning"
                className="formbtn"
                onClick={handleAddResearcher}
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
                {...register("title")}
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
                {...register("background")}
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
                {...register("objectives")}
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
                {...register("expectedOutcomes")}
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
                {...register("keywords")}
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
                <FormSelect
                {...register("studyType")}
                  required
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
                <FormLabel className="formtext">Start Date</FormLabel>
                <FormControl
                {...register("startDate")}
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
                {...register("endDate")}
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
                {...register("primarySponsor")}
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
                {...register("secondarySponsor")}
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
                {...register("multiCountryResearch")}
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
                {...register("multiSiteResearch")}
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
                {...register("region")}
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
                {...register("researchField")}
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
                {...register("involvesHumanSubjects")}
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
                {...register("proposalType")}
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
                {...register("dataCollection")}
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
                <FormLabel className="formtext">Monetary Source</FormLabel>
                <FormControl
                {...register("monetarySource")}
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
                {...register("amountInPHP")}
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
                {...register("otherSource")}
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
              <Button 
              variant="outline-secondary" 
              className="formbtn"
              onClick={handlePrevious}
              >
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
