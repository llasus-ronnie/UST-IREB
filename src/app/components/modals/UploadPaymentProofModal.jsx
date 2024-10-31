"use client";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CldUploadWidget } from 'next-cloudinary';
import "../../styles/modals/UploadPaymentProofModal.css";
import CancelConfirmationModal from "../../components/modals/CancelConfirmationModal.jsx";

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
        <CldUploadWidget
                signatureEndpoint="/api/sign-cloudinary-params"
                onSuccess={(res) => {
                  console.log(res); // This will log the entire response
                  console.log(res.info.secure_url);
                  setValue("supplementaryFileLink", res.info.secure_url); // This will log the public ID of the uploaded file
                }}
              >
                {({ open }) => {
                  return (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="form-control PIforms-formtext PIforms-file upload-proof-area"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#369AD2" class="bi bi-upload" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                      </svg>
                      <p className="upload-proof-img">Upload File</p>
                    </button>
                  );
                }}
              </CldUploadWidget>
        </div>
      </Modal.Body>
      <Modal.Footer className="uploadproof-modal-footer">
        <Button onClick={props.onHide} className="btn cancel">Cancel</Button>
        <Button className="btn uploadproof">Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
