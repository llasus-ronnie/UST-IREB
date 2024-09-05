"use client";

import React, { useState } from "react";
import { Helmet } from "react-helmet";
import StepBar from "../components/stepbar/StepBar";
import Navbar from "../components/navbar/Navbar";
import {
  Container,
  Row,
  Form,
  FormLabel,
  FormSelect,
  FormControl,
  Button,
} from "react-bootstrap";

function SubmissionFormP3() {
  const [validated, setValidated] = useState(false);
  const currentPage = 3;

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

  return (
    <div>
      <Helmet>
        <title>Submission Forms</title>
        <style>{"body { background-color: #ECF0F1; }"}</style>
      </Helmet>
      <Navbar />
      <StepBar currentPage={currentPage} />
      <Container className="cont1">
        <Row className="justify-content-center">
          <h1 className="textcheck">Uploading of Supplementary Materials</h1>
          <p className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Row>

        <Container className="rescont3">
          <Row>
            <h1 className="resconthead">Upload Submission Here</h1>
          </Row>
          <Row>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <FormLabel className="formtext">File Type:</FormLabel>
              <Form.Select className="form-control formtext" required>
                <option>Protocol</option>
                <option>Supplementary Files</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a file type.
              </Form.Control.Feedback>

              <FormLabel className="formtext">Select File:</FormLabel>
              <FormControl
                type="file"
                id="fileInput"
                accept=".pdf,.doc,.docx,.txt"
                className="form-control formtext"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please upload a PDF, DOC, or DOCX file.
              </Form.Control.Feedback>

              <Row
                style={{ marginTop: "20px", paddingBottom: "20px" }}
                className="justify-content-around"
              >
                <Button variant="outline-secondary" className="formbtn">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="outline-warning"
                  className="formbtn"
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
