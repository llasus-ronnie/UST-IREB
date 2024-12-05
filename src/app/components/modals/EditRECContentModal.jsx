import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../styles/modals/EditContentModal.css";
import CancelConfirmationModal from "../../components/modals/CancelConfirmationModal.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { CldUploadWidget } from "next-cloudinary";

export default function EditRECContentModal({ show, onHide, content }) {
  const [heading, setHeading] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [mainFiles, setMainFiles] = useState([]);
  const [mainFileNames, setMainFileNames] = useState([]);

  useEffect(() => {
    if (content) {
      setBody(content.body || "");
    }
  }, [content]);

  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchRECData = async () => {
      if (status === "authenticated") {
        const { email } = session.user;

        try {
          const response = await axios.get(`/api/REC`);
          const recData = response.data.data;

          const currentREC = recData.find((rec) => rec.email === email);

          if (currentREC) {
            setHeading(currentREC.name);
          } else {
            console.error("REC not found for the current session email");
          }
        } catch (error) {
          console.error("Error fetching REC data:", error);
        }
      }
    };

    fetchRECData();
  }, [status, session]);

  const handleBodyChange = (e) => {
    const value = e.target.value;
    setBody(value);
    if (!value.trim()) {
      setError("Content cannot be empty");
    } else {
      setError("");
    }
  };

  const handleFileUploadSuccess = (res, setFiles, setFileNames) => {
    const uploadedFile = res.info; // Assuming Cloudinary response contains `info`
    setFiles((prev) => [...prev, uploadedFile]);
    setFileNames((prev) => [...prev, uploadedFile.original_filename]);
  };

  const handleRemoveFile = (index) => {
    setMainFiles((prev) => prev.filter((_, i) => i !== index));
    setMainFileNames((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!body.trim()) {
      setError("Content cannot be empty");
      return;
    }
    try {
      const recNameWithoutSpaces = heading.replace(/\s+/g, "");
      const filesToSave = mainFiles.map((file) => ({
        url: file.secure_url, // Cloudinary's URL
        filename: file.original_filename, // File name
      }));

      await axios.post("/api/RECContent", {
        rec: recNameWithoutSpaces,
        heading,
        body,
        files: filesToSave, // Pass files here
      });
      console.log("Content added to database");
      toast.success("REC Content added successfully");
      onHide();
    } catch (error) {
      console.error("Error saving to database:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    setShowCancelConfirmation(true);
  };

  const handleConfirmCancel = () => {
    setHeading("");
    setBody("");
    setMainFiles([]);
    setMainFileNames([]);
    setShowCancelConfirmation(false);
    onHide();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="editcontent-modal-overlay rounded-modal"
      >
        <Modal.Header className="editcontent-modal-header rounded-header">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="editcontent-modal-title"
          >
            Edit REC Content
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="editcontent-modal-body rounded-body">
          <Form>
            {/* Body */}
            <Form.Group
              className="mb-3 form-group-with-icon"
              controlId="formBody"
            >
              <Form.Label className="mb-3 form-group-with-icon">
                Body
              </Form.Label>
              <Form.Control
                as="textarea"
                value={body}
                onChange={handleBodyChange}
                className="form-control-with-icon rounded-input mc-editcontent-body"
                rows={5}
              />
              {error && <div className="text-danger">{error}</div>}
            </Form.Group>

            {/* File Upload */}
            <Form.Group className="mb-3">
              <CldUploadWidget
                signatureEndpoint="/api/sign-cloudinary-params"
                multiple
                onSuccess={(res) =>
                  handleFileUploadSuccess(res, setMainFiles, setMainFileNames)
                }
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="form-control btn btn-outline-warning"
                  >
                    Upload Files
                  </button>
                )}
              </CldUploadWidget>
            </Form.Group>

            {/* Display Uploaded Files */}
            {mainFileNames.length > 0 && (
              <div className="uploaded-files mt-3">
                <strong>Uploaded Files:</strong>
                <ul>
                  {mainFileNames.map((fileName, index) => (
                    <li key={index}>
                      {fileName}
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="ml-2"
                        onClick={() => handleRemoveFile(index)}
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer className="editcontent-modal-footer rounded-footer">
          <Button onClick={handleCancel} className="btn cancel rounded-btn">
            Cancel
          </Button>
          <Button onClick={handleSave} className="btn editcontent rounded-btn">
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <CancelConfirmationModal
        show={showCancelConfirmation}
        onHide={() => setShowCancelConfirmation(false)}
        onConfirm={handleConfirmCancel}
      />
      <ToastContainer position="bottom-right" />
    </>
  );
}
