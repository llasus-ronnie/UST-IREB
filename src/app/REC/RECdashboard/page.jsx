"use client";

//components
import React from "react";
import RecNav from "../../components/navbaradmin/RecNav";
import RecNavMobile from "../../components/navbaradmin/RecNavMobile";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";

//css
import "../../styles/recdashboard/RECDashboard.css";

function RECDashboard() {
return (
    <div className="adminpage-container">
    <div className="recnav-mobile">
        <RecNavMobile />
    </div>

    <RecNav className="recnav" />

    <div className="rec-dashboard">
        <div className="adminmain-content">
        <div className="rec-header-container">

        <div className="rec-header">
        <img src="/images/rec logos/CICS-Logo.png" alt="CICS Logo" className="cics-logo" />
        <div className="rec-header-text">
            <h1>CICS REC Dashboard</h1>
            <p>Overview of UST CICS REC Submissions</p>
        </div>
    </div>
    <div className="userloggedin">
        <UserLoggedIn />
    </div>
</div>

        </div>

         {/* Submission Cards */}
    <div className="admindashboard-cards">
        <div className="recdashboard-card">
            <h2>Initial Submission</h2>
            <h3>0</h3>
        </div>
        <div className="recdashboard-card">
            <h2>Pending Payment</h2>
            <h3>0</h3>
        </div>
        <div className="recdashboard-card">
            <h2>For Classification</h2>
            <h3>0</h3>
        </div>
        <div className="recdashboard-card">
            <h2>In Progress</h2>
            <h3>0</h3>
        </div>
        <div className="recdashboard-card">
            <h2>For Final Review</h2>
            <h3>0</h3>
        </div>
        <div className="recdashboard-card">
            <h2>Certificates Released</h2>
            <h3>0</h3>
        </div>
    </div>
    <br />
  {/* Submission Overview Table */}


<div className="rec-overview-table">
<h1>Submission Overview</h1>
        <table>
        <thead>
            <tr>
            <th>ID</th>
            <th>Author</th>
            <th>Title</th>
            <th>Date of Submission</th>
            <th>Assigned Evaluator</th>
            <th>Assigned REC Staff</th>
            <th>Submission Status</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>1</td>
            <td>Ronielle Antonio</td>
            <td>A study on UST IREB Research Portal</td>
            <td>Nov 15, 2023</td>
            <td>Juan Miguel Dela Cruz</td>
            <td>Juan Miguel Dela Cruz</td>
            <td><span className="status-badge status-ongoing">Ongoing</span></td>
            </tr>
            <tr>
            <td>2</td>
            <td>Mia Eleazar</td>
            <td>A study on UST IREB Research Portal</td>
            <td>Nov 18, 2023</td>
            <td>Juan Miguel Dela Cruz</td>
            <td>Juan Miguel Dela Cruz</td>
            <td><span className="status-badge status-release">For Release</span></td>
            </tr>
            <tr>
            <td>3</td>
            <td>Florence Navidad</td>
            <td>A study on UST IREB Research Portal</td>
            <td>Nov 15, 2023</td>
            <td>Juan Miguel Dela Cruz</td>
            <td>Juan Miguel Dela Cruz</td>
            <td><span className="status-badge status-complete">Complete</span></td>
            </tr>
        </tbody>
        </table>
    </div>
    </div>

   </div>


);
}

export default RECDashboard;
