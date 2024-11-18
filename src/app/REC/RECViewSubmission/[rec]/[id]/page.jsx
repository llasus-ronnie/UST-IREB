"use client";

import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import RecNav from "../../../../components/navbaradmin/RecNav";
import RecNavMobile from "../../../../components/navbaradmin/RecNavMobile";
import UserLoggedIn from "../../../../components/userloggedin/UserLoggedIn";
import "../../../../styles/rec/RECViewSubmission.css";
import axios from "axios";
import withAuthorization from "../../../../../hoc/withAuthorization";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCldImageUrl } from "next-cloudinary";
import { CldUploadWidget } from "next-cloudinary";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import AcknowledgeModal from "../../../../components/modals/AcknowledgePaymentModal";
import { title } from "process";

function RECViewSubmission({ params }) {
  const [forms, setForms] = useState([]);
  const router = useRouter();
  const [rec, setRec] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState("Initial-Submission");
  const [remarks, setRemarks] = useState({ content: "" }); // Make remarks an object
  const [RECMembers, setRECMembers] = useState([]);
  const [selectedReviewer, setSelectedReviewer] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [showAcknowledgeModal, setShowAcknowledgeModal] = useState(false);
  const [initialStatus, setInitialStatus] = useState("Initial-Submission");
  const [initialReviewer, setInitialReviewer] = useState("");
  const [formClassification, setFormClassification] = useState("");
  const [remarksFile, setRemarksFile] = useState();


  //unwrapping params
  useEffect(() => {
    async function unwrapParams() {
      const unwrappedParams = await params;
      setRec(unwrappedParams.rec);
      setId(unwrappedParams.id);
    }
    unwrapParams();
  }, [params]);

  //forms
  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          const response = await axios.get(`/api/forms/${id}`);
          setForms(response.data.submission);
          setStatus(response.data.submission.status || "Initial-Submission");
          setInitialStatus(
            response.data.submission.status || "Initial-Submission"
          ); // Store initial status
          setSelectedReviewer(response.data.submission.recMember || "");
          setInitialReviewer(response.data.submission.recMember || ""); // Store initial reviewer
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchData();
  }, [id]);

  //status
  const updateStatusData = async (newStatus) => {
    try {
      await axios.put(`/api/forms`, {
        status: newStatus,
      },
      { params: { id: forms._id } }
      );
      toast.success("The status information has been saved successfully.");

      await axios.post("/api/auth/send-email-status", {
        email: forms.email,
        name: forms.fullName,
        status: newStatus,
      });
    } catch (error) {
      console.error(error);
    }
  };

  //reviewer
  const updateReviewerData = async () => {
    try {
      await axios.put(`/api/forms`, {
        recMember: selectedReviewer,
      },
      { params: { id: forms._id } }
      );
  
      await updateStatusData("In-Progress");
  
      toast.success(
        "The REC member information has been saved successfully, and the status is updated to 'In-Progress'."
      );
    } catch (error) {
      toast.error("Failed to assign REC member. Please try again.");
    }
  };

  //classification
  const updateClassificationData = async () => {
    try {
      await axios.put(`/api/forms`, {
        classification: formClassification,
      },{ params: { id: forms._id } });
      console.log("Classification updated:", formClassification);
      toast.success(
        "The classification information has been saved successfully."
      );
    } catch (error) {
      console.error(error);
    }
  };

  //GET remarks

    async function getRemarks() {
      try {
        const response = await axios.get(`/api/remarks/`, {
          params: { subFormId: forms._id },
        });
        setRemarksFile(response.data.remarksData);
        setStatus(forms.status);
        console.log("All data:", response.data.remarksData);
      } catch (error) {
        console.error("Error fetching remarks file:", error);
      }
    }
  useEffect(() => {
    getRemarks();
  }, [forms]);

  //remarks
  async function submitRemarks(data) {
    try {
      const remarkData = {
        remarks: data.content,
        subFormId: id,
        status: status,
      };
      const response = await axios.post("/api/remarks", remarkData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Remarks have been submitted successfully.");
      getRemarks();

      await axios.post("/api/auth/send-email-remarks", {
        email: forms.email,
        name: forms.fullName,
        title: forms.title,
      });
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
    }
  }

  //recmembers
  useEffect(() => {
    console.log("Current rec value:", rec);
    async function getRECMembers() {
      try {
        const res = await axios.get(`/api/RECMembers`, {
          params: { rec: rec },
        });
        setRECMembers(res.data.data);
      } catch (error) {
        console.log("Error loading REC Members");
      }
    }
    if (rec) {
      getRECMembers();
    }
  }, [rec]);

  useEffect(() => {
    async function fetchPaymentFile() {
      if (forms && forms._id) {
        try {
          const response = await axios.get(`/api/payment`, {
            params: { formId: forms._id },
          });
          console.log("GET FOR PAYMENT FILE?", response.data);
          setPaymentLink(response.data.payment?.paymentFile);
        } catch (error) {
          console.error("Error fetching payment file:", error);
        }
      }
    }

    fetchPaymentFile();
  }, [forms]);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    setRemarks({ content: "" });
    console.log(newStatus);
  };

  const handleBack = () => {
    router.push(`/REC/RECSubmissions/${rec}`);
  };

  const url = getCldImageUrl({
    width: 960,
    height: 600,
    src: `${forms?.mainFileLink}`,
  });

  const paymentUrl = getCldImageUrl({
    width: 960,
    height: 600,
    src: paymentLink,
  });

  const handleReviewerChange = (e) => {
    const value = e.target.value;
    console.log("Selected Reviewer:", value);
    setSelectedReviewer(value);
  };

  const handleClassificationChange = (e) => {
    const value = e.target.value;
    console.log("Selected classification:", value);
    setFormClassification(value);
  };

  //save data to database
  const updateStatus = async () => {
    try {
      if (status !== initialStatus) {
        await updateStatusData(status);
      }
      if (selectedReviewer !== initialReviewer) {
        await updateReviewerData();
      }
      if (remarks.content) {
        await submitRemarks(remarks);
      }
      if (formClassification && status === "For-Classification") {
        await updateClassificationData(formClassification);
      } else if (status === "Pending-Payment") {
        await updateStatusData(status);
      }
    } catch (error) {
      toast.error("Failed to update. Please try again.");
    }
  };

  return (
    <div className="adminpage-container">
      <div className="recnav-mobile">
        <RecNavMobile />
      </div>

      <RecNav className="recnav" />

      <div className="rec-submissions">
        <div className="adminmain-content">
          <div className="rec-header-container">
            <div className="rec-header">
              <h1>View Submission</h1>
            </div>
            <div className="userloggedin">
              <UserLoggedIn />
            </div>
          </div>

          <div className="rec-header-container-mobile">
            <div className="userloggedin-mobile">
              <UserLoggedIn />
            </div>
            <div className="rec-header">
              <h1>REC Manage Submissions</h1>
              <p>
                Manage Initial Review and Principal Investigator Submissions
              </p>
            </div>
          </div>

          <Row className="viewsubmission-container">
            <a href={`/REC/RECSubmissions/${rec}`} className="back-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
              Go Back to Manage Submissions
            </a>
            <Col xs={12} lg={8} className="viewsub-content-container">
              <iframe src={url} className="viewsub-iframe" />
              <a
                href={url}
                className="viewsub-download"
                download={url}
                style={{ color: "blue" }}
              >
                {" "}
                Download{" "}
              </a>
            </Col>
            <Col xs={12} lg={4} className="viewsub-details-container">
              <h1>Submission Details</h1>

              <span>Research Title:</span>
              <p>{forms?.title || "No title available"}</p>

              <span>Date of Submission:</span>
              <p>
                {forms?.date
                  ? new Date(forms.date).toLocaleDateString("en-US")
                  : "No date available"}
              </p>

              <span>Review Classification:</span>
              <p>{forms?.classification || "No classification available"}</p>

              <span>Status:</span>
              <select
                className="viewsub-changestatus"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="Initial-Submission" selected>
                  Choose Status
                </option>
                <option value="Pending-Payment">Pending Payment</option>
                <option value="For-Classification">For Classification</option>
                <option value="In-Progress">In Progress</option>
                <option value="Initial-Result">Initial Result</option>
                <option value="Resubmission">Resubmission</option>
                <option value="Final-Decision">Final Decision</option>
              </select>

              {/* conditional rendering */}
              {status === "For-Classification" ? (
                <>
                  <span>Classification:</span>
                  <select
                    className="viewsub-changestatus"
                    value={formClassification}
                    onChange={handleClassificationChange}
                  >
                    <option value="Full-Board">Full Board</option>
                    <option value="Expedited">Expedited</option>
                    <option value="Exempt">Exempt</option>
                  </select>
                </>
              ) : null}

              <span>Remarks:</span>
              <CldUploadWidget
                signatureEndpoint="/api/sign-cloudinary-params"
                onSuccess={(res) => {
                  if (res.info.format !== "pdf") {
                    toast.error(
                      "Only PDF files are allowed. Please upload a PDF."
                    );
                    return;
                  }
                  console.log(res.info.secure_url);
                  setRemarks({ content: res.info.secure_url });
                }}
              >
                {({ open }) => {
                  return (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="form-control PIforms-formtext PIforms-file"
                    >
                      Upload file
                    </button>
                  );
                }}
              </CldUploadWidget>

              <table>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(remarksFile) &&
                        remarksFile.length > 0 ? (
                          remarksFile.map((remark, index) => (
                            <tr key={index}>
                              <td>
                                {new Date(
                                  remark.remarksDate
                                ).toLocaleDateString("en-US")}
                              </td>
                              <td>{remark.status}</td>
                              <td>
                                <a href={remark.remarks}> View Remarks</a>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3">No remarks available</td>
                          </tr>
                        )}
                      </tbody>
                    </table>

              {status === "For-Classification" ? (
                <>
                  <span>Assign Reviewer:</span>
                  <select
                    className="viewsub-changestatus"
                    value={selectedReviewer}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleReviewerChange(e);
                      setSelectedReviewer(value);
                    }}
                  >
                    <option value="Choose Reviewer">Choose Reviewer</option>
                    {Array.isArray(RECMembers) && RECMembers.length > 0 ? (
                      RECMembers.map((member) => (
                        <option key={member._id} value={member.email}>
                          {member.name}
                        </option>
                      ))
                    ) : (
                      <option value="No Reviewer Available">
                        No Reviewer Available
                      </option>
                    )}
                  </select>
                </>
              ) : null}

              <div className="viewsub-proofofpayment">
                <span>Proof of Payment:</span>
                {paymentLink ? (
                  <>
                    <Image
                      src={paymentLink}
                      alt="Payment File"
                      width={200}
                      height={200}
                    />
                    <a
                      href={paymentLink}
                      download={paymentLink}
                      style={{ color: "blue" }}
                    >
                      {" "}
                      Download{" "}
                    </a>
                  </>
                ) : (
                  <p> No payment uploaded yet. </p>
                )}

                <button
                  onClick={() => setShowAcknowledgeModal(true)}
                  disabled={!paymentLink} 
                  style={{
                    backgroundColor: paymentLink ? "#007bff" : "#d6d6d6", 
                    color: paymentLink ? "#fff" : "#a9a9a9", 
                    cursor: paymentLink ? "pointer" : "not-allowed",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Acknowledge Payment
                </button>
              </div>

              <div className="viewsub-buttons">
                <button className="viewsub-save" onClick={updateStatus}>
                  Save Changes
                </button>
                <button className="viewsub-back" onClick={handleBack}>
                  Back
                </button>
              </div>
            </Col>
          </Row>
          <ToastContainer />
          <AcknowledgeModal
            show={showAcknowledgeModal}
            onHide={() => setShowAcknowledgeModal(false)}
            onConfirm={() => {
              setShowAcknowledgeModal(false);
              updateStatusData("For-Classification");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(RECViewSubmission, "REC");
