"use client";

import React from "react";
import PrNav from "../components/prnav/PrNav";
import "../styles/prdashboard/PrDashboard.css";

function PrDashboard() {
  return (
    <div className="page-container">
      <PrNav />
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