"use client";

// dependencies
import React, { useState } from "react";
import IrebNav from "../../components/navbaradmin/IrebNav";
import IrebNavMobile from "../../components/navbaradmin/IrebNavMobile";
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

// css
import "../../styles/ireb/IrebReports.css";

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

function IrebReports() {
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

  // Stacked horizontal bar chart data and options
  const recStatusData = {
    labels: ["Medicine", "FOP", "COS", "CRS", "GS"],
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
      {
        label: "In Progress",
        data: [4, 2, 2, 4, 2],
        backgroundColor: "#FFCC80", // Light orange-yellow
        barThickness: 25,
      },
      {
        label: "Not Started",
        data: [2, 3, 0, 4, 7],
        backgroundColor: "#808080", // Dark grey
        barThickness: 25,
      },
    ],
  };

  const recStatusOptions = {
    indexAxis: 'y', // Horizontal bar chart
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Task Status by RECs",
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

              <div className="admindashboard-cards">
                <div className="admindashboard-card">
                  <h2>REC Analytics</h2>
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

export default withAuthorization(IrebReports, "IREB");
