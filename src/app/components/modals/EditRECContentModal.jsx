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

export default function EditRECContentModal(props) {
  const [heading, setHeading] = useState("");
  const [body, setBody] = useState("");
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

  // useEffect(() => {
  //   if (content) {
  //     setHeading(content.heading);
  //     setBody(content.body);
  //   }
  // }, [content]);

  const handleBodyChange = (e) => {
    const bodyValue = e.target.value;
    setBody(bodyValue);
  };

  const handleSave = async () => {
    try {
      await axios.post("/api/RECContent", {
        rec: heading, // Use the heading as the rec identifier
        heading,
        body,
      });
      console.log("Content added to database");
      toast.success("REC Content added successfully");

      props.onHide();
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
    props.onHide();
  };

  return (
    <>
      <Modal
        {...props}
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
            </Form.Group>
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
