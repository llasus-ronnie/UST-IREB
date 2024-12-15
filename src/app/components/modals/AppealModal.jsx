"use client";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../styles/modals/ResubmissionModal.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppealModal({ submissionparams, subFormId, ...props }) {
  const [form, setForm] = useState(null);
  const [comment, setComment] = useState("");

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

        // Send email notification
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
          const recList = recResponse.data.data;

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
            comment: comment,
          };

          const emailResponse = await axios.post(
            "/api/auth/send-email-appeal",
            emailData
          );
          console.log("Email Response:", emailResponse);

          if (emailResponse.status === 200) {
            toast.success("Appeal email sent successfully!");
            props.onHide();
            return true;
          } else {
            toast.error("Failed to send appeal email");
          }
        } catch (error) {
          console.error("Error sending email:", error);
          toast.error("Error sending email");
        }
      }
    } catch (error) {
      toast.error("Failed to submit appeal.");
    }
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
          This is your opportunity to appeal the decision made on your
          submission. Kindly input the message you would like to send to the
          Research Ethics Committee using the text area below. This will be sent
          to the Research Ethics Committee's email.
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="resubmission-modal-footer">
        <Button onClick={props.onHide} className="btn cancel">
          Cancel
        </Button>
        <Button onClick={handleAppeal} className="btn uploadproof">
          Send Appeal
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
