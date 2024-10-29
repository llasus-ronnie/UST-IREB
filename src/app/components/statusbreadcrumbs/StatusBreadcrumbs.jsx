"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../../styles/statusbreadcrumbs/StatusBreadcrumbs.css";
import axios from "axios";


const CheckMarkSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-check-lg" viewBox="0 0 16 16">
    <path 
      d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"
      fill="white"
      stroke="white"
      strokeWidth="1.5"
    />
  </svg>
);

export default function StatusBreadcrumbs({ steps = [], params }) {
  const [isClient, setIsClient] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);

  console.log("Component rendered with params:", params);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        console.log("Fetching data with params.id:", params.id);
        const response = await axios.get(`/api/forms/${params.id}`);
        console.log("Response data:", response.data);
        setForm(response.data.submission);
        console.log("Form data:", response.data.submission); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch form details.");
      } finally {
        setLoading(false);
      }
    }
    if (params && params.id) {
      fetchData();
    } else {
      console.error("Params or params.id is undefined");
    }
  }, [params]);

  return (
    <>
      {isClient && (
        <>
          <div className="breadcrumbs-status-breadcrumbs">
            {steps.map((step, index) => (
              <div key={index} className="breadcrumbs-step-container">
                <div className="breadcrumbs-step-line"></div>
                <div className={`breadcrumbs-step-circle ${form && form.status === step.id ? 'yellow' : ''}`}></div>
                <div className="breadcrumbs-step-content">
                  <div className="breadcrumbs-step-title">{step.title}</div>
                  {step.description && (
                    <div className="breadcrumbs-step-description">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}