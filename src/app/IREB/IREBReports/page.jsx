"use client";

// dependencies
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Spinner } from "react-bootstrap";
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
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
  const { data: status } = useSession();

  //for forms data
  const [formsData, setFormsData] = useState([]);
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
        const response = await axios.get("/api/forms");
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

        const recSubmissionCounts = {};
        let submittedCount = 0;
        let totalSubmissions = 0;

        //wala pa tayo status
        let approvedCount = 0;
        let rejectedCount = 0;

        forms.forEach((form) => {
          const submissionDate = new Date(form.date);
          const month = submissionDate.getMonth(); // 0-11 for Jan-Dec
          const recName = form.researchEthicsCommittee;

          // Increment counts for submissions by month
          submissionCountsArray[month]++;
          if (!recSubmissionCounts[recName]) {
            recSubmissionCounts[recName] = 0;
          }
          recSubmissionCounts[recName]++;
          totalSubmissions++;

          // Count status types for doughnut chart
          if (form.status === "Submitted") submittedCount++;
          else if (form.status === "Approved") approvedCount++;
          else if (form.status === "Rejected") rejectedCount++;

          if (form.status === "Approved") {
            approvedCountsArray[month]++;
          }
        });

        // Update the bar chart data
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
              data: approvedCount,
              backgroundColor: "#E6B800",
            },
          ],
        });

        // Update the doughnut chart data
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
  }, []);

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

  //for rec status
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

  //download
  const downloadReport = async () => {
    const doc = new jsPDF("portrait", "pt", "a4");

    // Header for the PDF
    doc.setFontSize(18);
    doc.text("IREB Reports", 40, 40);
    doc.setFontSize(12);
    doc.text("Overview of UST-IREB Submissions and REC Analytics", 40, 60);

    // Capture charts as images
    const barChartElement = document.getElementById("bar-chart");
    const doughnutChartElement = document.getElementById("doughnut-chart");
    const recStatusChartElement = document.querySelector(
      ".ireb-rec-status-chart canvas"
    );

    // Convert charts to images and add them to the PDF
    if (barChartElement && doughnutChartElement && recStatusChartElement) {
      const barChartImage = await html2canvas(barChartElement).then((canvas) =>
        canvas.toDataURL("image/png")
      );
      const doughnutChartImage = await html2canvas(doughnutChartElement).then(
        (canvas) => canvas.toDataURL("image/png")
      );
      const recStatusChartImage = await html2canvas(recStatusChartElement).then(
        (canvas) => canvas.toDataURL("image/png")
      );

      // Add Bar Chart to the PDF
      doc.setFontSize(16);
      doc.text("Submission Overview", 40, 100);
      doc.addImage(barChartImage, "PNG", 40, 120, 500, 300);

      // Move to new page for Doughnut and REC Status Charts
      doc.addPage();

      // Center the Doughnut Chart on the page
      const pageWidth = doc.internal.pageSize.width;
      const doughnutImageWidth = 300; // Width of the doughnut chart image
      const centerX = (pageWidth - doughnutImageWidth) / 2;

      // Add Doughnut Chart to the PDF
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

      // Add REC Status Chart to the PDF
      doc.text("Task Status by RECs", 40, 40);
      doc.addImage(recStatusChartImage, "PNG", 40, 60, 500, 300);
    }

    doc.save("IREB_Report.pdf");
  };

  //loading
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
                <h1>IREB Reports</h1>
                <p>Overview of UST-IREB Submissions and RECs.</p>
              </div>
              <UserLoggedIn className="userloggedin" />
            </div>

            <div className="ireb-header-container-mobile">
              <div className="ireb-header">
                <UserLoggedIn className="userloggedin-mobile" />
                <h1>IREB Reports</h1>
                <p>Overview of UST-IREB Submissions and RECs.</p>
              </div>
            </div>

            <div className="report-page-header">
              <button className="download-btn" onClick={downloadReport}>
                Download Reports
              </button>
            </div>

            {/* Chart */}
            <div className="twocol-container">
              <div className="ireb-chart-container">
                <Bar id="bar-chart" data={chartData} options={options} />
              </div>

              <div className="admindashboard-cards">
                <div className="admindashboard-card">
                  <h2>REC Analytics</h2>
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
