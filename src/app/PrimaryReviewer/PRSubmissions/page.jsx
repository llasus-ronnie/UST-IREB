"use client";

import React from "react";
import PrNav from "../../components/navbaradmin/PrNav"; 
import PrNavMobile from "../../components/navbaradmin/PrNavMobile";
import SearchBar from "../../components/searchbar/SearchBar";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import "../../styles/pr/PrSubmissions.css";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import axios from "axios";


import withAuthorization from "../../../hoc/withAuthorization";

function PrSubmissions() {
  //declaration of states
  const [forms, setForms] = useState([]);

  //fetching data from the database
  useEffect(() => {
    async function getForms() {
      try {
        const response = await axios.get("/api/forms", {
          params: { recMember: forms.recMember }
        });
        setForms(response.data.forms);
      } catch (error) {
        console.log(error);
      }
    }
    getForms();
  }, []);


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
                  {Array.isArray(forms) && forms.length > 0 ? (
                    forms
                      .filter((form) => {
                        console.log("Filtering form with status:", form.status);
                        return form.status === "In-Progress";  // Adjust this based on actual status value seen in console
                      })
                      .map((form, index) => (
                        <tr key={index}>
                          <td>{form._id}</td>
                          <td>{form.fullName}</td>
                          <td>{form.date}</td>
                          <td>{form.title}</td>
                          <td>
                            <Link href={`/PrimaryReviewer/PRViewSubmission/${form._id}`}>View</Link>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={5}>No data available.</td>
                    </tr>
                  )}
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
                  {forms.length > 0 ? (
                    forms.map((form, index) => (
                      <tr key={index}>
                        <td>{form._id}</td>
                        <td>{form.fullName}</td>
                        <td>{form.date}</td>
                        <td>{form.title}</td>
                        <td>
                          <Link href={`/pr/${form._id}`}>
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
                    forms.map((form, index) => (
                      <tr key={index}>
                        <td>{form._id}</td>
                        <td>{form.fullName}</td>
                        <td>{form.date}</td>
                        <td>{form.title}</td>
                        <td>
                          <Link href={`/pr/${form._id}`}>
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
