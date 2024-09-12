"use client";

//dependencies
import React from "react";
import IrebNav from "../components/navbaradmin/IrebNav";
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
      <IrebNav />
      <div className={styles.dashboardContainer}>
        <div className={styles.header}>
        <h1>IREB Dashboard</h1>
        <p>Overview of UST-IREB Submissions and RECs</p>
        </div>

        <div className={styles.statsSection}>
          <div className={styles.submissionsGraph}>
            <Bar data={data} options={options} />
          </div>
          <div className={styles.stats}>
            <div className={styles.statBox}>
              <h4>Total Accounts</h4>
              <p>390 Investigators</p>
            </div>
            <div className={styles.statBox}>
              <h4>New Submissions</h4>
              <p>17 Submissions</p>
            </div>
            <div className={styles.statBox}>
              <h4>Ongoing Review</h4>
              <p>53 Research</p>
            </div>
            <div className={styles.statBox}>
              <h4>Certificates Released</h4>
              <p>288 Certificates</p>
            </div>
          </div>
        </div>

        <div className={styles.recStatusSection}>
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
    </>
  );
}

export default IrebDashboard;
