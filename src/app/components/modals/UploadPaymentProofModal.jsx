"use client";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CldUploadWidget } from "next-cloudinary";
import "../../styles/modals/UploadPaymentProofModal.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadPaymentProofModal({
  submissionparams,
  ...props
}) {
  const { register, handleSubmit, setValue } = useForm();
  const { data: session } = useSession();
  const [form, setForm] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  //POST payment
  async function submitPayment(data) {
    try {
      const response = await axios.post("/api/payment", data, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

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
        const recResponse = await axios.get(`/api/REC?name=${encodedRECName}`);
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

        const emailResponse = await axios.post(
          "/api/auth/send-email-payment",
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
        toast.success("Payment saved successfully!");
        props.onHide();

        if (onDataChange) {
          onDataChange();
        }
      }
    } catch (error) {
      toast.error("Error saving payment. Please try again.");
      console.error(
        "Error in saving:",
        error.response ? error.response.data : error.message
      );
    }
  }

  //GET Form
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/forms/${submissionparams.id}`);
        setForm(response.data.submission);
        setValue("formId", response.data.submission._id);
        setValue("userEmail", session.user.email);
      } catch (error) {
        console.error("Failed to fetch form details:", error);
      }
    }
    fetchData();
  }, [submissionparams, session]);

  return (
    <Form>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="uploadproof-modal-overlay"
      >
        <Modal.Header className="uploadproof-modal-header">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="uploadproof-modal-title"
          >
            Upload Proof of Payment
          </Modal.Title>
          <p className="uploadproof-instructions">
            Kindly upload receipt or proof of transaction in JPEG or PNG format.
            File should not exceed 10MB.
          </p>
        </Modal.Header>
        <Modal.Body className="uploadproof-modal-body">
          <div className="uploadproof-area">
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(res) => {
                const fileType = res.info.format;
                if (
                  fileType === "jpg" ||
                  fileType === "jpeg" ||
                  fileType === "png" ||
                  fileType === "pdf"
                ) {
                  const secureUrl = res.info.secure_url;
                  const fileName = res.info.original_filename;
                  setValue("paymentFile", secureUrl);
                  setUploadedFile(secureUrl);
                  setUploadedFileName(fileName);
                  toast.success("File uploaded successfully!");
                } else {
                  toast.error("Please upload a JPEG or PNG image.");
                }
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={open}
                  className="form-control PIforms-formtext PIforms-file upload-proof-area"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#369AD2"
                    className="bi bi-upload"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                  </svg>
                  <p className="upload-proof-img">Upload File</p>
                </button>
              )}
            </CldUploadWidget>
            {uploadedFile && (
              <div className="uploaded-file-preview">
                <p className="uploaded-file-name">
                  Uploaded File: {uploadedFileName}
                </p>
                <img
                  src={uploadedFile}
                  alt={uploadedFileName}
                  className="uploaded-file-image"
                />
                <button
                  type="button"
                  className="btn remove-btn"
                  onClick={() => {
                    setUploadedFile(null);
                    setUploadedFileName(null);
                    setValue("paymentFile", null);
                    toast.info("File removed successfully.");
                  }}
                >
                  Remove File
                </button>
              </div>
            )}
            <input
              type="hidden"
              {...register("paymentFile", { required: true })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="uploadproof-modal-footer">
          <Button onClick={props.onHide} className="btn cancel">
            Cancel
          </Button>
          <Button
            type="submit"
            className="btn uploadproof"
            onClick={handleSubmit((data) => {
              submitPayment(data);
            })}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="bottom-right" />
    </Form>
  );
}
