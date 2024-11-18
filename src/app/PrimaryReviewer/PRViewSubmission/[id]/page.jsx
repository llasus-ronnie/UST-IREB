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

function PRViewSubmission({ params }) {
  //state variables
  const [forms, setForms] = useState([]);
  const [resubmission, setResubmission] = useState("");
  const router = useRouter();
  const [modalShowFinalReview, setModalShowFinalReview] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedFile, setSelectedFile] = useState("Main-File");
  const [remarksData, setRemarksData] = useState([]);

  const { register, handleSubmit, setValue } = useForm();

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

  useEffect(() => {
    async function fetchResubmission() {
      try {
        const response = await axios.get("/api/resubmissionFile", {
          params: {
            subFormId: forms._id,
          },
        });

        if (response.data) {
          const { resubmission1, resubmission2 } = response.data;
          setResubmission({ resubmission1, resubmission2 });
        } else {
          setResubmission(null);
        }
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
      const payload = {
        subFormId: forms._id,
        resubmissionId: fileId,
        ...data,
      };
      const response = await axios.post("/api/resubmissionRemarks", payload);
      fetchResubmissionRemarks();
      
      if (response.status===201){
        const { resubmission0, resubmission1, resubmission2 } = response.data;

        if (resubmission0 || resubmission1 || resubmission2) {
          const formUpdateResponse = await axios.put("/api/forms", {
            resubmissionStatus: "Resubmission",
          },{
            params:{id: forms._id}
          }
          );
          if (formUpdateResponse.status === 200) {
            console.log(formUpdateResponse)
          } else {
            console.error("Failed to update form status");
          }
        }
      }

      try {
        const encodedRECName = encodeURIComponent(
          forms.researchEthicsCommittee
        );
        const recResponse = await axios.get(`/api/REC?name=${encodedRECName}`);
        console.log("REC Response Data:", recResponse.data);
        const recData = recResponse.data.data; // Extract the data array

        const rec = recData.find(
          (item) =>
            item.name.trim().toLowerCase() ===
            forms.researchEthicsCommittee.trim().toLowerCase()
        ); // Find the matching REC

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
          title: forms.title,
          name: forms.fullName,
          email: forms.email,
        };

        const emailResponse = await axios.post(
          "/api/auth/send-email-remarks-pr",
          emailData
        );
        console.log("Email Response:", emailResponse);
        if (emailResponse.status === 200) {
          toast.success("Email sent successfully!");
          toast.success("Resubmission Remarks saved successfully!");
          return true;
        } else {
          toast.error("Failed to send email");
        }
      } catch (error) {
        console.error("Error sending email:", error);
        toast.error("Failed to send email");
      }

      if (response.status === 201) {
        toast.success("Resubmission Remarks saved successfully!");
      } else {
        console.error("Unexpected response status:", response.status);
        toast.error("Unexpected error. Please try again.");
      }
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
      toast.error("Error saving resubmission remarks. Please try again.");
    }
  }

  async function submitForFinalReview() {
    const formUpdateResponse = await axios.put("/api/forms", {
      resubmissionStatus: "Final-Review",
    },{
      params:{id: forms._id}
    }
    );
    if (formUpdateResponse.status === 200) {
      console.log(formUpdateResponse)
      toast.success("Form status updated to final Review");
    } else {
      console.error("Failed to update form status");
    }
  }

  //functions
  const handleBack = () => {
    router.push(`/PrimaryReviewer/PRSubmissions`);
  };

  const handleChange = (e) => {
    setSelectedFile(e.target.value);
  };

  const mainFileUrl = getCldImageUrl({
    width: 960,
    height: 600,
    src: `${forms.mainFileLink}`,
  });

  let fileUrl = "";
  let fileId = "";
  if (selectedFile === "Main-File") {
    fileUrl = mainFileUrl;
    fileId = forms._id;
  } else if (selectedFile === "Resubmission-1" && resubmission?.resubmission1) {
    fileUrl = getCldImageUrl({
      width: 960,
      height: 600,
      src: `${resubmission.resubmission1.resubmissionFile}`,
    });
    fileId = resubmission.resubmission1._id;
  } else if (selectedFile === "Resubmission-2" && resubmission?.resubmission2) {
    fileUrl = getCldImageUrl({
      width: 960,
      height: 600,
      src: `${resubmission.resubmission2.resubmissionFile}`,
    });
    fileId = resubmission.resubmission2._id;
  }

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

          <div className="pr-header-container-mobile">
            <div className="userloggedin-mobile">
              <UserLoggedIn />
            </div>
          </div>

          <Row className="viewsubmission-container">
            <a href="../PrimaryReviewer/PRSubmissions" className="back-button">
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
              value={selectedFile}
              onChange={handleChange}
            >
              <option value="Main-File">Main File</option>
              <option value="Resubmission-1">Resubmission 1</option>
              <option value="Resubmission-2">Resubmission 2</option>
            </select>
            <Col xs={12} lg={8} className="viewsub-content-container">
              {fileUrl ? (
                <iframe src={fileUrl} width="100%" height="800px"></iframe>
              ) : (
                <p>No file available for the selected option.</p>
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

              {selectedFile === "Resubmission-1" ? (
                <div className="viewsub-remarks">
                  <p>Resubmission Text:</p>
                  <p style={{ fontWeight: "normal" }}>
                    {resubmission.resubmission1?.resubmissionComments}
                  </p>
                </div>
              ) : null}

              {selectedFile === "Resubmission-2" ? (
                <div className="viewsub-remarks">
                  <p>Resubmission Text:</p>
                  <p style={{ fontWeight: "normal" }}>
                    {resubmission.resubmission2?.resubmissionComments}
                  </p>
                </div>
              ) : null}

              <div className="viewsub-remarks">
                <p>Review Remarks:</p>
                <CldUploadWidget
                  signatureEndpoint="/api/sign-cloudinary-params"
                  onSuccess={(res) => {
                    if (res.info.format !== "pdf") {
                      toast.error(
                        "Only PDF files are allowed. Please upload a PDF."
                      );
                      return;
                    }
                    setValue("resubmissionRemarksFile", res.info.secure_url);
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
              </div>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <thead>
                      <tr>
                        <th>File</th>
                        <th>Remarks</th>
                        <th>Date</th>
                        <th>Resubmission</th>
                      </tr>
                    </thead>
                  </tr>
                </thead>
                <tbody>
                  {remarksData.map((remark) => (
                    <tr key={remark._id}>
                      <td>
                        {/* Check if resubmission1 or resubmission2 is true and display accordingly */}
                        {remark.resubmission0
                          ? "First Remarks"
                          : remark.resubmission1
                          ? "Resubmission 1"
                          : remark.resubmission2
                          ? "Resubmission 2"
                          : "No Resubmission"}
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

              <div className="viewsub-buttons">
                <button
                  className="viewsub-save"
                  onClick={handleSubmit((data) => {
                    submitResubmissionRemarks(data);
                  })}
                >
                  Save Changes
                </button>
                <button className="viewsub-back" onClick={handleBack}>
                  Back
                </button>
              </div>

              <div
                className="viewsub-finalrec"
                onClick={handleShowFinalReviewModal}
              >
                <button
                onClick={submitForFinalReview}
                >Submit to REC Chair for Final Review</button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <FinalReviewModal
        show={modalShowFinalReview}
        onHide={handleCloseFinalReviewModal}
      />
      <ToastContainer />
    </div>
  );
}

export default withAuthorization(PRViewSubmission, [
  "PrimaryReviewer",
  "ExternalReviewer",
]);
