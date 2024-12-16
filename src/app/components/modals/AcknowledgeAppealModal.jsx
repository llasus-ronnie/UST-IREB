"use client";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../styles/modals/ResubmissionModal.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AcknowledgeAppealModal({
    submissionparams,
    subFormId,
    ...props
}) {
    const [form, setForm] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            console.log("submissionparams: ", submissionparams);
            try {
                const response = await axios.get(`/api/forms`, {
                    params: { subformId: submissionparams },
                });
    
                // Find the form dynamically based on the `submissionparams`
                const matchingForm = response.data.forms.find(
                    (form) => form._id === submissionparams // or use the appropriate field
                );
    
                if (!matchingForm) {
                    console.error("No matching form found for the given submissionparams.");
                    setForm(null);
                    return;
                }
    
                setForm(matchingForm);
                console.log("Dynamically fetched form:", matchingForm);
            } catch (error) {
                console.error(error);
                console.log("Error fetching form data:", error);
            }
        }
        fetchData();
    }, [submissionparams]);
    

    const handleDecline = async (e) => {
        e.preventDefault();
        if (!form?._id) {
            toast.error("Form ID is not available.");
            return;
        }
        try {
            const updateResponse = await axios.put("/api/forms", {
                id: form._id,
                appealStatus: "declined",
            });
            if (updateResponse.status === 200) {
                console.log("Appeal: ", updateResponse.data);
                toast.success("Appeal declined successfully!");
            }
        } catch (error) {
            toast.error("Failed to decline appeal.");
        }
    }

    console.log("Form rendered: ", form);
    console.log("Form ID: ", form?._id);

    const handleAccept = async (e) => {
        e.preventDefault();
        if (!form?._id) {
            toast.error("Form ID is not available.");
            return;
        }
        try {
            const updateResponse = await axios.put("/api/forms", {
                id: form._id,
                appealStatus: "accepted",
                status: "Resubmission",
            });
            if (updateResponse.status === 200) {
                console.log("Appeal: ", updateResponse.data);
                toast.success("Appeal accepted successfully!");
            }
        } catch (error) {
            toast.error("Failed to accept appeal.");
        }
    }

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
                    Accepting will place the submission back at resubmission status.
                </p>
            </Modal.Header>
            <Modal.Footer className="resubmission-modal-footer">
                <Button onClick={handleDecline} 
                className="btn cancel" 
                >
                    Decline
                </Button>
                <Button
                    onClick={handleAccept}
                    className="btn uploadproof"                >
                    Accept
                </Button>
            </Modal.Footer>
            <ToastContainer />
        </Modal>
    );
}