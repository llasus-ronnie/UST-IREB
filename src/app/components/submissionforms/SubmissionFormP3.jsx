"use client";

import React, { use, useState } from "react";
import { Helmet } from "react-helmet";
import StepBar from "../stepbar/StepBar";
import Navbar from "../navbar/Navbar";
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
import { updateFormData, setCurrentStep } from "../../../redux/slices/submissionFormSlice";
import { useSelector } from "react-redux";

import nextConnect from 'next-connect';
import cors from 'cors';



function SubmissionFormP3() {
  const [validated, setValidated] = useState(false);
  const currentPage = useSelector((store) => store.submissionForm.currentStep);
  const formData = useSelector((store) => store.submissionForm.formData);
  console.log(formData, currentPage);

  //dispatch function
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register
  } = useForm({
    defaultValues: {
      ...formData
    }
  });

  const handlePrevious = () => {
    dispatch(setCurrentStep(currentPage - 1));
  };

  //submit the form
    //dispatching reducers from store
    async function processForm(data){
      dispatch (updateFormData(data));

          try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),  // Use the data from react-hook-form
      });

      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    }
  

  return (
    <div>
      <Helmet>
        <title>Submission Forms</title>
        <style>{"body { background-color: #ECF0F1; }"}</style>
      </Helmet>
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
            <Form onSubmit={handleSubmit(processForm)}>
              <FormLabel className="formtext">File Type:</FormLabel>
              {/* <Form.Select
                {...register("fileType")}
                className="form-control formtext"
                required>
                <option>Protocol</option>
                <option>Supplementary Files</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a file type.
              </Form.Control.Feedback> */}

              {/* <FormLabel className="formtext">Select File:</FormLabel>
              <FormControl
                {...register("fileInput")}
                type=""
                id="fileInput"
                accept=".pdf,.doc,.docx,.txt"
                className="form-control formtext"
                onChange={handleFileChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please upload a PDF, DOC, or DOCX file.
              </Form.Control.Feedback> */}

              <Row
                style={{ marginTop: "20px", paddingBottom: "20px" }}
                className="justify-content-around"
              >
                <Button
                  variant="outline-secondary"
                  className="formbtn"
                  onClick={handlePrevious}
                >
                  Previous
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
