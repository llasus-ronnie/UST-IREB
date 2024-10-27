"use client";

import React, { useState, useEffect } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function IrebDashboard() {
  const [REC, setREC] = useState([]);
  const [formsData, setFormsData] = useState([]);
  const [newlyAssignedCount, setNewlyAssignedCount] = useState(0);
  const [recChairMap, setRecChairMap] = useState({});
  const [submissionCounts, setSubmissionCounts] = useState({});

  // For REC data
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

  // For forms data
  useEffect(() => {
    async function fetchFormsData() {
      try {
        const response = await axios.get("/api/forms");
        console.log("API Response Data:", response.data);

        const forms = response.data.forms || [];
        setFormsData(forms);
        setNewlyAssignedCount(forms.length);

        // Count submissions per REC
        const counts = forms.reduce((acc, form) => {
          const researchEthicsCommittee = form.researchEthicsCommittee;
          acc[researchEthicsCommittee] =
            (acc[researchEthicsCommittee] || 0) + 1;
          return acc;
        }, {});

        setSubmissionCounts(counts);
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

  const [chartData, setChartData] = useState({
    labels: [
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
    ],
    datasets: [
      {
        label: "Submitted",
        data: [3, 4, 6, 5, 7, 8, 6, 9, 7, 6, 5, 4],
        backgroundColor: "#FFCC00",
      },
      {
        label: "Approved",
        data: [2, 3, 5, 4, 6, 7, 5, 8, 6, 5, 4, 3],
        backgroundColor: "#E6B800",
      },
    ],
  });

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
              <UserLoggedIn />
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
                  <h3>100</h3>
                  <p>Entries</p>
                </div>
                <div className="admindashboard-card">
                  <h2>For Final Review</h2>
                  <h3>100</h3>
                  <p>Researches</p>
                </div>
                <div className="admindashboard-card">
                  <h2>Total Assigned</h2>
                  <h3>100</h3>
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
                  {REC.map((rec) => (
                    <tr key={rec.id}>
                      <td>{rec.name}</td>
                      <td>{rec.status}</td>
                      <td>{submissionCounts[rec.name] || 0}</td>
                      <td>{recChairMap[rec.name] || "Not Assigned"}</td>
                      <td>
                        <button className="view-button">View</button>
                      </td>
                    </tr>
                  ))}
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
