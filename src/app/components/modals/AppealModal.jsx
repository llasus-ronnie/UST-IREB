"use client";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../styles/modals/ResubmissionModal.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppealModal({
    submissionparams,
    subFormId,
    ...props
}) {
    const [form, setForm] = useState(null);
 
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

    const handleAppeal = async (e) => {
        e.preventDefault();
        try {
            const updateResponse = await axios.put("/api/forms", {
                id: form?._id,
                appeal: true,
            });
            if (updateResponse.status === 200) {
                console.log("Appeal: ", updateResponse.data);
                toast.success("Appeal sent successfully!");
            }
        } catch (error) {
            toast.error("Failed to submit appeal.");
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
                    onClick={handleAppeal}
                    className="btn uploadproof"
                >
                    Send Appeal
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
