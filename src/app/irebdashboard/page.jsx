"use client";

//dependencies
import React from "react";
import IrebNav from "../components/navbaradmin/IrebNav";
import UserLoggedIn from "../components/userloggedin/UserLoggedIn";
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

//css
import styles from '../styles/ireb/dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function IrebDashboard() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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
  };

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
    },
  };

  return (
    <>
    <div className="twocol-container">
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

        <div className="twocol-container">
          <div className="ireb-chart-container">
            {/* Insert Chart */}
            <p>ireb chart goes here</p>
          </div>

          <div className="admindashboard-cards">
            <div className="admindashboard-card">
              <h2>Newly Assigned</h2>
              <h3>100</h3>
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


          <div className="rec-status-section">
          <h3>REC Status</h3>
          <table className={styles.recTable}>
            <thead>
              <tr>
                <th>PHREB-accredited RECs and IREB Members</th>
                <th>Status</th>
                <th>Overall Submission Count</th>
                <th>Assigned REC Reviewer</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>UST Hospital</td>
                <td>PHREB</td>
                <td>1</td>
                <td>Juan Miguel Dela Cruz</td>
                <td>
                  <button className={styles.viewButton}>View</button>
                </td>
              </tr>
              <tr>
                <td>Faculty of Pharmacy</td>
                <td>PHREB</td>
                <td>2</td>
                <td>Juan Miguel Dela Cruz</td>
                <td>
                  <button className={styles.viewButton}>View</button>
                </td>
              </tr>
              <tr>
                <td>Graduate School</td>
                <td>PHREB</td>
                <td>3</td>
                <td>Juan Miguel Dela Cruz</td>
                <td>
                  <button className={styles.viewButton}>View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        </div>
      </div>
    </div>
    </>
  );
}

export default IrebDashboard;
