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
          const encodedRECName = encodeURIComponent(form.researchEthicsCommittee);
          const recResponse = await axios.get(`/api/REC?name=${encodedRECName}`);
          console.log("REC Response Data:", recResponse.data);
          const recData = recResponse.data.data; // Extract the data array

          // Find the specific REC by name
          const rec = recData.find(
            (rec) =>
              rec.name.replace(/\s+/g, "").toLowerCase() ===
              data.researchEthicsCommittee.replace(/\s+/g, "").toLowerCase()
          );

          // Handle the case if the REC is found or not
          if (rec) {
            if (!rec.email) {
              toast.error("REC email not found.");
              return false;
            }

            // Prepare the email data and send it
            const emailData = {
              rec: rec.email,
              title: form.title,
              name: form.fullName,
              status: form.status,
            };

            // Send the email to the REC
            const emailResponse = await axios.post(
              "/api/auth/send-email-resubmission",
              emailData
            );
            console.log("Email Response:", emailResponse);
            if (emailResponse.status === 200) {
              toast.success("Email sent successfully!");
              toast.success("Resubmission saved successfully!");
              props.onHide(); // Hide modal or perform another action after success
              return true;
            } else {
              toast.error("Failed to send email.");
            }
          } else {
            toast.error("REC not found for the provided name.");
          }
        } catch (error) {
          console.error("Error sending email:", error);
          toast.error("Failed to send email.");
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
    setUploadedFiles(uploadedFiles.filter(file => file.url !== fileToRemove.url));
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
          Resubmission
        </Modal.Title>
        <p className="resubmission-instructions">
          Kindly upload file/s in PDF format that should not exceed 10MB.
        </p>
      </Modal.Header>
      <Modal.Body className="resubmission-modal-body">
        <div className="resubmission-area">
          <CldUploadWidget
          multiple
            signatureEndpoint="/api/sign-cloudinary-params"
            options={{
              resourceType: 'auto', // Automatically detects file type
              allowedFormats: ['pdf'], // Restrict to PDF files
            }}
            onSuccess={(res) => {
              console.log("Upload Success Response:", res);
          
              const uploadedFile = {
                url: res.info.secure_url,
                filename: res.info.original_filename,
              };
              
              setUploadedFiles((prevFiles) => [...prevFiles, uploadedFile]); // Correctly append the file to the list
              setValue("resubmissionFile", uploadedFiles); // You can set form value if needed
            console.log("Uploaded Files:", uploadedFiles);

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

          {uploadedFiles.length > 0 && (
            <div className="uploaded-files-list">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="uploaded-file-item">
                  <span>{file.filename}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(file)}
                    className="remove-file-btn"
                    style={{color:"red"}}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
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
          Submit Resubmission
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
