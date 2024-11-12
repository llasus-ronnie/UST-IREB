"use client";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../styles/modals/ConfirmationModal.css";

export default function ArchiveConfirmationModal(props) {
  const handleArchive = () => {
    props.onConfirm();
    props.onHide();
  };

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
          Are you sure you want to archive?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="confirm-modal-body">
        <p>This action will archive the item and cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer className="confirm-modal-footer">
        <Button onClick={props.onHide} className="btn cancel">
          Cancel
        </Button>
        <Button onClick={handleArchive} className="btn archive">
          Archive
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
