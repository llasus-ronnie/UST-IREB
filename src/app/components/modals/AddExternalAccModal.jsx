import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../styles/modals/AddAccModal.css";
import CancelConfirmationModal from "../../components/modals/CancelConfirmationModal.jsx";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Import UUID library

export default function AddAccModal(props) {
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  const handleAccessTokenChange = (e) => setAccessToken(e.target.value);

  const handleAddAccount = async () => {
    if (!isEmailValid) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      await axios.post("/api/addExternalInvestigator", {
        email,
        token: accessToken,
      });
      console.log("Account added to database");

      // Send email after adding the account
      await axios.post("/api/auth/send-email", { email, token: accessToken });
      alert("Email sent successfully");

      props.onHide();
    } catch (error) {
      console.error(
        "Error adding account to database or sending email:",
        error
      );
      alert("An error occurred. Please try again.");
    }
  };

  const handleGenerateToken = () => {
    if (!isEmailValid) {
      alert("Please enter a valid email.");
      return;
    }

    const token = uuidv4(); // Generate a unique token
    setAccessToken(token);
  };

  const formatToken = (token) => {
    if (!token) return "";
    const visibleChars = 6; // Number of characters to show
    const maskedChars = token.length - visibleChars;
    return token.substring(0, visibleChars) + "*".repeat(maskedChars);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCancel = () => {
    setShowCancelConfirmation(true);
  };

  const handleConfirmCancel = () => {
    setEmail("");
    setAccessToken("");
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
        className="addacc-modal-overlay"
      >
        <Modal.Header className="addacc-modal-header">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="addacc-modal-title"
          >
            Add an Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="addacc-modal-body">
          <Form>
            <Form.Group
              className="mb-3 form-group-with-icon"
              controlId="formEmail"
            >
              <img
                src="/images/modals/addacc-email.png"
                alt="Email Icon"
                className="form-icon-email"
              />
              <Form.Control
                type="email"
                placeholder="User Email"
                value={email}
                onChange={handleEmailChange}
                autoFocus
                className="form-control-with-icon"
              />
            </Form.Group>

            <Form.Group
              className="mb-3 form-group-with-icon access-token-group"
              controlId="formAccessToken"
            >
              <img
                src="/images/modals/addacc-key.png"
                alt="Token Icon"
                className="form-icon-token"
              />
              <Form.Control
                type="text"
                placeholder="Access Token"
                value={formatToken(accessToken)}
                onChange={handleAccessTokenChange}
                className="form-control-with-icon"
                readOnly
              />
              <Button
                onClick={handleGenerateToken}
                className="btn generate-token-btn"
                disabled={!isEmailValid}
              >
                Generate Token
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="addacc-modal-footer">
          <Button onClick={handleCancel} className="btn cancel">
            Cancel
          </Button>
          <Button onClick={handleAddAccount} className="btn addacc">
            Add Account
          </Button>
        </Modal.Footer>
      </Modal>

      <CancelConfirmationModal
        show={showCancelConfirmation}
        onHide={() => setShowCancelConfirmation(false)}
        onConfirm={handleConfirmCancel}
      />
    </>
  );
}
