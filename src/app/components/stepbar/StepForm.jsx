"use client";
import React from "react";
import { useSelector } from "react-redux";
import {
  updateFormData,
  setCurrentStep,
} from "../../../redux/slices/submissionFormSlice";
import { useDispatch } from "react-redux";

import SubFormP1 from "../submissionforms/SubmissionFormsP1";
import SubFormP2 from "../submissionforms/SubmissionFormsP2";
import SubFormP3 from "../submissionforms/SubmissionFormP3";
import Summary from "../submissionforms/SummaryForm";

export default function StepForm() {
  //render based on current step

  //dispatch function
  const dispatch = useDispatch();

  //initial states from store
  const currentStep = useSelector((store) => store.submissionForm.currentStep);
  const formData = useSelector((store) => store.submissionForm.formData);
  console.log(formData, currentStep);

  function renderFormByStep(step) {
    //passes in the state we are on (props)
    if (step === 1) {
      return <SubFormP1 />;
    } else if (step === 2) {
      return <SubFormP2 />;
    } else if (step === 3) {
      return <SubFormP3 />;
    } else if (step === 4) {
      return <Summary />;
    }
  }
  return <>{renderFormByStep(currentStep)}</>;
}
