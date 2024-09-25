"use client";

import React from "react";
import RecNav from "../../components/navbaradmin/RecNav";
import RecNavMobile from "../../components/navbaradmin/RecNavMobile";
import SearchBar from "../../components/searchbar/SearchBar";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import "../../styles/rec/RecSubmissions.css";

function RecSubmissions() {
  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  const handleDropDown = (event) => {
    const selectedOption = event.target.value;
  };

  return (
    <div className="adminpage-container">
      <div className="recnav-mobile">
        <RecNavMobile />
      </div>

      <RecNav className="recnav" />

      <div className="rec-submissions">
       <div className="adminmain-content">
        <div className="rec-header-container">
          <div className="rec-header">
            <h1>REC Manage Submissions</h1>
            <p>Manage Initial Review and Principal Investigator Submissions</p>
          </div>
          <div className="userloggedin">
            <UserLoggedIn />
          </div>
        </div>

        <div className="rec-header-container-mobile">
            <div className="userloggedin-mobile">
              <UserLoggedIn />
            </div>
            <div className="rec-header">
            <h1>REC Manage Submissions</h1>
            <p>Manage Initial Review and Principal Investigator Submissions</p>
            </div>
          </div>

        <div className="rec-submissions-tabs">
          <div className="rec-buttons-container">
            <button onClick={() => handleTableChange('initialSubmission')}>
              <span>2</span> <p>Initial Submission</p>
            </button>
            <button onClick={() => handleTableChange('pendingPayment')}>
              <span>17</span> <p>Pending Payment</p>
            </button>
            <button onClick={() => handleTableChange('forClassification')}>
              <span>8</span> <p>For Classification</p>
            </button>
            <button onClick={() => handleTableChange('inProgress')}>
              <span>100</span> <p>In Progress</p>
            </button>
            <button onClick={() => handleTableChange('finalReview')}>
              <span>21</span> <p>Final Review</p>
            </button>
            <button onClick={() => handleTableChange('approved')}>
            <span>100</span> <p>Approved</p>
            </button>
          </div>

            <div className="rec-tables">

              <div className="initial-submission">
                <h1>Initial Submission</h1>
                <table className="rec-table">
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
                        <button className="rec-view-btn">View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jane Smith</td>
                      <td>2024-09-10</td>
                      <td>Advances in Artificial Intelligence</td>
                      <td>
                        <button className="rec-view-btn">View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Florence Navidad</td>
                      <td>2024-09-09</td>
                      <td>Encryption Methods in Modern Technology</td>
                      <td>
                        <button className="rec-view-btn">View</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

        </div>

        </div>
      </div>
    </div>
  );
}

export default RecSubmissions;