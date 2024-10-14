"use client";

import React, { useState, useEffect } from "react";
import RecNav from "../../components/navbaradmin/RecNav";
import RecNavMobile from "../../components/navbaradmin/RecNavMobile";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import "../../styles/rec/RECSubmissions.css";
import axios from "axios";

import withAuthorization from "../../../hoc/withAuthorization";

function RecSubmissions() {
  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const handleDropDown = (event) => {
    const selectedOption = event.target.value;
  };

  const [forms, setForms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/forms"); // Replace with your actual API endpoint
        setForms(response.data.forms);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="adminpage-container">
      <div className="recnav-mobile">
        <RecNavMobile />
      </div>

      <RecNav className="recnav" />

      <div className="rec-submissions">
        <div className="adminmain-content">
          <div className="rec-header-container">
            <div className="rec-header">
              <h1>REC Manage Submissions</h1>
              <p>
                Manage Initial Review and Principal Investigator Submissions
              </p>
            </div>
            <div className="userloggedin">
              <UserLoggedIn />
            </div>
          </div>

          <div className="rec-header-container-mobile">
            <div className="userloggedin-mobile">
              <UserLoggedIn />
            </div>
            <div className="rec-header">
              <h1>REC Manage Submissions</h1>
              <p>
                Manage Initial Review and Principal Investigator Submissions
              </p>
            </div>
          </div>

          <div className="rec-submissions-tabs">
            <div className="rec-buttons-container">
              <button onClick={() => handleTableChange("initialSubmission")}>
                <span>2</span> <p>Initial Submission</p>
              </button>
              <button onClick={() => handleTableChange("pendingPayment")}>
                <span>17</span> <p>Pending Payment</p>
              </button>
              <button onClick={() => handleTableChange("forClassification")}>
                <span>8</span> <p>For Classification</p>
              </button>
              <button onClick={() => handleTableChange("inProgress")}>
                <span>100</span> <p>In Progress</p>
              </button>
              <button onClick={() => handleTableChange("finalReview")}>
                <span>21</span> <p>Final Review</p>
              </button>
              <button onClick={() => handleTableChange("approved")}>
                <span>100</span> <p>Approved</p>
              </button>
            </div>

            <div className="rec-dropdown-mobile">
              <select onChange={handleDropDown}>
                <option value="initialSubmission">Initial Submission</option>
                <option value="pendingPayment">Pending Payment</option>
                <option value="forClassification">For Classification</option>
                <option value="inProgress">In Progress</option>
                <option value="finalReview">Final Review</option>
                <option value="approved">Approved</option>
              </select>
            </div>

            <div className="rec-tables">
              <div className="initial-submission">
                <h1>Initial Submission</h1>
                <table className="rec-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Author</th>
                      <th>Date of Submission</th>
                      <th>Name of Research</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {forms.map((form, index) => (
                      <tr key={index}>
                        <td>{form.id}</td>
                        <td>{form.fullName}</td>
                        <td>
                          {new Date(form.date).toLocaleDateString("en-US")}
                        </td>
                        <td>{form.title}</td>
                        <td>
                          <button className="rec-view-btn">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(RecSubmissions, "REC");
