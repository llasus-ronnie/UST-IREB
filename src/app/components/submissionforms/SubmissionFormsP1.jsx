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
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  updateFormData,
  setCurrentStep,
} from "../../../redux/slices/submissionFormSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SubmissionFormsP1() {
  const [validated, setValidated] = useState(false);
  const [showTextbox, setShowTextbox] = useState(false);
  const [recOptions, setRecOptions] = useState([]);

  const dispatch = useDispatch();

  const currentStep = useSelector((store) => store.submissionForm.currentStep);
  const formData = useSelector((store) => store.submissionForm.formData);
  console.log(formData, currentStep);

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...formData,
      researchEthicsCommittee: formData.researchEthicsCommittee
        ? formData.researchEthicsCommittee.replace(/\s+/g, "")
        : "",
    },
  });

  useEffect(() => {
    async function fetchRecOptions() {
      try {
        const response = await axios.get("/api/REC");
        setRecOptions(response.data.data);
      } catch (error) {
        console.error("Error fetching REC options:", error);
      }
    }
    fetchRecOptions();
  }, []);

  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      setValue("userEmail", session.user.email);
    }
  }, [session, setValue]);

  async function processForm(data) {
    if (data.dataPrivacy !== "agree") {
      toast.error("You must agree to the Data Privacy terms to proceed.");
      return;
    }
    const sanitizedData = {
      ...data,
      researchEthicsCommittee: data.researchEthicsCommittee.replace(/\s+/g, ""),
    };

    dispatch(updateFormData(sanitizedData));
    dispatch(setCurrentStep(currentStep + 1));
  }

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
              <h1 className="PIforms-resconthead">Research Ethics Committee</h1>
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
              {errors.researchEthicsCommittee && (
                <p className="PIforms-formtext" style={{ color: "#dc3545" }}>
                  {errors.researchEthicsCommittee.message}
                </p>
              )}
              <FormSelect
                {...register("researchEthicsCommittee", {
                  required: "Please select a research ethics committee.",
                })}
                className="form-control PIforms-select"
                required
              >
                <option disabled value="">
                  Choose...
                </option>
                {recOptions.map((rec) => (
                  <option key={rec._id} value={rec.name}>
                    {rec.name}
                  </option>
                ))}
              </FormSelect>
            </Row>
          </Container>
          <hr></hr>
          <h1 className="PIforms-header">Terms and Conditions</h1>
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

          {/* Data Privacy Part */}

          <hr></hr>
          <h1 className="PIforms-header">Data Privacy</h1>
          <p className="PIforms-dataprivacy-text">
            We value your privacy and are committed to safeguarding the personal
            and research information you provide through this portal. In
            compliance with the Data Privacy Act of 2012, all data submitted
            will be collected, processed, and stored securely for the purposes
            of managing research submissions, evaluations, and related
            activities. <br></br>
          </p>

          {/* Radio Buttons */}
          <Container className="PIforms-checkcont">
            <Row className="justify-content-center">
              <Col md="8">
                <Form.Group controlId="dataPrivacy">
                  <div>
                    <FormCheck
                      {...register("dataPrivacy", {
                        required: "You must select an option.",
                      })}
                      type="radio"
                      value="agree"
                      className="PIforms-formcheck"
                      label="I agree to the collection, processing, and storage of my data as stated in the Data Privacy Act of 2012."
                      isInvalid={!!errors.dataPrivacy}
                    />
                    <FormCheck
                      {...register("dataPrivacy", {
                        required: "You must select an option.",
                      })}
                      type="radio"
                      value="disagree"
                      className="PIforms-formcheck"
                      label="I do not agree to the collection, processing, and storage of my data as stated in the Data Privacy Act of 2012."
                      isInvalid={!!errors.dataPrivacy}
                    />
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {errors.dataPrivacy?.message}
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
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default SubmissionFormsP1;
