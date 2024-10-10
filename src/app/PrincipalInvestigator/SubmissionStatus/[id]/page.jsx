"use client";

import "../../../styles/submissionstatus/SubmissionStatus.css";
import { Row, Col } from "react-bootstrap";
import Navbar from "../../../components/navbar/Navbar";
import StatusBreadcrumbs from "../../../components/statusbreadcrumbs/StatusBreadcrumbs";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import { PropagateLoader } from 'react-spinners';


function SubmissionStatus() {
    const [loading, setLoading] = useState(false);


    const router = useRouter();

    const steps = [
        { title: "Initial Submission" },
        { title: "Pending Payment" },
        { title: "For Classification" },
        { title: "In Progress" },
        { title: "Final Review" },
        { title: "Approved" },
    ];

    const [form, setForm] = useState(null); // Initialize form state
    const [error, setError] = useState(null); // Initialize error state

    useEffect(() => {
        if (router.isReady) {
            const { id } = router.query;

            if (id) {
                async function fetchData() {
                    setLoading(true); 
                    try {
                        const response = await axios.get(`/api/forms/${id}`);
                        console.log(response.data); 
                        setForm(response.data);
                    } catch (error) {
                        console.error(error);
                        setError("Failed to fetch form details.");
                    } finally {
                        setLoading(false);
                    }
                }
                fetchData(); 
            }
        }
    }, [router.isReady, router.query]);

    if (loading) {
        return (
            <div className="center-spinner">
                <PropagateLoader color="#fcbf15" />
            </div>
        )
    } else {
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
                            <p>{form?.title || "No title available"}</p> {/* Optional chaining with fallback */}

                            <span>Date of Submission:</span>
                            <p>{form?.date ? new Date(form.date).toLocaleDateString("en-US") : "No date available"}</p>

                            <span>Review Classification:</span>
                            <p>{form?.classification || "No classification available"}</p>

                        </div>

                        <div className="submissionstatus-buttons">
                            <Link href="/PrincipalInvestigator/SubmissionList" className="submissionstatus-view-sub">
                                View Submission
                            </Link>
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
}

export default SubmissionStatus;
