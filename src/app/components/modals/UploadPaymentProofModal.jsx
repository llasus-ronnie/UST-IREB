"use client";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CldUploadWidget } from 'next-cloudinary';
import "../../styles/modals/UploadPaymentProofModal.css";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';

export default function UploadPaymentProofModal(props) {
  const { handleSubmit, setValue, register } = useForm();

  // async function submitPayment(data) {
  //   console.log("Form data submitted:", data); // Debugging log
  //   try {
  //     const response = await axios.post("/api/payment", data, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
      
  //     if (response.status === 201) {
  //       console.log("Payment saved successfully:", response.data);
  //     } else {
  //       console.error("Error in saving:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error in saving:", error.response ? error.response.data : error.message);
  //   }
  // }

  async function submitPayment(data) {
    console.log("Submit function called with data:", data); // Confirm submitPayment is called
    // Temporarily remove axios for debugging:
    alert(`Form submitted with data: ${JSON.stringify(data)}`);
  }

  return (
    <Form onSubmit={handleSubmit((data) => {
      console.log("Form submitted with data:", data); // Check data immediately before calling submitPayment
      submitPayment(data);
    })}>
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
          <p className="uploadproof-instructions">
            Kindly upload receipt or proof of transaction in JPEG or PNG format. File should not exceed 10MB.
          </p>
        </Modal.Header>
        <Modal.Body className="uploadproof-modal-body">
          <div className="uploadproof-area">
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(res) => {
                const secureUrl = res.info.secure_url;
                console.log("File uploaded to:", secureUrl);
                setValue("paymentFile", secureUrl); // Register and set the file URL in the form
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={open}
                  className="form-control PIforms-formtext PIforms-file upload-proof-area"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#369AD2" className="bi bi-upload" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                  </svg>
                  <p className="upload-proof-img">Upload File</p>
                </button>
              )}
            </CldUploadWidget>
            {/* Hidden field to capture the uploaded file URL */}
            <input type="hidden" {...register("paymentFile", { required: true })} />
          </div>
        </Modal.Body>
        <Modal.Footer className="uploadproof-modal-footer">
          <Button onClick={props.onHide} className="btn cancel">Cancel</Button>
          <Button type="submit" className="btn uploadproof"onClick={() => console.log("Submit button clicked")}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
}
