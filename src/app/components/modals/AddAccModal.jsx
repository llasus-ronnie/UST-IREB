"use client";

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "../../styles/modals/AddAccModal.css";

export default function AddAccModal(props) {
  const [email, setEmail] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleAccessTokenChange = (e) => setAccessToken(e.target.value);

  const handleAddAccount = () => {
    console.log('Email:', email);
    console.log('Access Token:', accessToken);
    props.onHide();
  };

  const handleGenerateToken = () => {
    // Logic for generating token (for demonstration purpose)
    const token = Math.random().toString(36).substr(2, 12);
    setAccessToken(token);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="addacc-modal-overlay"
    >
      <Modal.Header className="addacc-modal-header">
        <Modal.Title id="contained-modal-title-vcenter" className="addacc-modal-title">
          Add an Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="addacc-modal-body">
        <Form>
          <Form.Group className="mb-3 form-group-with-icon" controlId="formEmail">
            <img src="/images/modals/addacc-email.png" alt="Email Icon" className="form-icon" />
            <Form.Control
              type="email"
              placeholder="User Email"
              value={email}
              onChange={handleEmailChange}
              autoFocus
              className="form-control-with-icon"
            />
          </Form.Group>
          <Form.Group className="mb-3 form-group-with-icon access-token-group" controlId="formAccessToken">
            <img src="/images/modals/addacc-key.png" alt="Token Icon" className="form-icon" />
            <Form.Control
              type="text"
              placeholder="Access Token"
              value={accessToken}
              onChange={handleAccessTokenChange}
              className="form-control-with-icon"
            />
            <Button onClick={handleGenerateToken} className="btn generate-token-btn">Generate Token</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="addacc-modal-footer">
        <Button onClick={props.onHide} className="btn cancel">Cancel</Button>
        <Button onClick={handleAddAccount} className="btn addacc">Add Account</Button>
      </Modal.Footer>
    </Modal>
  );
}
