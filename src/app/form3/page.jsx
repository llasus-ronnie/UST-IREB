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
import StepBar from "../components/stepbar/StepBar";
import Navbar from "../components/navbar/Navbar";

function SubmissionFormP3() {
  const [validated, setValidated] = useState(false);
  const currentPage = 3;

  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (file) {
      const fileType = file.name.split(".").pop().toLowerCase();
      if (!["pdf", "doc", "docx"].includes(fileType)) {
        event.preventDefault();
        event.stopPropagation();
        fileInput.setCustomValidity(
          "Please upload PDF, DOC, or DOCX files only."
        );
      } else {
        fileInput.setCustomValidity("");
      }
    }

    // If form is valid, submit the form (you can add your submission logic here)
    if (form.checkValidity()) {
      alert("Form submitted successfully!"); // Placeholder for actual submission logic
      window.location.href = "/SubmissionFormsCompleted";
    }
  };

  const handleForms = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      e.preventDefault();
      const researcherData = {
        ...JSON.parse(localStorage.getItem("researcherData")),
        fileType: fileType,
        file: file,
      };
      alert("Data Saved");
      // Store data in localStorage
      localStorage.setItem("researcherData", JSON.stringify(researcherData));
      alert(researcherData);
      // Navigate to next page
      window.location.href = "/form3";
    }
    setValidated(true);

    const res = await fetch("api/forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(researcherData),
    });
  };

  return (
    <div>
      <Navbar />
      <Container className="PIforms-cont1">
        <StepBar currentPage={currentPage} />
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
          </Container>

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
          </Container>
          <Row
            style={{ marginTop: "20px", paddingBottom: "20px" }}
            className="justify-content-evenly"
          >
            <Button variant="outline-secondary" className="PIforms-formbtn">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outline-warning"
              className="PIforms-formbtn"
              onClick={handleForms}
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
