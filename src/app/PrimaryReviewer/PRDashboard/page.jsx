"use client";

import React from "react";
import { Row, Col } from "react-bootstrap";
import PrNav from "../../components/navbaradmin/PrNav";
import PrNavMobile from "../../components/navbaradmin/PrNavMobile";
import SearchBar from "../../components/searchbar/SearchBar";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import "../../styles/pr/PrDashboard.css";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

import withAuthorization from "../../../hoc/withAuthorization";
import { get } from "http";

function PrDashboard() {
  const [forms, setForms] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});
  const [overdueForms, setOverdueForms] = useState([]);
  const { data: session } = useSession();

  const userEmail = session?.user?.email;

  useEffect(() => {
    async function getForms() {
      try {
        const response = await axios.get("/api/forms", {
          params: { email: userEmail }, 
        });

        const assignedForms = response.data.forms || [];

        setForms(assignedForms);

        const newStatusCounts = {
          "Initial-Submission": 0,
          "Pending-Payment": 0,
          "For-Classification": 0,
          "In-Progress": 0,
          "Initial-Result": 0,
          Resubmission: 0,
          Approved: 0,
        };

        assignedForms.forEach((form) => {
          if (form.status && newStatusCounts.hasOwnProperty(form.status)) {
            newStatusCounts[form.status] += 1;
          }
        });

        setStatusCounts(newStatusCounts);

        console.log("Assigned Forms:", assignedForms);
      } catch (error) {
        toast.error("Error loading data");
        console.error("Error fetching assigned tasks:", error);
      }
    }

    getForms();
  }, []);

  return (
    <div className="adminpage-container">
      <div className="prnav-mobile">
        <PrNavMobile />
      </div>

      <PrNav className="prnav" />

      <div className="pr-dashboard">
        <div className="adminmain-content">
          <div className="pr-header-container">
            <div className="pr-header">
              <h1>Primary Reviewer Dashboard</h1>
              <p>Overview of Assigned Primary Reviewer Submissions.</p>
            </div>
            <div className="userloggedin">
              <UserLoggedIn />
            </div>
          </div>

          <div className="pr-header-container-mobile">
            <div className="userloggedin-mobile">
              <UserLoggedIn />
            </div>
            <div className="pr-header">
              <h1>Primary Reviewer Dashboard</h1>
              <p>Overview of Assigned Primary Reviewer Submissions.</p>
            </div>
          </div>

          <Row className="admindashboard-container">
            <Col className="admindashboard-cards">
              <div className="admindashboard-card">
                <h2>Newly Assigned</h2>
                <h3>{statusCounts["Initial-Submission"] || 0}</h3>
                <p>Submissions</p>
              </div>
              <div className="admindashboard-card">
                <h2>Resubmission</h2>
                <h3>{statusCounts.Resubmission || 0}</h3>
                <p>Entries</p>
              </div>
              <div className="admindashboard-card">
                <h2>For Final Review</h2>
                <h3>{statusCounts["Final-Review"] || 0}</h3>
                <p>Researches</p>
              </div>
              <div className="admindashboard-card">
                <h2>Total Assigned</h2>
                <h3>{forms.length}</h3>
                <p>Tasks</p>
              </div>
            </Col>
            <Col className="needs-attention">
              <h1>Assigned Tasks that Need Attention</h1>
              <p className="needs-attention-content mt-3">
                {overdueForms.length > 0
                  ? overdueForms.map((form) => (
                      <div key={form._id}>
                        <p>
                          {form.title} - Submitted on {form.date}
                        </p>
                      </div>
                    ))
                  : "No data available."}
              </p>
            </Col>
          </Row>

          <div className="pr-tables">
            <div className="prdashboard-table">
              <h1>Submission Overview</h1>
              <table className="pr-table">
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
                  {forms.length > 0 ? (
                    forms.map((form, index) => (
                      <tr key={index}>
                        <td>{form._id}</td>
                        <td>{form.fullName}</td>
                        <td>{new Date(form.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>                        <td>{form.title}</td>
                        <td>
                          <Link
                            href={`/PrimaryReviewer/PRViewSubmission/${form._id}`}
                            className="pr-view-btn"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <td colSpan={5}>No data available.</td>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(PrDashboard, [
  "PrimaryReviewer",
  "ExternalReviewer",
]);
