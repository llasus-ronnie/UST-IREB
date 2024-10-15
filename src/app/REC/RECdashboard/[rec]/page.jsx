"use client";

//components
import React from "react";
import RecNav from "../../../components/navbaradmin/RecNav";
import RecNavMobile from "../../../components/navbaradmin/RecNavMobile";
import UserLoggedIn from "../../../components/userloggedin/UserLoggedIn";
import { useState, useEffect } from "react";
import axios from "axios"; // You can use any library for HTTP requests
import Link from "next/link";

//css
import "../../../styles/rec/RECDashboard.css";

import withAuthorization from "../../../../hoc/withAuthorization";

function RECDashboard({ params }) {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/forms"); // Replace with your actual API endpoint
        const filteredForms = response.data.forms.filter(
          (form) =>
            form.researchEthicsCommittee &&
            params.researchEthicsCommittee &&
            form.researchEthicsCommittee.replace(/\s/g, "") ===
              params.researchEthicsCommittee.replace(/\s/g, "")
        );
        setForms(filteredForms);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [params.researchEthicsCommittee]);

  return (
    <div className="adminpage-container">
      <div className="recnav-mobile">
        <RecNavMobile />
      </div>

      <RecNav className="recnav" />

      <div className="rec-dashboard">
        <div className="adminmain-content">
          <div className="rec-header-container">
            <div className="rec-header">
              <img
                src="/images/rec logos/CICS-Logo.png"
                alt="CICS Logo"
                className="cics-logo"
              />
              <div className="rec-header-text">
                <h1>CICS REC Dashboard</h1>
                <p>Overview of UST CICS REC Submissions</p>
              </div>
            </div>
            <div className="userloggedin">
              <UserLoggedIn />
            </div>
          </div>
        </div>

        {/* Submission Cards */}
        <div className="admindashboard-cards">
          <div className="recdashboard-card">
            <h2>Initial Submission</h2>
            <h3>0</h3>
          </div>
          <div className="recdashboard-card">
            <h2>Pending Payment</h2>
            <h3>0</h3>
          </div>
          <div className="recdashboard-card">
            <h2>For Classification</h2>
            <h3>0</h3>
          </div>
          <div className="recdashboard-card">
            <h2>In Progress</h2>
            <h3>0</h3>
          </div>
          <div className="recdashboard-card">
            <h2>For Final Review</h2>
            <h3>0</h3>
          </div>
          <div className="recdashboard-card">
            <h2>Certificates Released</h2>
            <h3>0</h3>
          </div>
        </div>
        <br />
        {/* Submission Overview Table */}

        <div className="rec-overview-table">
          <h1>Submission Overview</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Author</th>
                <th>Title</th>
                <th>Date of Submission</th>
                <th>Assigned Evaluator</th>
                <th>Assigned REC Staff</th>
                <th>Submission Status</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form, index) => (
                <tr key={index}>
                  <td>{form ? form._id : "No forms"}</td>
                  <td>{form ? form.fullName : "No available full name"}</td>
                  <td>{form ? form.title : "No title available"}</td>
                  <td>
                    {form && form.date
                      ? new Date(form.date).toLocaleDateString("en-US")
                      : "No date available"}
                  </td>
                  <td>
                    {form ? form.researchEthicsCommittee : "No REC available"}
                  </td>
                  <td
                    className={`review-classification ${
                      form ? form.reviewClassification : ""
                    }`}
                  >
                    {form ? form.reviewClassification : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(RECDashboard, "REC");