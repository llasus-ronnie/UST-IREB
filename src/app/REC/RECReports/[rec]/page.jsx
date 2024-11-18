"use client";

import React, { useState, useEffect } from "react";
import RecNav from "../../../components/navbaradmin/RecNav";
import RecNavMobile from "../../../components/navbaradmin/RecNavMobile";
import UserLoggedIn from "../../../components/userloggedin/UserLoggedIn";
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
import { useParams } from "next/navigation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

//css
import "../../../styles/rec/RECReports.css";

import withAuthorization from "../../../../hoc/withAuthorization";

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
  const { rec } = useParams();
  const [formsData, setFormsData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      { label: "Submitted", data: [], backgroundColor: "#FFCC00" },
      { label: "Approved", data: [], backgroundColor: "#4CAF50" },
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

  useEffect(() => {
    async function fetchFormsData() {
      try {
        const response = await axios.get("/api/forms", { params: { rec } });
        const forms = response.data.forms || [];
        setFormsData(forms);

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

        let approvedCount = 0,
          rejectedCount = 0,
          totalSubmission = 0;

        forms.forEach((form) => {
          const month = new Date(form.date).getMonth();
          submissionCountsArray[month]++;
          totalSubmission++;

          if (form.status === "Submitted") submittedCount++;
          else if (form.status === "Approved") approvedCount++;
          else if (form.status === "Rejected") rejectedCount++;

          if (form.status === "Approved") {
            approvedCountsArray[month]++;
          }
        });

        setChartData({
          labels,
          datasets: [
            {
              label: "Submitted",
              data: submissionCountsArray,
              backgroundColor: "#FFCC00",
            },
            {
              label: "Approved",
              data: approvedCountsArray,
              backgroundColor: "#4CAF50",
            },
          ],
        });

        setDoughnutData({
          labels: ["Submitted", "Approved", "Rejected"],
          datasets: [
            {
              data: [totalSubmission, approvedCount, rejectedCount],
              backgroundColor: ["#FFCC00", "#4CAF50", "#F44336"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching forms data:", error);
      }
    }
    fetchFormsData();
  }, [rec]);

  // rec analytics (doughnut chart data state)
  const [doughnutData, setDoughnutData] = useState({
    labels: [],
    datasets: [
      {
        label: "Approval Status",
        data: [],
        backgroundColor: ["#FFCC00", "#4CAF50", "#F44336"],
        hoverOffset: 4,
      },
    ],
  });

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
        label: "Waiting",
        data: [2, 1, 1, 2, 1],
        backgroundColor: "#FFEB3B", // Yellow
        barThickness: 25,
      },
      {
        label: "Completed",
        data: [4, 6, 4, 7, 6],
        backgroundColor: "#FFD700", // Bright yellow
        barThickness: 25,
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch REC data
        const recResponse = await axios.get("/api/REC");
        setREC(recResponse.data.data);

        // Fetch RECMembers data to get Primary Reviewers
        const membersResponse = await axios.get("/api/RECMembers");
        const primaryReviewers = membersResponse.data.data
          .filter((member) => member.recRole === "Primary Reviewer")
          .map((member) => member.name);

        // Fetch Forms data
        const formsResponse = await axios.get("/api/forms", {
          params: { rec },
        });
        const forms = formsResponse.data.forms;

        // Initialize counts for each reviewer
        const statusCounts = primaryReviewers.map((reviewer) => ({
          reviewer,
          inProgress: 0,
          finalReview: 0,
        }));

        // Count statuses for each reviewer
        forms.forEach((form) => {
          const reviewerIndex = statusCounts.findIndex(
            (entry) => entry.reviewer === form.primaryReviewer
          );
          if (reviewerIndex !== -1) {
            if (form.status === "In-Progress") {
              statusCounts[reviewerIndex].inProgress++;
            } else if (form.status === "Final-Review") {
              statusCounts[reviewerIndex].finalReview++;
            }
          }
        });

        // Prepare chart data
        setRecStatusData({
          labels: statusCounts.map((entry) => entry.reviewer),
          datasets: [
            {
              label: "In-Progress",
              data: statusCounts.map((entry) => entry.inProgress),
              backgroundColor: "#FFEB3B", // Yellow
              barThickness: 25,
            },
            {
              label: "Final-Review",
              data: statusCounts.map((entry) => entry.finalReview),
              backgroundColor: "#4CAF50", // Green
              barThickness: 25,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [rec]);

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

  const downloadReport = async () => {
    try {
      const doc = new jsPDF("portrait", "pt", "a4");

      // Header for the PDF
      doc.setFontSize(18);
      doc.text("REC Reports", 40, 40);
      doc.setFontSize(12);
      doc.text(
        "Overview of REC Submissions and Primary Reviewer Analytics",
        40,
        60
      );

      const barChartElement = document.getElementById("bar-chart");
      const doughnutChartElement = document.getElementById("doughnut-chart");
      const recStatusChartElement = document.querySelector(
        ".ireb-rec-status-chart canvas"
      );

      if (!barChartElement || !doughnutChartElement || !recStatusChartElement) {
        console.error("One or more chart elements not found.");
        return;
      }

      const barChartImage = await html2canvas(barChartElement).then((canvas) =>
        canvas.toDataURL("image/png")
      );
      const doughnutChartImage = await html2canvas(doughnutChartElement).then(
        (canvas) => canvas.toDataURL("image/png")
      );
      const recStatusChartImage = await html2canvas(recStatusChartElement).then(
        (canvas) => canvas.toDataURL("image/png")
      );

      doc.setFontSize(16);
      doc.text("Submission Overview", 40, 100);
      doc.addImage(barChartImage, "PNG", 40, 120, 500, 300);
      doc.addPage();

      const pageWidth = doc.internal.pageSize.width;
      const doughnutImageWidth = 300;
      const centerX = (pageWidth - doughnutImageWidth) / 2;
      doc.text("REC Analytics", 40, 40);
      doc.addImage(
        doughnutChartImage,
        "PNG",
        centerX,
        60,
        doughnutImageWidth,
        300
      );

      doc.addPage();

      doc.text("Task Status by Primary Reviewers", 40, 40);
      doc.addImage(recStatusChartImage, "PNG", 40, 60, 500, 300);

      doc.save("REC_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <div className="adminpage-container">
        <div className="recnav-mobile">
          <RecNavMobile />
        </div>
        <RecNav className="recnav" rec={params.rec} />

        <div className="rec-reports">
          <div className="recreports-content">
            <div className="rec-header-container">
              <div className="rec-header">
                <h1>REC Reports</h1>
                <p>Overview of REC Submissions and Primary Reviewer</p>
              </div>
              <div className="userloggedin">
                <UserLoggedIn />
              </div>
            </div>

            <div className="admin-header-container-mobile">
              <div className="userloggedin-mobile">
                <UserLoggedIn />
              </div>
              <div className="admin-header">
                <h1>REC User Profile</h1>
                <p>View Admin Account Information</p>
              </div>
            </div>

            <div className="report-page-header">
              <button className="download-btn" onClick={downloadReport}>
                Download Reports
              </button>
            </div>

            {/* Chart */}
            <div className="twocol-container">
              <div className="rec-chart-container">
                <Bar id="bar-chart" data={chartData} options={options} />
              </div>

              <div className="rec-report-cards">
                <div className="recreport-card">
                  <h2>Submission Analytics</h2>
                  <div className="circle-analytics">
                    <Doughnut
                      id="doughnut-chart"
                      data={doughnutData}
                      options={doughnutOptions}
                    />
                  </div>
                </div>
              </div>
            </div>

            <br />

            {/* REC Status Section */}
            <div className="rec-container">
              <h3>Primary Reviewer Status</h3>
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
