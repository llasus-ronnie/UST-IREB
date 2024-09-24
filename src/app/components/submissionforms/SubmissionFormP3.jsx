"use client";

import React, { use, useState } from "react";
import {
  Container,
  Row,
  Form,
  FormLabel,
  FormSelect,
  FormControl,
  Button,
} from "react-bootstrap";

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  updateFormData,
  setCurrentStep,
  getFileName,
} from "../../../redux/slices/submissionFormSlice";
import { useSelector } from "react-redux";

import nextConnect from "next-connect";
import cors from "cors";

function SubmissionFormP3() {
  const [validated, setValidated] = useState(false);
  const currentPage = useSelector((store) => store.submissionForm.currentStep);
  const formData = useSelector((store) => store.submissionForm.formData);
  console.log(formData, currentPage);

  //dispatch function
  const dispatch = useDispatch();

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: {
      ...formData,
    },
  });

  const handlePrevious = () => {
    dispatch(setCurrentStep(currentPage - 1));
  };

  function handleFileChange(event) {
    const file = event.target.files[0];
    const fileName = file.name;
    console.log(fileName);

    dispatch(getFileName(fileName));
    dispatch(updateFormData({ fileName: fileName }));

    setValue("fileName", fileName); // set the value of the fileName field
  }

  //submit the form
  //dispatching reducers from store
  async function processForm(data) {
    dispatch(updateFormData(data));

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Use the data from react-hook-form
      });

      console.log(response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div>
      <Container className="PIforms-cont1">
        <Row className="justify-content-center">
          <h1 className="PIforms-header">
            Uploading of Supplementary Materials
          </h1>
          <p className="PIforms-text">
            Please upload the main proposal file for your research submission.
            Ensure that the file type matches the required format <br /> and
            that all necessary information is included before proceeding to the
            next step.
          </p>
        </Row>

        <Container className="PIforms-rescont3">
          <Row>
            <h1 className="PIforms-resconthead">Upload Submission Here</h1>
          </Row>
          <Row>
            <Form onSubmit={handleSubmit(processForm)}>
              <FormLabel className="PIforms-formtext">File Type:</FormLabel>
              <Form.Select
                {...register("fileType")}
                className="form-control PIforms-formtext"
                required
              >
                <option>Protocol</option>
                <option>Supplementary Files</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a file type.
              </Form.Control.Feedback>

              <FormLabel className="PIforms-formtext">Select File:</FormLabel>
              <FormControl
                onChange={handleFileChange}
                type="file"
                // accept=".pdf,.doc,.docx,.txt"
                className="form-control PIforms-formtext"
              />
              <Form.Control.Feedback type="invalid">
                Please upload a PDF, DOC, or DOCX file.
              </Form.Control.Feedback>

              {/* additional field */}

              {/* <Row className="justify-content-center">
            <h1 className="PIforms-header">
              Uploading of Supplementary Materials
            </h1>
            <p className="PIforms-text">
              Please upload the supplementary files for your research
              submission. Ensure that the file type matches the <br /> required
              format and that all necessary information is included before
              submitting.
            </p>
          </Row>

          <Container className="PIforms-rescont3">
            <Row>
              <h1 className="PIforms-resconthead">Upload Submission Here:</h1>
            </Row>
            <Row>
              <FormLabel className="PIforms-formtext">File Type:</FormLabel>
              <Form.Select className="form-control PIforms-formtext" required>
                <option>Protocol</option>
                <option>Supplementary Files</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a file type.
              </Form.Control.Feedback>

              <FormLabel className="PIforms-formtext">Select File:</FormLabel>
              <FormControl
                type="file"
                id="fileInput"
                accept=".pdf,.doc,.docx,.txt"
                className="form-control PIforms-formtext PIforms-file"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please upload a PDF, DOC, or DOCX file.
              </Form.Control.Feedback>
            </Row>
          </Container> */}

              <Row
                style={{ marginTop: "20px", paddingBottom: "20px" }}
                className="justify-content-around"
              >
                <Button
                  variant="outline-secondary"
                  className="PIforms-formbtn"
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
                <Button
                  type="submit"
                  variant="outline-warning"
                  className="PIforms-formbtn"
                >
                  Submit
                </Button>
              </Row>
            </Form>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default SubmissionFormP3;
