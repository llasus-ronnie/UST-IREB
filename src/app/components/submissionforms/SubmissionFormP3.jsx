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
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import "../../styles/forms/Forms.css";

import ConfirmSubmissionModal from "../../components/modals/ConfirmSubmissionModal";

function SubmissionFormP3() {
  const [validated, setValidated] = useState(false);
  const currentPage = useSelector((store) => store.submissionForm.currentStep);
  const formData = useSelector((store) => store.submissionForm.formData);

  // Dispatch function
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

  // Modal state
  const [modalShow, setModalShow] = useState(false);
  const handleShowModal = () => setModalShow(true);
  const handleCloseModal = () => setModalShow(false);

  // // Handle file change
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const fileName = file.name;
  //     dispatch(getFileName(fileName));
  //     dispatch(updateFormData({ fileName }));
  //     setValue("fileName", fileName);
  //   }
  // };

  // Function to handle previous button click
  const handlePrevious = () => {
    dispatch(setCurrentStep(currentPage - 1));
  };

  // Submit data to the server
  async function submitDataToServer(data) {
    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        dispatch(setCurrentStep(currentPage + 1));
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  // Process form submission
  const processForm = (data) => {
    dispatch(updateFormData(data));
    handleShowModal();
  };

  // Confirm submission
  const handleConfirmSubmission = () => {
    submitDataToServer(formData); // Use formData from Redux
    handleCloseModal();
  };

  return (
    <div>
      <Container className="PIforms-cont1">
        <Form onSubmit={handleSubmit(processForm)}>
          <Row className="justify-content-center">
            <h1 className="PIforms-header">Uploading of Main Proposal File</h1>
            <p className="PIforms-text">
              Please upload the main proposal file for your research submission.
              Ensure that the file type matches the required format and that all
              necessary information is included before proceeding to the next
              step.
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
              <CldUploadWidget
                signatureEndpoint="/api/sign-cloudinary-params"
                onSuccess={(res) => {
                  console.log(res); // This will log the entire response
                  console.log(res.info.secure_url);
                  setValue("mainFileLink", res.info.secure_url); // This will log the public ID of the uploaded file
                }}
              >
                {({ open }) => {
                  return (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="form-control PIforms-formtext PIforms-file"
                    >
                      Upload file
                    </button>
                  );
                }}
              </CldUploadWidget>
            </Row>
          </Container>

          {/* Supplementary Materials Section */}
          <Row className="justify-content-center">
            <h1 className="PIforms-header">
              Uploading of Supplementary Materials
            </h1>
            <p className="PIforms-text">
              Please upload the supplementary files for your research
              submission.
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
                <option disabled value="">
                  Choose...
                </option>
                <option value="Supplementary Files">Supplementary Files</option>
              </FormSelect>
              <Form.Control.Feedback type="invalid">
                {errors.supplementaryFileType?.message}
              </Form.Control.Feedback>

              <FormLabel className="PIforms-formtext">Select File:</FormLabel>
              <CldUploadWidget
                signatureEndpoint="/api/sign-cloudinary-params"
                onSuccess={(res) => {
                  console.log(res); // This will log the entire response
                  console.log(res.info.secure_url);
                  setValue("supplementaryFileLink", res.info.secure_url); // This will log the public ID of the uploaded file
                }}
              >
                {({ open }) => {
                  return (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="form-control PIforms-formtext PIforms-file"
                    >
                      Upload file
                    </button>
                  );
                }}
              </CldUploadWidget>
            </Row>
          </Container>

          {/* Buttons */}
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

      <ConfirmSubmissionModal
        show={modalShow}
        onHide={handleCloseModal}
        onConfirm={handleConfirmSubmission}
      />
    </div>
  );
}

export default SubmissionFormP3;
