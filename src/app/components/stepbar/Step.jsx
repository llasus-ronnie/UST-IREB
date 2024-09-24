"use client";
import React from "react";
import { useSelector } from "react-redux";
import "../../styles/forms/Forms.css";
import { Container, Row, Col } from "react-bootstrap";

export default function Step({ step }) {
  const { number, title } = step;
  const currentStep = useSelector((store) => store.submissionForm.currentStep);
  const isCurrentStep = number === currentStep;
  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className={`w-12 h-12 border
        rounded-full flex items-center justify-center font-bold
        ${number === currentStep ? "bg-[#FCBF15ED]" : "bg-white"}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="52">
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill={isCurrentStep ? "black" : "black"}
            >
              {number}
            </text>
          </svg>
        </div>
        <div className="flex-col flex justify-center mt-2">
          <h3 className="stepbar-navtext">{title}</h3>
        </div>
      </div>
    </>
  );
}
