"use client";

import "../../../styles/submissionstatus/SubmissionStatus.css";
import { Row, Col } from "react-bootstrap";
import Navbar from "../../../components/navbar/Navbar";
import StatusBreadcrumbs from "../../../components/statusbreadcrumbs/StatusBreadcrumbs";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PropagateLoader } from "react-spinners";
import UploadPaymentProofModal from "../../../components/modals/UploadPaymentProofModal.jsx";

import withAuthorization from "../../../../hoc/withAuthorization";
import { current } from "@reduxjs/toolkit";

function SubmissionStatus({ params }) {
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const handleShowModal = () => setModalShow(true);
  const handleCloseModal = () => setModalShow(false);


  //unwrapping the params kasi ang arte ni nextjs
  const [unwrappedParams, setUnwrappedParams] = useState(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setUnwrappedParams(resolvedParams);
    }).catch((error) => {
      console.error('Error unwrapping params:', error);
    });
  }, [params]);


  const steps = [
    {
      id: "Initial-Submission",
      title: "Initial Submission",
      description: "Your initial submission will be reviewed to see if all requirements are complete or if any revisions are needed before proceeding."
    },
    {
      id: "Pending-Payment",
      title: "Pending Payment",
      description: "This is where you need to pay the Ethical Review Fees and submit proof of payment so your research can proceed to classification."
    },
    {
      id: "For-Classification",
      title: "For Classification",
      description: "Once proof of payment is received, your submission will move to research classification."
    },
    {
      id: "In-Progress",
      title: "In Progress",
      description: "Your submission is currently with the primary reviewer for ethical review"
    },
    {
      id: "Final-Review",
      title: "Final Review",
      description: "After all revisions, your submission will be sent to the REC Chair for the final review stage."
    },
    {
      id: "Approved",
      title: "Approved",
      description: "Your submission has been approved. You may now view and download the certificate of ethics review. Thank you!"
    },
  ];


  const [form, setForm] = useState(null); // Initialize form state

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(`/api/forms/${unwrappedParams.id}`);
        console.log("Working on URlID:" + `${unwrappedParams.id}`);
        setForm(response.data.submission);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch form details.");
      } finally {
        setLoading(false);
      } 
    }
    fetchData();
  }, [unwrappedParams]);

  const [isClient, setIsClient] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, [])



  if (loading) {
    return (

      <div className="center-spinner">
        <PropagateLoader color="#fcbf15" />
      </div>
    );
  } else {
    return (
      <>
        {isClient && (
          <>
            <div className="header">
              <Navbar />
            </div>

            <div style={{ paddingTop: "2em" }} className="submission_header">
              <h1 className="text-center">My Submissions</h1>
            </div>
            <Row className="submission-divider" />

            <Row className="submissionstatus-container">
              <Col className="submissionstatus-left">
                <div className="submissionstatus-card-details">
                  <h1>Submission Details</h1>

                  <span>Research Title:</span>
                  <p>{form?.title || "No title available"}</p>

                  <span>Date of Submission:</span>
                  <p>
                    {form?.date
                      ? new Date(form.date).toLocaleDateString("en-US")
                      : "No date available"}
                  </p>

                  <span>Review Classification:</span>
                  <p>{form?.status || "No classification available"}</p>
                </div>

                <div className="submissionstatus-buttons">
                  <Link
                    href="/PrincipalInvestigator/SubmissionList"
                    className="submissionstatus-view-sub"
                  >
                    View Submission
                  </Link>
                  <button className="submissionstatus-edit-sub">
                    Resubmission
                  </button>
                </div>

                {/* this will only appear when investigator reach the specific status for payment*/}
                <div className="submissionstatus-uploadproof-container">
                  <button className="submissionstatus-uploadproof" onClick={handleShowModal}>
                    Upload Proof of Payment
                  </button>
                </div>

              </Col>

              <Col className="submissionstatus-right">
                <div className="submissionstatus-card-breadcrumbs">
                  <h1>Track Status of Submission</h1>
                  <StatusBreadcrumbs steps={steps} params={unwrappedParams}/>
                </div>
              </Col>
            </Row>

            <UploadPaymentProofModal show={modalShow} onHide={handleCloseModal} />
          </>
        )}
      </>
    );

  }
}

export default withAuthorization(SubmissionStatus, "PrincipalInvestigator");
