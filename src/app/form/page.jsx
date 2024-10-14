"use client";

import React from "react";
import Page1 from "../components/submissionforms/SubmissionFormsP1";
import StepBar from "../components/stepbar/StepBar";
import StepForm from "../components/stepbar/StepForm";
import { Container } from "react-bootstrap";
import Navbar from "../components/navbar/Navbar";

import withAuthorization from "../../hoc/withAuthorization";

function page() {
  // Define the steps
  const steps = [
    {
      number: 1,
      title: "Research Classification",
    },
    {
      number: 2,
      title: "Proposal Metadata",
    },
    {
      number: 3,
      title: "Supplementary Materials",
    },
    {
      number: 4,
      title: "Summary of Proposal",
    },
  ];

  return (
    <>
      <Navbar />
      <Container className="PIforms-cont1">
        <StepBar steps={steps} />
        <StepForm />
      </Container>
    </>
  );
}

export default withAuthorization(page, "PrincipalInvestigator");
