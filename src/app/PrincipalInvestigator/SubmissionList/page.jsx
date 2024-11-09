"use client";

//components
import "../../styles/submissionlist/SubmissionList.css";
import React, { useState, useEffect } from "react";
import axios from "axios"; // You can use any library for HTTP requests
import Navbar from "../../components/navbar/Navbar";
import { Row } from "react-bootstrap";
import { useSession } from "next-auth/react";
import Link from "next/link";

import withAuthorization from "../../../hoc/withAuthorization";

function SubmissionList() {
  const { data: session } = useSession();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (session?.user?.email) {
        try {
          const response = await axios.get("/api/forms", {
            params: { email: session.user.email },
          });
          setForms(response.data.forms);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchData();
  }, [session]);

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
            {forms.map((form, index) => (
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
                </td>
              </tr>
            ))}
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
