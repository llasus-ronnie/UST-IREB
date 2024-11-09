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
import { getCldImageUrl } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/router";

function SubmissionStatus({ params }) {
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [resubmissionModalShow, setResubmissionModalShow] = useState(false);

  const handleShowModal = () => setModalShow(true);
  const handleEditModal = () => setEditModalShow(true);
  const handleCloseEditModal = () => setEditModalShow(false);
  const handleCloseModal = () => setModalShow(false);
  const handleShowSubmissionModal = () => setResubmissionModalShow(true);
  const handleCloseSubmissionModal = () => setResubmissionModalShow(false);

  //unwrapping the params kasi ang arte ni nextjs
  const [unwrappedParams, setUnwrappedParams] = useState(null);

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
    },
    {
      id: "Pending-Payment",
      title: "Pending Payment",
      description:
        "This is where you need to pay the Ethical Review Fees and submit proof of payment so your research can proceed to classification. Kindly click here for the payment instructions.",
    },
    {
      id: "For-Classification",
      title: "For Classification",
      description:
        "Once proof of payment is received, your submission will move to research classification.",
    },
    {
      id: "In-Progress",
      title: "In Progress",
      description:
        "Your submission is currently with the primary reviewer for ethical review",
    },
    {
      id: "Initial-Result",
      title: "Initial Result",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: "Resubmission",
      title: "Resubmission",
      description:
        "After all revisions, your submission will be sent to the REC Chair for the final review stage.",
    },
    {
      id: "Approved",
      title: "Approved",
      description:
        "Your submission has been approved. You may now view and download the certificate of ethics review. Thank you!",
    },
  ];

  const [form, setForm] = useState(null); // Initialize form state

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

  const [isClient, setIsClient] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: session } = useSession();

  const [paymentLink, setPaymentLink] = useState(null);

  //cloudinary
  useEffect(() => {
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

    fetchPaymentFile();
  }, [form]);

  console.log("PAYMENT LINK", paymentLink);

  let url = null;
  if (paymentLink) {
    url = getCldImageUrl({
      width: 960,
      height: 600,
      src: paymentLink,
    });
  }

  if (loading) {
    return (
      <div className="center-spinner">
        <PropagateLoader color="#fcbf15" />
      </div>
    );
  } else {
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

                  <span>Review Classification:</span>
                  <p>{form?.status || "No classification available"}</p>
                </div>

                {/* Remarks */}
                <div className="submissionstatus-card-remarks">
                  <h1>Remarks</h1>
                  <div className="submissionstatus-remarks-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {form?.remarks?.length > 0 ? (
                          form.remarks.map((remark, index) => (
                            <tr key={index}>
                              <td>
                                {new Date(remark.date).toLocaleDateString(
                                  "en-US"
                                )}
                                <br />
                                {new Date(remark.date).toLocaleTimeString(
                                  "en-US"
                                )}
                              </td>
                              <td>{remark.text}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2">No remarks available.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="submissionstatus-buttons">
                  <Link
                    href={`/PrincipalInvestigator/SubmissionHistory?formId=${form?._id}`}
                    className="submissionstatus-view-sub"
                  >
                    View Submission
                  </Link>
                  <button
                    className="submissionstatus-edit-sub"
                    onClick={handleShowSubmissionModal}
                  >
                    Resubmission
                  </button>
                </div>

                {/* this will only appear when investigator reach the specific status for payment*/}
                <div className="submissionstatus-uploadproof-container">
                  <button
                    className="submissionstatus-uploadproof"
                    onClick={paymentLink ? handleEditModal : handleShowModal}
                  >
                    {paymentLink
                      ? "Edit Payment Proof"
                      : "Upload Payment Proof"}
                  </button>
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
                      <p> no payment uploaded yet </p>
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
            />

            <ResubmissionModal
              show={resubmissionModalShow}
              onHide={handleCloseSubmissionModal}
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
}

export default withAuthorization(SubmissionStatus, [
  "PrincipalInvestigator",
  "ExternalInvestigator",
]);
