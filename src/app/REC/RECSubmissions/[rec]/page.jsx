"use client";

import React, { useState, useEffect } from "react";
import RecNav from "../../../components/navbaradmin/RecNav";
import RecNavMobile from "../../../components/navbaradmin/RecNavMobile";
import UserLoggedIn from "../../../components/userloggedin/UserLoggedIn";
import "../../../styles/rec/RecSubmissions.css";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";


import withAuthorization from "../../../../hoc/withAuthorization";

function RecSubmissions({params}) {
  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const [selectedOption, setSelectedOption] = useState("Initial-Submission");

  const handleDropDown = (event) => {
    setSelectedOption(event.target.value);
  }

  const handleTableChange = (option) => {
    selectedOption === option ? setSelectedOption("") :
    setSelectedOption(option);
    console.log("Selected Option:", selectedOption);
  };



    const [forms, setForms] = useState([]);
    const { rec } = useParams(); // Get the current route parameter
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get("/api/forms", {
            params: { rec: rec.trim() },
          });
          setForms(response.data.forms); 
        } catch (error) {
          console.error("Error fetching forms:", error);
        }
      }
  
      fetchData();
    }, [rec]);


    const filterFormsByStatus = (status) => {
      console.log("Status:", status);
      return forms.filter((form) => form.status === status);
    };

    const formCount = forms.length;
  
    
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
              <button onClick={() => handleTableChange("Initial-Submission")}>
                <span>{formCount} </span> <p>Initial Submission</p>
              </button>
              <button onClick={() => handleTableChange("Pending-Payment")}>
                <span>{formCount}</span> <p>Pending Payment</p>
              </button>
              <button onClick={() => handleTableChange("For-Classification")}>
                <span>{formCount}</span> <p>For Classification</p>
              </button>
              <button onClick={() => handleTableChange("In-Progress")}>
                <span>100</span> <p>In Progress</p>
              </button>
              <button onClick={() => handleTableChange("Final-Review")}>
                <span>21</span> <p>Final Review</p>
              </button>
              <button onClick={() => handleTableChange("Approved")}>
                <span>100</span> <p>Approved</p>
              </button>
            </div>

            <div className="rec-dropdown-mobile">
              <select onChange={handleDropDown}>
                <option value="Initial-Submission">Initial Submission</option>
                <option value="Pending-Payment">Pending Payment</option>
                <option value="For-Classification">For Classification</option>
                <option value="inProgress">In Progress</option>
                <option value="finalReview">Final Review</option>
                <option value="approved">Approved</option>
              </select>
            </div>

            {["Initial-Submission", "Pending-Payment", "For-Classification", "In-Progress", "Final-Review", "Approved"].map(
  (status) =>
    selectedOption=== status && (
      <div className="rec-tables" key={status}>
        <div className={status}>
          <h1>{status.replace(/([A-Z])/g, " $1").trim()}</h1>
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
                          {filterFormsByStatus(status).map((form, index) => (
                            <tr key={index}>
                              <td>{form?.id || "no forms"}</td>
                              <td>{form.fullName}</td>
                              <td>{new Date(form.date).toLocaleDateString("en-US")}</td>
                              <td>{form.title}</td>
                              <td>
                                <Link href={`/REC/RECViewSubmission/${params.rec}/${form._id}`} className="rec-view-btn">
                                  View
                                </Link>
                              </td>
                            </tr>
                          ))}
                          </tbody>
                      </table>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(RecSubmissions, "REC");
