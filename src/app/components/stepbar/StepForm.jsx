"use client";
import React from 'react'
import { useSelector } from 'react-redux';
import { updateFormData, setCurrentStep } from "../../../redux/slices/submissionFormSlice";
import { useDispatch } from 'react-redux';


import SubFormP1 from "../submissionforms/SubmissionFormsP1"
import SubFormP2 from "../submissionforms/SubmissionFormsP2"
import SubFormP3 from "../submissionforms/SubmissionFormP3"

export default function StepForm() {
    //render based on current step

    //dispatch function
    const dispatch = useDispatch();

    //initial states from store
    const currentStep = useSelector((store) => store.submissionForm.currentStep);
    const formData = useSelector((store) => store.submissionForm.formData);
    console.log(formData, currentStep);

    function renderFormByStep(step) { //passes in the state we are on (props)
        if (step === 1) {
            return <SubFormP1 />
        } else if (step === 2) {
            return <SubFormP2 />
        } else {
            return <SubFormP3 />
        } 
    }
    return (
        <>
            {renderFormByStep(currentStep)}
        </>
    )
}
