"use client";

import React, { useState, useEffect } from "react";
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
import "react-toastify/dist/ReactToastify.css";
import RemoveConfirmationModal from "../../components/modals/RemoveConfirmationModal";

function SubmissionFormP3() {
  const [validated, setValidated] = useState(false);
  const [mainFiles, setMainFiles] = useState([]);
  const [supplementaryFiles, setSupplementaryFiles] = useState([]);
  const [mainFileNames, setMainFileNames] = useState([]);
  const [supplementaryFileNames, setSupplementaryFileNames] = useState([]);
  const [fileUploadError, setFileUploadError] = useState("");

  const currentPage = useSelector((store) => store.submissionForm.currentStep);
  const formData = useSelector((store) => store.submissionForm.formData);

  // Dispatch function
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
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

  async function submitDataToServer(data) {
    try {
      const mainFileUrls = mainFiles.map((file) => ({
        url: file.url,
        filename: file.filename,
      }));

      const supplementaryFileUrls = supplementaryFiles.map((file) => ({
        url: file.url,
        filename: file.filename,
      }));

      console.log("Main Files before sending:", mainFileUrls);
      console.log("Supplementary Files before sending:", supplementaryFileUrls);

      const updatedData = {
        ...data,
        mainFileLink: mainFileUrls,
        supplementaryFileLink: supplementaryFileUrls,
      };

      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        dispatch(setCurrentStep(currentPage + 1));
      } else {
        const errorData = await response.json();
        console.error("Form submission failed:", errorData);
        return false;
      }

      const recResponse = await axios.get(
        `/api/REC?name=${data.researchEthicsCommittee.trim().toLowerCase()}`
      );

      const recList = recResponse.data.data;

      const rec = recList.find(
        (rec) =>
          rec.name.replace(/\s+/g, "").toLowerCase() ===
          data.researchEthicsCommittee.replace(/\s+/g, "").toLowerCase()
      );

      const emailData = {
        rec: rec.email,
        title: data.title,
        name: data.fullName,
      };
      await axios.post("/api/auth/send-email-submission", emailData);

      return true;
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
      return false;
    }
  }

  const validateFiles = () => {
    if (mainFileNames.length === 0 && supplementaryFileNames.length === 0) {
      setError("fileUpload", {
        type: "manual",
        message: "Please upload at least one file.",
      });
      return false;
    }
    return true;
  };

  // Process form submission
  const processForm = (data) => {
    if (!validateFiles()) return;
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

    const fileObject = {
      url: res.info.secure_url,
      filename: res.info.original_filename,
    };

    setFiles((prev) => [...prev, fileObject]);
    setFileNames((prev) => [...prev, res.info.original_filename]);
    toast.success(`${fileType} uploaded successfully!`);
  };

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [fileToRemoveIndex, setFileToRemoveIndex] = useState(null);
  const [fileTypeToRemove, setFileTypeToRemove] = useState(null);

  const handleRemoveFile = (index, fileType) => {
    setFileToRemoveIndex(index);
    setFileTypeToRemove(fileType);
    setShowRemoveModal(true);
  };

  const confirmRemoveFile = () => {
    if (fileTypeToRemove === "main") {
      setMainFiles((prev) => prev.filter((_, i) => i !== fileToRemoveIndex));
      setMainFileNames((prev) =>
        prev.filter((_, i) => i !== fileToRemoveIndex)
      );
      toast.info("Main file removed.");
    } else if (fileTypeToRemove === "supplementary") {
      setSupplementaryFiles((prev) =>
        prev.filter((_, i) => i !== fileToRemoveIndex)
      );
      setSupplementaryFileNames((prev) =>
        prev.filter((_, i) => i !== fileToRemoveIndex)
      );
      toast.info("Supplementary file removed.");
    }
    setShowRemoveModal(false);
    setFileToRemoveIndex(null);
    setFileTypeToRemove(null);
  };

  useEffect(() => {
    if (mainFileNames.length === 0) {
      setError("mainFile", {
        type: "manual",
        message: "Please upload at least one main file.",
      });
    } else {
      clearErrors("mainFile");
    }
  }, [mainFileNames, setError, clearErrors]);

  useEffect(() => {
    if (supplementaryFileNames.length === 0) {
      setError("supplementaryFile", {
        type: "manual",
        message: "Please upload at least one supplementary file.",
      });
    } else {
      clearErrors("supplementaryFile");
    }
  }, [supplementaryFileNames, setError, clearErrors]);

  useEffect(() => {
    if (mainFileNames.length === 0 && supplementaryFileNames.length === 0) {
      setFileUploadError("Please upload at least one file.");
    } else {
      setFileUploadError("");
    }
  }, [mainFileNames, supplementaryFileNames]);

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
                // isInvalid={!!errors.mainFile}
              >
                <option disabled value="">
                  Choose...
                </option>
                <option value="Protocol">Application Forms</option>
              </FormSelect>

              <FormLabel className="PIforms-formtext">Select File:</FormLabel>
              <CldUploadWidget
                signatureEndpoint="/api/sign-cloudinary-params"
                multiple
                onSuccess={(res) =>
                  handleFileUploadSuccess(
                    res,
                    setMainFiles,
                    setMainFileNames,
                    "Main File"
                  )
                }
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className={`form-control PIforms-formtext PIforms-file ${
                      errors.mainFile ? "is-invalid" : ""
                    }`}
                  >
                    Upload file
                  </button>
                )}
              </CldUploadWidget>
              <Form.Control.Feedback
                className="PIforms-formtext"
                style={{ color: "#dc3545" }}
                type="invalid"
              >
                {errors.mainFile?.message}
              </Form.Control.Feedback>
            </Row>

            {/* dislpay the uploaded files  */}
            <Row>
              {mainFileNames.length > 0 && (
                <div className="PIforms-formtext">
                  <strong className="PIforms-formtext">Main Files:</strong>
                  <ul>
                    {mainFileNames.map((fileName, index) => (
                      <li
                        className="PIforms-formtext d-flex justify-content-between"
                        key={index}
                      >
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
                // isInvalid={!!errors.supplementaryFileType}
              >
                <option disabled value="">
                  Choose...
                </option>
                <option value="Supplementary Files">Supplementary Files</option>
              </FormSelect>

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
                    className={`form-control PIforms-formtext PIforms-file ${
                      errors.supplementaryFile ? "is-invalid" : ""
                    }`}
                  >
                    Upload file
                  </button>
                )}
              </CldUploadWidget>
              <Form.Control.Feedback
                className="PIforms-formtext"
                style={{ color: "#dc3545" }}
                type="invalid"
              >
                {errors.supplementaryFile?.message}
              </Form.Control.Feedback>
            </Row>

            <Row>
              {supplementaryFileNames.length > 0 && (
                <div className="PIforms-formtext">
                  <strong className="PIforms-formtext">
                    Supplementary Files:
                  </strong>
                  <ul>
                    {supplementaryFileNames.map((fileName, index) => (
                      <li
                        className="PIforms-formtext d-flex justify-content-between"
                        key={index}
                      >
                        {fileName}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="ml-2"
                          onClick={() =>
                            handleRemoveFile(index, "supplementary")
                          }
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

      <RemoveConfirmationModal
        show={showRemoveModal}
        onHide={() => setShowRemoveModal(false)}
        onConfirm={confirmRemoveFile}
      />
    </div>
  );
}

export default SubmissionFormP3;
