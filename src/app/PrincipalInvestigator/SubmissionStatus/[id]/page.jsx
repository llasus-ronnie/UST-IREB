"use client";

import "../../../styles/submissionstatus/SubmissionStatus.css";
import { Row, Col } from "react-bootstrap";
import Navbar from "../../../components/navbar/Navbar";
import StatusBreadcrumbs from "../../../components/statusbreadcrumbs/StatusBreadcrumbs";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
import UploadPaymentProofModal from "../../../components/modals/UploadPaymentProofModal.jsx";
import EditPaymentModal from "../../../components/modals/EditPaymentProofModal.jsx";
import ResubmissionModal from "../../../components/modals/ResubmissionModal.jsx";

import withAuthorization from "../../../../hoc/withAuthorization";
import { useSession, getSession } from "next-auth/react";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";

function SubmissionStatus({ params }) {
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [resubmissionModalShow, setResubmissionModalShow] = useState(false);
  const [status, setStatus] = useState(null);
  const [remarksData, setRemarksData] = useState([]);
  const [resubmission, setResubmission] = useState("");

  const handleShowModal = () => setModalShow(true);
  const handleEditModal = () => setEditModalShow(true);
  const handleCloseEditModal = () => setEditModalShow(false);
  const handleCloseModal = () => setModalShow(false);
  const handleShowSubmissionModal = () => setResubmissionModalShow(true);
  const handleCloseSubmissionModal = () => setResubmissionModalShow(false);

  //unwrapping the params kasi ang arte ni nextjs
  const [unwrappedParams, setUnwrappedParams] = useState(null);
  const [form, setForm] = useState(null);
  const [isClient, setIsClient] = useState(null);
  const [paymentLink, setPaymentLink] = useState(null);
  const [remarksFile, setRemarksFile] = useState();

  useEffect(() => {
    params
      .then((resolvedParams) => {
        setUnwrappedParams(resolvedParams);
      })
      .catch((error) => {
        console.error("Error unwrapping params:", error);
      });
  }, [params]);

  const steps = [
    {
      id: "Initial-Submission",
      title: "Initial Submission",
      description:
        "Your initial submission will be reviewed to see if all requirements are complete or if any revisions are needed before proceeding.",
        remarks: form?.initialSubmission === "Incomplete"
        ? `${form?.initialSubmission}, kindly review the remarks on the table. The edit forms button is open for you to edit your current submission and resubmit your initial requirements. Thank you`
        : `${form?.initialSubmission}`, 
    },
    {
      id: "Pending-Payment",
      title: "Pending Payment",
      description: (
        <>
          This is where you need to pay the Ethical Review Fees and submit proof
          of payment so your research can proceed to classification. Kindly
          click{" "}
          <a
            href="/faqs"
            style={{ textDecoration: "none" }}
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          >
            here
          </a>{" "}
          for the payment instructions.
        </>
      ),
    },
    {
      id: "For-Classification",
      title: "For Classification",
      description:
        "Once proof of payment is received, your submission will move to research classification.",
      remarks: `${"Your form is: ", form?.classification}`
    },
    {
      id: "In-Progress",
      title: "In Progress",
      description:
        "Your submission is currently with the primary reviewer for ethical review.",
    },
    {
      id: "Initial-Result",
      title: "Initial Result",
      description:
        "Your submission has been reviewed, and an initial result has been determined. Please check the remarks for further details and next steps.",
    },
    {
      id: "Resubmission",
      title: "Resubmission",
      description:
        "Revisions are required based on the reviewer’s feedback. Kindly check the remarks for details, submit the updates, and await your primary reviewer’s response.",
    },
    {
      id: "Final-Decision",
      title: "Final Decision",
      description:
        "Once all revisions are complete, your submission will be forwarded to the REC Chair for the final review. You will be notified of the final decision shortly thereafter in the remarks section. Thank you!",
    },
  ];

  //GET Form
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(`/api/forms/${unwrappedParams.id}`);
        setForm(response.data.submission);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch form details.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [unwrappedParams]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  //GET Payment
  async function fetchPaymentFile() {
    if (form && form._id) {
      try {
        const response = await axios.get(`/api/payment`, {
          params: { formId: form._id },
        });
        console.log("GET FOR PAYMENT FILE?", response.data);
        setPaymentLink(response.data.payment?.paymentFile);
      } catch (error) {
        console.error("Error fetching payment file:", error);
      }
    }
  }

  useEffect(() => {
    fetchPaymentFile();
  }, [form]);

  //GET remarks
  useEffect(() => {
    async function getRemarks() {
      try {
        const response = await axios.get(`/api/remarks/`, {
          params: { subFormId: form._id },
        });
        setRemarksFile(response.data.remarksData);
        setStatus(form.status);
        console.log("All data:", response.data.remarksData);
      } catch (error) {
        console.error("Error fetching remarks file:", error);
      }
    }
    getRemarks();
  }, [form]);

  //GET Resubmission Remarks
  useEffect(() => {
    const fetchResubmissionRemarks = async () => {
      try {
        const response = await axios.get("/api/resubmissionRemarks", {
          params: {
            subFormId: form._id,
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

    fetchResubmissionRemarks();
  }, [form]);

  //GET Resubmission File
  useEffect(() => {
    async function fetchResubmission() {
      try {
        const response = await axios.get("/api/resubmissionFile", {
          params: {
            subFormId: form._id,
          },
        });

        if (response.data) {
          const { resubmission1, resubmission2, resubmission3 } = response.data;
          setResubmission({ resubmission1, resubmission2, resubmission3 });
        } else {
          setResubmission(null);
        }
      } catch (error) {
        console.error("Failed to fetch resubmission:", error);
      }
    }

    fetchResubmission();
  }, [form]);

  let url = null;
  if (paymentLink) {
    url = getCldImageUrl({
      width: 960,
      height: 600,
      src: paymentLink,
    });
  }

  return (
    <>
      {isClient && (
        <>
          <div className="header">
            <Navbar />
          </div>

          <div style={{ paddingTop: "2em" }} className="submission_header">
            <h1 className="text-center">Submission Status</h1>
          </div>
          <Row className="submission-divider" />

          <Row className="submissionstatus-container">
            <a href="../SubmissionList" className="back-button">
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
              Go Back to My Submissions List
            </a>
            <Col className="submissionstatus-left">
              {/* Details */}
              <div className="submissionstatus-card-details">
                <h1>Submission Details</h1>

                <span>Research Title:</span>
                <p>{form?.title || "No title available"}</p>

                <span>Date of Submission:</span>
                <p>
                  {form?.date
                    ? new Date(form.date).toLocaleDateString("en-US")
                    : "No date available"}
                </p>

                <span>Submission Status:</span>
                <p>{form?.status || "No classification available"}</p>

                {/* hide ko muna pero dito ung expedited, exempted, full board */}
                {/* <span>Review Classification:</span>
                <p>{form?.classification || "No classification available"}</p> */}
              </div>

              {/* Remarks */}
              <div className="submissionstatus-card-remarks">
                <h1>Remarks</h1>
                <div className="submissionstatus-remarks-table">
                  {/* <iframe src={remarksUrl} className="submissionstatus-iframe" /> */}
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Remarks File</th>
                        <th> Comments </th>
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
                            <td>{remark.remarksComment}</td>
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
              </div>
              {form?.initialSubmission === "Incomplete" && form?._id? (
                <Link href={`/PrincipalInvestigator/EditSubmission/${form._id}`} passHref>
                  <button className="submissionstatus-buttons submissionstatus-edit-form">Edit</button>
                </Link>
              ): null}

              <div className="submissionstatus-buttons">
                {form?.status === "Initial-Result" ? (
                  <button
                    className="submissionstatus-edit-sub"
                    onClick={handleShowSubmissionModal}
                  >
                    Resubmission
                  </button>
                ) : null}
              </div>

              {/* this will only appear when investigator reach the specific status for payment*/}
              <div className="submissionstatus-uploadproof-container">
                {form?.status === "Pending-Payment" ? (
                  <button
                    className="submissionstatus-uploadproof"
                    onClick={paymentLink ? handleEditModal : handleShowModal}
                  >
                    {paymentLink ? "Edit Payment Proof" : "Upload Payment Proof"}
                  </button>
                ) : null
                }
                <div className="submissionstatus-paymentfile">
                  <p>Uplaoded File:</p>
                  {url ? (
                    <Image
                      src={url}
                      alt="Payment File"
                      width={200}
                      height={200}
                    />
                  ) : (
                    <p> No payment uploaded yet. </p>
                  )}
                </div>
              </div>
            </Col>

            <Col className="submissionstatus-right">
              <div className="submissionstatus-card-breadcrumbs">
                <h1 className="submissionstatus-card-title">
                  Track Status of Submission
                </h1>
                <StatusBreadcrumbs steps={steps} params={unwrappedParams} />
              </div>
            </Col>
          </Row>

          <UploadPaymentProofModal
            show={modalShow}
            onHide={handleCloseModal}
            submissionparams={unwrappedParams}
            onDataChange={fetchPaymentFile}
          />

          <ResubmissionModal
            show={resubmissionModalShow}
            onHide={handleCloseSubmissionModal}
            subFormId={unwrappedParams}
            submissionparams={unwrappedParams}
          />

          <EditPaymentModal
            show={editModalShow}
            onHide={handleCloseEditModal}
            submissionparams={unwrappedParams}
          />
        </>
      )}
    </>
  );
}

export default withAuthorization(SubmissionStatus, [
  "PrincipalInvestigator",
  "ExternalInvestigator",
]);
