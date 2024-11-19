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
  const [uploadedFile, setUploadedFile] = useState("");

  useEffect(() => {
    if (content) {
      setBody(content.body || "");
    }
  }, [content]);

  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchRECMemberData = async () => {
      if (status === "authenticated") {
        const { email } = session.user;

        try {
          const response = await axios.get(`/api/RECMembers?email=${email}`);
          const recMemberData = response.data.data;

          if (recMemberData.length > 0) {
            setHeading(recMemberData[0].rec.replace(/\s+/g, "")); // Remove spaces
          }
        } catch (error) {
          console.error("Error fetching REC member data:", error);
        }
      }
    };

    fetchRECMemberData();
  }, [status, session]);

  const handleBodyChange = (e) => setBody(e.target.value);

  const handleSave = async () => {
    try {
      await axios.post("/api/RECContent", {
        rec: heading,
        heading,
        body,
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
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(res) => {
                console.log("Uploaded file URL:", res.info.secure_url);
                setBody(res.info.secure_url); // Set the uploaded file's URL as the body
              }}
            >
              {({ open }) => (
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
              )}
            </CldUploadWidget>
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
