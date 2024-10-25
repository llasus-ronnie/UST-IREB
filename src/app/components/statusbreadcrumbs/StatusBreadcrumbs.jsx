"use client";

import React from "react";
import { useSelector } from "react-redux";
import "../../styles/statusbreadcrumbs/StatusBreadcrumbs.css";

const CheckMarkSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-check-lg" viewBox="0 0 16 16">
      <path 
        d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"
        fill="white"
        stroke="white"
        stroke-width="1.5"
      />
    </svg>
  );
  
export default function StatusBreadcrumbs({ steps = [] }) {
  const currentStep = useSelector((store) => store.submissionForm.currentStep);

  return (
    <div className="breadcrumbs-status-breadcrumbs">
      {steps.map((step, index) => {
        const isCurrentStep = step.number === currentStep;
        const isCompleted = step.number < currentStep;
        const isLastStep = index === steps.length - 1; // Check if it's the last step

        return (
          <div key={index} className="breadcrumbs-step-container">
            {!isLastStep && ( // Conditionally render the step-line if it's not the last step
              <div className={`breadcrumbs-step-line ${isCompleted ? "breadcrumbs-line-completed" : ""}`}></div>
            )}
            <div
              className={`breadcrumbs-step-circle ${isCurrentStep ? "breadcrumbs-current-step" : isCompleted ? "breadcrumbs-completed-step" : ""}`}
            >
              {isCompleted ? (
                <CheckMarkSVG />
              ) : isCurrentStep ? (
                <CheckMarkSVG />
              ) : (
                <CheckMarkSVG />
              )}
            </div>
            <div className="breadcrumbs-step-content">
            <div className="breadcrumbs-step-title">{step.title}</div>
            {step.description && (
              <div className="breadcrumbs-step-description">
                {step.description}
              </div>
            )}
           </div>
          </div>
        );
      })}
    </div>
  );
}
