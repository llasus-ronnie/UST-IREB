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

          <div className="rec-tables">
            <div className="newly-assigned">
              <h1>Newly Assigned</h1>
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

            {/*
              Add the code below to only show the "Resubmission" and "For Final Review" sections on mobile view
            */}
            {window.innerWidth <= 768 && (
              <>
                <div className="resubmission">
                  <h1>Resubmission</h1>
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

                <div className="for-final">
                  <h1>For Final Review</h1>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecSubmissions;