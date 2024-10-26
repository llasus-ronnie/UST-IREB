import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../styles/modals/AddAccModal.css";
import CancelConfirmationModal from "../../components/modals/CancelConfirmationModal.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditExternalAccModal(props) {
  const [name, setName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [investigatorId, setInvestigatorId] = useState("");

  useEffect(() => {
    console.log("Props Data:", props.data);
    if (props.data) {
      setName(props.data.name);
      setAffiliation(props.data.affiliation);
      setInvestigatorId(props.data._id);
    }
  }, [props.data]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAffiliationChange = (e) => {
    setAffiliation(e.target.value);
  };

  const handleEditAccount = async () => {
    if (!name || !affiliation) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await axios.patch("/api/addExternalInvestigator", {
        id: investigatorId,
        name,
        affiliation,
      });
      toast.success("Account updated successfully.");

      setName("");
      setAffiliation("");
      setInvestigatorId("");
      props.onHide();
    } catch (error) {
      console.error("Error updating account:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    setShowCancelConfirmation(true);
  };

  const handleConfirmCancel = () => {
    setName("");
    setAffiliation("");
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
            Edit External Account
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
                className="bi bi-person form-icon"
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
