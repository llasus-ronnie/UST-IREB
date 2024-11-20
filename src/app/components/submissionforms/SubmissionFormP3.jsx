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
import { toast } from "react-toastify";

function SubmissionFormP3() {
  const [validated, setValidated] = useState(false);
  const [mainFiles, setMainFiles] = useState([]);
  const [supplementaryFiles, setSupplementaryFiles] = useState([]);
  const [mainFileNames, setMainFileNames] = useState([]);
  const [supplementaryFileNames, setSupplementaryFileNames] = useState([]);

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

  // Function to handle previous button click
  const handlePrevious = () => {
    dispatch(setCurrentStep(currentPage - 1));
  };

  // Submit data to the server
  async function submitDataToServer(data) {
    try {
      const updatedData = { ...data, mainFileLink: mainFiles, supplementaryFileLink: supplementaryFiles };
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        dispatch(setCurrentStep(currentPage + 1));
      } else if (!response.ok) {
        const errorData = await response.json();
        console.error("Form submission failed:", errorData);
        return false;
      }


      // Fetch REC details based on the committee name
      const recResponse = await axios.get(
        `/api/REC?name=${data.researchEthicsCommittee}`
      );
      console.log("REC Response Data:", recResponse.data);
      const recList = recResponse.data.data;

      // Find the specific REC
      const rec = recList.find(
        (rec) =>
          rec.name.replace(/\s+/g, "").toLowerCase() ===
          data.researchEthicsCommittee.replace(/\s+/g, "").toLowerCase()
      );

      if (!rec || !rec.email) {
        toast.error("REC email not found.");
        return false;
      }

      // Proceed with the email sending logic
      const emailData = {
        rec: rec.email,
        name: data.fullName,
        status: "Initial Submission",
      };

      await axios.post("/api/auth/send-email-submission", emailData);
      toast.success("Form submitted and email sent successfully.");
      return true; // Indicating success
    } catch (error) {
      console.error("Error submitting form or sending email:", error);
      toast.error("An error occurred while submitting the form.");
      return false; // Indicating failure
    }
  }

  // Process form submission
  const processForm = (data) => {
    dispatch(updateFormData(data));
    handleShowModal();
  };

  // Confirm submission
  const handleConfirmSubmission = () => {
    submitDataToServer(formData);
    handleCloseModal();
  };

  const handleFileUploadSuccess = (res, setFiles, setFileNames, fileType) => {
    if (res.info.format !== "pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }
    setFiles((prev) => [...prev, res.info.secure_url]);
    setFileNames((prev) => [...prev, res.info.original_filename]);
    toast.success(`${fileType} uploaded successfully!`);
  };

  const handleRemoveFile = (index, fileType) => {
    if (fileType === "main") {
      setMainFiles((prev) => prev.filter((_, i) => i !== index));
      setMainFileNames((prev) => prev.filter((_, i) => i !== index));
      toast.info("Main file removed.");
    } else if (fileType === "supplementary") {
      setSupplementaryFiles((prev) => prev.filter((_, i) => i !== index));
      setSupplementaryFileNames((prev) => prev.filter((_, i) => i !== index));
      toast.info("Supplementary file removed.");
    }
  };


  return (
    <div>
      <Container className="PIforms-cont1">
        <Form onSubmit={handleSubmit(processForm)}>
          <Row className="justify-content-center">
            <h1 className="PIforms-header">Uploading of Forms</h1>
            <p className="PIforms-text">
              Please upload the application form for your research submission.
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
                <option value="Protocol">Application Forms</option>
              </FormSelect>
              <Form.Control.Feedback type="invalid">
                {errors.mainFile?.message}
              </Form.Control.Feedback>

              <FormLabel className="PIforms-formtext">Select File:</FormLabel>
              <CldUploadWidget
                signatureEndpoint="/api/sign-cloudinary-params"
                multiple
                onSuccess={(res) =>
                  handleFileUploadSuccess(res, setMainFiles, setMainFileNames, "Main File")
                }
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="form-control PIforms-formtext PIforms-file"
                  >
                    Upload file
                  </button>
                )}
              </CldUploadWidget>
            </Row>

            {/* dislpay the uploaded files  */}
            <Row>
              {mainFileNames.length > 0 && (
                <div className="uploaded-files">
                  <strong>Main Files:</strong>
                  <ul>
                    {mainFileNames.map((fileName, index) => (
                      <li key={index}>
                        {fileName}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="ml-2"
                          onClick={() => handleRemoveFile(index, "main")}
                        >
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
                multiple
                onSuccess={(res) =>
                  handleFileUploadSuccess(
                    res,
                    setSupplementaryFiles,
                    setSupplementaryFileNames,
                    "Supplementary File"
                  )
                }
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="form-control PIforms-formtext PIforms-file"
                  >
                    Upload file
                  </button>
                )}
              </CldUploadWidget>

            </Row>
            <Row>
              {supplementaryFileNames.length > 0 && (
                <div className="uploaded-files">
                  <strong>Supplementary Files:</strong>
                  <ul>
                    {supplementaryFileNames.map((fileName, index) => (
                      <li key={index}>
                        {fileName}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="ml-2"
                          onClick={() => handleRemoveFile(index, "supplementary")}
                        >
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
