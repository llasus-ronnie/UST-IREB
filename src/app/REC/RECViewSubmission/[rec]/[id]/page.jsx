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
import InitialSubmissionModal from "../../../../components/modals/InitialSubmissionAcknowledgeModal";

function RECViewSubmission({ params }) {
  const [forms, setForms] = useState([]);
  const router = useRouter();
  const [rec, setRec] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState("Initial-Submission");
  const [remarks, setRemarks] = useState({
    content: [],  // For the file URL (only set when a file is uploaded)
    comment: '',  // For the comment text
  });

  const [RECMembers, setRECMembers] = useState([]);
  const [selectedReviewer, setSelectedReviewer] = useState([]);
  const [paymentLink, setPaymentLink] = useState("");
  const [showAcknowledgeModal, setShowAcknowledgeModal] = useState(false);
  const [initialStatus, setInitialStatus] = useState("Initial-Submission");
  const [initialReviewer, setInitialReviewer] = useState("");
  const [formClassification, setFormClassification] = useState("");
  const [remarksFile, setRemarksFile] = useState();
  const [finalDecision, setFinalDecision] = useState("");
  const [remarksData, setRemarksData] = useState([]);
  const [initialSubmission, setInitialSubmission] = useState("Initial-Submission");
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [externalReviewers, setExternalReviewers] = useState([]);

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
      await axios.put(
        `/api/forms`,
        {
          id: forms._id,
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
      await axios.put(
        `/api/forms`,
        {
          id: forms._id,
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

  //initial submission
  const updateInitialSubmissionData = async () => {
    try {
      await axios.put(
        `/api/forms`,
        {
          id: forms._id,
          initialSubmission: initialSubmission,
          status: initialSubmission === "Completed" ? "Pending-Payment" : forms.status,
        },
        { params: { id: forms._id } }
      );
      console.log("Initial Submission updated:", initialSubmission);
      toast.success(
        "The initial submission information has been saved successfully."
      );
    } catch (error) {
      console.error("Error updating initial submission:", error);
      toast.error("Failed to update the initial submission. Please try again.");
    }
  };

  //classification
  const updateClassificationData = async () => {
    try {
      await axios.put(
        `/api/forms`,
        {
          id: forms._id,
          classification: formClassification,
        },
        { params: { id: forms._id } }
      );
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
      const response = await axios.get(`/api/remarks`, {
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
        subFormId: id,
        status: status,
        remarks: data.content && Array.isArray(data.content)
          ? data.content.map((file) => ({
            url: file.url, // URL of the file
            filename: file.filename, // Filename of the file (if available)
          }))
          : [],  // If no files are uploaded, keep remarks empty
        remarksComment: data.comment || "",  // If no comment, send an empty string
      };

      console.log("Submitting Remarks:", remarkData);  // Add this log to see the request body

      const response = await axios.post("/api/remarks", remarkData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Remarks have been submitted successfully.");
      getRemarks();

      // Optional: Send email notification
      await axios.post("/api/auth/send-email-remarks", {
        email: forms.email,
        name: forms.fullName,
        title: forms.title,
      });
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      toast.error("Failed to submit remarks. Please try again.");
    }
  }

  //recmembers
  useEffect(() => {
    async function getRECMembersAndExternalReviewers() {
      try {
        const [recMembersRes, externalReviewersRes] = await Promise.all([
          axios.get(`/api/RECMembers`, {
            params: { rec: forms?.researchEthicsCommittee }, 
          }),
          axios.get(`/api/addExternalReviewer`,{
            params:{rec: forms?.researchEthicsCommittee}
          }),
        ]);
  
        console.log("REC Members:", recMembersRes.data.data);
        console.log("External Reviewers:", externalReviewersRes.data.data);
  
        setRECMembers(recMembersRes.data.data);
        setExternalReviewers(externalReviewersRes.data.data);  
      } catch (error) {
        console.log("Error loading REC Members and External Reviewers", error);
      }
    }
  
    if (forms?.researchEthicsCommittee) { 
      getRECMembersAndExternalReviewers();
    }
  }, [forms?.researchEthicsCommittee]); 


  //payment file
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

  //final decision
  async function submitFinalDecision(finalDecision) {
    try {
      const formUpdateResponse = await axios.put(
        "/api/forms",
        {
          finalDecision: finalDecision,
        },
        {
          params: { id: forms._id },
        }
      );
      if (formUpdateResponse.status === 200) {
        console.log(formUpdateResponse);
        toast.success("Final decision has been submitted successfully.");
      } else {
        console.error("Failed to update final decision");
      }
    } catch (error) {
      toast.error("Failed to update final decision. Please try again.");
    }
  }

  //resubmission remarks from PR
  const fetchResubmissionRemarks = async () => {
    try {
      const response = await axios.get("/api/resubmissionRemarks", {
        params: {
          subFormId: forms._id,
        },
      });

      if (response.status === 200) {
        const remarks = response.data.getResubmissionRemarks;

        const enrichedRemarks = remarks.map((remark) => {
          const fileLink = remark.resubmissionRemarksFile;

          return {
            ...remark,
            fileLink,
          };
        });

        const sortedRemarks = enrichedRemarks.sort((a, b) => {
          const dateA = new Date(a.resubmissionRemarksDate);
          const dateB = new Date(b.resubmissionRemarksDate);
          return dateA - dateB;
        });

        setRemarksData(sortedRemarks);
      } else {
        console.error("Failed to fetch remarks", response.status);
      }
    } catch (error) {
      console.error("Error fetching remarks:", error.message);
    }
  };

  const getFileLink = async (resubmissionId) => {
    try {
      console.log("Getting file link for resubmissionId:", resubmissionId);

      const [formResponse, resubmissionFileResponse] = await Promise.all([
        axios.get(`/api/forms/${resubmissionId}`),
        axios.get(`/api/resubmissionFiles`, {
          params: { subFormId: `${resubmissionId}` },
        }),
      ]);

      console.log("Form Response:", formResponse);
      console.log("Resubmission File Response:", resubmissionFileResponse);

      if (formResponse.status === 200 && formResponse.data.mainFileLink) {
        console.log("Found mainFileLink:", formResponse.data.mainFileLink);
        return formResponse.data.mainFileLink;
      }

      if (
        resubmissionFileResponse.status === 200 &&
        resubmissionFileResponse.data.resubmissionFile
      ) {
        console.log(
          "Found resubmissionFile link:",
          resubmissionFileResponse.data.resubmissionFile
        ); // Log resubmissionFile link
        return resubmissionFileResponse.data.resubmissionFile;
      }

      return null;
    } catch (error) {
      console.error("Error fetching file link:", error.message);
      return null;
    }
  };

  useEffect(() => {
    fetchResubmissionRemarks();
  }, [forms]);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    setRemarks({ content: "" });
    console.log(newStatus);
  };

  //remarks file upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); 
  
    setFiles(files);
  };


  //remarks comment
  const handleRemarksChange = (e) => {
    setRemarks({
      ...remarks,  
      comment: e.target.value,  
    });
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

  const handleDecisionChange = (event) => {
    setFinalDecision(event.target.value);
  };

  const handleInitialSubmission = (event) => {
    const value = event.target.value;
    if (value === "Completed") {
      setShowCompleteModal(true);
    } else {
      setInitialSubmission(value);
    }
  };

  const updateStatus = async () => {
    try {
      if (status !== initialStatus) {
        await updateStatusData(status);
      }
      if (selectedReviewer !== initialReviewer) {
        await updateReviewerData();
      }
      if (remarks.content || remarks.comment) {
        if (initialSubmission === "Initial-Submission") {  // Prevent submitRemarks if updating initial submission
          await submitRemarks(remarks);
        }
      }
      if (formClassification && status === "For-Classification") {
        await updateClassificationData(formClassification);
      } else if (status === "Pending-Payment") {
        await updateStatusData(status);
      }
      if (finalDecision) {
        await submitFinalDecision(finalDecision);
      }
      if (initialSubmission !== "Initial-Submission") {
        await updateInitialSubmissionData();
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
  {/* Main File Display */}
  {forms?.mainFileLink && forms.mainFileLink.length > 0 && (
    <div>
      <h5>Main File:</h5>
      {forms.mainFileLink.map((file, index) => (
        <div key={index}>
          <iframe
            src={file.url}
            className="viewsub-iframe"
            title={`Main File ${index + 1}`}
          />
          <a
            href={file.url}
            className="viewsub-download"
            download={file.filename}
            style={{ color: "blue" }}
          >
            Download {file.filename}
          </a>
        </div>
      ))}
    </div>
  )}

  {/* Supplementary Files Display */}
  {forms?.supplementaryFileLink && forms.supplementaryFileLink.length > 0 && (
    <div>
      <h5>Supplementary Files:</h5>
      {forms.supplementaryFileLink.map((file, index) => (
        <div key={index}>
          <iframe
            src={file.url}
            className="viewsub-iframe"
            title={`Supplementary File ${index + 1}`}
          />
          <a
            href={file.url}
            className="viewsub-download"
            download={file.filename}
            style={{ color: "blue" }}
          >
            Download {file.filename}
          </a>
        </div>
      ))}
    </div>
  )}
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

              <span>Submission Status:</span>
              <p>{forms?.status || "No classification available"}</p>

              <span>Status:</span>
              <select
                className="viewsub-changestatus"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="Initial-Submission" selected>
                  Initial Submission
                </option>
                <option value="Pending-Payment">Pending Payment</option>
                <option value="For-Classification">For Classification</option>
                <option value="In-Progress">In Progress</option>
                <option value="Initial-Result">Initial Result</option>
                <option value="Resubmission">Resubmission</option>
                <option value="Final-Decision">Final Decision</option>
              </select>


              {status === "Initial-Submission" ? (
                <>
                  <span>Completion:</span>
                  <select
                    className="viewsub-changestatus"
                    value={initialSubmission}
                    onChange={handleInitialSubmission}
                  >
                    <option value="Initial-Submission" disabled>
                      Choose one
                    </option>
                    <option value="Completed">Complete</option>
                    <option value="Incomplete">Incomplete</option>
                  </select>
                </>
              ) : null}

              {/* conditional rendering */}
              {status === "For-Classification" ? (
                <>
                  <span>Classification:</span>
                  <select
                    className="viewsub-changestatus"
                    value={formClassification}
                    onChange={handleClassificationChange}
                  >
                    <option value="No-value" disabled> Choose classification </option>
                    <option value="Full-Board">Full Board</option>
                    <option value="Expedited">Expedited</option>
                    <option value="Exempt">Exempt</option>
                  </select>
                </>
              ) : null}

              {formClassification === "Full-Board" || formClassification === "Expedited" ? (
                <>
                  <span>Assign Reviewer:</span>
                  {Array.isArray(RECMembers) && RECMembers.length > 0 ? (
  RECMembers.map((member) => (
    <div key={member._id} className="viewsub-checkbox">
      <label>
        <input
          type="checkbox"
          name="selectedReviewers"
          value={member.email}
          checked={selectedReviewer.includes(member.email)} 
          onChange={(e) => {
            const value = e.target.value;
            if (e.target.checked) {
              setSelectedReviewer((prevSelected) => [...prevSelected, value]);
            } else {
              setSelectedReviewer((prevSelected) =>
                prevSelected.filter((email) => email !== value)
              );
            }
          }}
        />
        {member.name}
      </label>
    </div>
  ))
) : (
  <div> </div>
)}

{Array.isArray(externalReviewers) && externalReviewers.length > 0 ? (
  externalReviewers.map((reviewer) => (
    <div key={reviewer._id} className="viewsub-checkbox">
      <label>
        <input
          type="checkbox"
          name="selectedExternalReviewers"
          value={reviewer.email}
          checked={selectedReviewer.includes(reviewer.email)}
          onChange={(e) => {
            const value = e.target.value;
            if (e.target.checked) {
              setSelectedReviewer((prevSelected) => [...prevSelected, value]);
            } else {
              setSelectedReviewer((prevSelected) =>
                prevSelected.filter((email) => email !== value)
              );
            }
          }}
        />
        {reviewer.name}
      </label>
    </div>
  ))
) : (
  <div> </div>
)}

                </>



              ) : null}

              {status === "Final-Decision" ? (
                <>
                  <span>Decision:</span>
                  <select
                    className="viewsub-changestatus"
                    value={finalDecision}
                    onChange={handleDecisionChange}
                  >
                    <option value="No-value" disabled>
                      Choose your final decision
                    </option>
                    <option value="Approved">Approved</option>
                    <option value="Deferred">Deferred</option>
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
                      target="_blank"
                      rel="noopener noreferrer"
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

              <div className="submissionstatus-card-remarks">
                <div className="upload-remarks">
                  {finalDecision === "Approved" || formClassification === "Exempt" ? (
                    <span>Certificate:</span>
                  ) : finalDecision === "Deferred" ? (
                    <span>Letter of Disapproval:</span>
                  ) : (
                    <span>Remarks:</span>
                  )}

                  <CldUploadWidget
                    signatureEndpoint="/api/sign-cloudinary-params"
                    multiple
                    onSuccess={(res) => {
                      if (res.info.format !== "pdf") {
                        toast.error("Only PDF files are allowed. Please upload a PDF.");
                        return;
                      }

                      setRemarks((prevRemarks) => ({
                        ...prevRemarks,
                        content: prevRemarks.content ? [...prevRemarks.content, res.info.secure_url] : [res.info.secure_url],  // Append the new file URL
                      }));
                    }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="form-control PIforms-formtext PIforms-file"
                      >
                        Upload file
                      </button>
                    )}
                  </CldUploadWidget>



                  <textarea
                    className="viewsub-textarea"
                    value={remarks.comment}
                    onChange={(e) => setRemarks({
                      ...remarks,
                      comment: e.target.value,  // Update the comment
                    })}
                    placeholder="Enter remarks here..."
                  />



                </div>

                <table className="remarks-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(remarksFile) && remarksFile.length > 0 ? (
                      remarksFile.map((remark, index) => (
                        <tr key={index}>
                          <td>
                            {new Date(remark.remarksDate).toLocaleDateString(
                              "en-US"
                            )}
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
              </div>

              <div className="submissionstatus-card-remarks">
                <span>Resubmission</span>
                <br />
                <br />
                <span>Primary Reviewer Remarks:</span>
                <table className="remarks-table">
                  <thead>
                    <tr>
                      <th>Resubmission</th>
                      <th>File</th>
                      <th>Remarks</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {remarksData.map((remark) => (
                      <tr key={remark._id}>
                        <td>
                          {/* Check if resubmission1 or resubmission2 is true and display accordingly */}
                          {remark.resubmission0
                            ? "Initial Result"
                            : remark.resubmission1
                              ? "Resubmission 1"
                              : remark.resubmission2
                                ? "Resubmission 2"
                                : "No Resubmission"}
                        </td>
                        <td>
                          {remark.fileLink ? (
                            <a
                              href={remark.fileLink} // Ensure the link is valid before rendering
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View File
                            </a>
                          ) : (
                            <span>No File Available</span> // Fallback in case fileLink is not available
                          )}
                        </td>
                        <td>
                          <a
                            href={remark.resubmissionRemarksFile}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Remarks
                          </a>
                        </td>
                        <td>
                          {new Date(
                            remark.resubmissionRemarksDate
                          ).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
  onHide={() => {
    console.log("Modal is being hidden");
    setShowAcknowledgeModal(false);
  }}
  onConfirm={() => {
    console.log("Modal confirmed");

    // Debugging the update status process
    console.log("Attempting to update status to 'For-Classification'");
    console.log("Forms object being passed:", forms);

    if (!forms || !forms._id) {
      console.error("Error: The forms object is invalid or _id is missing");
    } else {
      console.log("Forms _id:", forms._id);

      // Only proceed with status update if needed
      if (status !== "For-Classification") {  // Ensure the status is not already "For-Classification"
        updateStatusData("For-Classification");
      } else {
        console.log("Status is already 'For-Classification'. No update needed.");
      }
    }

    // Make sure that initial submission and remarks are not updated unnecessarily
    if (initialSubmission !== "Initial-Submission") {
      updateInitialSubmissionData();  // Update initial submission if needed, but not at the same time as status change
    }

    // Close the modal after updates
    setShowAcknowledgeModal(false);
  }}
/>


          <InitialSubmissionModal
            show={showCompleteModal}
            onHide={() => setShowCompleteModal(false)}
            onConfirm={() => {
              setShowCompleteModal(false);
              setInitialSubmission("Completed");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(RECViewSubmission, "REC");
