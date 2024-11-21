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

//components
import Navbar from "../../components/navbar/Navbar";

//hoc
import withAuthorization from "../../../hoc/withAuthorization";


function SubmissionList() {
  const { data: session } = useSession();
  const [forms, setForms] = useState([]);
  const [archivedForm, setArchivedForm] = useState(null);
  const [showArchived, setShowArchived] = useState(false);



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/forms", {
          params: { userEmail: session.user.email }, // Add email as query param
        });
        const userForms = response.data.forms;
        const filteredForms = showArchived
        ? userForms 
        : userForms.filter((form) => !form.isArchived); 

      setForms(filteredForms);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [session,showArchived]);


  const archiveForm = async (formId) => {
    try {
      const response = await axios.put("/api/forms", {
        id: formId,
        isArchived: true,
      });
      console.log("Form archived:", response.data);

      setForms((prevForms) =>
        prevForms.map((form) =>
          form._id === formId ? { ...form, isArchived: true } : form
        )
      );
    } catch (error) {
      console.error("Error archiving form:", error);
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

        <button onClick={() => setShowArchived((prev) => !prev)}>
          {showArchived ? "Hide Archived" : "Show Archived"}
        </button>

        <table className="submission-table">
          <thead>
            <tr>
              <th>Research Title</th>
              <th>Date of Application</th>
              <th>Assigned REC</th>
              <th>Review Classification</th>
              <th>View Research</th>
            </tr>
          </thead>
          <tbody>
            {forms.length > 0 ? (
              forms.map((form, index) => (
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

                    <Link
                      href={`/PrincipalInvestigator/EditSubmission/${form._id}`}
                      className="view-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="view-btn"
                      onClick={() => archiveForm(form._id)}
                      disabled={form.isArchived}
                    >
                      {form.archived ? "Archived" : "Archive"}
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
        <div className="submission-footer">
          <p>
            <i>Click to see further details of your submission</i>
          </p>
        </div>
      </div>
    </>
  );
}

export default withAuthorization(SubmissionList, [
  "PrincipalInvestigator",
  "ExternalInvestigator",
]);
