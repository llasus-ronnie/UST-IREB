"use client";

import React, { use, useState, useEffect } from "react";
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

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...formData,
    },
  });

  async function processForm(data) {
    dispatch(updateFormData(data));
    dispatch(setCurrentStep(currentPage + 1));
    console.log(data);
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
                <Form.Group controlId="fullName">
                  <FormLabel className="PIforms-formtext2">Full Name</FormLabel>
                  <FormControl
                    {...register("fullName", {
                      required: "Please provide a name.",
                    })}
                    type="text"
                    className="form-control PIforms-formtext2"
                    isInvalid={!!errors.fullName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="email">
                  <FormLabel className="PIforms-formtext2">Email</FormLabel>
                  <FormControl
                    {...register("email", {
                      required: "Please provide an email.",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Please provide a valid email address.",
                      },
                    })}
                    type="email"
                    className="form-control PIforms-formtext2"
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Phone Number
                </FormLabel>
                <FormControl
                  {...register("phone", {
                    required: "Please provide a valid phone number.",
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "Please provide a valid phone number.",
                    },
                  })}
                  type="number"
                  className="form-control PIforms-formtext2"
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone?.message}
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Institutional Affiliation
                </FormLabel>
                <FormControl
                  {...register("institutionAffiliation", {
                    required: "Please provide your institutional affiliation.",
                  })}
                  type="text"
                  className="form-control PIforms-formtext2"
                  isInvalid={!!errors.institutionAffiliation}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.institutionAffiliation?.message}
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Container>

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
                <Form.Group controlId="title">
                  <FormLabel className="PIforms-formtext3">Title</FormLabel>
                  <FormControl
                    {...register("title", {
                      required: "Please provide a title.",
                    })}
                    type="text"
                    className="form-control PIforms-formtext3"
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group controlId="background">
                  <FormLabel className="PIforms-formtext3">
                    Background
                  </FormLabel>
                  <FormControl
                    {...register("background", {
                      required: "Please provide a background.",
                    })}
                    as="textarea"
                    className="form-control PIforms-formtext3"
                    isInvalid={!!errors.background}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.background?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group controlId="objectives">
                  <FormLabel className="PIforms-formtext3">
                    Objectives
                  </FormLabel>
                  <FormControl
                    {...register("objectives", {
                      required: "Please provide objectives.",
                    })}
                    as="textarea"
                    className="form-control PIforms-formtext3"
                    isInvalid={!!errors.objectives}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.objectives?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group controlId="expectedOutcomes">
                  <FormLabel className="PIforms-formtext3">
                    Expected Outcomes and Use of Result
                  </FormLabel>
                  <FormControl
                    {...register("expectedOutcomes", {
                      required:
                        "Please provide expected outcomes and use of result.",
                    })}
                    as="textarea"
                    className="form-control PIforms-formtext3"
                    isInvalid={!!errors.expectedOutcomes}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.expectedOutcomes?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group controlId="keywords">
                  <FormLabel className="PIforms-formtext3">Keywords</FormLabel>
                  <FormControl
                    {...register("keywords", {
                      required: "Please provide keywords.",
                    })}
                    type="text"
                    className="form-control PIforms-formtext3"
                    isInvalid={!!errors.keywords}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.keywords?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Container>

          <hr></hr>
          <h1 className="PIforms-headtext">
            3. Proposal Details <br />{" "}
            <i style={{ fontSize: "15px", color: "grey" }}>
              Put N/A if not applicable.
            </i>
          </h1>

          <Container className="PIforms-rescont2">
            <Row>
              <h1 className="PIforms-resconthead">Proposal Details</h1>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="studyType">
                  <FormLabel className="PIforms-formtext2">
                    Study Type
                  </FormLabel>
                  <FormSelect
                    {...register("studyType", {
                      required: "Please select a study type.",
                    })}
                    className="PIforms-formtext2"
                    isInvalid={!!errors.studyType}
                  >
                    <option value="">Select...</option>
                    <option>Qualitative</option>
                    <option>Quantitative</option>
                    <option>Mixed Methods</option>
                  </FormSelect>
                  <Form.Control.Feedback type="invalid">
                    {errors.studyType?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="startDate">
                  <FormLabel className="PIforms-formtext2">
                    Start Date
                  </FormLabel>
                  <FormControl
                    {...register("startDate", {
                      required: "Please provide a start date.",
                    })}
                    type="date"
                    className="form-control PIforms-formtext2"
                    isInvalid={!!errors.startDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.startDate?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="endDate">
                  <FormLabel className="PIforms-formtext2">End Date</FormLabel>
                  <FormControl
                    {...register("endDate", {
                      required: "Please provide an end date.",
                    })}
                    type="date"
                    className="form-control PIforms-formtext2"
                    isInvalid={!!errors.endDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.endDate?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="primarySponsor">
                  <FormLabel className="PIforms-formtext2">
                    Primary Sponsor
                  </FormLabel>
                  <FormControl
                    {...register("primarySponsor", {
                      required: "Please provide a primary sponsor.",
                    })}
                    type="text"
                    className="form-control PIforms-formtext2"
                    isInvalid={!!errors.primarySponsor}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.primarySponsor?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="secondarySponsor">
                  <FormLabel className="PIforms-formtext2">
                    Secondary Sponsor
                  </FormLabel>
                  <FormControl
                    {...register("secondarySponsor", {
                      required: "Please provide a secondary sponsor.",
                    })}
                    type="text"
                    className="form-control PIforms-formtext2"
                    isInvalid={!!errors.secondarySponsor}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.secondarySponsor?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="multiCountryResearch">
                  <FormLabel className="PIforms-formtext2">
                    Multi-country Research
                  </FormLabel>
                  <FormControl
                    {...register("multiCountryResearch", {
                      required:
                        "Please specify if it involves multi-country research.",
                    })}
                    type="text"
                    className="form-control PIforms-formtext2"
                    isInvalid={!!errors.multiCountryResearch}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.multiCountryResearch?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="multiSiteResearch">
                  <FormLabel className="PIforms-formtext2">
                    Multi-site Research
                  </FormLabel>
                  <FormControl
                    {...register("multiSiteResearch", {
                      required:
                        "Please specify if it involves multi-site research.",
                    })}
                    type="text"
                    className="form-control PIforms-formtext2"
                    isInvalid={!!errors.multiSiteResearch}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.multiSiteResearch?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="region">
                  <FormLabel className="PIforms-formtext2">Region</FormLabel>
                  <FormControl
                    {...register("region", {
                      required: "Please provide a region.",
                    })}
                    type="text"
                    className="form-control PIforms-formtext2"
                    isInvalid={!!errors.region}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.region?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="researchField">
                  <FormLabel className="PIforms-formtext2">
                    Research Field
                  </FormLabel>
                  <FormControl
                    {...register("researchField", {
                      required: "Please provide a research field.",
                    })}
                    type="text"
                    className="form-control PIforms-formtext2"
                    isInvalid={!!errors.researchField}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.researchField?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="involvesHumanSubjects">
                  <FormLabel className="PIforms-formtext2">
                    Involves Human Subjects
                  </FormLabel>
                  <FormControl
                    {...register("involvesHumanSubjects", {
                      required: "Please specify if it involves human subjects.",
                    })}
                    type="text"
                    className="form-control PIforms-formtext2"
                    isInvalid={!!errors.involvesHumanSubjects}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.involvesHumanSubjects?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="proposalType">
                  <FormLabel className="PIforms-formtext2">
                    Proposal Type
                  </FormLabel>
                  <FormControl
                    {...register("proposalType", {
                      required: "Please provide a proposal type.",
                    })}
                    type="text"
                    className="form-control PIforms-formtext2"
                    isInvalid={!!errors.proposalType}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.proposalType?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="dataCollection">
                  <FormLabel className="PIforms-formtext2">
                    Data Collection
                  </FormLabel>
                  <FormControl
                    {...register("dataCollection", {
                      required: "Please specify the data collection method.",
                    })}
                    type="text"
                    className="form-control PIforms-formtext2"
                    isInvalid={!!errors.dataCollection}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dataCollection?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="proposalReviewedByOtherCommittee">
                  <FormLabel className="PIforms-formtext2">
                    Proposal Reviewed by Other Committee?
                  </FormLabel>
                  <FormSelect
                    {...register("proposalReviewedByOtherCommittee", {
                      required:
                        "Please specify if the proposal has been reviewed by another committee.",
                    })}
                    className="PIforms-formtext2"
                    isInvalid={!!errors.proposalReviewedByOtherCommittee}
                  >
                    <option value="">Select...</option>
                    <option>Yes</option>
                    <option>No</option>
                  </FormSelect>
                  <Form.Control.Feedback type="invalid">
                    {errors.proposalReviewedByOtherCommittee?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="monetarySource">
                  <FormLabel className="PIforms-formtext2">
                    Monetary Source
                  </FormLabel>
                  <FormControl
                    {...register("monetarySource1", {
                      required: "Please provide a monetary source.",
                    })}
                    type="text"
                    className="form-control PIforms-formtext2"
                    isInvalid={!!errors.monetarySource1}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.monetarySource1?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="amountInPHP">
                  <FormLabel className="PIforms-formtext2">
                    Amount in Philippine Peso
                  </FormLabel>
                  <FormControl
                    {...register("amountInPHP", {
                      required: "Please provide the amount in Philippine Peso.",
                    })}
                    type="number"
                    className="form-control PIforms-formtext2"
                    isInvalid={!!errors.amountInPHP}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.amountInPHP?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="otherSource">
                  <FormLabel className="PIforms-formtext2">
                    Other Source
                  </FormLabel>
                  <FormControl
                    {...register("otherSource", {
                      required: "Please provide another source of funding.",
                    })}
                    type="text"
                    className="form-control PIforms-formtext2"
                    isInvalid={!!errors.otherSource}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.otherSource?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Container>

          <hr />

          <h1 className="PIforms-headtext">
            4. Sources of Monetary or Material Support <br />{" "}
            <i style={{ fontSize: "15px", color: "grey" }}>
              Put N/A and 0 if not applicable.
            </i>
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
                  {...register("monetarySource2", {
                    required: "Please provide a monetary source.",
                  })}
                  type="text"
                  className="form-control PIforms-formtext2"
                  isInvalid={!!errors.monetarySource2}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.monetarySource2?.message}
                </Form.Control.Feedback>
              </Col>

              <Col xs={12} md={6}>
                <FormLabel className="PIforms-formtext2">
                  Amount in Philippine Peso (Php)
                </FormLabel>
                <FormControl
                  {...register("amountInPHP", {
                    required: "Please provide an amount.",
                  })}
                  type="number"
                  className="form-control PIforms-formtext2"
                  isInvalid={!!errors.amountInPHP}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.amountInPHP?.message}
                </Form.Control.Feedback>
              </Col>

              {/* tbf */}
              {/* <Row
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
              </Row> */}
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
                      {...register("identity", {
                        required:
                          "Please specify if the identity may be revealed.",
                      })}
                      type="radio"
                      name="identity"
                      value="Yes"
                      isInvalid={!!errors.identity}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register("identity", {
                        required:
                          "Please specify if the identity may be revealed.",
                      })}
                      type="radio"
                      name="identity"
                      value="No"
                      isInvalid={!!errors.identity}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Unable to consent?</td>
                  <td>
                    <Form.Check
                      {...register("consent", {
                        required:
                          "Please specify if the subject is unable to consent.",
                      })}
                      type="radio"
                      name="consent"
                      value="Yes"
                      isInvalid={!!errors.consent}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register("consent", {
                        required:
                          "Please specify if the subject is unable to consent.",
                      })}
                      type="radio"
                      name="consent"
                      value="No"
                      isInvalid={!!errors.consent}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Under 18 years old?</td>
                  <td>
                    <Form.Check
                      {...register("under18", {
                        required:
                          "Please specify if the subject is under 18 years old.",
                      })}
                      type="radio"
                      name="under18"
                      value="Yes"
                      isInvalid={!!errors.under18}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register("under18", {
                        required:
                          "Please specify if the subject is under 18 years old.",
                      })}
                      type="radio"
                      name="under18"
                      value="No"
                      isInvalid={!!errors.under18}
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
                      {...register("dependent", {
                        required:
                          "Please specify if the subject is in a dependent relationship.",
                      })}
                      type="radio"
                      name="dependent"
                      value="Yes"
                      isInvalid={!!errors.dependent}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register("dependent", {
                        required:
                          "Please specify if the subject is in a dependent relationship.",
                      })}
                      type="radio"
                      name="dependent"
                      value="No"
                      isInvalid={!!errors.dependent}
                    />
                  </td>
                </tr>
                <tr>
                  <td>From an ethnic minority group?</td>
                  <td>
                    <Form.Check
                      {...register("ethnic", {
                        required: "Please specify if the subject is from.",
                      })}
                      type="radio"
                      name="ethnic"
                      value="Yes"
                      isInvalid={!!errors.ethnic}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register("ethnic", {
                        required: "Please specify if the subject is from.",
                      })}
                      type="radio"
                      name="ethnic"
                      value="No"
                      isInvalid={!!errors.ethnic}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Wtih intellectual or mental impairment?</td>
                  <td>
                    <Form.Check
                      {...register("intellectual", {
                        required:
                          "Please specify if the subject has an impairment.",
                      })}
                      type="radio"
                      name="intellectual"
                      value="Yes"
                      isInvalid={!!errors.intellectual}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register("intellectual", {
                        required:
                          "Please specify if the subject has an impairment.",
                      })}
                      type="radio"
                      name="intellectual"
                      value="No"
                      isInvalid={!!errors.intellectual}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Who are pregnant?</td>
                  <td>
                    <Form.Check
                      {...register("pregnant", {
                        required: "Please specify if the subject is pregnant.",
                      })}
                      type="radio"
                      name="pregnant"
                      value="Yes"
                      isInvalid={!!errors.pregnant}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register("pregnant", {
                        required: "Please specify if the subject is pregnant.",
                      })}
                      type="radio"
                      name="pregnant"
                      value="No"
                      isInvalid={!!errors.pregnant}
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
                      {...register("treatment", {
                        required:
                          "Please specify if it includes a new treatment.",
                      })}
                      type="radio"
                      name="treatment"
                      value="Yes"
                      isInvalid={!!errors.treatment}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register("treatment", {
                        required:
                          "Please specify if it includes a new treatment.",
                      })}
                      type="radio"
                      name="treatment"
                      value="No"
                      isInvalid={!!errors.treatment}
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
                      {...register("biological", {
                        required:
                          "Please specify if it includes collection of biological samples.",
                      })}
                      type="radio"
                      name="biological"
                      value="Yes"
                      isInvalid={!!errors.biological}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register("biological", {
                        required:
                          "Please specify if it includes collection of biological samples.",
                      })}
                      type="radio"
                      name="biological"
                      value="No"
                      isInvalid={!!errors.biological}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Use of ionizing radiation?</td>
                  <td>
                    <Form.Check
                      {...register("radiation", {
                        required:
                          "Please specify if it uses ionizing radiation.",
                      })}
                      type="radio"
                      name="radiation"
                      value="Yes"
                      isInvalid={!!errors.radiation}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register("radiation", {
                        required:
                          "Please specify if it uses ionizing radiation.",
                      })}
                      type="radio"
                      name="radiation"
                      value="No"
                      isInvalid={!!errors.radiation}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Pain or psychological distress?</td>
                  <td>
                    <Form.Check
                      {...register("distress", {
                        required: "Please specify if it causes distress.",
                      })}
                      type="radio"
                      name="distress"
                      value="Yes"
                      isInvalid={!!errors.distress}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register("distress", {
                        required: "Please specify if it causes distress.",
                      })}
                      type="radio"
                      name="distress"
                      value="No"
                      isInvalid={!!errors.distress}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Inducements?</td>
                  <td>
                    <Form.Check
                      {...register("inducements", {
                        required: "Please specify if it includes inducements.",
                      })}
                      type="radio"
                      name="inducements"
                      value="Yes"
                      isInvalid={!!errors.inducements}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register("inducements", {
                        required: "Please specify if it includes inducements.",
                      })}
                      type="radio"
                      name="inducements"
                      value="No"
                      isInvalid={!!errors.inducements}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Collection of sensitive information?</td>
                  <td>
                    <Form.Check
                      {...register("sensitive", {
                        required:
                          "Please specify if it includes collection of sensitive information.",
                      })}
                      type="radio"
                      name="sensitive"
                      value="Yes"
                      isInvalid={!!errors.sensitive}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register("sensitive", {
                        required:
                          "Please specify if it includes collection of sensitive information.",
                      })}
                      type="radio"
                      name="sensitive"
                      value="No"
                      isInvalid={!!errors.sensitive}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Deception?</td>
                  <td>
                    <Form.Check
                      {...register("deception", {
                        required: "Please specify if it includes deception.",
                      })}
                      type="radio"
                      name="deception"
                      value="Yes"
                      isInvalid={!!errors.deception}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register("deception", {
                        required: "Please specify if it includes deception.",
                      })}
                      type="radio"
                      name="deception"
                      value="No"
                      isInvalid={!!errors.deception}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Assisted reproductive technology?</td>
                  <td>
                    <Form.Check
                      {...register("reproductive", {
                        required:
                          "Please specify if it includes assisted reproductive technology.",
                      })}
                      type="radio"
                      name="reproductive"
                      value="Yes"
                      isInvalid={!!errors.reproductive}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register("reproductive", {
                        required:
                          "Please specify if it includes assisted reproductive technology.",
                      })}
                      type="radio"
                      name="reproductive"
                      value="No"
                      isInvalid={!!errors.reproductive}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Human genetic or genomic studies?</td>
                  <td>
                    <Form.Check
                      {...register("genetic", {
                        required:
                          "Please specify if it includes genetic studies.",
                      })}
                      type="radio"
                      name="genetic"
                      value="Yes"
                      isInvalid={!!errors.genetic}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register("genetic", {
                        required:
                          "Please specify if it includes genetic studies.",
                      })}
                      type="radio"
                      name="genetic"
                      value="No"
                      isInvalid={!!errors.genetic}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Stemcell research?</td>
                  <td>
                    <Form.Check
                      {...register("stemcell", {
                        required:
                          "Please specify if it includes stemcell research.",
                      })}
                      type="radio"
                      name="stemcell"
                      value="Yes"
                      isInvalid={!!errors.stemcell}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register("stemcell", {
                        required:
                          "Please specify if it includes stemcell research.",
                      })}
                      type="radio"
                      name="stemcell"
                      value="No"
                      isInvalid={!!errors.stemcell}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Biosafety issue?</td>
                  <td>
                    <Form.Check
                      {...register("biosafety", {
                        required:
                          "Please specify if it includes biosafety issues.",
                      })}
                      type="radio"
                      name="biosafety"
                      value="Yes"
                      isInvalid={!!errors.biosafety}
                    />
                  </td>
                  <td>
                    <Form.Check
                      {...register("biosafety", {
                        required:
                          "Please specify if it includes biosafety issues.",
                      })}
                      type="radio"
                      name="biosafety"
                      value="No"
                      isInvalid={!!errors.biosafety}
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
                <FormSelect
                  className="PIforms-select2"
                  {...register("riskLevel", {
                    required: "Please select the level of risk.",
                  })}
                  isInvalid={!!errors.riskLevel}
                >
                  <option value="Minimal">Minimal</option>
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </FormSelect>
                <Form.Control.Feedback type="invalid">
                  Please select the level of risk.
                </Form.Control.Feedback>

                <br />

                <p>Risks apply to</p>
                <Form.Check
                  type="checkbox"
                  label="Research Team"
                  {...register("researchTeam")}
                  value="Yes"
                />
                <Form.Check
                  type="checkbox"
                  label="Research Subjects"
                  {...register("researchSubjects")}
                  value="Yes"
                />
                <Form.Check
                  type="checkbox"
                  label="Wider Community"
                  {...register("widerCommunity")}
                  value="Yes"
                />
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
                          value="Yes"
                          {...register("multiInstitutional", {
                            required:
                              "Please specify if it is a multi-institutional project.",
                          })}
                          isInvalid={!!errors.multiInstitutional}
                        />
                      </td>
                      <td>
                        <Form.Check
                          inline
                          type="radio"
                          label="No"
                          name="multi"
                          value="No"
                          {...register("multiInstitutional", {
                            required:
                              "Please specify if it is a multi-institutional project.",
                          })}
                          isInvalid={!!errors.multiInstitutional}
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
                          value="Yes"
                          {...register("conflictInterest", {
                            required:
                              "Please specify if there is a conflict of interest.",
                          })}
                          isInvalid={!!errors.conflictInterest}
                        />
                      </td>
                      <td>
                        <Form.Check
                          inline
                          type="radio"
                          label="No"
                          name="interest"
                          value="No"
                          {...register("conflictInterest", {
                            required:
                              "Please specify if there is a conflict of interest.",
                          })}
                          isInvalid={!!errors.conflictInterest}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>

                <Form.Check
                  type="checkbox"
                  label="Direct benefit from participants"
                  {...register("benefitParticipants")}
                  value="Yes"
                />
                <Form.Check
                  type="checkbox"
                  label="Generalizable knowledge about participants’ condition or disorder"
                  {...register("generalizableKnowledge")}
                  value="Yes"
                />
                <Form.Check
                  type="checkbox"
                  label="Generalizable knowledge about diseases or condition under study"
                  {...register("generalizableKnowledgeDisease")}
                  value="Yes"
                />
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
        </Form>
      </Container>
    </div>
  );
}

export default SubmissionFormsP2;
