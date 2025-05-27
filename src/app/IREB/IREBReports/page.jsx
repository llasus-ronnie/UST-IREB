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
import "jspdf-autotable";
import html2canvas from "html2canvas";

// css
import "../../styles/ireb/IrebReports.css";

import withAuthorization from "../../../hoc/withAuthorization";
import { set } from "mongoose";

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
  const [recSubmissionCounts, setRecSubmissionCounts] = useState({});
  const [recApprovalCounts, setRecApprovalCounts] = useState({});
  const [recDeferredCounts, setRecDeferredCounts] = useState({});
  const [recStatusCounts, setRecStatusCounts] = useState({});
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
        backgroundColor: "#4CAF50",
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
  }, []);

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
        label: "New Submissions",
        data: [],
        backgroundColor: "#A0A0A0",
        barThickness: 25,
      },
      {
        label: "Waiting",
        data: [],
        backgroundColor: "#FFEB3B",
        barThickness: 25,
      },
      {
        label: "Approved",
        data: [],
        backgroundColor: "#4CAF50",
        barThickness: 25,
      },
      {
        label: "Deferred",
        data: [],
        backgroundColor: "#A0A0A0",
        barThickness: 25,
      },
    ],
  });

  useEffect(() => {
    async function fetchFormsAndRECData() {
      try {
        const recResponse = await axios.get("/api/REC");
        const recs = recResponse.data.data || [];
        setREC(recs);

        const recNameMapping = recs.reduce((acc, rec) => {
          const normalizedName = rec.name.replace(/\s+/g, "").toLowerCase();
          acc[normalizedName] = rec.name;
          return acc;
        }, {});

        const recNames = Object.keys(recNameMapping);

        const formsResponse = await axios.get("/api/forms");
        const forms = formsResponse.data.forms || [];

        const recStatusCountsTemp = recNames.reduce((acc, normalizedName) => {
          const originalName = recNameMapping[normalizedName];
          acc[originalName] = {
            NewSubmissions: 0,
            Waiting: 0,
            Completed: 0,
            Deferred: 0,
          };
          return acc;
        }, {});

        forms.forEach((form) => {
          const normalizedRecName = form.researchEthicsCommittee
            .trim()
            .toLowerCase();
          const status = form.status;
          const finalDecision = form.finalDecision;

          const originalName = recNameMapping[normalizedRecName];
          if (originalName && recStatusCountsTemp[originalName]) {
            if (finalDecision === "Deferred") {
              recStatusCountsTemp[originalName].Deferred++;
            } else if (finalDecision === "Approved") {
              recStatusCountsTemp[originalName].Completed++;
            } else if (status === "In-Progress") {
              recStatusCountsTemp[originalName].Waiting++;
            } else if (status === "Initial-Submission") {
              recStatusCountsTemp[originalName].NewSubmissions++;
            }
          }
        });

        const deferredData = recNames.map(
          (normalizedName) =>
            recStatusCountsTemp[recNameMapping[normalizedName]]?.Deferred || 0
        );
        const completedData = recNames.map(
          (normalizedName) =>
            recStatusCountsTemp[recNameMapping[normalizedName]]?.Completed || 0
        );
        const waitingData = recNames.map(
          (normalizedName) =>
            recStatusCountsTemp[recNameMapping[normalizedName]]?.Waiting || 0
        );
        const newSubmissionsData = recNames.map(
          (normalizedName) =>
            recStatusCountsTemp[recNameMapping[normalizedName]]
              ?.NewSubmissions || 0
        );

        setRecStatusCounts(recStatusCountsTemp);

        setRecStatusData({
          labels: Object.keys(recStatusCountsTemp),
          datasets: [
            {
              label: "New Submissions",
              data: newSubmissionsData,
              backgroundColor: "#FFCC00",
            },
            {
              label: "Waiting",
              data: waitingData,
              backgroundColor: "#FFEB3B",
              barThickness: 25,
            },
            {
              label: "Deferred",
              data: deferredData,
              backgroundColor: "#A0A0A0",
              barThickness: 25,
            },
            {
              label: "Approved",
              data: completedData,
              backgroundColor: "#4CAF50",
              barThickness: 25,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchFormsAndRECData();
  }, []);

  const [recStatusDataExempt, setRecStatusDataExempt] = useState({
    labels: [],
    datasets: [
      {
        label: "Exempt",
        data: [],
        backgroundColor: "#A0A0A0",
        barThickness: 25,
      },
    ],
  });

  useEffect(() => {
    async function fetchFormsData() {
      try {
        const response = await axios.get("/api/forms");
        const forms = response.data.forms || [];

        const recStatusCounts = {};

        forms.forEach((form) => {
          const recName = form.researchEthicsCommittee;
          const classification = form.classification;

          if (!recStatusCounts[recName]) {
            recStatusCounts[recName] = {
              Exempt: 0,
            };
          }

          if (classification === "Exempt") {
            recStatusCounts[recName].Exempt++;
          }
        });

        const labels = Object.keys(recStatusCounts);
        const data = labels.map((label) => recStatusCounts[label].Exempt);

        setRecStatusDataExempt((prevData) => ({
          ...prevData,
          labels,
          datasets: [
            {
              ...prevData.datasets[0],
              data,
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching forms data:", error);
      }
    }

    fetchFormsData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/REC");
        console.log("API Response:", response.data);
        setREC(response.data.data);

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

  const [recStatusDataExpedited, setRecStatusDataExpedited] = useState({
    labels: [],
    datasets: [
      {
        label: "Expedited",
        data: [],
        backgroundColor: "#A0A0A0",
        barThickness: 25,
      },
    ],
  });

  useEffect(() => {
    async function fetchFormsData() {
      try {
        const response = await axios.get("/api/forms");
        const forms = response.data.forms || [];

        const recStatusCounts = {};

        forms.forEach((form) => {
          const recName = form.researchEthicsCommittee;
          const classification = form.classification;

          if (!recStatusCounts[recName]) {
            recStatusCounts[recName] = {
              Expedited: 0,
            };
          }

          if (classification === "Expedited") {
            recStatusCounts[recName].Expedited++;
          }
        });

        const labels = Object.keys(recStatusCounts);
        const data = labels.map((label) => recStatusCounts[label].Expedited);

        setRecStatusDataExpedited((prevData) => ({
          ...prevData,
          labels,
          datasets: [
            {
              ...prevData.datasets[0],
              data,
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching forms data:", error);
      }
    }

    fetchFormsData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/REC");
        console.log("API Response:", response.data);
        setREC(response.data.data);

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

  const [recStatusDataFullBoard, setRecStatusDataFullBoard] = useState({
    labels: [],
    datasets: [
      {
        label: "Full Board",
        data: [],
        backgroundColor: "#A0A0A0",
        barThickness: 25,
      },
    ],
  });

  useEffect(() => {
    async function fetchFormsData() {
      try {
        const response = await axios.get("/api/forms");
        const forms = response.data.forms || [];

        const recStatusCounts = {};

        forms.forEach((form) => {
          const recName = form.researchEthicsCommittee;
          const classification = form.classification;

          if (!recStatusCounts[recName]) {
            recStatusCounts[recName] = {
              FullBoard: 0,
            };
          }

          if (classification === "Full-Board") {
            recStatusCounts[recName].FullBoard++;
          }
        });

        const labels = Object.keys(recStatusCounts);
        const data = labels.map((label) => recStatusCounts[label].FullBoard);

        setRecStatusDataFullBoard((prevData) => ({
          ...prevData,
          labels,
          datasets: [
            {
              ...prevData.datasets[0],
              data,
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching forms data:", error);
      }
    }

    fetchFormsData();
  }, []);

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
    indexAxis: "y",
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

  const [selectedFilters, setSelectedFilters] = useState({
    Exempt: true,
    Expedited: true,
    FullBoard: true,
  });

  const filteredData = {
    labels: recStatusDataExempt.labels,
    datasets: [
      selectedFilters.Exempt && {
        label: "Exempt",
        data: recStatusDataExempt.datasets[0].data,
        backgroundColor: "#fcbf15",
        barThickness: 25,
      },
      selectedFilters.Expedited && {
        label: "Expedited",
        data: recStatusDataExpedited.datasets[0].data,
        backgroundColor: "#FF7A00",
        barThickness: 25,
      },
      selectedFilters.FullBoard && {
        label: "Full Board",
        data: recStatusDataFullBoard.datasets[0].data,
        backgroundColor: "#369AD2",
        barThickness: 25,
      },
    ].filter(Boolean),
  };

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const downloadReport = async () => {
    const doc = new jsPDF("portrait", "pt", "a4");

    doc.setFontSize(18);
    doc.text("IREB Reports", 40, 40);
    doc.setFontSize(12);
    doc.text("Overview of UST-IREB Submissions and REC Analytics", 40, 60);

    const barChartElement = document.getElementById("bar-chart");
    const doughnutChartElement = document.getElementById("doughnut-chart");
    const recStatusChartElement = document.querySelector(
      ".ireb-rec-status-chart canvas"
    );

    const recStatusChartCombined = document.querySelector(
      ".ireb-rec-status-combined-chart canvas"
    );

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

      const recStatusChartCombinedImage = await html2canvas(
        recStatusChartCombined
      ).then((canvas) => canvas.toDataURL("image/png"));

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
          count, // Submissions count
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

      doc.text("Task Status by RECs", 40, 60);
      doc.addImage(recStatusChartImage, "PNG", 40, 80, 500, 250);

      doc.text("", 0, 400);

      const recStatusHeaders = [
        "REC Name",
        "New Submissions",
        "Waiting",
        "Completed",
        "Deferred",
      ];
      const recStatusRows = Object.entries(recStatusCounts).map(
        ([recName, statusCounts]) => [
          recName,
          statusCounts.NewSubmissions,
          statusCounts.Waiting,
          statusCounts.Completed,
          statusCounts.Deferred,
        ]
      );

      doc.setFontSize(16);
      doc.text("REC Status Counts Table", 40, 420);

      doc.autoTable({
        startY: 440,
        head: [recStatusHeaders],
        body: recStatusRows,
        styles: { font: "helvetica", fontSize: 10 },
        headStyles: { fillColor: [255, 204, 0] },
      });

      doc.addPage();

      doc.text("REC Review Classification Status", 40, 60);
      doc.addImage(recStatusChartCombined, "PNG", 40, 80, 500, 250);

      const tableHeaders = [
        "REC Name",
        "Full-Board Submissions",
        "Exempt Submissions",
        "Expedited Submissions",
      ];
      const tableRows = recStatusDataFullBoard.labels.map((recName, index) => [
        recName,
        recStatusDataFullBoard.datasets[0].data[index] || 0,
        recStatusDataExempt.datasets[0].data[index] || 0,
        recStatusDataExpedited.datasets[0].data[index] || 0,
      ]);

      doc.setFontSize(16);
      doc.text("REC Submission Summary", 40, 420);

      doc.autoTable({
        startY: 440,
        head: [tableHeaders],
        body: tableRows,
        styles: { font: "helvetica", fontSize: 10 },
        headStyles: { fillColor: [255, 204, 0] },
      });
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

            <div className="rec-container">
              <h3>REC Review Classification Status</h3>

              <div className=" d-flex justify-content-around">
                <h2>Filter by Review Classification</h2>
                <label>
                  <input
                    type="checkbox"
                    name="Exempt"
                    checked={selectedFilters.Exempt}
                    onChange={handleFilterChange}
                  />
                  Exempt
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="Expedited"
                    checked={selectedFilters.Expedited}
                    onChange={handleFilterChange}
                  />
                  Expedited
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="FullBoard"
                    checked={selectedFilters.FullBoard}
                    onChange={handleFilterChange}
                  />
                  Full Board
                </label>
              </div>

              <div className="ireb-rec-status-combined-chart">
                <Bar data={filteredData} options={recStatusOptions} />
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
