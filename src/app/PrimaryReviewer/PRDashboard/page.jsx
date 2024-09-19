"use client";

import React from "react";
<<<<<<< HEAD:src/app/prdashboard/page.jsx
import PrNav from "../components/navbaradmin/PrNav";
import PrNavMobile from "../components/navbaradmin/PrNavMobile";
import SearchBar from "../components/searchbar/SearchBar";
import UserLoggedIn from "../components/userloggedin/UserLoggedIn";
import "../styles/pr/PrDashboard.css";
=======
import PrNav from "../../components/navbaradmin/PrNav";
import PrNavMobile from "../../components/navbaradmin/PrNavMobile";
import SearchBar from "../../components/searchbar/SearchBar";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import "../../styles/prdashboard/PrDashboard.css";
>>>>>>> 9faf4c4062fb9cfd844ab8b6472141ab228a47ea:src/app/PrimaryReviewer/PRDashboard/page.jsx

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
              <p>Overview of UST-IREB Submissions and RECs.</p>
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
              <p>Overview of UST-IREB Submissions and RECs.</p>
            </div>
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

          <div className="filter-section">
            <div className="search">
              <SearchBar onSearch={handleSearch} className="search-bar" />
            </div>
            <div className="dropdown-filter">
              <select className="pr-dropdown" onChange={handleDropDown}>
                <option value="all">All Submissions</option>
                <option value="newly">Newly Assigned</option>
                <option value="resub">Resubmissions</option>
                <option value="forfinal">For Final Review</option>
              </select>
            </div>
          </div>

          <div className="pr-tables">
            <div className="newly-assigned">
              <h1>Newly Assigned</h1>
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
                      <button className="pr-view-btn">View</button>
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
                <div className="resubmission">
                  <h1>Resubmission</h1>
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
                          <button className="pr-view-btn">View</button>
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

                <div className="for-final">
                  <h1>For Final Review</h1>
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
                          <button className="pr-view-btn">View</button>
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

export default PrDashboard;
