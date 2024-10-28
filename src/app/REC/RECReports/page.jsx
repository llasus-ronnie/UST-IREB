"use client";

import React, { useState, useEffect } from "react";
import RecNav from "../../components/navbaradmin/RecNav";
import RecNavMobile from "../../components/navbaradmin/RecNavMobile";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-plugin-dragdata";
import axios from "axios";

//css
import "../../styles/rec/RECReports.css";

import withAuthorization from "../../../hoc/withAuthorization";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function RECReports({ params }) {
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
      dragData: true, // Enable drag functionality
      dragDataRound: 0, // Round dragged values
      onDragEnd: function (e, datasetIndex, index, value) {
        const updatedData = [...chartData.datasets];
        updatedData[datasetIndex].data[index] = value; // Update dragged value
        setChartData({ ...chartData, datasets: updatedData }); // Set new data in state
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutData = {
    labels: ["Submitted", "Approved", "Pending"],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: ["#FFCC00", "#E6B800", "#7D7D7D"],
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  const [REC, setREC] = useState([]);
  const [recStatusData, setRecStatusData] = useState({
    labels: [],
    datasets: [
      {
        label: "Deferred",
        data: [2, 1, 2, 2, 3],
        backgroundColor: "#A0A0A0", // Light grey
        barThickness: 25,
      },
      {
        label: "Completed",
        data: [4, 6, 4, 7, 6],
        backgroundColor: "#FFD700", // Bright yellow
        barThickness: 25,
      },
      {
        label: "Waiting",
        data: [2, 1, 1, 2, 1],
        backgroundColor: "#FFEB3B", // Yellow
        barThickness: 25,
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/REC");
        console.log("API Response:", response.data);
        setREC(response.data.data);

        // Extract REC names and update recStatusData labels
        const recNames = response.data.data.map((rec) => rec.name);
        setRecStatusData((prevData) => ({
          ...prevData,
          labels: recNames,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const recStatusOptions = {
    indexAxis: "y", // Horizontal bar chart
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Task Status per Reviewer",
      },
    },
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
      },
      y: {
        stacked: true,
        barThickness: 1,
        maxBarThickness: 1,
      },
    },
  };

  return (
    <>
      <div className="adminpage-container">
        <div className="recnav-mobile">
          <RecNavMobile />
        </div>
        <RecNav
          className="recnav"
          rec={params.rec}
        />

        <div className="rec-reports">
          <div className="recreports-content">
            <div className="rec-header-container">
              <div className="rec-header">
                <h1>REC Reports</h1>
                <p>Overview of REC Submissions</p>
              </div>
              <UserLoggedIn />
            </div>

            <br />

            <div className="report-page-header">
              <button className="download-btn">Download Reports</button>
            </div>

            {/* Chart */}
            <div className="twocol-container">
              <div className="rec-chart-container">
                <Bar data={chartData} options={options} />
              </div>

              <div className="rec-report-cards">
                <div className="recreport-card">
                  <h2>Submission Analytics</h2>
                  <div className="circle-analytics">
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                  </div>
                </div>
              </div>
            </div>

            <br />

            {/* REC Status Section */}
            <div className="rec-container">
              <h3>REC Status</h3>
              <div className="ireb-rec-status-chart">
                <Bar data={recStatusData} options={recStatusOptions} />
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthorization(RECReports, "REC");
