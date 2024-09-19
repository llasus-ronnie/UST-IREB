import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../../styles/forms/Forms.css";
import Step from "../stepbar/Step";

export default function StepBar({ steps = [] }) {
  console.log(steps);
  return (
    <div className='stepbar-nav flex flex-row items-center gap-3 justify-center'>
      {steps.map((step, i) => {
        return <Step key={i} step={step} />;
      })}
    </div>
  )
}

