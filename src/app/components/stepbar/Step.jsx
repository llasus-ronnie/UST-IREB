"use client";

import React from "react";
import { useSelector } from "react-redux";
import "../../styles/forms/Forms.css";

export default function Step({ step, isLastStep }) {
  const { number, title } = step;
  const currentStep = useSelector((store) => store.submissionForm.currentStep);
  const isCurrentStep = number === currentStep;
  const isCompleted = number < currentStep;

  return (
    <div className="step-container">
      <div
        className={`step-circle ${
          isCurrentStep ? "current-step" : isCompleted ? "completed-step" : ""
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52">
          <circle
            cx="50%"
            cy="50%"
            r="24"
            fill={
              number < currentStep
                ? "#FCBF15ED"
                : isCurrentStep
                ? "#FCBF15ED"
                : "white"
            }
          />

          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill={number <= currentStep ? "black" : "black"}
            fontSize="18"
            fontWeight="bold"
          >
            {number}
          </text>
        </svg>
      </div>
      <div className="flex-col flex justify-center mt-2">
        <h3 className="stepbar-navtext">{title}</h3>
      </div>

      {!isLastStep && (
        <div
          className={`step-line ${isCompleted ? "line-completed" : ""}`}
        ></div>
      )}
    </div>
  );
}
