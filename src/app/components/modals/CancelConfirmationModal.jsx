"use client";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../styles/modals/ConfirmationModal.css";

export default function CancelConfirmationModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="confirm-modal-overlay"
    >
      <Modal.Header className="confirm-modal-header">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="confirm-modal-title"
        >
            Confirm Cancellation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="confirm-modal-body">
        <p>Are you sure you want to cancel? Changes will not be saved.</p>
      </Modal.Body>
      <Modal.Footer className="confirm-modal-footer">
        <Button onClick={props.onHide} className="btn cancel">
          Continue Editing
        </Button>
        <Button onClick={props.onConfirm} className="btn confirm-cancel">
          Confirm Cancellation
        </Button>
      </Modal.Footer>
    </Modal>
  );
}