"use client";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "../../styles/modals/UploadPaymentProofModal.css";

export default function UploadPaymentProofModal(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="uploadproof-modal-overlay"
    >
      <Modal.Header className="uploadproof-modal-header">
        <Modal.Title id="contained-modal-title-vcenter" className="uploadproof-modal-title">
          Upload Proof of Payment
        </Modal.Title>
        <p className="uploadproof-instructions">Kindly upload receipt or proof of transaction in JPEG or PNG format. File should not exceed 10MB.</p>
      </Modal.Header>
      <Modal.Body className="uploadproof-modal-body">
        <div className="uploadproof-area">
        </div>
      </Modal.Body>
      <Modal.Footer className="uploadproof-modal-footer">
        <Button onClick={props.onHide} className="btn cancel">Cancel</Button>
        <Button className="btn uploadproof">Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
