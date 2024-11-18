"use client";

import React from "react";
import { Row, Col } from "react-bootstrap";
import PrNav from "../../components/navbaradmin/PrNav";
import PrNavMobile from "../../components/navbaradmin/PrNavMobile";
import SearchBar from "../../components/searchbar/SearchBar";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import "../../styles/pr/PrDashboard.css";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import axios from "axios";

import withAuthorization from "../../../hoc/withAuthorization";
import { get } from "http";

function PrDashboard() {
  //declaration of states
  const [forms, setForms] = useState([]);

  //fetching data from the database
  useEffect(() => {
    async function getForms() {
      try {
        const response = await axios.get("/api/forms",{
          params:{recMember: forms.recMember}
        });
        setForms(response.data.forms);
        console.log(response.data);
      } catch (error) {
        toast.error("Error loading data");
        console.log(error);
      }
    }
    getForms();
  }, []);

  //search function
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
                  {forms.length > 0 ? (
                    forms.map((form,index) => (
                        <tr key={index}>
                          <td>{form._id}</td>
                          <td>{form.fullName}</td>
                          <td>{form.date}</td>
                          <td>{form.title}</td>
                          <td>
                            <Link href={`/PrimaryReviewer/PRViewSubmission/${form._id}`} className="pr-view-btn">
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

export default withAuthorization(PrDashboard, [
  "PrimaryReviewer",
  "ExternalReviewer",
]);
