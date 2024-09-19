"use client"
import React from 'react'
import { useSelector } from 'react-redux';

export default function Step({ step }) {
  const { number, title } = step;
  const currentStep = useSelector((store) => store.submissionForm.currentStep);
  return (
    <>
      <div className="flex flex-row text-white">
        <div
          className={`w-8 h-8 border border-slate-50 
        rounded-full flex items-center justify-center font-bold flex-shrink-0
        ${number === currentStep ? "bg-yellow-300" : ""
            }`}
        >
          {number}
        </div>
        <div className="flex-col flex justify-center">
          <h3 className="uppercase text-sm font-bold">
            {title}
          </h3>
        </div>
      </div>
    </>
  )
}
