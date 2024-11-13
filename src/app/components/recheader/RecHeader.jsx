import React, { useEffect, useState } from "react";
import UserLoggedIn from "../userloggedin/UserLoggedIn";
import axios from "axios";

const RecHeader = ({ rec }) => {
  const [recDetails, setRecDetails] = useState(null);

  useEffect(() => {
    async function fetchRecDetails() {
      try {
        const formattedRec = rec.replace(/\s+/g, "");

        const response = await axios.get(`/api/REC?name=${formattedRec}`);
        const recData = response.data.data.find(
          (item) => item.name.replace(/\s+/g, "") === formattedRec
        );
        setRecDetails(recData);
      } catch (error) {
        console.error("Error fetching REC details:", error);
      }
    }

    fetchRecDetails();
  }, [rec]);

  if (!recDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rec-header-container">
      <div className="rec-header">
        <img
          src={recDetails.logo}
          alt={`${recDetails.name} Logo`}
          className="cics-logo"
        />
        <div className="rec-header-text">
          <h1>{recDetails.name} Dashboard</h1>
          <p>Overview of {recDetails.name} Submissions</p>
        </div>
      </div>
      <div className="userloggedin">
        <UserLoggedIn />
      </div>
    </div>
  );
};

export default RecHeader;
