import React from 'react'
import Page1 from "../components/submissionforms/SubmissionFormsP1";
import StepBar from "../components/stepbar/StepBar";
import StepForm from "../components/stepbar/StepForm"; 
import { Nav } from 'react-bootstrap';
import Navbar from '../components/navbar/Navbar';
export default function page() {
    // Define the steps
    const steps =[
        {
            number: 1,
            title: "About the Researchers",
        },
        {
            number: 2,
            title: "About the Research",
        },
        {
            number: 3,
            title: "File Upload",
        }
    ];
  return (
    <>
    <Navbar/>
    <div>
        <StepBar steps={steps}/>
    </div>
    <StepForm/>
    </>
  )
}
