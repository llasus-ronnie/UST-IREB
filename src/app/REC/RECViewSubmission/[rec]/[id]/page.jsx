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
import AcknowledgeAppealModal from "../../../../components/modals/AcknowledgeAppealModal";

function RECViewSubmission({ params }) {
  const [forms, setForms] = useState([]);
  const router = useRouter();
  const [rec, setRec] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState("Initial-Submission");
  const [recRemarksFiles, setRecRemarksFiles] = useState([]);
  const [recRemarksComment, setRecRemarksComment] = useState("");
  const [remarksStatus, setRemarksStatus] = useState("");
  const [remarksDate, setRemarksDate] = useState("");
  const [acknowledgeModal, setAcknowledgeModal] = useState(false);

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
  const [initialSubmission, setInitialSubmission] =
    useState("Initial-Submission");
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [externalReviewers, setExternalReviewers] = useState([]);
  const [resubmission, setResubmission] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

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
          setInitialReviewer(response.data.submission.recMember || "");
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
          status: "In-Progress",
        },
        { params: { id: forms._id } }
      );
      updateStatusData("In-Progress");
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
          status:
            initialSubmission === "Completed"
              ? "Pending-Payment"
              : forms.status,
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

  //remarks
  async function submitRemarks(data) {
    console.log("Submitting remarks data:", data);

    const remarkData = {
      subFormId: id,
      status: status,
      remarks: recRemarksFiles.map((file) => ({
        url: file.url,
        filename: file.filename,
      })),
      remarksComment: recRemarksComment || "",
    };
    console.log("Remark Data being submitted:", remarkData);

    try {
      const response = await axios.post("/api/remarks", remarkData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Server Response:", response);
      toast.success("Remarks have been submitted successfully.");
      getRemarks();
    } catch (error) {
      console.error(
        "Error submitting remarks:",
        error.response?.data || error.message
      );
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
          axios.get(`/api/addExternalReviewer`, {
            params: { rec: forms?.researchEthicsCommittee },
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
        `/api/forms`,
        {
          id: forms._id,
          finalDecision: finalDecision,
        },
        { params: { id: forms._id } }
      );
      toast.success("Final decision has been submitted successfully.");
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

  // Resubmission File
  useEffect(() => {
    async function fetchResubmission() {
      try {
        const response = await axios.get("/api/resubmissionFile", {
          params: {
            subFormId: forms._id,
          },
        });
        setResubmission(response.data.resubmissions);
        console.log("Resubmission:", response.data.resubmissions);
      } catch (error) {
        console.error("Failed to fetch resubmission:", error);
      }
    }

    fetchResubmission();
  }, [forms]);

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

  const handleInitialSubmission = (event) => {
    const value = event.target.value;

    if (value === "Completed") {
      setShowCompleteModal(true);
      const confirmCompletion = () => {
        setShowCompleteModal(false);
        setInitialSubmission("Completed");
        console.log("Initial Submission:", "Completed");
      };
      confirmCompletion();
    } else {
      setInitialSubmission(value);
      console.log("Initial Submission:", value);
    }
  };

  const handleCommentChange = (e) => {
    setRecRemarksComment(e.target.value);
  };

  const updateStatus = async () => {
    try {
      const remarks = {
        content: recRemarksFiles,
        comment: recRemarksComment,
      };

      if (status !== initialStatus) {
        await updateStatusData(status);
      }

      if (selectedReviewer !== initialReviewer) {
        await updateReviewerData();
      }

      if (
        (remarks.content.length > 0 || remarks.comment) &&
        initialSubmission !== "Initial-Submission"
      ) {
        await submitRemarks(remarks);
      }

      if (status === "Initial-Result") {
        await submitRemarks(remarks);
      }

      if (status === "Final-Decision") {
        await submitRemarks(remarks);
      }

      if (status === "Resubmission") {
        await submitRemarks(remarks);
      }

      if (formClassification && status === "For-Classification") {
        await updateClassificationData(formClassification);
      } else if (status === "Pending-Payment") {
        await updateStatusData(status);
      }

      if (finalDecision) {
        await submitFinalDecision(finalDecision);
      }

      if (
        initialSubmission == "Completed" ||
        initialSubmission == "Incomplete"
      ) {
        await updateInitialSubmissionData(initialSubmission);
      }

      if (formClassification === "Exempt") {
        await updateStatusData("Final-Decision");
      }
    } catch (error) {
      toast.error("Failed to update. Please try again.");
      console.error("Error occurred during update process:", error);
    }
  };

  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const fileOptions = [
    ...(forms?.mainFileLink || []).map((file) => ({
      filename: file.filename,
      url: file.url,
    })),
    ...(forms?.supplementaryFileLink || []).map((file) => ({
      filename: file.filename,
      url: file.url,
    })),
  ];

  const handleFileViewChange = (event) => {
    const selectedUrl = event.target.value;
    setSelectedFileUrl(selectedUrl);
  };

  const isImage = (url) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
  };

  const isPDF = (url) => {
    return /\.pdf$/i.test(url);
  };

  const renderContent = (url) => {
    if (isImage(url)) {
      return <img src={url} alt="Payment File" width={200} height={200} />;
    } else if (isPDF(url)) {
      return <iframe src={url} width={200} height={200} title="Payment File" />;
    } else {
      return <span>Unsupported file type</span>;
    }
  };

  const handleShowAcknowledgeModal = () => setAcknowledgeModal(true);
  const handleCloseAcknowledgeModal = () => setAcknowledgeModal(false);

  const handleUploadSuccess = (res) => {
    console.log("Upload Response:", res.info);

    if (res.info.format !== "pdf") {
      toast.error("Only PDF files are allowed. Please upload a PDF.");
      return;
    }

    const newFile = {
      url: res.info.secure_url,
      filename:
        res.info.original_filename || res.info.public_id.split("/").pop(),
    };

    setRecRemarksFiles((prevFiles) => {
      console.log("Prev Files:", prevFiles);
      const updatedFiles = [...prevFiles, newFile];
      console.log("Updated Files:", updatedFiles);
      return updatedFiles;
    });
  };

  const handleRemoveFile = (fileToRemove) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.url !== fileToRemove.url)
    );
  };

  const [remarksList, setRemarksList] = useState([]);

  useEffect(() => {
    const fetchRemarks = async () => {
      console.log("Form ID in useEffect:", forms._id);

      if (!forms._id) {
        console.error("Form ID is missing!");
        return;
      }

      try {
        const response = await axios.get("/api/remarks", {
          params: { subFormId: forms._id },
        });
        console.log("Fetched remarks data:", response.data);

        const remarksData = response.data;

        if (remarksData && remarksData.length > 0) {
          setRemarksList(remarksData);
        } else {
          console.log("No remarks found for this form.");
        }
      } catch (error) {
        console.error("Error fetching remarks:", error);
      }
    };

    fetchRemarks();
  }, [forms]);

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
            {fileOptions.length > 0 ? (
              <div>
                <h5>Select a File:</h5>
                <select
                  onChange={handleFileViewChange}
                  className="viewsub-changestatus"
                  defaultValue=""
                >
                  <option value="" disabled>
                    -- Select a file to view --
                  </option>
                  {fileOptions.map((file, index) => (
                    <option key={index} value={file.url}>
                      {file.filename}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p>No files available to view.</p>
            )}

            <Col xs={12} lg={8} className="viewsub-content-container">
              {selectedFileUrl ? (
                <div className="file-viewer">
                  <iframe
                    src={selectedFileUrl}
                    className="viewsub-iframe"
                    title="Selected File Viewer"
                  />
                  <a
                    href={selectedFileUrl}
                    className="viewsub-download"
                    download
                    style={{ color: "blue" }}
                  >
                    Download Selected File
                  </a>
                </div>
              ) : (
                <p>Please select a file to view.</p>
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

              <Link
                href={`/REC/SubmissionSummary/${forms._id}`}
                style={{ color: "blue" }}
              >
                {" "}
                More Details here{" "}
              </Link>
              <br />
              <br />

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

              {status === "For-Classification" ? (
                <>
                  <span>Classification:</span>
                  <select
                    className="viewsub-changestatus"
                    value={formClassification}
                    onChange={handleClassificationChange}
                  >
                    <option value="No-value" selected disabled>
                      {" "}
                      Choose classification{" "}
                    </option>
                    <option value="Full-Board">Full Board</option>
                    <option value="Expedited">Expedited</option>
                    <option value="Exempt">Exempt</option>
                  </select>
                </>
              ) : null}

              {formClassification === "Full-Board" ||
              formClassification === "Expedited" ? (
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
                            onChange={(e) => {
                              const value = e.target.value;
                              if (e.target.checked) {
                                setSelectedReviewer((prevSelected) => [
                                  ...prevSelected,
                                  value,
                                ]);
                              } else {
                                setSelectedReviewer((prevSelected) =>
                                  prevSelected.filter((name) => email !== value)
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

                  {Array.isArray(externalReviewers) &&
                  externalReviewers.length > 0 ? (
                    externalReviewers.map((reviewer) => (
                      <div key={reviewer._id} className="viewsub-checkbox">
                        <label>
                          <input
                            type="checkbox"
                            name="selectedExternalReviewers"
                            value={reviewer.email}
                            checked={selectedReviewer.includes(reviewer.name)}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (e.target.checked) {
                                setSelectedReviewer((prevSelected) => [
                                  ...prevSelected,
                                  value,
                                ]);
                              } else {
                                setSelectedReviewer((prevSelected) =>
                                  prevSelected.filter((name) => name !== value)
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
                    onChange={(event) => {
                      const value = event.target.value;
                      setFinalDecision(value);
                      console.log(value);
                    }}
                  >
                    <option value="No-value" disabled>
                      Choose your final decision
                    </option>
                    <option value="Approved">Approved</option>
                    <option value="Deferred">Deferred</option>
                  </select>
                </>
              ) : null}

              {forms?.appeal === true && (
                <div className="viewsub-buttons">
                  <button
                    onClick={handleShowAcknowledgeModal}
                    className="viewsub-save"
                  >
                    Appeal Decision
                  </button>
                </div>
              )}

              <div className="viewsub-proofofpayment">
                <span>Proof of Payment:</span>
                {paymentLink ? (
                  <>
                    {renderContent(paymentLink)}
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
                  {finalDecision === "Approved" ||
                  formClassification === "Exempt" ? (
                    <span>Certificate:</span>
                  ) : finalDecision === "Deferred" ? (
                    <span>Letter of Disapproval:</span>
                  ) : (
                    <span>Remarks:</span>
                  )}

                  <div>
                    <CldUploadWidget
                      signatureEndpoint="/api/sign-cloudinary-params"
                      multiple
                      onSuccess={(res) => handleUploadSuccess(res)}
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

                    {/* Uploaded files list */}
                    {uploadedFiles.length > 0 && (
                      <div className="uploaded-files-list">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="uploaded-file-item">
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="uploaded-file-link"
                            >
                              {file.filename}
                            </a>
                            <button
                              type="button"
                              className="remove-file-button ml-2 btn btn-outline-danger btn-sm"
                              onClick={() => handleRemoveFile(file)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <textarea
                    className="viewsub-textarea"
                    value={recRemarksComment}
                    onChange={handleCommentChange}
                    placeholder="Enter remarks here..."
                  />
                </div>

                {/* TAG */}
                <div className="remarks-table-wrapper">
                  <table className="remarks-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Comments</th>
                        <th>Files</th>
                      </tr>
                    </thead>
                    <tbody>
                      {remarksList.length > 0 ? (
                        remarksList.map((remark, index) => (
                          <tr key={index}>
                            <td>
                              {new Date(remark.remarksDate).toLocaleDateString(
                                "en-US"
                              )}
                            </td>
                            <td>{remark.status}</td>
                            <td>{remark.remarksComment}</td>
                            <td>
                              <div>
                                {remark.remarks && remark.remarks.length > 0 ? (
                                  remark.remarks.map((file, fileIndex) => (
                                    <>
                                      <a
                                        key={fileIndex}
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {file.filename}
                                      </a>
                                      <br />
                                    </>
                                  ))
                                ) : (
                                  <p>No files available</p>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">No remarks available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="submissionstatus-card-remarks resubmission-card">
                <span>Principal Investigator Resubmissions</span>
                <div className="remarks-table-wrapper">
                  <table className="remarks-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>File</th>
                        <th>Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(resubmission) &&
                      resubmission.length > 0 ? (
                        resubmission.map((resubmission, index) => (
                          <tr key={index}>
                            <td>
                              {new Date(
                                resubmission.resubmissionFileDate
                              ).toLocaleDateString("en-US")}
                            </td>
                            <td>
                              {resubmission.resubmissionFile &&
                              resubmission.resubmissionFile.length > 0 ? (
                                resubmission.resubmissionFile.map(
                                  (resubmissionFile, index) => (
                                    <div key={index}>
                                      <a
                                        href={resubmissionFile.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {resubmissionFile.filename}
                                      </a>
                                    </div>
                                  )
                                )
                              ) : (
                                <p>No resubmission available</p>
                              )}
                            </td>

                            <td>{resubmission.resubmissionComments}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No resubmission available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <span>Primary Reviewer Remarks:</span>
                <div className="remarks-table-wrapper">
                  <table className="remarks-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Primary reviewer</th>
                        <th>File</th>
                        <th>Remarks</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {remarksData.map((remark, index) => (
                        <tr key={remark._id}>
                          <td>{index + 1}</td>
                          <td>{remark.resubmissionRemarksMember}</td>
                          <td>
                            {Array.isArray(remark.resubmissionRemarksFile)
                              ? remark.resubmissionRemarksFile.map(
                                  (file, fileIndex) => {
                                    const fileName = file.filename;
                                    return (
                                      <>
                                        <a
                                          key={fileIndex}
                                          href={file.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {fileName}
                                        </a>
                                        <br />
                                      </>
                                    );
                                  }
                                )
                              : "No file"}
                          </td>
                          <td>{remark.resubmissionRemarksComments}</td>
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

              console.log(
                "Attempting to update status to 'For-Classification'"
              );
              console.log("Forms object being passed:", forms);

              if (!forms || !forms._id) {
                console.error(
                  "Error: The forms object is invalid or _id is missing"
                );
              } else {
                console.log("Forms _id:", forms._id);

                if (status !== "For-Classification") {
                  updateStatusData("For-Classification");
                } else {
                  console.log(
                    "Status is already 'For-Classification'. No update needed."
                  );
                }
              }

              setShowAcknowledgeModal(false);
            }}
          />

          <InitialSubmissionModal
            show={showCompleteModal}
            onHide={() => setShowCompleteModal(false)}
            onConfirm={() => {
              setShowCompleteModal(false);
              setInitialSubmission("Completed");
              console.log("Initial Submission:", initialSubmission);
            }}
          />

          <AcknowledgeAppealModal
            show={acknowledgeModal}
            onHide={() => setAcknowledgeModal(false)}
            onConfirm={() => {
              setAcknowledgeModal(false);
              console.log("Acknowledged appeal");
            }}
            submissionparams={id}
          />
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(RECViewSubmission, "REC");
