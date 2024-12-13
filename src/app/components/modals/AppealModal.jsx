"use client";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { CldUploadWidget } from "next-cloudinary";
import "../../styles/modals/ResubmissionModal.css";
import CancelConfirmationModal from "../../components/modals/CancelConfirmationModal.jsx";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResubmissionModal({
    submissionparams,
    subFormId,
    ...props
}) {
    const [body, setBody] = useState("");
    const [form, setForm] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]); // Changed to array for multiple files

    const { register, handleSubmit, setValue } = useForm();

    const handleBodyChange = (e) => {
        const bodyValue = e.target.value;
        setBody(bodyValue);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/forms/${submissionparams.id}`, {
                    params: { subFormId: subFormId },
                });
                setForm(response.data.submission);
                console.log("FetchData for resubmission:", response.data.submission);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch form details.");
            }
        }

        fetchData();
    }, [props.subFormId, submissionparams]);

    // Submit resubmission
    async function submitResubmission(data) {
        try {
            const payload = {
                subFormId: form._id,
                resubmissionFile: uploadedFiles, // Changed to use the uploaded files array
                resubmissionComments: data.resubmissionComments || body || "",
            };

            console.log("Updated Payload:", payload);

            const response = await axios.post("/api/resubmissionFile", payload);

            if (response.status === 201) {
                toast.success("Resubmission sent successfully!");
                try {
                    const updateResponse = await axios.put("/api/forms", {
                        id: form._id,
                        status: "Resubmission",
                    });
                } catch (updateError) {
                    console.error("Error updating form status:", updateError);
                }

                try {
                    const formResponse = await axios.get(
                        `/api/forms/${submissionparams.id}`
                    );
                    const form = formResponse.data.submission;

                    if (!form.researchEthicsCommittee) {
                        toast.error("Research Ethics Committee name is missing.");
                        return false;
                    }

                    const encodedRECName = encodeURIComponent(
                        form.researchEthicsCommittee.trim().toLowerCase()
                    );
                    const recResponse = await axios.get(
                        `/api/REC?name=${encodedRECName}`
                    );
                    console.log("REC Response Data:", recResponse.data);
                    const recList = recResponse.data.data; // Extract the data array

                    const rec = recList.find(
                        (rec) =>
                            rec.name.replace(/\s+/g, "").toLowerCase() ===
                            form.researchEthicsCommittee.replace(/\s+/g, "").toLowerCase()
                    );

                    if (rec) {
                        if (!rec.email) {
                            toast.error("REC email not found.");
                            return false;
                        }
                    } else {
                        toast.error("REC not found for the provided name.");
                        return false;
                    }

                    // Proceed with the email sending logic
                    const emailData = {
                        rec: rec.email,
                        title: form.title,
                        name: form.fullName,
                        status: form.status,
                    };

                    const reviewerEmailData = {
                        reviewers: form.recMember,
                        title: form.title,
                        name: form.fullName,
                        status: form.status,
                    };

                    const emailResponse = await axios.post(
                        "/api/auth/send-email-resubmission",
                        emailData
                    );
                    console.log("Email Response:", emailResponse);

                    if (emailResponse.status === 200) {
                        const reviewerEmailResponse = await axios.post(
                            "/api/auth/send-email-resubmission-reviewer",
                            reviewerEmailData
                        );
                        console.log("Reviewer Email Response:", reviewerEmailResponse);

                        if (reviewerEmailResponse.status === 200) {
                            toast.success("Emails sent successfully!");
                            props.onHide();
                            return true;
                        } else {
                            toast.error("Failed to send reviewer emails");
                        }
                    } else {
                        toast.error("Failed to send email");
                    }
                } catch (error) {
                    console.error("Error sending email:", error);
                    toast.error("Error sending email");
                }
            } else {
                console.error("Unexpected response status:", response.status);
                toast.error("Unexpected error. Please try again.");
            }
        } catch (error) {
            console.error("Error Response:", error.response?.data || error.message);
            toast.error("Error saving resubmission. Please try again.");
        }
    }

    // Remove uploaded file
    const removeFile = (fileToRemove) => {
        setUploadedFiles(
            uploadedFiles.filter((file) => file.url !== fileToRemove.url)
        );
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="resubmission-modal-overlay"
        >
            <Modal.Header className="resubmission-modal-header">
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    className="resubmission-modal-title"
                >
                    Appeal Submission
                </Modal.Title>
                <p className="resubmission-instructions">
                    This is your opportunity to appeal the decision made on your submission. 
                    Kindly input the message you would like to send to the reviewers using the text area below.
                    This will be sent to the reviewer's email.
                </p>
            </Modal.Header>
            <Modal.Body className="resubmission-modal-body">
                <Form>
                    {/* Body */}
                    <Form.Group
                        className="mb-3 form-group-with-icon"
                        controlId="formBody"
                    >
                        <Form.Control
                            as="textarea"
                            value={body}
                            onChange={handleBodyChange}
                            className="form-control-with-icon rounded-input rm-editcontent-body"
                            rows={5}
                            placeholder="Enter your comments here"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="resubmission-modal-footer">
                <Button onClick={props.onHide} className="btn cancel">
                    Cancel
                </Button>
                <Button
                    className="btn uploadproof"
                    onClick={handleSubmit((data) => {
                        submitResubmission(data);
                    })}
                >
                    Submit Resubmission
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
