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

  // POST payment
  async function submitPayment(data) {
    try {
      const response = await axios.post("/api/payment", data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        toast.success("Payment saved successfully!");
        props.onHide();
      }
    } catch (error) {
      toast.error("Error saving payment. Please try again.");
      console.error("Error in saving:", error.response?.data || error.message);
    }
  }

  // GET form
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/forms/${submissionparams.id}`);
        setForm(response.data.submission);
        setValue("formId", response.data.submission._id);
        setValue("userEmail", session?.user?.email);
      } catch (error) {
        console.error("Failed to fetch form details:", error);
      }
    }
    fetchData();
  }, [submissionparams, session]);

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setValue("paymentFile", null);
    toast.info("File removed.");
  };

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
            Kindly upload receipt or proof of transaction in JPEG, PNG, or PDF
            format. File should not exceed 10MB.
          </p>
        </Modal.Header>
        <Modal.Body className="uploadproof-modal-body">
          <div className="uploadproof-area">
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(res) => {
                const fileType = res.info.format;
                const fileSize = res.info.bytes;
                const validFileTypes = ["jpg", "jpeg", "png", "pdf"];
                const maxFileSize = 10 * 1024 * 1024;

                if (fileSize > maxFileSize) {
                  toast.error(
                    "File size exceeds 10MB. Please upload a smaller file."
                  );
                  return;
                }

                if (validFileTypes.includes(fileType)) {
                  const secureUrl = res.info.secure_url;
                  setUploadedFile({ url: secureUrl, type: fileType });
                  setValue("paymentFile", secureUrl);
                  toast.success("File uploaded successfully!");
                } else {
                  toast.error(
                    "Invalid file type. Please upload a JPEG, PNG, or PDF."
                  );
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
            <input
              type="hidden"
              {...register("paymentFile", { required: true })}
            />
          </div>
          {uploadedFile && (
            <div className="uploaded-file-preview">
              <p>
                <strong>Uploaded File:</strong>
              </p>
              {uploadedFile.type === "pdf" ? (
                <embed
                  src={uploadedFile.url}
                  type="application/pdf"
                  width="100%"
                  height="200px"
                />
              ) : (
                <img
                  src={uploadedFile.url}
                  alt="Uploaded file"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              )}
              <Button variant="danger" size="sm" onClick={handleRemoveFile}>
                Remove File
              </Button>
            </div>
          )}
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
