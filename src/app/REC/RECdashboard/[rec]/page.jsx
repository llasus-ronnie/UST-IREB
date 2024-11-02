"use client";

//components
import React, { useState, useEffect } from "react";
import RecNav from "../../../components/navbaradmin/RecNav";
import RecNavMobile from "../../../components/navbaradmin/RecNavMobile";
import RecHeader from "../../../components/recheader/RecHeader";
import axios from "axios"; // You can use any library for HTTP requests
import Link from "next/link";
import { useParams } from "next/navigation";

//css
import "../../../styles/rec/RECDashboard.css";

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

  const { rec } = useParams(); // Get the current route parameter
  const parameter = React.use(params);

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

  useEffect(() => {
    const newStatusCounts = {
      "Initial-Submission": 0,
      "Pending-Payment": 0,
      "For-Classification": 0,
      "In-Progress": 0,
      "Final-Review": 0,
      Approved: 0,
    };

    forms.forEach((form) => {
      if (form.status && newStatusCounts.hasOwnProperty(form.status)) {
        newStatusCounts[form.status] += 1;
      }
    });

    setStatusCounts(newStatusCounts);
  }, [forms]);

  //hydration error fix
  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatResearchEthicsCommittee = (value) => {
    const replacements = {
      USTHospital: "UST Hospital",
      FacultyofPharmacy: "Faculty of Pharmacy",
      GraduateSchool: "Graduate School",
      CollegeofNursing: "College of Nursing",
      CollegeofRehabilitationSciences: "College of Rehabilitation Sciences",
      FacultyofMedicineandSurgery: "Faculty of Medicine and Surgery",
      SeniorHighSchool: "Senior High School",
      CollegeofEducation: "College of Education",
      FacultyofEngineering: "Faculty of Engineering",
      CollegeofInformationandComputingSciences:
        "College of Information and Computing Sciences",
    };

    return (
      replacements[value] ||
      value
        .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/\bof\b/g, "of")
        .replace(/\s+/g, " ")
        .trim()
    );
  };

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
              <RecHeader college={rec} />{" "}
              {/* Pass the route parameter as a prop */}
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
                  <h2>For Final Review</h2>
                  <h3>{statusCounts["Final-Review"]}</h3>
                </div>

                <div className="recdashboard-card">
                  <h2>Certificates Released</h2>
                  <h3>{statusCounts["Approved"]}</h3>
                </div>
              </div>
              <br />

              {/* Deadline Cards */}
              <div className="deadline-card">
                <h2>Needs Attention</h2>
              </div>
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
                    <th>Assigned Evaluator</th>
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
                      <td>John Doe</td>
                      <td>John Doe</td>
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
      ;
    </>
  );
}

export default withAuthorization(RECDashboard, "REC");
