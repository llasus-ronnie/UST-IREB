"use client";

import React, { useState, useEffect } from "react";
import RecNav from "../../components/navbaradmin/RecNav";
import RecNavMobile from "../../components/navbaradmin/RecNavMobile";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import "../../styles/rec/RecSubmissions.css";
import axios from "axios";

import withAuthorization from "../../../hoc/withAuthorization";

function RecSubmissions() {
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
              <h1>View Submission</h1>
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

        </div>
      </div>
    </div>
  );
}

export default withAuthorization(RecSubmissions, "REC");