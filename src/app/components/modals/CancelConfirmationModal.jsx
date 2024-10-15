"use client";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../styles/modals/AddAccModal.css";

export default function AddAccModal(props) {
  return (
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
            Confirm Cancellation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="addacc-modal-body">
        <p>Are you sure you want to cancel? Changes will not be saved.</p>
      </Modal.Body>
      <Modal.Footer className="addacc-modal-footer">
        <Button onClick={props.onHide} className="btn cancel">
          Continue Editing
        </Button>
        <Button onClick={props.onConfirm} className="btn addacc">
          Confirm Cancellation
        </Button>
      </Modal.Footer>
    </Modal>
  );
}