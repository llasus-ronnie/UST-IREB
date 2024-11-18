"use client";

import React, { useState, useEffect } from "react";
import PrNav from "../../components/navbaradmin/PrNav";
import PrNavMobile from "../../components/navbaradmin/PrNavMobile";
import SearchBar from "../../components/searchbar/SearchBar";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import "../../styles/pr/PrSubmissions.css";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import withAuthorization from "../../../hoc/withAuthorization";

function PrSubmissions() {
  // State declarations
  const [forms, setForms] = useState([]);
  const [remarksData, setRemarksData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all"); // Tracks the selected dropdown option

  // Fetching data from the database
  useEffect(() => {
    async function getForms() {
      try {
        const response = await axios.get("/api/forms");
        setForms(response.data.forms);
      } catch (error) {
        console.log(error);
      }
    }
    getForms();
  }, []);

  useEffect(() => {
    const fetchResubmissionRemarks = async () => {
      try {
        const response = await axios.get("/api/resubmissionRemarks", {
          params: {
            subFormId: forms._id,
          },
        });
        if (response.status === 200) {
          const sortedRemarks = response.data.getResubmissionRemarks.sort(
            (a, b) => {
              const dateA = new Date(a.resubmissionRemarksDate);
              const dateB = new Date(b.resubmissionRemarksDate);
              return dateA - dateB;
            }
          );
          setRemarksData(sortedRemarks);
        } else {
          console.error("Failed to fetch remarks", response.status);
        }
      } catch (error) {
        console.error("Error fetching remarks:", error.message);
      }
    };

    fetchResubmissionRemarks();
  }, [forms]);

  // Handle dropdown change
  const handleDropDown = (event) => {
    const selectedOption = event.target.value;
    setSelectedFilter(selectedOption); // Update the selected filter
  };

  const handleSearch = (query) => {
    console.log("Search query:", query);
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
              <h1>Primary Reviewer Submissions</h1>
              <p>Manage Assigned Tasks, Resubmissions, and Revisions.</p>
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
              <h1>Primary Reviewer Submissions</h1>
              <p>Manage Assigned Tasks, Resubmissions, and Revisions.</p>
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
            {selectedFilter === "all" || selectedFilter === "newly" ? (
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
                    {forms.length > 0 ? (
                      forms
                        .filter(
                          (form) => form.resubmissionStatus === "Newly-Assigned"
                        )
                        .map((form, index) => (
                          <tr key={index}>
                            <td>{form._id}</td>
                            <td>{form.fullName}</td>
                            <td>{form.date}</td>
                            <td>{form.title}</td>
                            <td>
                              <Link
                                href={`/PrimaryReviewer/PRViewSubmission/${form._id}`}
                                className="pr-view-btn"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <td colSpan={5}>No data available.</td>
                    )}
                  </tbody>
                </table>
              </div>
            ) : null}

            {selectedFilter === "all" || selectedFilter === "resub" ? (
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
                    {forms.length > 0 ? (
                      forms
                        .filter(
                          (form) => form.resubmissionStatus === "Resubmission"
                        )
                        .map((form, index) => (
                          <tr key={index}>
                            <td>{form._id}</td>
                            <td>{form.fullName}</td>
                            <td>{form.date}</td>
                            <td>{form.title}</td>
                            <td>
                              <Link
                                href={`/PrimaryReviewer/PRViewSubmission/${form._id}`}
                                className="pr-view-btn"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <td colSpan={5}>No data available.</td>
                    )}
                  </tbody>
                </table>
              </div>
            ) : null}

            {selectedFilter === "all" || selectedFilter === "forfinal" ? (
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
                    {forms.length > 0 ? (
                      forms
                        .filter(
                          (form) => form.resubmissionStatus === "Final-Review"
                        )
                        .map((form, index) => (
                          <tr key={index}>
                            <td>{form._id}</td>
                            <td>{form.fullName}</td>
                            <td>{form.date}</td>
                            <td>{form.title}</td>
                            <td>
                              <Link
                                href={`/PrimaryReviewer/PRViewSubmission/${form._id}`}
                                className="pr-view-btn"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <td colSpan={5}>No data available.</td>
                    )}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(PrSubmissions, [
  "PrimaryReviewer",
  "ExternalReviewer",
]);
