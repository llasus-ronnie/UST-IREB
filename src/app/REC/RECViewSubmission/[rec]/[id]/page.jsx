"use client";

import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import RecNav from "../../../../components/navbaradmin/RecNav";
import RecNavMobile from "../../../../components/navbaradmin/RecNavMobile";
import UserLoggedIn from "../../../../components/userloggedin/UserLoggedIn";
import "../../../../styles/rec/RECViewSubmission.css";
import axios from "axios";
import withAuthorization from "../../../../../hoc/withAuthorization";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCldImageUrl } from 'next-cloudinary';


function RECViewSubmission({ params }) {
  const [forms, setForms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/forms/${params.id}`);
        console.log("Working on URlID:" + `${params.id}`);
        setForms(response.data.submission);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const [status, setStatus] = useState("");

  const updateData = async (newStatus) => {
    try {
      await axios.put(`/api/forms/${params.id}`, { status: newStatus });
      await axios.post("/api/auth/send-email-status", {
        email: forms.email,
        name: forms.fullName,
        status: newStatus,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    console.log(newStatus);
  };

  const updateStatus = () => {
    updateData(status);
    router.push(`/REC/RECSubmissions/${params.rec}`);
  };

  const handleBack = () => {
    router.push(`/REC/RECSubmissions/${params.rec}`);
  };

  const url = getCldImageUrl({
    width: 960,
    height: 600,
    src: `${forms?.mainFileLink}`,
  });

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
            <a
              href={`/REC/RECSubmissions/${params.rec}`}
              className="back-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
              Go Back to Manage Submissions
            </a>
            <Col xs={12} lg={8} className="viewsub-content-container">

            </Col>
            <Col xs={12} lg={4} className="viewsub-details-container">
              <h1>Submission Details</h1>

              <span>Research Title:</span>
              <p>{forms?.title || "No title available"}</p>

              <span>Date of Submission:</span>
              <p>
                {forms?.date
                  ? new Date(forms.date).toLocaleDateString("en-US")
                  : "No date available"}
              </p>

              <span>Review Classification:</span>
              <p>{forms?.classification || "No classification available"}</p>

              <span>Status:</span>
              <select
                className="viewsub-changestatus"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="default">Choose Status</option>
                <option value="Pending-Payment">Pending Payment</option>
                <option value="For-Classification">For Classification</option>
                <option value="In-Progress">In Progress</option>
                <option value="Initial-Result">Initial Result</option>
                <option value="Resubmission">Resubmission</option>
                <option value="Final-Decision">Final Decision</option>
              </select>

              {/* can be edited hehe */}
              <span>Research Classification:</span>
              <select
                className="viewsub-changestatus"
                // value={status}
                // onChange={handleStatusChange}
              >
                <option value="default">Choose Classification</option>
                <option value="Expedited">Expedited</option>
                <option value="Full-Board">Full Board</option>
                <option value="Exempt">Exempt</option>
              </select>

              <span>Assign Reviewer:</span>
              <select
                className="viewsub-changestatus"
                // value={status}
                // onChange={handleStatusChange}
              >
                <option value="default">Choose Reviewer</option>
                <option value="">Tricia Cuaresma</option>
                <option value="">Franceska Flores</option>
                <option value="">Danielle Foronda</option>
              </select>

              <div className="viewsub-proofofpayment">
                <span>Proof of Payment:</span>

                <button>Acknowledge Payment</button>
              </div>

              <div className="viewsub-buttons">
                <button className="viewsub-save" onClick={updateStatus}>
                  Save Changes
                </button>
                <button className="viewsub-back" onClick={handleBack}>
                  Back
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(RECViewSubmission, "REC");
