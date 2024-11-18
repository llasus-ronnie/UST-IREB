"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button, Spinner } from "react-bootstrap";
import IrebNav from "../../components/navbaradmin/IrebNav";
import IrebNavMobile from "../../components/navbaradmin/IrebNavMobile";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-plugin-dragdata";
import axios from "axios";

import "../../styles/ireb/dashboard.css";

import withAuthorization from "../../../hoc/withAuthorization";
import { set } from "mongoose";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function IrebDashboard() {
  const { data: status } = useSession();

  const [REC, setREC] = useState([]);
  const [formsData, setFormsData] = useState([]);
  const [newlyAssignedCount, setNewlyAssignedCount] = useState(0);
  const [forFinalReviewCount, setForFinalReviewCount] = useState(0);
  const [totalAssignedCount, setTotalAssignedCount] = useState(0);
  const [resubmissionCount, setResubmissionCount] = useState(0);
  const [recChairMap, setRecChairMap] = useState({});
  const [submissionCounts, setSubmissionCounts] = useState({});

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Submitted",
        data: [],
        backgroundColor: "#FFCC00",
      },
      {
        label: "Approved",
        data: [],
        backgroundColor: "#E6B800",
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/REC");
        console.log("API Response:", response.data);
        setREC(response.data.data);
      } catch (error) {
        console.error("Error fetching REC data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchFormsData() {
      try {
        const response = await axios.get("/api/forms");
        console.log("API Response Data:", response.data);

        const forms = response.data.forms || [];
        setFormsData(forms);
        setNewlyAssignedCount(forms.length);

        const submissionCountsArray = Array(12).fill(0);
        const approvedCountsArray = Array(12).fill(0);
        const labels = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        const recSubmissionCounts = {};
        let forFinalReviewCount = 0;
        let totalAssignedCount = 0;
        let resubmissionCount = 0;

        forms.forEach((form) => {
          const submissionDate = new Date(form.date);
          const month = submissionDate.getMonth(); // 0-11 for Jan-Dec

          // Normalize the REC name in the forms
          const recName = form.researchEthicsCommittee
            .toLowerCase()
            .replace(/\s+/g, ""); // Trim spaces and convert to lowercase

          // Increment counts for all submissions
          submissionCountsArray[month]++;

          // Increment counts for approved submissions
          if (form.status === "Approved") {
            approvedCountsArray[month]++;
          }

          // Final review count
          if (form.status === "Final-Review") {
            forFinalReviewCount++;
          }

          // Total assigned count
          if (form.status === "In-Progress") {
            totalAssignedCount++;
          }

          // Resubmission count
          if (form.status === "Resubmission") {
            resubmissionCount++;
          }

          // Count per REC
          if (!recSubmissionCounts[recName]) {
            recSubmissionCounts[recName] = 0;
          }
          recSubmissionCounts[recName]++;
        });

        // Update the state for submission counts per REC
        setSubmissionCounts(recSubmissionCounts);
        setForFinalReviewCount(forFinalReviewCount);
        setTotalAssignedCount(totalAssignedCount);
        setResubmissionCount(resubmissionCount);

        // Update the chart data with both submitted and approved counts
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Submitted",
              data: submissionCountsArray,
              backgroundColor: "#FFCC00",
            },
            {
              label: "Approved",
              data: approvedCountsArray,
              backgroundColor: "#E6B800",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching forms data:", error);
      }
    }

    fetchFormsData();
  }, []);

  // For REC members data (to find REC Chair)
  useEffect(() => {
    async function fetchRECChairs() {
      try {
        const response = await axios.get("/api/RECMembers");
        const recMembers = response.data.data || [];

        const chairMap = {};
        recMembers.forEach((member) => {
          if (member.recRole === "REC Chair") {
            chairMap[member.rec] = member.name;
          }
        });

        setRecChairMap(chairMap);
      } catch (error) {
        console.error("Error fetching REC Chair data:", error);
      }
    }
    fetchRECChairs();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "REC Submissions",
      },
      dragData: true,
      dragDataRound: 0,
      onDragEnd: function (e, datasetIndex, index, value) {
        const updatedData = [...chartData.datasets];
        updatedData[datasetIndex].data[index] = value;
        setChartData({ ...chartData, datasets: updatedData });
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Loading state

  const loadingContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "var(--secondary-color)",
  };
  const spinnerStyle = {
    width: "4rem",
    height: "4rem",
    color: "var(--tertiary-color)",
  };
  const loadingTextStyle = {
    fontFamily: "var(--poppins)",
    fontSize: "var(--paragraph-size)",
    color: "var(--primary-color)",
    marginTop: "1rem",
  };

  if (status === "loading") {
    return (
      <div style={loadingContainerStyle}>
        <Spinner animation="border" role="status" style={spinnerStyle}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p style={loadingTextStyle}>
          Please wait, we are verifying your access...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="adminpage-container">
        <div className="irebnav-mobile">
          <IrebNavMobile />
        </div>
        <IrebNav />
        <div className="ireb-dashboard">
          <div className="adminmain-content">
            <div className="ireb-header-container">
              <div className="ireb-header">
                <h1>IREB Dashboard</h1>
                <p>Overview of UST-IREB Submissions and RECs.</p>
              </div>
              <UserLoggedIn className="userloggedin" />
            </div>

            <div className="ireb-header-container-mobile">
              <div className="ireb-header">
                <UserLoggedIn className="userloggedin-mobile" />
                <h1>IREB Dashboard</h1>
                <p>Overview of UST-IREB Submissions and RECs.</p>
              </div>
            </div>

            <br />
            <br />

            {/* Chart */}
            <div className="twocol-container">
              <div className="ireb-chart-container">
                <Bar data={chartData} options={options} />
              </div>

              {/* Submission Cards */}
              <div className="admindashboard-cards">
                <div className="admindashboard-card">
                  <h2>Newly Assigned</h2>
                  <h3>{newlyAssignedCount}</h3>
                  <p>Submissions</p>
                </div>
                <div className="admindashboard-card">
                  <h2>Resubmission</h2>
                  <h3>{resubmissionCount}</h3>
                  <p>Entries</p>
                </div>
                <div className="admindashboard-card">
                  <h2>For Final Review</h2>
                  <h3>{forFinalReviewCount}</h3>
                  <p>Researches</p>
                </div>
                <div className="admindashboard-card">
                  <h2>Total Assigned</h2>
                  <h3>{totalAssignedCount}</h3>
                  <p>Tasks</p>
                </div>
              </div>
            </div>

            <br />

            {/* REC Status Section */}
            <div className="rec-container">
              <h3>REC Status</h3>
              <table className="rec-table">
                <thead>
                  <tr>
                    <th>RECs</th>
                    <th>Status</th>
                    <th>Overall Submission Count</th>
                    <th>Chair</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {REC.map((rec) => {
                    const normalizedRecName = rec.name
                      .toLowerCase()
                      .replace(/\s+/g, ""); // Normalize REC name
                    const count = submissionCounts[normalizedRecName] || 0; // Use normalized name for lookup

                    return (
                      <tr key={rec.id}>
                        <td>{rec.name}</td>
                        <td>{rec.status}</td>
                        <td>{count}</td>
                        <td>{recChairMap[rec.name] || "Not Assigned"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthorization(IrebDashboard, "IREB");
