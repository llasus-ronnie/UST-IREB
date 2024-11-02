"use client";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../styles/modals/ConfirmationModal.css";

export default function ConfirmLogOut(props) {
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
          Confirm Log Out
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="confirm-modal-body">
        <p>Are you sure you want to log out of your account?</p>
      </Modal.Body>
      <Modal.Footer className="confirm-modal-footer">
        <Button onClick={props.onHide} className="btn cancel">
          Cancel
        </Button>
        <Button onClick={props.onLogout} className="btn confirm-cancel">
          Log out
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
