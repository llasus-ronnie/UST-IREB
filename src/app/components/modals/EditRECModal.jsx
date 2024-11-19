import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../styles/modals/AddAccModal.css";
import CancelConfirmationModal from "../../components/modals/CancelConfirmationModal.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CldUploadWidget } from "next-cloudinary";
import { set } from "mongoose";

export default function EditRECModal(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [logo, setLogo] = useState("");
  const [recId, setrecId] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  useEffect(() => {
    console.log("Props Data:", props.data);
    if (props.data) {
      setName(props.data.name);
      setEmail(props.data.email);
      setStatus(props.data.status);
      setrecId(props.data._id);
    }
  }, [props.data]);

  const handleNameChange = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  const handleStatusChange = (e) => {
    const statusValue = e.target.value;
    setStatus(statusValue);
  };

  const handleEditAccount = async () => {
    if (!name || !email || !status) {
      alert("Please fill in all fields.");
      return;
    }

    const updateData = { id: recId, name, email, status };
    if (logo) {
      updateData.logo = logo;
    }

    try {
      await axios.patch("/api/REC", updateData);
      console.log("Account updated in database");
      toast.success("REC updated successfully");

      props.onHide();
    } catch (error) {
      console.error("Error updating account in database:", error);
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
    setLogo("");
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
            Edit Research Ethics Committee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="addacc-modal-body rounded-body">
          <Form>
            {/* REC Name */}
            <Form.Group
              className="mb-3 form-group-with-icon"
              controlId="formName"
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
                placeholder="Change Name of REC or Academic Unit"
                value={name}
                onChange={handleNameChange}
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
                className="form-icon"
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
                placeholder="Change REC Email"
                value={email}
                onChange={handleEmailChange}
                className="form-control-with-icon rounded-input"
              />
            </Form.Group>

            {/* Status */}
            <Form.Group
              className="mb-3 form-group-with-icon"
              controlId="formStatus"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#5c5c5c"
                className="bi bi-clipboard form-icon"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"
                  stroke="#5c5c5c"
                  strokeWidth="0.5"
                />
                <path
                  d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"
                  stroke="#5c5c5c"
                  strokeWidth="0.5"
                />
              </svg>
              <Form.Select
                value={status}
                onChange={handleStatusChange}
                className="form-control form-control-with-icon rounded-input "
              >
                <option value="" disabled>
                  Change REC Status
                </option>
                <option value="PHREB Accredited">PHREB Accredited</option>
                <option value="IREB Member">IREB Member</option>
              </Form.Select>
            </Form.Group>

            {/* Upload Logo */}
            <Form.Group
              className="mb-3 form-group-with-icon"
              controlId="formUploadLogo"
            >
              <CldUploadWidget
                signatureEndpoint="/api/sign-cloudinary-params"
                onSuccess={(res) => {
                  setLogo(res.info.secure_url);
                }}
              >
                {({ open }) => {
                  return (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="upload-logo-area"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#121212"
                        className="bi bi-upload"
                        viewBox="0 0 16 16"
                      >
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                      </svg>
                      <p className="upload-logo-img">Change REC Logo</p>
                    </button>
                  );
                }}
              </CldUploadWidget>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="addacc-modal-footer rounded-footer">
          <Button onClick={handleCancel} className="btn cancel rounded-btn">
            Cancel
          </Button>
          <Button
            onClick={handleEditAccount}
            className="btn addacc rounded-btn"
          >
            Save Changes
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
