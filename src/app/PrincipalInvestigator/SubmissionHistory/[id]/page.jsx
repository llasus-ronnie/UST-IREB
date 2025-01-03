"use client";

import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Navbar from "../../../components/navbar/Navbar";
import SummaryFormHistory from "../../../components/submissionstatus/SummaryFormHistory";
import "../../../styles/submissionstatus/SubmissionHistory.css";
import axios from "axios";
import { useRouter } from "next/navigation";

function SummaryHistory({ params }) {
  const [forms, setForms] = useState([]);
  const router = useRouter();

  // Ensure `params.id` exists before trying to fetch data
  useEffect(() => {
    if (params?.id) {
      async function fetchData() {
        try {
          const response = await axios.get(`/api/forms/${params.id}`);
          setForms(response.data.form);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchData();
    }
  }, [params?.id]);

  const handleBack = () => {
    router.back(); // Ensure the function is called
  };

  return (
    <>
      <Navbar />
      <div className="historypage-container">
        <Row className="viewsubmission-container">
          <a href={handleBack} className="back-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
            Go Back to Submission Status
          </a>

          <Col xs={12} lg={8} className="viewsub-content-container">
            <SummaryFormHistory id={params.id} />
          </Col>

          {/* <Col xs={12} lg={4} className="viewsub-details-container">
            <h1>Submission History</h1>
            <table className="submission-history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Filename</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((form, index) => (
                  <tr key={index}>
                    <td>{new Date(form.date).toLocaleDateString()}</td>
                    <td>
                      <Link href={`/path/to/file/${form.filename}`}>
                        {form.filename}
                      </Link>
                    </td>
                  </tr>
                ))}

                para ma visualize lang
                <tr>
                  <td>11/1/2024 12:00</td>
                  <td>
                    <Link href={`/path/to/file/sample-file-1.pdf`}>
                      Proposal Form
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>11/1/2024 12:00</td>
                  <td>
                    <Link href={`/path/to/file/sample-file-1.pdf`}>
                      sample-file-1.pdf
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>11/2/2024 13:00</td>
                  <td>
                    <Link href={`/path/to/file/sample-file-2.pdf`}>
                      sample-file-2.pdf
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>11/2/2024 13:00</td>
                  <td>
                    <Link href={`/path/to/file/sample-file-1.pdf`}>
                      Resubmission Comment
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>11/3/2024 14:00</td>
                  <td>
                    <Link href={`/path/to/file/sample-file-2.pdf`}>
                      sample-file-3.pdf
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </Col> */}
        </Row>
      </div>
    </>
  );
}

export default SummaryHistory;
