import React from "react";
import { Row, Col } from "react-bootstrap";
import "../styles/unauthorized/unauthorized.css";
const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <Row>
          <Col className="unauthorized-image">
            <img
              src="../images/unauthorized/401.gif"
              alt="Unauthorized Access"
            />
          </Col>
          <Col className="unauthorized-details">
            <h1 className="unauthorized-title">Unauthorized Access Error</h1>
            <p className="unauthorized-message">
              You do not have permission to view this page.
            </p>
            <div className="unauthorized-button">
              <a href="/" className="unauthorized-link">
                Go back to Home
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Unauthorized;
