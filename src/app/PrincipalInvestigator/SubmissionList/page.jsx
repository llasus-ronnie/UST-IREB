"use client";

//style
import "../../styles/submissionlist/SubmissionList.css";

//dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 


//components
import Navbar from "../../components/navbar/Navbar";

//hoc
import withAuthorization from "../../../hoc/withAuthorization";


function SubmissionList() {
  const { data: session } = useSession();
  const [forms, setForms] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [viewArchived, setViewArchived] = useState(false);  // Track archived view
  const userEmail = session?.user.email;

  useEffect(() => {
    async function fetchData() {
      if (!session?.user?.email) {
        console.error("Session email is undefined or not ready.");
        return;
      }
  
      console.log("Session email: ", session.user.email); // Debug
      try {
        const response = await axios.get("/api/forms", {
          params: { 
            email: session.user.email, 
            includeArchived: 'true', },
        });
        console.log("Response data:", response.data); // Debug
        setForms(response.data.forms || []); // Handle case where forms is undefined
      } catch (error) {
        console.error("Error fetching forms:", error.response?.data || error.message);
      }
    }
  
    fetchData();
  }, [session]);
  

  const archiveForm = async (formId, isArchived) => {
    try {
      const response = await axios.put("/api/forms", {
        id: formId,
        isArchived: !isArchived, 
      });

      setForms((prevForms) =>
        prevForms.map((form) =>
          form._id === formId ? { ...form, isArchived: !isArchived } : form
        )
      );
    } catch (error) {
      console.error(`${isArchived ? "Error unarchiving" : "Error archiving"} form:`, error);
    }
  };

  return (
    <>
      <div className="header">
        <Navbar />
      </div>

      <div style={{ paddingTop: "2em" }} className="submission_header">
        <h1 className="text-center">My Submissions</h1>
      </div>

      <Row className="submission-divider" />
      <div className="submission-list-container">
        <div className="submission-list-header">
          <h2>Submission List</h2>
        </div>


        {viewArchived ? (
          <div className="archived-view">
            <table className="submission-table">
              <thead>
                <tr>
                  <th>Research Title</th>
                  <th>Date of Application</th>
                  <th>REC</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {forms.filter(form => form.isArchived).length > 0 ? (
                  forms.filter(form => form.isArchived).map((form, index) => (
                    <tr key={index}>
                      <td>{form.title}</td>
                      <td>{new Date(form.date).toLocaleDateString("en-US")}</td>
                      <td>{form.researchEthicsCommittee}</td>
                      <td>{form.status}</td>
                      <td className="view-btn-cell">
                        <Link
                          href={`/PrincipalInvestigator/SubmissionStatus/${form._id}`}
                          className="view-btn"
                        >
                          View
                        </Link>
                        <button
                          className="archive-btn"
                          onClick={() => archiveForm(form._id, form.isArchived)}
                          disabled={form.isArchived === null} // Disable if form status is unknown or in progress
                        >
                          Undo Archive
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No archived submissions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="active-view">
            <table className="submission-table">
              <thead>
                <tr>
                  <th>Research Title</th>
                  <th>Date of Application</th>
                  <th>REC</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {forms.length > 0 ? (
                  forms.filter(form => !form.isArchived).map((form, index) => (
                    <tr key={index}>
                      <td>{form.title}</td>
                      <td>{new Date(form.date).toLocaleDateString("en-US")}</td>
                      <td>{form.researchEthicsCommittee}</td>
                      <td>{form.status}</td>
                      <td className="view-btn-cell">
                        <Link
                          href={`/PrincipalInvestigator/SubmissionStatus/${form._id}`}
                          className="view-btn"
                        >
                          View
                        </Link>
                        <button
                          className="archive-btn"
                          onClick={() => archiveForm(form._id, form.isArchived)}
                          disabled={form.isArchived === null} // Disable if form status is unknown or in progress
                        >
                          {form.isArchived ? "Undo Archive" : "Archive"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No submissions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

<div className="submission-footer">
  <div className="submission-list-toggle">
    <h3>Show Archived Forms?</h3>

    {!viewArchived && (
      <button 
        className="toggle-btn"
        onClick={() => setViewArchived(true)} 
      >
        <FaEye />
      </button>
    )}

    {viewArchived && (
      <button 
        className="toggle-btn"
        onClick={() => setViewArchived(false)} 
      >
        <FaEyeSlash />
      </button>
    )}
  </div>
</div>

        
      </div>
    </>
  );
}

export default withAuthorization(SubmissionList, [
  "PrincipalInvestigator",
  "ExternalInvestigator",
]);

