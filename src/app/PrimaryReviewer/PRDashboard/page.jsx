"use client";

import React from "react";
import { Row, Col } from "react-bootstrap";
import PrNav from "../../components/navbaradmin/PrNav";
import PrNavMobile from "../../components/navbaradmin/PrNavMobile";
import SearchBar from "../../components/searchbar/SearchBar";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import "../../styles/pr/PrDashboard.css";
import Link from "next/link";

import withAuthorization from "../../../hoc/withAuthorization";

function PrDashboard() {
  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const handleDropDown = (event) => {
    const selectedOption = event.target.value;
  };

  return (
    <div className="adminpage-container">
      <div className="prnav-mobile">
        <PrNavMobile />
      </div>

      <PrNav className="prnav" />

      <div className="pr-dashboard">
        <div className="adminmain-content">
          <div className="pr-header-container">
            <div className="pr-header">
              <h1>Primary Reviewer Dashboard</h1>
              <p>Overview of Assigned Primary Reviewer Submissions.</p>
            </div>
            <div className="userloggedin">
              <UserLoggedIn />
            </div>
          </div>

          <div className="pr-header-container-mobile">
            <div className="userloggedin-mobile">
              <UserLoggedIn />
            </div>
            <div className="pr-header">
              <h1>Primary Reviewer Dashboard</h1>
              <p>Overview of Assigned Primary Reviewer Submissions.</p>
            </div>
          </div>

        <Row className="admindashboard-container">
          <Col className="admindashboard-cards">
              <div className="admindashboard-card">
                <h2>Newly Assigned</h2>
                <h3>2</h3>
                <p>Submissions</p>
              </div>
              <div className="admindashboard-card">
                <h2>Resubmission</h2>
                <h3>1</h3>
                <p>Entries</p>
              </div>
              <div className="admindashboard-card">
                <h2>For Final Review</h2>
                <h3>0</h3>
                <p>Researches</p>
              </div>
              <div className="admindashboard-card">
                <h2>Total Assigned</h2>
                <h3>3</h3>
                <p>Tasks</p>
              </div>
           </Col>
            <Col className="needs-attention">
              <h1>Assigned Tasks that Need Attention</h1>  
              <p className="needs-attention-content mt-3">No data available.</p>
           </Col>
        </Row>

          <div className="pr-tables">
            <div className="prdashboard-table">
              <h1>Submission Overview</h1>
              <table className="pr-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Author</th>
                    <th>Date of Submission</th>
                    <th>Name of Research</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>2024-09-11</td>
                    <td>Impact of Climate Change on Marine Life</td>
                    <td>
                    <Link
                        href={`/PrimaryReviewer/PRSubmissions`}
                        className="pr-view-btn"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jane Smith</td>
                    <td>2024-09-10</td>
                    <td>Advances in Artificial Intelligence</td>
                    <td>
                      <button className="pr-view-btn">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Florence Navidad</td>
                    <td>2024-09-09</td>
                    <td>Encryption Methods in Modern Technology</td>
                    <td>
                      <button className="pr-view-btn">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(PrDashboard, "PrimaryReviewer");
