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
  const [uploadedFile, setUploadedFile] = useState("");

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

  //submit resubmission
  async function submitResubmission(data) {
    try {
      const payload = {
        subFormId: subFormId.id, // Flatten to string
        resubmissionFile: data.resubmissionFile, // Rename key
        resubmissionComments: body, // Add optional comments
      };
      console.log("Updated Payload:", payload); // Debug payload
      const response = await axios.post("/api/resubmissionFile", payload);

      try {
        const encodedRECName = encodeURIComponent(form.researchEthicsCommittee);
        const recResponse = await axios.get(`/api/REC?name=${encodedRECName}`);
        console.log("REC Response Data:", recResponse.data);
        const recData = recResponse.data.data; // Extract the data array

        const rec = recData.find(
          (item) =>
            item.name.trim().toLowerCase() ===
            form.researchEthicsCommittee.trim().toLowerCase()
        ); // Find the matching REC

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

        const emailResponse = await axios.post(
          "/api/auth/send-email-resubmission",
          emailData
        );
        console.log("Email Response:", emailResponse);
        if (emailResponse.status === 200) {
          toast.success("Email sent successfully!");
          props.onHide();
          return true;
        } else {
          toast.error("Failed to send email");
        }
      } catch (error) {
        console.error("Error sending email:", error);
        toast.error("Failed to send email");
      }

      if (response.status === 201) {
        toast.success("Resubmission saved successfully!");
      } else {
        console.error("Unexpected response status:", response.status);
        toast.error("Unexpected error. Please try again.");
      }
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
      toast.error("Error saving resubmission. Please try again.");
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
          Resubmission
        </Modal.Title>
        <p className="resubmission-instructions">
          Kindly upload file/s in PDF format that should not exceed 10MB.
        </p>
      </Modal.Header>
      <Modal.Body className="resubmission-modal-body">
        <div className="resubmission-area">
          <CldUploadWidget
            signatureEndpoint="/api/sign-cloudinary-params"
            onSuccess={(res) => {
              console.log(res.info.secure_url);
              setValue("resubmissionFile", res.info.secure_url); // This will log the public ID of the uploaded file
              setUploadedFile(res.info.secure_url);
            }}
          >
            {({ open }) => {
              return (
                <button
                  type="button"
                  onClick={() => open()}
                  className="form-control PIforms-formtext PIforms-file reupload-area"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#fcbf15"
                    className="bi bi-upload"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                  </svg>
                  <p className="reupload-file">Upload File</p>
                </button>
              );
            }}
          </CldUploadWidget>
          {uploadedFile && (
            <a
              href={uploadedFile}
              target="_blank"
              rel="noopener noreferrer"
              className="uploaded-file"
            >
              View Uploaded File
            </a>
          )}
        </div>
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
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
