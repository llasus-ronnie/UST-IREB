"use client";

import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import RecNav from "../../components/navbaradmin/RecNav";
import RecNavMobile from "../../components/navbaradmin/RecNavMobile";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import "../../styles/rec/RECViewSubmission.css";
import axios from "axios";

import withAuthorization from "../../../hoc/withAuthorization";

function RECViewSubmission() {
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

            <Row className="viewsubmission-container">
              <Col xs={12} lg={8} className="viewsub-content-container">
              </Col>
              <Col xs={12} lg={4} className="viewsub-details-container">
                  <h1>Submission Details</h1>

                  <span>Research Title:</span>
                  <p>text</p>

                  <span>Date of Submission:</span>
                  <p>text</p>

                  <span>Review Classification:</span>
                  <p>text</p>


                  <span>Status:</span>
                  <select className="viewsub-changestatus">
                    <option value="status-1">Status 1</option>
                    <option value="status-2">Status 2</option>
                    <option value="status-3">Status 3</option>
                  </select>

                  <div className="viewsub-proofofpayment">
                    <span>Proof of Payment:</span>

                    <button>Proof of Payment Button</button>
                  </div>

                  <div className="viewsub-buttons">
                  <button className="viewsub-save">Save Changes</button>
                  <button className="viewsub-back">Back</button>
                  </div>

              </Col>
            </Row>
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(RECViewSubmission, "REC");