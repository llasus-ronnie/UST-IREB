import React from "react";

const Unauthorized = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
      <a href="/">Go back to Home</a>
    </div>
  );
};

export default Unauthorized;
