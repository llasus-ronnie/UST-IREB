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
import "jspdf-autotable";

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
  const [recSubmissionCounts, setRecSubmissionCounts] = useState({});
  const [recApprovalCounts, setRecApprovalCounts] = useState({});
  const [recDeferredCounts, setRecDeferredCounts] = useState({});
  const [statusCounts, setStatusCounts] = useState([]);
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

  useEffect(() => {
    async function fetchFormsData() {
      try {
        const response = await axios.get("/api/forms", { params: { rec } });
        console.log("API Response Data:", response.data);

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

        let submittedCount = 0;
        let totalSubmissions = 0;

        let approvedCount = 0;
        let rejectedCount = 0;

        const recSubmissionCountsTemp = {};
        const recApprovalCountsTemp = {};
        const recDeferredCountsTemp = {};

        forms.forEach((form) => {
          const submissionDate = new Date(form.date);
          const month = submissionDate.getMonth();
          const recName = form.researchEthicsCommittee;

          submissionCountsArray[month]++;
          if (!recSubmissionCountsTemp[recName]) {
            recSubmissionCountsTemp[recName] = 0;
          }
          recSubmissionCountsTemp[recName]++;
          totalSubmissions++;

          if (form.finalDecision === "No Final Decision Yet") submittedCount++;
          else if (form.finalDecision === "Approved") {
            approvedCount++;
            recApprovalCountsTemp[recName] =
              (recApprovalCountsTemp[recName] || 0) + 1;
          } else if (form.finalDecision === "Deferred") {
            rejectedCount++;
            recDeferredCountsTemp[recName] =
              (recDeferredCountsTemp[recName] || 0) + 1;
          }

          if (form.finalDecision === "Approved") {
            approvedCountsArray[month]++;
          }
        });

        setRecSubmissionCounts(recSubmissionCountsTemp);
        setRecApprovalCounts(recApprovalCountsTemp);
        setRecDeferredCounts(recDeferredCountsTemp);

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
              backgroundColor: "#4CAF50",
            },
          ],
        });

        setDoughnutData({
          labels: ["Submitted", "Approved", "Rejected"],
          datasets: [
            {
              label: "Approval Status",
              data: [totalSubmissions, approvedCount, rejectedCount],
              backgroundColor: ["#FFCC00", "#4CAF50", "#F44336"],
              hoverOffset: 4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching forms data:", error);
      }
    }
    fetchFormsData();
  }, [rec]);

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
        label: "In Progress",
        data: [],
        backgroundColor: "#FFEB3B",
        barThickness: 25,
      },
      {
        label: "Resubmission",
        data: [],
        backgroundColor: "#F44336",
        barThickness: 25,
      },
      {
        label: "Final Review",
        data: [],
        backgroundColor: "#4CAF50",
        barThickness: 25,
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const recResponse = await axios.get("/api/REC", { params: { rec } });
        setREC(recResponse.data.data);

        const membersResponse = await axios.get("/api/RECMembers", {
          params: { rec },
        });
        const primaryReviewers = membersResponse.data.data
          .filter((member) => member.recRole === "Primary Reviewer")
          .map((member) => ({
            email: member.email,
            name: member.name,
          }));

        const externalResponse = await axios.get("/api/addExternalReviewer", {
          params: { rec },
        });
        const externalReviewers = externalResponse.data.data.map(
          (reviewer) => ({
            email: reviewer.email,
            name: reviewer.name,
          })
        );

        const allReviewers = [...primaryReviewers, ...externalReviewers];

        const formsResponse = await axios.get("/api/forms", {
          params: { rec },
        });
        const forms = formsResponse.data.forms;

        const counts = allReviewers.map((reviewer) => ({
          reviewer: reviewer.name,
          email: reviewer.email,
          inProgress: 0,
          finalReview: 0,
          resubmission: 0,
        }));

        forms.forEach((form) => {
          form.recMember.forEach((assignedReviewerEmail) => {
            const reviewerIndex = counts.findIndex(
              (entry) => entry.email === assignedReviewerEmail
            );
            if (reviewerIndex !== -1) {
              if (form.status === "In-Progress") {
                counts[reviewerIndex].inProgress++;
              } else if (form.status === "Final-Decision") {
                counts[reviewerIndex].finalReview++;
              } else if (form.status === "Resubmission") {
                counts[reviewerIndex].resubmission++;
              }
            }
          });
        });

        setStatusCounts(counts);

        setRecStatusData({
          labels: counts.map((entry) => entry.reviewer),
          datasets: [
            {
              label: "In Progress",
              data: counts.map((entry) => entry.inProgress),
              backgroundColor: "#FFEB3B",
              barThickness: 25,
            },
            {
              label: "Resubmission",
              data: counts.map((entry) => entry.resubmission),
              backgroundColor: "#F44336",
              barThickness: 25,
            },
            {
              label: "Final Review",
              data: counts.map((entry) => entry.finalReview),
              backgroundColor: "#4CAF50",
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
    indexAxis: "y",
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
      doc.addImage(barChartImage, "PNG", 40, 120, 500, 250);

      doc.text("", 0, 400);

      const submissionOverviewHeaders = ["Month", "Submitted", "Approved"];
      const submissionOverviewRows = chartData.labels.map((month, index) => [
        month,
        chartData.datasets[0].data[index],
        chartData.datasets[1].data[index],
      ]);

      doc.setFontSize(16);
      doc.text("Submission Overview Table", 40, 420);

      doc.autoTable({
        startY: 440,
        head: [submissionOverviewHeaders],
        body: submissionOverviewRows,
        styles: { font: "helvetica", fontSize: 10 },
        headStyles: { fillColor: [255, 204, 0] },
      });

      doc.addPage();

      const pageWidth = doc.internal.pageSize.width;
      const doughnutImageWidth = 250;
      const centerX = (pageWidth - doughnutImageWidth) / 2;
      doc.text("REC Analytics", 40, 60);
      doc.addImage(
        doughnutChartImage,
        "PNG",
        centerX,
        80,
        doughnutImageWidth,
        250
      );

      doc.text("", 0, 320);

      const recAnalyticsHeaders = [
        "REC Name",
        "Submissions",
        "Approved",
        "Deferred",
      ];
      const recAnalyticsRows = Object.entries(recSubmissionCounts).map(
        ([recName, count]) => [
          recName,
          count,
          recApprovalCounts[recName] || 0,
          recDeferredCounts[recName] || 0,
        ]
      );

      doc.text("", 0, 340);

      doc.setFontSize(16);
      doc.text("REC Analytics Table", 40, 360);

      doc.autoTable({
        startY: 380,
        head: [recAnalyticsHeaders],
        body: recAnalyticsRows,
        styles: { font: "helvetica", fontSize: 10 },
        headStyles: { fillColor: [255, 204, 0] },
      });

      doc.addPage();

      doc.text("Task Status by Primary Reviewers", 40, 60);
      doc.addImage(recStatusChartImage, "PNG", 40, 80, 500, 250);

      doc.setFontSize(16);
      doc.text("Reviewer Status Table", 40, 360);

      const reviewerStatusHeaders = [
        "Reviewer",
        "In Progress",
        "Resubmission",
        "Final Review",
      ];

      const reviewerStatusRows = statusCounts.map((entry) => [
        entry.reviewer,
        entry.inProgress,
        entry.resubmission,
        entry.finalReview,
      ]);

      doc.autoTable({
        startY: 380,
        head: [reviewerStatusHeaders],
        body: reviewerStatusRows,
        styles: { font: "helvetica", fontSize: 10 },
        headStyles: { fillColor: [255, 204, 0] },
      });

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
