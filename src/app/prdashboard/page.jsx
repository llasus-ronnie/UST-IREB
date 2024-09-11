"use client";

import React from "react";
import IrebNav from "../components/irebnav/IrebNav";
import "../styles/prdashboard/PrDashboard.css";

function PrDashboard() {
  return (
    <div className="page-container">
      <IrebNav />
      <div className="pr-dashboard">
        <div className="main-content">

          <div className="pr-header">
            <h1>Primary Reviewer Dashboard</h1>
            <p>Overview of UST-IREB Submissions and RECs.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PrDashboard;