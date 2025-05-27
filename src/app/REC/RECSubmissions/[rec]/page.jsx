"use client";

import React, { useState, useEffect } from "react";
import RecNav from "../../../components/navbaradmin/RecNav";
import RecNavMobile from "../../../components/navbaradmin/RecNavMobile";
import UserLoggedIn from "../../../components/userloggedin/UserLoggedIn";
import "../../../styles/rec/RecSubmissions.css";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

import withAuthorization from "../../../../hoc/withAuthorization";

function RecSubmissions({ params }) {
  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const [selectedOption, setSelectedOption] = useState("Initial-Submission");

  const handleDropDown = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTableChange = (option) => {
    setSelectedOption(option);
    console.log("Selected Option:", selectedOption);
  };

  const [forms, setForms] = useState([]);
  const [statusCount, setStatusCount] = useState({});

  const { rec } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/forms", {
          params: { rec: rec.trim() },
        });
        setForms(response.data.forms);

        const statusCount = response.data.forms.reduce((acc, form) => {
          acc[form.status] = (acc[form.status] || 0) + 1;
          return acc;
        }, {});
        setStatusCount(statusCount);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    }

    fetchData();
  }, [rec]);

  const filterFormsByStatus = (status) => {
    console.log("Status:", status);
    return forms.filter((form) => form.status === status);
  };

  const [unwrappedParams, setUnwrappedParams] = useState({});

  const statusDescriptions = {
    "Initial-Submission":
      "This status indicates that the submission is under review for completeness. The REC must verify that all required documents are provided and request revisions if necessary.",
    "Pending-Payment":
      "This status signifies that the submission is awaiting payment for ethical review fees. The REC must verify the proof of payment and proceed to classification upon confirmation of receipt.",
    "For-Classification":
      "This status occurs once proof of payment is received. The REC is responsible for classifying the research submission into the appropriate review type—expedited, full board, or exempt.",
    "In-Progress":
      "This status indicates that the submission is currently with the primary reviewer for ethical review. The REC must monitor the progress of the review and ensure timely feedback.",
    "Initial-Result":
      "This status means the submission has been initially reviewed by the primary reviewer.",
    Resubmission:
      "This status indicates that revisions are required based on the primary reviewer’s feedback and is awaiting resubmission from the principal investigator.",
    "Final-Decision":
      "This status indicates that all revisions have been reviewed. The Primary Reviewer has forwarded the submission to the REC Chair for the final decision. If approved, the REC is responsible for issuing the ethics review certificate.",
  };

  return (
    <div className="adminpage-container">
      <div className="recnav-mobile">
        <RecNavMobile />
      </div>

      <RecNav className="recnav" rec={params.rec} />

      <div className="rec-submissions">
        <div className="adminmain-content">
          <div className="rec-header-container">
            <div className="rec-header">
              <h1>REC Manage Submissions</h1>
              <p>
                Manage Initial Review and Principal Investigator Submissions
              </p>
            </div>
            <div className="userloggedin">
              <UserLoggedIn />
            </div>
          </div>

          <div className="rec-submissions-tabs">
            <div className="rec-buttons-container">
              <button onClick={() => handleTableChange("Initial-Submission")}>
                <span>{statusCount["Initial-Submission"] || 0} </span>{" "}
                <p>Initial Submission</p>
              </button>
              <button onClick={() => handleTableChange("Pending-Payment")}>
                <span>{statusCount["Pending-Payment"] || 0}</span>{" "}
                <p>Pending Payment</p>
              </button>
              <button onClick={() => handleTableChange("For-Classification")}>
                <span>{statusCount["For-Classification"] || 0}</span>{" "}
                <p>For Classification</p>
              </button>
              <button onClick={() => handleTableChange("In-Progress")}>
                <span>{statusCount["In-Progress"] || 0}</span>{" "}
                <p>In Progress</p>
              </button>
              <button onClick={() => handleTableChange("Initial-Result")}>
                <span>{statusCount["Initial-Result"] || 0}</span>{" "}
                <p>Initial Result</p>
              </button>
              <button onClick={() => handleTableChange("Resubmission")}>
                <span>{statusCount["Resubmission"] || 0}</span>{" "}
                <p>Resubmission</p>
              </button>
              <button onClick={() => handleTableChange("Final-Decision")}>
                <span>{statusCount["Final-Decision"] || 0}</span>{" "}
                <p>Final Decision</p>
              </button>
            </div>

            <div className="rec-dropdown-mobile">
              <select onChange={handleDropDown}>
                <option value="Initial-Submission">Initial Submission</option>
                <option value="Pending-Payment">Pending Payment</option>
                <option value="For-Classification">For Classification</option>
                <option value="In-Progress">In Progress</option>
                <option value="Initial-Result">Initial Result</option>
                <option value="Resubmission">Resubmission</option>
                <option value="Final-Decision">Final Decision</option>
              </select>
            </div>

            {[
              "Initial-Submission",
              "Pending-Payment",
              "For-Classification",
              "In-Progress",
              "Initial-Result",
              "Resubmission",
              "Final-Decision",
            ].map(
              (status) =>
                selectedOption === status && (
                  <div className="rec-tables" key={status}>
                    <div className={status}>
                      <h1>{status.replace(/-/g, " ")}</h1>
                      <p>{statusDescriptions[status]}</p>
                      <table className="rec-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Author</th>
                            <th>Date of Submission</th>
                            <th>Name of Research</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterFormsByStatus(status).map((form, index) => (
                            <tr key={index}>
                              <td>{index + 1 || "No forms available"}</td>
                              <td>{form?.fullName || "No author available"}</td>
                              <td>
                                {new Date(form?.date).toLocaleDateString(
                                  "en-US"
                                ) || "No date available"}
                              </td>
                              <td>{form?.title || "No title available"}</td>
                              <td>
                                <Link
                                  href={`/REC/RECViewSubmission/${params.rec}/${form._id}`}
                                  className="rec-view-btn"
                                >
                                  View
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(RecSubmissions, "REC");
