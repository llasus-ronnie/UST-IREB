"use client";

import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  FormLabel,
  FormSelect,
  FormControl,
} from "react-bootstrap";
import "../../../styles/forms/Forms.css";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";

//components
import Navbar from "../../../components/navbar/Navbar";
import RemoveConfirmationModal from "../../../components/modals/RemoveConfirmationModal";

export default function EditForms() {
  const [forms, setForms] = useState({
    mainFileLink: [],
    supplementaryFileLink: [],
  });
  const [mainFiles, setMainFiles] = useState([]);
  const [supplementaryFiles, setSupplementaryFiles] = useState([]);
  const [editingFileIndex, setEditingFileIndex] = useState(null);
  const [editingSupplementaryFileIndex, setEditingSupplementaryFileIndex] =
    useState(null);
  const [newMainFiles, setNewMainFiles] = useState([]);
  const [newSupplementaryFiles, setNewSupplementaryFiles] = useState([]);
  const { data: session } = useSession();
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...forms,
    },
  });

  const [subformId, setSubformId] = useState(null);

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/");
    const id = pathSegments[pathSegments.length - 1];
    setSubformId(id);
  }, []);

  useEffect(() => {
    if (!subformId) return;

    async function getForms() {
      try {
        const response = await axios.get("/api/forms", {
          params: { subformId: subformId },
        });
        const userForms = response.data.forms;
        setForms(userForms[0]);
      } catch (error) {
        toast.error("Error fetching data:", error);
      }
    }

    getForms();
  }, [subformId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForms((prevForms) => ({
      ...prevForms,
      [name]: value,
    }));
  };

  const handleResearcherChange = (e, index) => {
    const { name, value } = e.target;
    const updatedResearchers = [...forms.additionalResearchers];
    updatedResearchers[index] = {
      ...updatedResearchers[index],
      [name]: value,
    };
    setForms((prevForms) => ({
      ...prevForms,
      additionalResearchers: updatedResearchers,
    }));
  };

  const handleFileUploadSuccess = (res, index, fileType) => {
    const fileUrl = res.info.secure_url;
    const fileName = res.info.original_filename;

    if (fileType === "main") {
      setForms((prev) => {
        const updatedFiles = [...prev.mainFileLink];
        updatedFiles[index] = { url: fileUrl, filename: fileName };
        return { ...prev, mainFileLink: updatedFiles };
      });
      toast.success("Main file replaced successfully.");
    } else if (fileType === "supplementary") {
      setForms((prev) => {
        const updatedFiles = [...prev.supplementaryFileLink];
        updatedFiles[index] = { url: fileUrl, filename: fileName };
        return { ...prev, supplementaryFileLink: updatedFiles };
      });
      toast.success("Supplementary file replaced successfully.");
    }

    setEditingFileIndex(null);
    setEditingSupplementaryFileIndex(null);
  };

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [fileToRemoveIndex, setFileToRemoveIndex] = useState(null);
  const [fileTypeToRemove, setFileTypeToRemove] = useState(null);
  const [isNewFile, setIsNewFile] = useState(false);

  const handleRemoveFile = (index, fileType) => {
    setFileToRemoveIndex(index);
    setFileTypeToRemove(fileType);
    setIsNewFile(false);
    setShowRemoveModal(true);
  };

  const handleRemoveNewFile = (index, fileType) => {
    setFileToRemoveIndex(index);
    setFileTypeToRemove(fileType);
    setIsNewFile(true);
    setShowRemoveModal(true);
  };

  const confirmRemoveFile = () => {
    if (isNewFile) {
      if (fileTypeToRemove === "main") {
        setNewMainFiles((prevFiles) =>
          prevFiles.filter((_, i) => i !== fileToRemoveIndex)
        );
        toast.info("New main file removed.");
      } else if (fileTypeToRemove === "supplementary") {
        setNewSupplementaryFiles((prevFiles) =>
          prevFiles.filter((_, i) => i !== fileToRemoveIndex)
        );
        toast.info("New supplementary file removed.");
      }
    } else {
      if (fileTypeToRemove === "main") {
        setForms((prevForms) => {
          const updatedMainFiles = prevForms.mainFileLink.filter(
            (_, i) => i !== fileToRemoveIndex
          );
          return {
            ...prevForms,
            mainFileLink: updatedMainFiles,
          };
        });
        toast.info("Main file removed.");
      } else if (fileTypeToRemove === "supplementary") {
        setForms((prevForms) => {
          const updatedSupplementaryFiles =
            prevForms.supplementaryFileLink.filter(
              (_, i) => i !== fileToRemoveIndex
            );
          return {
            ...prevForms,
            supplementaryFileLink: updatedSupplementaryFiles,
          };
        });
        toast.info("Supplementary file removed.");
      }
    }
    setShowRemoveModal(false);
    setFileToRemoveIndex(null);
    setFileTypeToRemove(null);
    setIsNewFile(false);
  };

  const handleAddFile = (result, fileType) => {
    const newFile = {
      url: result?.info?.secure_url,
      filename: result?.info?.original_filename,
    };

    if (fileType === "main") {
      setMainFiles((prevFiles) => [...prevFiles, newFile]);
      setNewMainFiles((prevNewFiles) => [...prevNewFiles, newFile]);
      toast.success("Main file added.");
    } else if (fileType === "supplementary") {
      setSupplementaryFiles((prevFiles) => [...prevFiles, newFile]);
      setNewSupplementaryFiles((prevNewFiles) => [...prevNewFiles, newFile]);
      toast.success("Supplementary file added.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      id: forms._id,
      mainFileLink: [
        ...forms.mainFileLink,
        ...newMainFiles.map((file) => ({
          url: file.url,
          filename: file.filename,
        })),
      ],
      supplementaryFileLink: [
        ...forms.supplementaryFileLink,
        ...newSupplementaryFiles.map((file) => ({
          url: file.url,
          filename: file.filename,
        })),
      ],
    };
    try {
      const response = await axios.put("/api/forms", formData);
      console.log(response);
      toast.success("Form updated successfully");
      console.log("Received formData:", formData);
    } catch (error) {
      toast.error("Error updating form:", error);
    }
  };

  return (
    <div>
      <div className="header">
        <Navbar />
      </div>
      <Container className="PIforms-cont1">
        <Row className="justify-content-center">
          <h1 className="PIforms-header">Edit Your Proposal</h1>
        </Row>

        {/* //Reseach Classification */}
        <Container className="PIforms-rescont">
          <Row>
            <h1 className="PIforms-resconthead">Research Classification</h1>
          </Row>
          <Col>
            <p className="PIforms-formtext">
              <strong>Institution:</strong>
              <input
                type="text"
                name="institution"
                value={forms.institution || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Research Ethics Committee:</strong>
              <input
                type="text"
                name="researchEthicsCommittee"
                value={forms.researchEthicsCommittee || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
          </Col>
        </Container>

        {/* //Primary Researcher */}
        <Container className="PIforms-rescont">
          <Row>
            <h1 className="PIforms-resconthead">Primary Researcher</h1>
          </Row>

          <Col>
            <p className="PIforms-formtext">
              <strong>Full Name:</strong>
              <input
                type="text"
                name="fullName"
                value={forms.fullName || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Email:</strong>
              <input
                type="email"
                name="email"
                value={forms.email || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Phone:</strong>
              <input
                type="text"
                name="phone"
                value={forms.phone || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Institution Affiliation:</strong>
              <input
                type="text"
                name="institutionAffiliation"
                value={forms.institutionAffiliation || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
          </Col>
        </Container>

        {/* //Additional Researchers */}
        {forms.additionalResearchers &&
          forms.additionalResearchers.length > 0 && (
            <Container className="PIforms-rescont">
              {forms.additionalResearchers.map((researcher, index) => (
                <Row key={index}>
                  <h1 className="PIforms-resconthead">
                    Researcher {index + 1}
                  </h1>
                  <Col>
                    <p className="PIforms-formtext">
                      <strong>Full Name:</strong>
                      <input
                        type="text"
                        name="additionalFullName"
                        value={researcher.additionalFullName || ""}
                        onChange={(e) => handleResearcherChange(e, index)}
                        className="form-control"
                      />
                    </p>
                    <p className="PIforms-formtext">
                      <strong>Email:</strong>
                      <input
                        type="email"
                        name="additionalEmail"
                        value={researcher.additionalEmail || ""}
                        onChange={(e) => handleResearcherChange(e, index)}
                        className="form-control"
                      />
                    </p>
                    <p className="PIforms-formtext">
                      <strong>Phone:</strong>
                      <input
                        type="text"
                        name="additionalPhone"
                        value={researcher.additionalPhone || ""}
                        onChange={(e) => handleResearcherChange(e, index)}
                        className="form-control"
                      />
                    </p>
                    <p className="PIforms-formtext">
                      <strong>Institution Affiliation:</strong>
                      <input
                        type="text"
                        name="additionalInstitutionAffiliation"
                        value={
                          researcher.additionalInstitutionAffiliation || ""
                        }
                        onChange={(e) => handleResearcherChange(e, index)}
                        className="form-control"
                      />
                    </p>
                  </Col>
                </Row>
              ))}
            </Container>
          )}

        {/* //Research Details */}
        <Container className="PIforms-rescont">
          <Row>
            <h1 className="PIforms-resconthead">Research Details</h1>
          </Row>
          <Col>
            <p className="PIforms-formtext">
              <strong>Title:</strong>
              <input
                type="text"
                name="title"
                value={forms.title || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Background:</strong>
              <textarea
                name="background"
                value={forms.background || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Objectives:</strong>
              <textarea
                name="objectives"
                value={forms.objectives || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Expected Outcomes:</strong>
              <textarea
                name="expectedOutcomes"
                value={forms.expectedOutcomes || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Keywords:</strong>
              <input
                type="text"
                name="keywords"
                value={forms.keywords || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Study Type:</strong>
              <input
                type="text"
                name="studyType"
                value={forms.studyType || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Start Date:</strong>
              <input
                type="date"
                name="startDate"
                value={forms.startDate || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>End Date:</strong>
              <input
                type="date"
                name="endDate"
                value={forms.endDate || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Primary Sponsor:</strong>
              <input
                type="text"
                name="primarySponsor"
                value={forms.primarySponsor || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Secondary Sponsor:</strong>
              <input
                type="text"
                name="secondarySponsor"
                value={forms.secondarySponsor || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Multi-Country Research:</strong>
              <input
                type="checkbox"
                name="multiCountryResearch"
                checked={forms.multiCountryResearch || false}
                onChange={(e) => handleChange(e, "multiCountryResearch")}
                className="form-check-input"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Multi-Site Research:</strong>
              <input
                type="checkbox"
                name="multiSiteResearch"
                checked={forms.multiSiteResearch || false}
                onChange={(e) => handleChange(e, "multiSiteResearch")}
                className="form-check-input"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Region:</strong>
              <input
                type="text"
                name="region"
                value={forms.region || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Research Field:</strong>
              <input
                type="text"
                name="researchField"
                value={forms.researchField || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Involves Human Subjects:</strong>
              <input
                type="checkbox"
                name="involvesHumanSubjects"
                checked={forms.involvesHumanSubjects || false}
                onChange={(e) => handleChange(e, "involvesHumanSubjects")}
                className="form-check-input"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Proposal Type:</strong>
              <input
                type="text"
                name="proposalType"
                value={forms.proposalType || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Data Collection:</strong>
              <input
                type="text"
                name="dataCollection"
                value={forms.dataCollection || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Proposal Reviewed By Other Committee:</strong>
              <input
                type="checkbox"
                name="proposalReviewedByOtherCommittee"
                checked={forms.proposalReviewedByOtherCommittee || false}
                onChange={(e) =>
                  handleChange(e, "proposalReviewedByOtherCommittee")
                }
                className="form-check-input"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Monetary Source:</strong>
              <input
                type="text"
                name="monetarySource"
                value={forms.monetarySource1 || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Amount in PHP:</strong>
              <input
                type="number"
                name="amountInPHP"
                value={forms.amountInPHP || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Other Source:</strong>
              <input
                type="text"
                name="otherSource"
                value={forms.otherSource || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
          </Col>
        </Container>

        {/* //Sources of monetrary/material support */}
        <Container className="PIforms-rescont">
          <Row>
            <h1 className="PIforms-resconthead">
              Sources of Monetary or Material Support
            </h1>
          </Row>
          <Col>
            <p className="PIforms-formtext">
              <strong>Monetary Source:</strong>
              <input
                type="text"
                name="monetarySource"
                value={forms.monetarySource2 || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
            <p className="PIforms-formtext">
              <strong>Amount in Philippines Peso (Php):</strong>
              <input
                type="number"
                name="amountInPHP"
                value={forms.amountInPHP || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
          </Col>
        </Container>

        {/* //Assessment Questionaire*/}
        <Container className="PIforms-rescont">
          <Row>
            <h1 className="PIforms-resconthead">Assessment Questionnaire</h1>
          </Row>
          <Col>
            <Table className="PIforms-table" striped>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Response</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Does the proposed research include research subjects whose
                    identity may be revealed?
                  </td>
                  <td>
                    <select
                      value={forms.identity}
                      onChange={(e) => handleChange("identity", e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Is the subject unable to consent?</td>
                  <td>
                    <select
                      value={forms.consent}
                      onChange={(e) => handleChange("consent", e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Is the subject under 18 years old?</td>
                  <td>
                    <select
                      value={forms.under18}
                      onChange={(e) => handleChange("under18", e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    Is the subject in a dependent relationship with any of the
                    research team?
                  </td>
                  <td>
                    <select
                      value={forms.dependent}
                      onChange={(e) =>
                        handleChange("dependent", e.target.value)
                      }
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Is the subject from an ethnic minority group?</td>
                  <td>
                    <select
                      value={forms.ethnic}
                      onChange={(e) => handleChange("ethnic", e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    Does the subject have an intellectual or mental impairment?
                  </td>
                  <td>
                    <select
                      value={forms.intellectual}
                      onChange={(e) =>
                        handleChange("intellectual", e.target.value)
                      }
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Is the subject pregnant?</td>
                  <td>
                    <select
                      value={forms.pregnant}
                      onChange={(e) => handleChange("pregnant", e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    Does the research include a new treatment, medical procedure
                    or test?
                  </td>
                  <td>
                    <select
                      value={forms.treatment}
                      onChange={(e) =>
                        handleChange("treatment", e.target.value)
                      }
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    Does the research involve the collection of biological
                    samples including tissue extraction?
                  </td>
                  <td>
                    <select
                      value={forms.biological}
                      onChange={(e) =>
                        handleChange("biological", e.target.value)
                      }
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Does the research use ionizing radiation?</td>
                  <td>
                    <select
                      value={forms.radiation}
                      onChange={(e) =>
                        handleChange("radiation", e.target.value)
                      }
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    Does the research cause pain or psychological distress?
                  </td>
                  <td>
                    <select
                      value={forms.distress}
                      onChange={(e) => handleChange("distress", e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Does the research include inducements?</td>
                  <td>
                    <select
                      value={forms.inducements}
                      onChange={(e) =>
                        handleChange("inducements", e.target.value)
                      }
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    Does the research involve the collection of sensitive
                    information?
                  </td>
                  <td>
                    <select
                      value={forms.sensitive}
                      onChange={(e) =>
                        handleChange("sensitive", e.target.value)
                      }
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Does the research include deception?</td>
                  <td>
                    <select
                      value={forms.deception}
                      onChange={(e) =>
                        handleChange("deception", e.target.value)
                      }
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    Does the research involve assisted reproductive technology?
                  </td>
                  <td>
                    <select
                      value={forms.reproductive}
                      onChange={(e) =>
                        handleChange("reproductive", e.target.value)
                      }
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    Does the research involve human genetic or genomic studies?
                  </td>
                  <td>
                    <select
                      value={forms.genetic}
                      onChange={(e) => handleChange("genetic", e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Does the research involve stem cell research?</td>
                  <td>
                    <select
                      value={forms.stemcell}
                      onChange={(e) => handleChange("stemcell", e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Are there any biosafety issues?</td>
                  <td>
                    <select
                      value={forms.biosafety}
                      onChange={(e) =>
                        handleChange("biosafety", e.target.value)
                      }
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Container>

        {/* //Potential Risks */}
        <Container className="PIforms-rescont">
          <Row>
            <h1 className="PIforms-resconthead">Potential Risks</h1>
          </Row>
          <Col>
            <p className="PIforms-formtext">
              <strong>Level of Risk Involved:</strong>
              <input
                type="text"
                name="riskLevel"
                value={forms.riskLevel || ""}
                onChange={handleChange}
                className="form-control"
              />
            </p>
          </Col>

          <Row>
            <h1 className="PIforms-resconthead">Risks apply to</h1>
          </Row>
          <Col>
            <Table className="PIforms-table" striped>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Response</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Research Team:</td>
                  <td>
                    <input
                      type="checkbox"
                      name="researchTeam"
                      checked={forms.researchTeam || false}
                      onChange={(e) => handleChange(e, "researchTeam")}
                      className="form-check-input"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Research Subjects:</td>
                  <td>
                    <input
                      type="checkbox"
                      name="researchSubjects"
                      checked={forms.researchSubjects || false}
                      onChange={(e) => handleChange(e, "researchSubjects")}
                      className="form-check-input"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Wider Community:</td>
                  <td>
                    <input
                      type="checkbox"
                      name="widerCommunity"
                      checked={forms.widerCommunity || false}
                      onChange={(e) => handleChange(e, "widerCommunity")}
                      className="form-check-input"
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Container>

        {/* //Potential Benefits */}
        <Container className="PIforms-rescont">
          <Row>
            <h1 className="PIforms-resconthead">Potential Benefits:</h1>
          </Row>
          <Col>
            <Table className="PIforms-table" striped>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Response</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Multi-institutional Project:</td>
                  <td>
                    <input
                      type="text"
                      name="multiInstitutional"
                      value={forms.multiInstitutional || ""}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Conflict of Interest:</td>
                  <td>
                    <input
                      type="text"
                      name="conflictInterest"
                      value={forms.conflictInterest || ""}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Direct benefit from participants:</td>
                  <td>
                    <input
                      type="checkbox"
                      name="benefitParticipants"
                      checked={forms.benefitParticipants || false}
                      onChange={(e) => handleChange(e, "benefitParticipants")}
                      className="form-check-input"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    Generalizable knowledge about participants’ condition or
                    disorder:
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="generalizableKnowledge"
                      checked={forms.generalizableKnowledge || false}
                      onChange={(e) =>
                        handleChange(e, "generalizableKnowledge")
                      }
                      className="form-check-input"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    Generalizable knowledge about diseases or condition under
                    study:
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="generalizableKnowledgeDisease"
                      checked={forms.generalizableKnowledgeDisease || false}
                      onChange={(e) =>
                        handleChange(e, "generalizableKnowledgeDisease")
                      }
                      className="form-check-input"
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Container>

        {/* Files Section */}
        <Container className="PIforms-rescont">
          <Row>
            <h1 className="PIforms-resconthead">Files:</h1>
          </Row>
          <Col>
            <Container className="PIforms-cont1">
              <Container className="PIforms-rescont3">
                <Row>
                  <FormLabel className="PIforms-formtext">File Type</FormLabel>
                  <FormSelect
                    {...register("mainFile", {
                      required: "Please select a file type.",
                    })}
                    className="form-control PIforms-formtext"
                    isInvalid={!!errors.mainFile}
                    onChange={handleChange}
                  >
                    <option disabled value="">
                      Choose...
                    </option>
                    <option value="Protocol">Application Forms</option>
                  </FormSelect>
                  <Form.Control.Feedback type="invalid">
                    {errors.mainFile?.message}
                  </Form.Control.Feedback>

                  <FormLabel className="PIforms-formtext">
                    Select File:
                  </FormLabel>
                </Row>

                {/* main files */}
                <Row>
                  {forms.mainFileLink && forms.mainFileLink.length > 0 && (
                    <div className="uploaded-files">
                      <CldUploadWidget
                        signatureEndpoint="/api/sign-cloudinary-params"
                        onSuccess={(result) => handleAddFile(result, "main")}
                      >
                        {({ open }) => (
                          <button
                            type="button"
                            onClick={() => open()}
                            className="form-control PIforms-formtext PIforms-file"
                          >
                            Add Main File
                          </button>
                        )}
                      </CldUploadWidget>
                      <h4 className="PIforms-formtext">New Main Files:</h4>
                      <ul>
                        {newMainFiles.map((file, index) => (
                          <li
                            className="PIforms-formtext d-flex justify-content-between"
                            key={index}
                          >
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary"
                            >
                              {file.filename}
                            </a>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="ml-2"
                              onClick={() => handleRemoveNewFile(index, "main")}
                            >
                              Remove
                            </Button>
                          </li>
                        ))}
                      </ul>

                      <h4 className="PIforms-formtext">Existing Main Files:</h4>
                      <ul>
                        <div
                          className="PIforms-formtext"
                          style={{ width: "100%" }}
                        >
                          {forms.mainFileLink.map((file, index) => (
                            <Row key={file._id || index} className="py-2">
                              <Col>
                                <a
                                  href={file.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary"
                                >
                                  {file.filename || "No Name Available"}
                                </a>
                              </Col>
                              <Col className="d-flex justify-content-end align-items-center">
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  className="ml-2"
                                  onClick={() => setEditingFileIndex(index)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  className="ml-2"
                                  onClick={() =>
                                    handleRemoveFile(index, "main")
                                  }
                                >
                                  Remove
                                </Button>
                              </Col>
                            </Row>
                          ))}
                        </div>
                      </ul>
                    </div>
                  )}

                  {editingFileIndex !== null && (
                    <CldUploadWidget
                      signatureEndpoint="/api/sign-cloudinary-params"
                      multiple={false} // Only one file at a time
                      onSuccess={(res) =>
                        handleFileUploadSuccess(res, editingFileIndex, "main")
                      }
                    >
                      {({ open }) => (
                        <button
                          type="button"
                          onClick={() => open()}
                          className="form-control PIforms-formtext PIforms-file"
                        >
                          Replace File
                        </button>
                      )}
                    </CldUploadWidget>
                  )}
                </Row>
              </Container>

              {/* Supplementary Files Section */}
              <Row className="justify-content-center">
                <h1 className="PIforms-header">
                  Uploading of Supplementary Materials
                </h1>
              </Row>

              <Container className="PIforms-rescont3">
                <Row>
                  <FormLabel className="PIforms-formtext">File Type:</FormLabel>
                  <FormSelect
                    {...register("supplementaryFileType", {
                      required: "Please select a file type.",
                    })}
                    isInvalid={!!errors.supplementaryFileLink}
                    onChange={handleChange}
                    className="PIforms-formtext"
                  >
                    <option disabled value="">
                      Choose...
                    </option>
                    <option value="Supplementary Files">
                      Supplementary Files
                    </option>
                  </FormSelect>

                  <FormLabel className="PIforms-formtext">
                    Select File:
                  </FormLabel>
                </Row>

                {/* Supplementary files */}
                <Row>
                  {forms.supplementaryFileLink &&
                    forms.supplementaryFileLink.length > 0 && (
                      <div className="uploaded-files">
                        <CldUploadWidget
                          signatureEndpoint="/api/sign-cloudinary-params"
                          onSuccess={(result) =>
                            handleAddFile(result, "supplementary")
                          }
                        >
                          {({ open }) => (
                            <button
                              type="button"
                              onClick={() => open()}
                              className="form-control PIforms-formtext PIforms-file"
                            >
                              Add Supplementary File
                            </button>
                          )}
                        </CldUploadWidget>

                        <h4 className="PIforms-formtext">
                          New Supplementary Files:
                        </h4>
                        <ul>
                          {newSupplementaryFiles.map((file, index) => (
                            <li
                              className="PIforms-formtext d-flex justify-content-between"
                              key={index}
                            >
                              <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary"
                              >
                                {file.filename}
                              </a>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                className="ml-2"
                                onClick={() =>
                                  handleRemoveNewFile(index, "supplementary")
                                }
                              >
                                Remove
                              </Button>
                            </li>
                          ))}
                        </ul>

                        <h4 className="PIforms-formtext">
                          Existing Supplementary Files:
                        </h4>
                        <ul>
                          <div
                            className="PIforms-formtext"
                            style={{ width: "100%" }}
                          >
                            {forms.supplementaryFileLink.map((file, index) => (
                              <Row key={file._id || index} className="py-2">
                                <Col>
                                  <a
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary"
                                  >
                                    {file.filename || "No Name Available"}
                                  </a>
                                </Col>
                                <Col className="d-flex justify-content-end align-items-center">
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="ml-2"
                                    onClick={() =>
                                      setEditingSupplementaryFileIndex(index)
                                    }
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="ml-2"
                                    onClick={() =>
                                      handleRemoveFile(index, "supplementary")
                                    }
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              </Row>
                            ))}
                          </div>
                        </ul>
                      </div>
                    )}

                  {editingSupplementaryFileIndex !== null && (
                    <CldUploadWidget
                      signatureEndpoint="/api/sign-cloudinary-params"
                      multiple={false}
                      onSuccess={(res) =>
                        handleFileUploadSuccess(
                          res,
                          editingSupplementaryFileIndex,
                          "supplementary"
                        )
                      }
                    >
                      {({ open }) => (
                        <button
                          type="button"
                          onClick={() => open()}
                          className="form-control PIforms-formtext PIforms-file"
                        >
                          Replace File
                        </button>
                      )}
                    </CldUploadWidget>
                  )}
                </Row>
              </Container>
            </Container>
          </Col>
        </Container>

        <Row
          style={{ marginTop: "20px", paddingBottom: "20px" }}
          className="justify-content-around"
        >
          <Button
            variant="outline-secondary"
            className="PIforms-formbtn"
            href={`/PrincipalInvestigator/SubmissionStatus/${forms._id}`}
          >
            Back to your submission
          </Button>
          <Button
            variant="outline-warning"
            className="PIforms-formbtn"
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </Row>
      </Container>

      <ToastContainer />

      <RemoveConfirmationModal
        show={showRemoveModal}
        onHide={() => setShowRemoveModal(false)}
        onConfirm={confirmRemoveFile}
      />
    </div>
  );
}
