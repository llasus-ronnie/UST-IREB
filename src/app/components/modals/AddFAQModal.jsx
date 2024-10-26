import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../styles/modals/EditContentModal.css";
import CancelConfirmationModal from "../../components/modals/CancelConfirmationModal.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddFAQModal(props) {
  const [heading, setHeading] = useState("");
  const [body, setBody] = useState("");
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  const handleHeadingChange = (e) => {
    const headingValue = e.target.value;
    setHeading(headingValue);
  };

  const handleBodyChange = (e) => {
    const bodyValue = e.target.value;
    setBody(bodyValue);
  };

  const handleAddAccount = async () => {
    if (!isEmailValid) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      await axios.post("/api/REC", {
        name,
        email,
        status,
      });
      console.log("Account added to database");
      toast.success("REC added successfully");

      props.onHide();
    } catch (error) {
      console.error(
        "Error adding account to database or sending email:",
        error
      );
      toast.error("An error occurred. Please try again.");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCancel = () => {
    setShowCancelConfirmation(true);
  };

  const handleConfirmCancel = () => {
    setName("");
    setEmail("");
    setStatus("");
    setIsEmailValid(false);
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
            Add FAQ
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="editcontent-modal-body rounded-body">
          <Form>
            {/* Heading */}
            <Form.Group
              className="mb-3 form-group-with-icon"
              controlId="formHeading"
            >
            <Form.Label className="mb-3 form-group-with-icon">Heading</Form.Label> 
              <Form.Control
                type="text"
                value={heading}
                onChange={handleHeadingChange}
                className="form-control-with-icon rounded-input"
              />
            </Form.Group>

            {/* Body */}
            <Form.Group
              className="mb-3 form-group-with-icon"
              controlId="formBody"
            >
            <Form.Label className="mb-3 form-group-with-icon">Body</Form.Label> 
              <Form.Control
                type="text"
                value={body}
                onChange={handleBodyChange}
                className="form-control-with-icon rounded-input mc-editcontent-body"
              />
            </Form.Group>


          </Form>
        </Modal.Body>
        <Modal.Footer className="editcontent-modal-footer rounded-footer">
          <Button onClick={handleCancel} className="btn cancel rounded-btn">
            Cancel
          </Button>
          <Button onClick={handleAddAccount} className="btn editcontent rounded-btn">
            Add
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
