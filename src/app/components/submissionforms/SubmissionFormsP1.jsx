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
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  updateFormData,
  setCurrentStep,
} from "../../../redux/slices/submissionFormSlice";

function SubmissionFormsP1() {
  const [validated, setValidated] = useState(false);
  const [showTextbox, setShowTextbox] = useState(false);

  const dispatch = useDispatch();

  const currentStep = useSelector((store) => store.submissionForm.currentStep);
  const formData = useSelector((store) => store.submissionForm.formData);
  console.log(formData, currentStep);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...formData,
    },
  });

  async function processForm(data) {
    dispatch(updateFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
  }

  // const handleFormSubmission = async (e) => {
  //   // Log formData before submission
  //   console.log('Submitting formData:', formData);
  //   dispatch(updateFormData(formData));

  //   try {
  //     const response = await fetch("/api/forms", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),  // Use the data from react-hook-form
  //     });

  //     console.log("Form submitted successfully");
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }

  // };

  return (
    <div>
      <Container className="PIforms-cont1">
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

        {/* forms */}
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit(processForm)}
        >
          <Container className="PIforms-rescont">
            <Row>
              <h1 className="PIforms-resconthead">Research Classification</h1>
            </Row>

            {/* institution */}
            <Row>
              <FormLabel className="PIforms-formtext">Institution</FormLabel>
              <FormSelect
                {...register("institution")}
                className="form-control PIforms-select"
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

              {/* research ethics committee */}
              <FormLabel className="PIforms-formtext">
                Research Ethics Committee
              </FormLabel>
              <FormSelect
                {...register("researchEthicsCommittee")}
                className="form-control PIforms-select"
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

          {/* checkboxes */}
          <Container className="PIforms-checkcont">
            <Row className="justify-content-center">
              <Col md="8">
                <Form.Group controlId="agreeSoftCopies">
                  <FormCheck
                    {...register("agreeSoftCopies", {
                      required: "You must agree to provide soft copies.",
                    })}
                    type="checkbox"
                    className="PIforms-formcheck"
                    label="I agree to provide soft copies of the protocol and supplementary files of my research."
                    isInvalid={!!errors.agreeSoftCopies}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.agreeSoftCopies?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="understandSubmission">
                  <FormCheck
                    {...register("understandSubmission", {
                      required: "You must understand the submission process.",
                    })}
                    type="checkbox"
                    className="PIforms-formcheck"
                    label="I understand that this submission will be forwarded to a REC for review"
                    isInvalid={!!errors.understandSubmission}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.understandSubmission?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="understandConfidentiality">
                  <FormCheck
                    {...register("understandConfidentiality", {
                      required:
                        "You must understand the confidentiality terms.",
                    })}
                    type="checkbox"
                    className="PIforms-formcheck"
                    label="I understand that my research will be monitored by UST IREB and will be treated with confidentiality."
                    isInvalid={!!errors.understandConfidentiality}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.understandConfidentiality?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Container>

          {/* buttons */}
          <Row
            style={{ marginTop: "20px", paddingBottom: "20px" }}
            className="justify-content-evenly"
          >
            <Button
              href="/"
              variant="outline-secondary"
              className="PIforms-formbtn"
            >
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
