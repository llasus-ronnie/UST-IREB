"use client";

//components
import React, { useState, useEffect } from "react";
import RecNav from "../../../components/navbaradmin/RecNav";
import RecNavMobile from "../../../components/navbaradmin/RecNavMobile";
import RecHeader from "../../../components/recheader/RecHeader";
import axios from "axios"; // You can use any library for HTTP requests
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

//css
import "../../../styles/rec/RECDashboard.css";

//images
import error from "../../../../../public/images/rec/needs-attention.png";

import withAuthorization from "../../../../hoc/withAuthorization";

function RECDashboard({ params }) {
  const [forms, setForms] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [statusCounts, setStatusCounts] = useState({
    "Initial-Submission": 0,
    "Pending-Payment": 0,
    "For-Classification": 0,
    "In-Progress": 0,
    "Final-Review": 0,
    Approved: 0,
  });

  const { rec } = useParams();
  const parameter = React.use(params);

  const [overdueForms, setOverdueForms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/forms", {
          params: { rec: rec.trim() },
        });
        const fetchForms = response.data.forms;

        // Filter forms that need attention (submitted over 7 days ago)
        const overdueForms = fetchForms.filter((form) => {
          if (form.date) {
            const today = new Date();
            const formDate = new Date(form.date);
            const dateSinceSubmission = today - formDate;

            // Check if the form is more than 7 days old
            return dateSinceSubmission > 7 * 24 * 60 * 60 * 1000;
          }
          return false;
        });
        setForms(response.data.forms);
        setOverdueForms(overdueForms);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    }

    fetchData();
  }, [rec]);

  useEffect(() => {
    const newStatusCounts = {
      "Initial-Submission": 0,
      "Pending-Payment": 0,
      "For-Classification": 0,
      "In-Progress": 0,
      "Initial-Result": 0,
      Resubmission: 0,
      Approved: 0,
    };

    forms.forEach((form) => {
      if (form.status && newStatusCounts.hasOwnProperty(form.status)) {
        newStatusCounts[form.status] += 1;
      } else if (form.finalDecision) {
        newStatusCounts["Approved"] += 1;
      }
    });

    setStatusCounts(newStatusCounts);
  }, [forms]);

  //hydration error fix
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <div className="adminpage-container">
          <div className="recnav-mobile">
            <RecNavMobile />
          </div>

          <RecNav className="recnav" rec={parameter.rec} />

          <div className="rec-dashboard">
            <div className="adminmain-content">
              <RecHeader rec={rec} />
            </div>

            {/* Parent of the Cards */}
            <div className="cards-container">
              {/* Submission Cards */}
              <div className="admindashboard-cards">
                <div className="recdashboard-card">
                  <h2>Initial Submission</h2>
                  <h3>{statusCounts["Initial-Submission"]}</h3>
                </div>

                <div className="recdashboard-card">
                  <h2>Pending Payment</h2>
                  <h3>{statusCounts["Pending-Payment"]}</h3>
                </div>

                <div className="recdashboard-card">
                  <h2>For Classification</h2>
                  <h3>{statusCounts["For-Classification"]}</h3>
                </div>

                <div className="recdashboard-card">
                  <h2>In Progress</h2>
                  <h3>{statusCounts["In-Progress"]}</h3>
                </div>

                <div className="recdashboard-card">
                  <h2>Initial Result</h2>
                  <h3>{statusCounts["Initial-Result"]}</h3>
                </div>

                <div className="recdashboard-card">
                  <h2>Resubmission</h2>
                  <h3>{statusCounts["Resubmission"]}</h3>
                </div>
              </div>
              <div className="release-card">
                <h2>Certificates Released</h2>
                <h3>{statusCounts["Approved"]}</h3>
              </div>
            </div>

            {/* Deadline Cards Converted to Table */}
            <div className="deadline-table-container">
              <div className="deadline-table-header">
                <h2>Needs Attention</h2>
                <Image
                  src={error}
                  alt="Needs Attention"
                  style={{ height: "18px", width: "20px" }}
                />
              </div>
              <table className="deadline-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Submission Date</th>
                    <th>Assigned Reviewer</th>
                    <th>Task</th>
                    <th>Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {overdueForms.map((form, index) => (
                    <tr key={index}>
                      <td>
                        <Link href={`REC/RECViewSubmission`}>
                          <div className="deadline-links">
                            <p>{form.title}</p>
                          </div>
                        </Link>
                      </td>
                      <td>
                        {new Date(form.date).toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Submission Overview Table */}
            <div className="rec-overview-table">
              <h1>Submission Overview</h1>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Date of Submission</th>
                    <th>Assigned REC Staff</th>
                    <th>Submission Status</th>
                  </tr>
                </thead>
                <tbody>
                  {forms.map((form, index) => (
                    <tr key={index}>
                      <td>{form ? index + 1 : "No forms"}</td>
                      <td>{form ? form.fullName : "No available full name"}</td>
                      <td>{form ? form.title : "No title available"}</td>
                      <td>
                        {form && form.date
                          ? new Date(form.date).toLocaleDateString("en-US")
                          : "No date available"}
                      </td>

                      <td>  {form && form.recMember && form.recMember.length > 0
                        ? form.recMember.join(", ")
                        : "No assigned reviewer"}</td>
                      <td>
                        {form && form.status
                          ? form.status
                          : "No status available"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
          </div>
        </div>
      )}
    </>
  );
}

export default withAuthorization(RECDashboard, "REC");
