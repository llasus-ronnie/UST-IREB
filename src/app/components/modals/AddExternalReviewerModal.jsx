import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../styles/modals/AddAccModal.css";
import CancelConfirmationModal from "../../components/modals/CancelConfirmationModal.jsx";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddAccModal({ rec, ...props }) {
  const [name, setName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  const handleNameChange = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);
  };

  const handleAffiliationChange = (e) => {
    const affiliationValue = e.target.value;
    setAffiliation(affiliationValue);
  };

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
      await axios.post("/api/addExternalReviewer", {
        name,
        affiliation,
        email,
        token: accessToken,
        rec,
      });
      console.log("Account added to database");

      await axios.post("/api/auth/send-email", { email, token: accessToken });
      toast.success("Email sent successfully");

      props.onHide();
    } catch (error) {
      console.error(
        "Error adding account to database or sending email:",
        error
      );
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleGenerateToken = () => {
    if (!isEmailValid) {
      toast.error("Please enter a valid email.");
      return;
    }

    const token = uuidv4();
    setAccessToken(token);
  };

  const formatToken = (token) => {
    if (!token) return "";
    const visibleChars = 6;
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
    setName("");
    setAffiliation("");
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
        className="addacc-modal-overlay rounded-modal"
      >
        <Modal.Header className="addacc-modal-header rounded-header">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="addacc-modal-title"
          >
            Add an Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="addacc-modal-body rounded-body">
          <Form>
            {/* Name */}
            <Form.Group
              className="mb-3 form-group-with-icon"
              controlId="formName"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#5c5c5c"
                class="bi bi-person form-icon"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
                  stroke="#5c5c5c"
                  strokeWidth="0.5"
                />
              </svg>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                autoFocus
                className="form-control-with-icon rounded-input"
              />
            </Form.Group>

            {/* Affiliation */}
            <Form.Group
              className="mb-3 form-group-with-icon"
              controlId="formAffiliation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#5c5c5c"
                className="bi bi-briefcase form-icon"
                viewBox="0 0 16 16"
              >
                <path
                  d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5"
                  stroke="#5c5c5c"
                  strokeWidth="0.5"
                />
              </svg>
              <Form.Control
                type="text"
                placeholder="Affiliation"
                value={affiliation}
                onChange={handleAffiliationChange}
                className="form-control-with-icon rounded-input"
              />
            </Form.Group>

            {/* Email */}
            <Form.Group
              className="mb-3 form-group-with-icon"
              controlId="formEmail"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="16"
                fill="#5c5c5c"
                class="form-icon"
                viewBox="0 0 64 64"
              >
                <path
                  fill="#5c5c5c"
                  d="M53.42 53.32H10.58a8.51 8.51 0 0 1-8.5-8.5V19.18a8.51 8.51 0 0 1 8.5-8.5h42.84a8.51 8.51 0 0 1 8.5 8.5v25.64a8.51 8.51 0 0 1-8.5 8.5ZM10.58 13.68a5.5 5.5 0 0 0-5.5 5.5v25.64a5.5 5.5 0 0 0 5.5 5.5h42.84a5.5 5.5 0 0 0 5.5-5.5V19.18a5.5 5.5 0 0 0-5.5-5.5Z"
                  stroke="#5c5c5c"
                  strokeWidth="2.2"
                />
                <path
                  fill="#5c5c5c"
                  d="M32 38.08a8.51 8.51 0 0 1-5.13-1.71L3.52 18.71a1.5 1.5 0 1 1 1.81-2.39L28.68 34a5.55 5.55 0 0 0 6.64 0l23.35-17.68a1.5 1.5 0 1 1 1.81 2.39L37.13 36.37A8.51 8.51 0 0 1 32 38.08Z"
                  stroke="#5c5c5c"
                  strokeWidth="2.2"
                />
                <path
                  fill="#5c5c5c"
                  d="M4.17 49.14a1.5 1.5 0 0 1-1-2.62l18.4-16.41a1.5 1.5 0 0 1 2 2.24L5.17 48.76a1.46 1.46 0 0 1-1 .38zm55.66 0a1.46 1.46 0 0 1-1-.38l-18.4-16.41a1.5 1.5 0 1 1 2-2.24l18.39 16.41a1.5 1.5 0 0 1-1 2.62z"
                  stroke="#5c5c5c"
                  strokeWidth="2.2"
                />
              </svg>
              <Form.Control
                type="email"
                placeholder="User Email"
                value={email}
                onChange={handleEmailChange}
                className="form-control-with-icon rounded-input"
              />
            </Form.Group>

            {/* Access Token */}
            <Form.Group
              className="mb-3 form-group-with-icon access-token-group"
              controlId="formAccessToken"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#5c5c5c"
                class="bi bi-key form-icon"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"
                  stroke="#5c5c5c"
                  strokeWidth="0.5"
                />
                <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg>
              <Form.Control
                type="text"
                placeholder="Access Token"
                value={formatToken(accessToken)}
                onChange={handleAccessTokenChange}
                className="form-control-with-icon rounded-input"
                readOnly
              />
              <Button
                onClick={handleGenerateToken}
                className="btn generate-token-btn rounded-btn"
                disabled={!isEmailValid}
              >
                Generate Token
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="addacc-modal-footer rounded-footer">
          <Button onClick={handleCancel} className="btn cancel rounded-btn">
            Cancel
          </Button>
          <Button onClick={handleAddAccount} className="btn addacc rounded-btn">
            Add Account
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
