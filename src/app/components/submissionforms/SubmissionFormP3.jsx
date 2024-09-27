"use client";

import React, { useState } from "react";
import {
  Container,
  Row,
  Form,
  FormLabel,
  FormSelect,
  FormControl,
  Button,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  updateFormData,
  setCurrentStep,
  getFileName,
} from "../../../redux/slices/submissionFormSlice";

function SubmissionFormP3() {
  const [validated, setValidated] = useState(false);
  const currentPage = useSelector((store) => store.submissionForm.currentStep);
  const formData = useSelector((store) => store.submissionForm.formData);
  console.log(formData, currentPage);

  //dispatch function
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
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

    setValue("fileName", fileName);
  }

  //submit the form
  //dispatching reducers from store
  async function processForm(data) {
    dispatch(updateFormData(data));
    dispatch(setCurrentStep(currentPage + 1));

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div>
      <Container className="PIforms-cont1">
        <Form onSubmit={handleSubmit(processForm)}>
          <Row className="justify-content-center">
            <h1 className="PIforms-header">Uploading of Main Proposal File</h1>
            <p className="PIforms-text">
              Please upload the main proposal file for your research submission.
              Ensure that the file type matches the required format <br /> and
              that all necessary information is included before proceeding to
              the next step.
            </p>
          </Row>

          <Container className="PIforms-rescont3">
            <Row>
              <h1 className="PIforms-resconthead">Upload Submission Here</h1>
            </Row>

            <Row>
              <FormLabel className="PIforms-formtext">File Type</FormLabel>
              <FormSelect
                {...register("mainFile", {
                  required: "Please select a file type.",
                })}
                className="form-control PIforms-formtext"
                isInvalid={!!errors.mainFile}
              >
                <option disabled value="">
                  Choose...
                </option>
                <option value="Protocol">Protocol</option>
              </FormSelect>
              <Form.Control.Feedback type="invalid">
                {errors.mainFile?.message}
              </Form.Control.Feedback>

              <FormLabel className="PIforms-formtext">Select File:</FormLabel>
              <FormControl
                {...register("fileUpload", {
                  required: "Please upload a PDF, DOC, or DOCX file.",
                  validate: {
                    acceptedFormats: (files) =>
                      (files[0] &&
                        [
                          "application/pdf",
                          "application/msword",
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                          "text/plain",
                        ].includes(files[0].type)) ||
                      "Please upload a PDF, DOC, DOCX, or TXT file.",
                  },
                })}
                onChange={handleFileChange}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="form-control PIforms-formtext"
                isInvalid={!!errors.fileUpload}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fileUpload?.message}
              </Form.Control.Feedback>
            </Row>
          </Container>

          {/* additional field */}

          <Row className="justify-content-center">
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
              <FormSelect
                className="form-control PIforms-formtext"
                {...register("supplementaryFileType", {
                  required: "Please select a file type.",
                })}
                isInvalid={!!errors.supplementaryFileType}
              >
                {/* <option>Protocol</option> */}
                <option>Supplementary Files</option>
              </FormSelect>
              <Form.Control.Feedback type="invalid">
                {errors.supplementaryFileType?.message}
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
          </Container>

          {/* create button to add more files */}

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
      </Container>
    </div>
  );
}

export default SubmissionFormP3;
