"use client";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../styles/modals/ConfirmationModal.css";

export default function ConfirmSubmissionModal(props) {
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
          Submit to REC Chair for Final Review
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="confirm-modal-body">
        <p>Are you sure this submission is ready for final review by the REC Chair? <br/> Once submitted, this action is final and cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer className="confirm-modal-footer">
        <Button onClick={props.onHide} className="btn cancel">
          Cancel
        </Button>
        <Button onClick={props.onConfirm} className="btn confirm-cancel">
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}