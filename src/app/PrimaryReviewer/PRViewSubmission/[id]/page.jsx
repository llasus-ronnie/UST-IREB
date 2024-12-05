"use client";

import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import PrNav from "../../../components/navbaradmin/PrNav";
import PrNavMobile from "../../../components/navbaradmin/PrNavMobile";
import UserLoggedIn from "../../../components/userloggedin/UserLoggedIn";
import FinalReviewModal from "../../../components/modals/ConfirmSubmitToRECFinalReview";
import "../../../styles/pr/PrViewSubmission.css";
import axios from "axios";
import withAuthorization from "../../../../hoc/withAuthorization";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CldUploadWidget } from "next-cloudinary";
import { getCldImageUrl } from "next-cloudinary";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

function PRViewSubmission({ params }) {
  //state variables
  const [forms, setForms] = useState([]);
  const [resubmission, setResubmission] = useState("");
  const router = useRouter();
  const [modalShowFinalReview, setModalShowFinalReview] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [remarksData, setRemarksData] = useState([]);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [resubmissionFiles, setResubmissionFiles] = useState([]); // To store uploaded files
  const [resubmissionComments, setResubmissionComments] = useState(""); // To store remarks

  const { register, handleSubmit, setValue } = useForm();

  const { data: session } = useSession();
  const userName = session.user.name;

  const handleShowFinalReviewModal = () => setModalShowFinalReview(true);
  const handleCloseFinalReviewModal = () => setModalShowFinalReview(false);

  //useEffect
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/forms/${params.id}`);
        setForms(response.data.submission);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  //GET Resubmission File
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

  const fetchResubmissionRemarks = async () => {
    try {
      const response = await axios.get("/api/resubmissionRemarks", {
        params: {
          subFormId: forms._id,
        },
      });
      if (response.status === 200) {
        const sortedRemarks = response.data.getResubmissionRemarks.sort(
          (a, b) => {
            const dateA = new Date(a.resubmissionRemarksDate); // Ensure this field contains date with time
            const dateB = new Date(b.resubmissionRemarksDate);
            return dateA - dateB; // Sorting in ascending order
          }
        );
        setRemarksData(sortedRemarks); // Set the sorted remarks data
      } else {
        console.error("Failed to fetch remarks", response.status);
      }
    } catch (error) {
      console.error("Error fetching remarks:", error.message);
    }
  };

  useEffect(() => {
    fetchResubmissionRemarks();
  }, [forms]);

  async function submitResubmissionRemarks(data) {
    try {
      const files = resubmissionFiles.map((file) => ({
        url: file.url,
        filename: file.filename,
      }));

      // Prepare the payload
      const payload = {
        subFormId: forms._id,
        resubmissionRemarksFile: files,
        resubmissionRemarksMember: userName,
        resubmissionRemarksComments: data.remarks || resubmissionComments,
      };

      console.log("Payload:", payload);

      const response = await axios.post("/api/resubmissionRemarks", payload);

      if (response.status === 201) {
        const savedResubmission = response.data;

        if (forms.status !== "Resubmission") {
          const formUpdateResponse = await axios.put("/api/forms", {
            resubmissionStatus: "Resubmission",
            status: "Initial-Result",
            id: forms._id,
          });

          if (formUpdateResponse.status === 200) {
            // Fetch REC email and send email
            try {
              const encodedRECName = encodeURIComponent(
                forms.researchEthicsCommittee.trim().toLowerCase()
              );
              const recResponse = await axios.get(
                `/api/REC?name=${encodedRECName}`
              );
              console.log("REC Response Data:", recResponse.data);
              const recList = recResponse.data.data; // Extract the data array

              const rec = recList.find(
                (rec) =>
                  rec.name.replace(/\s+/g, "").toLowerCase() ===
                  forms.researchEthicsCommittee
                    .replace(/\s+/g, "")
                    .toLowerCase()
              );

              if (rec) {
                if (!rec.email) {
                  toast.error("REC email not found.");
                  return false;
                }
              } else {
                toast.error("REC not found for the provided name.");
                return false;
              }

              // Proceed with the email sending logic
              const emailData = {
                rec: rec.email,
                name: session.user.name,
                status: forms.status,
              };

              const emailResponse = await axios.post(
                "/api/auth/send-email-resubmission-pr",
                emailData
              );
              console.log("Email Response:", emailResponse);
              if (emailResponse.status === 200) {
                toast.success("Email sent successfully!");
                props.onHide();
                return true;
              } else {
                toast.error("Failed to send email");
              }
            } catch (error) {
              console.error("Error sending email:", error);
              toast.error("Failed to send email");
            }
            toast.success("Resubmission saved successfully!");
            fetchResubmissionRemarks();
          } else {
            toast.error("Failed to update form status.");
          }
        }
      } else {
        toast.error("Failed to save resubmission remarks.");
      }
    } catch (error) {
      console.error("Error submitting resubmission remarks:", error);
      toast.error("Error submitting resubmission.");
    }
  }

  async function submitForFinalReview(data) {
    const formUpdateResponse = await axios.put("/api/forms", {
      resubmissionStatus: "Final-Review",
      status: "Final-Decision",
      id: forms._id,
    });
    if (formUpdateResponse.status === 200) {
      console.log(formUpdateResponse);
      toast.success("Form status updated to final Review");
    } else {
      console.error("Failed to update form status");
    }
  }

  const handleBack = () => {
    router.push(`/PrimaryReviewer/PRSubmissions`);
  };

  const handleChange = (e) => {
    setSelectedFile(e.target.value);
  };

  const renderFileOptions = () => {
    if (!forms || typeof forms !== "object") {
      return <option>Loading files...</option>;
    }

    const mainFiles = forms.mainFileLink || [];
    const supplementaryFiles = forms.supplementaryFileLink || [];

    const fileLinks = [
      ...mainFiles.map((file) => ({ filename: file.filename, url: file.url })),
      ...supplementaryFiles.map((file) => ({
        filename: file.filename,
        url: file.url,
      })),
    ];

    const renderResubmissionFiles = () => {
      if (!resubmission || resubmission.length === 0) {
        return null; // Return nothing if no resubmissions are available
      }

      return resubmission.map((resub, resubIndex) => {
        const resubmissionFiles = resub.resubmissionFile || [];
        if (resubmissionFiles.length > 0) {
          return (
            <optgroup
              key={`resubmission-${resubIndex}`}
              label={`Resubmission ${resubIndex + 1}`}
            >
              {resubmissionFiles.map((file, fileIndex) => (
                <option
                  key={`file-${resubIndex}-${fileIndex}`}
                  value={file.url}
                >
                  {file.filename}
                </option>
              ))}
            </optgroup>
          );
        }
        return null; // Return nothing for empty resubmissions
      });
    };

    if (fileLinks.length > 0) {
      return (
        <>
          <optgroup label="Main and Supplementary Files">
            {fileLinks.map((file, index) => (
              <option key={index} value={file.url}>
                {file.filename}
              </option>
            ))}
          </optgroup>
          {renderResubmissionFiles()}{" "}
          {/* Only render resubmission files if available */}
        </>
      );
    }

    return <option>No files available</option>;
  };

  const removeFile = (index) => {
    setResubmissionFiles((prevFiles) =>
      prevFiles.filter((_, i) => i !== index)
    );
  };

  const handleFileUploadSuccess = (res) => {
    if (res.info.format !== "pdf") {
      toast.error("Only PDF files are allowed. Please upload a PDF.");
      return;
    }

    setResubmissionFiles((prevFiles) => [
      ...prevFiles,
      { filename: res.info.original_filename, url: res.info.secure_url },
    ]);
  };

  return (
    <div className="adminpage-container">
      <div className="prnav-mobile">
        <PrNavMobile />
      </div>

      <PrNav className="prnav" />

      <div className="pr-submissions">
        <div className="adminmain-content">
          <div className="pr-header-container">
            <div className="pr-header">
              <h1>View Submission</h1>
            </div>
            <div className="userloggedin">
              <UserLoggedIn />
            </div>
          </div>

          <Row className="viewsubmission-container">
            <a href="/PrimaryReviewer/PRSubmissions" className="back-button">
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
            <select
              className="viewsub-changestatus"
              onChange={(e) => setSelectedFile(e.target.value)} // Update selectedFile state
            >
              <option value="">Select a file</option>
              {renderFileOptions()}
            </select>
            <Col xs={12} lg={8} className="viewsub-content-container">
              {selectedFile ? (
                <iframe
                  src={selectedFile}
                  width="100%"
                  height="800px"
                  title="Selected File"
                />
              ) : (
                <p>No file selected or available for rendering.</p>
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

              <span>Review Classification:</span>
              <p>{forms?.status || "No classification available"}</p>

              <div className="viewsub-remarks">
                <p>Review Remarks:</p>
                <CldUploadWidget
                  signatureEndpoint="/api/sign-cloudinary-params"
                  multiple // Allow multiple file uploads
                  onSuccess={handleFileUploadSuccess}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="form-control PIforms-formtext PIforms-file"
                    >
                      Upload Files
                    </button>
                  )}
                </CldUploadWidget>

                <div className="uploaded-files-list">
                  {resubmissionFiles.map((file, index) => (
                    <div key={index} className="file-item">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="file-link"
                        style={{ color: "blue" }}
                      >
                        {file.filename}
                      </a>
                      <button
                        type="button"
                        onClick={() => removeFile(index)} // Function to remove file from state
                        className="remove-file-button ml-2 btn btn-outline-danger btn-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <textarea
                  className="viewsub-textarea"
                  placeholder="Enter remarks here..."
                  value={resubmissionComments}
                  onChange={(e) => setResubmissionComments(e.target.value)} // Bind to state
                />
              </div>

              <div className="submissionstatus-card-remarks">
                <table className="remarks-table">
                  <thead>
                    <tr>
                      <th>Resubmission</th>
                      <th>File</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {remarksData.map((remark, index) => (
                      <tr key={index}>
                        <td>{remark.resubmissionRemarksComments}</td>
                        <td>
                          {remark.resubmissionRemarksFile &&
                          remark.resubmissionRemarksFile.length > 0 ? (
                            <a
                              href={remark.resubmissionRemarksFile[0].url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {remark.resubmissionRemarksFile[0].filename}
                            </a>
                          ) : (
                            <p>No file available</p>
                          )}
                        </td>
                        <td>
                          {new Date(
                            remark.resubmissionRemarksDate
                          ).toLocaleDateString("en-US")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="viewsub-buttons">
                {forms.status !== "Final-Decision" && (
                  <button
                    className="viewsub-save"
                    onClick={handleSubmit((data) => {
                      submitResubmissionRemarks(data);
                    })}
                  >
                    Save Changes
                  </button>
                )}
                <button className="viewsub-back" onClick={handleBack}>
                  Back
                </button>
              </div>

              <div>
                {forms.status !== "Final-Decision" && (
                  <button
                    className="viewsub-finalrec"
                    onClick={handleShowFinalReviewModal}
                  >
                    Submit to REC Chair for Final Review
                  </button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <FinalReviewModal
        show={modalShowFinalReview}
        onHide={handleCloseFinalReviewModal}
        onConfirm={handleSubmit((data) => {
          submitForFinalReview(data);
        })}
      />
      <ToastContainer />
    </div>
  );
}

export default withAuthorization(PRViewSubmission, [
  "PrimaryReviewer",
  "ExternalReviewer",
]);
