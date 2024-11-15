"use client";

import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import PrNav from "../../../components/navbaradmin/PrNav";
import PrNavMobile from "../../../components/navbaradmin/PrNavMobile";
import UserLoggedIn from "../../../components/userloggedin/UserLoggedIn";
import FinalReviewModal from "../../../components/modals/ConfirmSubmitToRECFinalReview";
import "../../../styles/pr/PrViewSubmission.css";
import axios from "axios";
import withAuthorization from "../../../../hoc/withAuthorization";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CldUploadWidget } from "next-cloudinary";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";


function PRViewSubmission({ params }) {
    //state variables
    const [forms, setForms] = useState([]);
    const router = useRouter();
    const [modalShowFinalReview, setModalShowFinalReview] = useState(false);
    const [status, setStatus] = useState("");
    const { register, handleSubmit, setValue } = useForm();


    const handleShowFinalReviewModal = () => setModalShowFinalReview(true);
    const handleCloseFinalReviewModal = () => setModalShowFinalReview(false);

    //useEffect 
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/forms/${params.id}`);
                setForms(response.data.submission);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    async function submitResubmissionRemarks(data) {
        try {
            const payload = {
                subFormId: forms._id,
                ...data, 
            };
            const response = await axios.post("/api/resubmissionRemarks", payload);
            if (response.status === 201) {
                toast.success("Resubmission Remarks saved successfully!");
            } else {
                console.error("Unexpected response status:", response.status);
                toast.error("Unexpected error. Please try again.");
            }
        } catch (error) {
            console.error("Error Response:", error.response?.data || error.message);
            toast.error("Error saving resubmission remarks. Please try again.");
        }
    }
    
    

    //functions
    const handleBack = () => {
        router.push(`/REC/RECSubmissions/${params.rec}`);
    };

    return (
        <div className="adminpage-container">
            <div className="prnav-mobile">
                <PrNavMobile />
            </div>

            <PrNav className="prnav" />

            <div className="pr-submissions">
                <div className="adminmain-content">
                    <div className="pr-header-container">
                        <div className="pr-header">
                            <h1>View Submission</h1>
                        </div>
                        <div className="userloggedin">
                            <UserLoggedIn />
                        </div>
                    </div>

                    <div className="pr-header-container-mobile">
                        <div className="userloggedin-mobile">
                            <UserLoggedIn />
                        </div>
                    </div>

                    <Row className="viewsubmission-container">
                        <a href="../PrimaryReviewer/PRSubmissions" className="back-button">
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
                            Go Back to Manage Submissions
                        </a>

                        <Col xs={12} lg={8} className="viewsub-content-container"></Col>
                        <Col xs={12} lg={4} className="viewsub-details-container">
                            <h1>Submission Details</h1>

                            <span>Research Title:</span>
                            <p>{forms?.title || "No title available"}</p>

                            <span>Date of Submission:</span>
                            <p>
                                {forms?.date
                                    ? new Date(forms.date).toLocaleDateString("en-US")
                                    : "No date available"}
                            </p>

                            <span>Review Classification:</span>
                            <p>{forms?.status || "No classification available"}</p>

                            <div className="viewsub-remarks">
                                <p>Review Remarks:</p>
                                <CldUploadWidget
                                    signatureEndpoint="/api/sign-cloudinary-params"
                                    onSuccess={(res) => {
                                        if (res.info.format !== "pdf") {
                                            toast.error(
                                                "Only PDF files are allowed. Please upload a PDF."
                                            );
                                            return;
                                        }
                                        setValue("resubmissionRemarksFile", res.info.secure_url);
                                        console.log("Uploaded File URL:", res.info.secure_url);
                                    }}
                                >
                                    {({ open }) => {
                                        return (
                                            <button
                                                type="button"
                                                onClick={() => open()}
                                                className="form-control PIforms-formtext PIforms-file"
                                            >
                                                Upload file
                                            </button>
                                        );
                                    }}
                                </CldUploadWidget>
                            </div>

                            <div className="viewsub-buttons">
                                <button className="viewsub-save" onClick={handleSubmit((data)=>{
                                    submitResubmissionRemarks(data);
                                })}>
                                    Save Changes
                                </button>
                                <button className="viewsub-back" onClick={handleBack}>
                                    Back
                                </button>
                            </div>

                            <div
                                className="viewsub-finalrec"
                                onClick={handleShowFinalReviewModal}
                            >
                                <button>Submit to REC Chair for Final Review</button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <FinalReviewModal
                show={modalShowFinalReview}
                onHide={handleCloseFinalReviewModal}
            />
            <ToastContainer/>
        </div>
    );
}

export default withAuthorization(PRViewSubmission, [
    "PrimaryReviewer",
    "ExternalReviewer",
]);
