"use client";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CldUploadWidget } from 'next-cloudinary';
import "../../styles/modals/ResubmissionModal.css";
import CancelConfirmationModal from "../../components/modals/CancelConfirmationModal.jsx";

export default function ResubmissionModal(props) {
const [body, setBody] = useState("");
const handleBodyChange = (e) => {
    const bodyValue = e.target.value;
    setBody(bodyValue);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="resubmission-modal-overlay"
    >
      <Modal.Header className="resubmission-modal-header">
        <Modal.Title id="contained-modal-title-vcenter" className="resubmission-modal-title">
          Resubmission
        </Modal.Title>
        <p className="resubmission-instructions">Kindly upload file/s in PDF format that should not exceed 10MB.</p>
      </Modal.Header>
      <Modal.Body className="resubmission-modal-body">
        <div className="resubmission-area">
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
                    className="form-control PIforms-formtext PIforms-file reupload-area"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fcbf15" class="bi bi-upload" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                    </svg>
                    <p className="reupload-file">Upload File</p>
                </button>
                );
            }}
        </CldUploadWidget>
        </div>
        <Form>
            {/* Body */}
            <Form.Group
              className="mb-3 form-group-with-icon"
              controlId="formBody"
            >
              <Form.Control
                as="textarea"
                value={body}
                onChange={handleBodyChange}
                className="form-control-with-icon rounded-input rm-editcontent-body"
                rows={5}
                placeholder="Enter your comments here"
              />
            </Form.Group>
          </Form>
      </Modal.Body>
      <Modal.Footer className="resubmission-modal-footer">
        <Button onClick={props.onHide} className="btn cancel">Cancel</Button>
        <Button className="btn uploadproof">Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
