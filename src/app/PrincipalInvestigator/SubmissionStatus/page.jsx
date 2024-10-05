"use client";

import "../../styles/submissionstatus/SubmissionStatus.css";
import { Row, Col } from "react-bootstrap";
import Navbar from "../../components/navbar/Navbar";
import StatusBreadcrumbs from "../../components/statusbreadcrumbs/StatusBreadcrumbs";

function SubmissionStatus() { 

    const steps = [
        { title: "Initial Submission" },
        { title: "Pending Payment" },
        { title: "For Classification" },
        { title: "In Progress" },
        { title: "Final Review" },
        { title: "Approved" },
    ];

    return (
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
                        <p>UST IREB Research Portal: A Web Portal for Research Ethics Committees and Research Submissions of Academic Units of the University of Santo Tomas</p>
                        <span>Date of Submission:</span>
                        <p>June 10, 2024</p>
                        <span>Review Classification:</span>
                        <p>Expedited Review</p>
                    </div>

                    <div className="submissionstatus-buttons">
                        <button className="submissionstatus-view-sub">View Submission</button>
                        <button className="submissionstatus-edit-sub">Edit Submission</button>
                    </div>
                </Col>

                <Col className="submissionstatus-right">
                    <div className="submissionstatus-card-breadcrumbs">
                        <h1>Track Status of Submission</h1>
                        <StatusBreadcrumbs steps={steps} />
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default SubmissionStatus;