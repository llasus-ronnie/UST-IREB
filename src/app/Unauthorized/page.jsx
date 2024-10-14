import React from "react";
import "../styles/unauthorized/unauthorized.css";

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h1 className="unauthorized-title">Unauthorized Access</h1>
      <p className="unauthorized-message">
        You do not have permission to view this page.
      </p>
      <a href="/" className="unauthorized-link">
        Go back to Home
      </a>
    </div>
  );
};

export default Unauthorized;
