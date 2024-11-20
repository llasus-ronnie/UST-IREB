"use client";

import {
    Container, Row, Col, Button, Table, Form,
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



export default function EditForms() {
    const [forms, setForms] = useState({
        mainFileLink: [],
        supplementaryFileLink: [],
    });
    const [mainFiles, setMainFiles] = useState([]);
    const [supplementaryFiles, setSupplementaryFiles] = useState([]);
    const [mainFileNames, setMainFileNames] = useState([]);
    const [supplementaryFileNames, setSupplementaryFileNames] = useState([]);

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



    // GET Forms
    useEffect(() => {
        async function getForms() {
            try {
                const response = await axios.get("/api/forms", {
                    params: { userEmail: session.user.email },
                });
                const userForms = response.data.forms;
                setForms(userForms[0]); // Assuming you get an array, set the first form
            } catch (error) {
                toast.error("Error fetching data:", error);
            }
        }
        if (session?.user?.email) {
            getForms();
        }
    }, [session]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            ...forms,
            mainFileLink: mainFiles.length > 0 ? mainFiles : [],
            supplementaryFileLink: supplementaryFiles.length > 0 ? supplementaryFiles : []
        };

        console.log("Form Data to PUT:", formData);

        try {
            const response = await axios.put("/api/forms", formData);
            toast.success("Form updated successfully");
        } catch (error) {
            toast.error("Error updating form:", error);
        }
    };


    // Format Research Ethics Committee
    const formatResearchEthicsCommittee = (value) => {
        if (!value) return '';
        const replacements = {
            USTHospital: "UST Hospital",
            FacultyofPharmacy: "Faculty of Pharmacy",
            GraduateSchool: "Graduate School",
            CollegeofNursing: "College of Nursing",
            CollegeofRehabilitationSciences: "College of Rehabilitation Sciences",
            FacultyofMedicineandSurgery: "Faculty of Medicine and Surgery",
            SeniorHighSchool: "Senior High School",
            CollegeofEducation: "College of Education",
            FacultyofEngineering: "Faculty of Engineering",
            CollegeofInformationandComputingSciences: "College of Information and Computing Sciences",
        };
        return (
            replacements[value] ||
            value
                .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/\bof\b/g, "of")
                .replace(/\s+/g, " ")
                .trim()
        );
    };

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

    const handleFileUploadSuccess = (res, setFileNames, fileType) => {
        if (res.info.format !== "pdf") {
            toast.error("Only PDF files are allowed.");
            return;
        }

        const fileUrl = res.info.secure_url; // Get the Cloudinary URL
        const fileName = res.info.original_filename; // Get the original file name

        if (fileType === "Main File") {
            setMainFiles((prev) => {
                const updatedFiles = [...prev, fileUrl];
                console.log("Main Files after update:", updatedFiles);  // Log to check updated state
                return updatedFiles;
            });
            setMainFileNames((prev) => [...prev, fileName]);
            setForms((prev) => ({
                ...prev,
                mainFileLink: [...prev.mainFileLink, fileUrl],
            }));
            toast.success("Main file uploaded successfully!");
        } else if (fileType === "Supplementary File") {
            setSupplementaryFiles((prev) => {
                const updatedFiles = [...prev, fileUrl];
                console.log("Supplementary Files after update:", updatedFiles);  // Log to check updated state
                return updatedFiles;
            });
            setSupplementaryFileNames((prev) => [...prev, fileName]);
            setForms((prev) => ({
                ...prev,
                supplementaryFileLink: [...prev.supplementaryFileLink, fileUrl],
            }));
            toast.success("Supplementary file uploaded successfully!");
        }
    };


    const handleRemoveFile = (index, fileType) => {
        if (fileType === "main") {
            setMainFiles((prev) => prev.filter((_, i) => i !== index));
            setMainFileNames((prev) => prev.filter((_, i) => i !== index));
            toast.info("Main file removed.");
        } else if (fileType === "supplementary") {
            setSupplementaryFiles((prev) => prev.filter((_, i) => i !== index));
            setSupplementaryFileNames((prev) => prev.filter((_, i) => i !== index));
            toast.info("Supplementary file removed.");
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
                {forms.additionalResearchers && forms.additionalResearchers.length > 0 && (
                    <Container className="PIforms-rescont">
                        {forms.additionalResearchers.map((researcher, index) => (
                            <Row key={index}>
                                <h1 className="PIforms-resconthead">Researcher {index + 1}</h1>
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
                                            value={researcher.additionalInstitutionAffiliation || ""}
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
                                onChange={(e) => handleChange(e, "proposalReviewedByOtherCommittee")}
                                className="form-check-input"
                            />
                        </p>
                        <p className="PIforms-formtext">
                            <strong>Monetary Source:</strong>
                            <input
                                type="text"
                                name="monetarySource"
                                value={forms.monetarySource || ""}
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
                                value={forms.monetarySource || ""}
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
                                        Does the proposed research include research subjects whose identity may be revealed?
                                    </td>
                                    <td>
                                        <select
                                            value={forms.identity}
                                            onChange={(e) => handleChange('identity', e.target.value)}
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
                                            onChange={(e) => handleChange('consent', e.target.value)}
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
                                            onChange={(e) => handleChange('under18', e.target.value)}
                                            className="form-control"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Is the subject in a dependent relationship with any of the research team?</td>
                                    <td>
                                        <select
                                            value={forms.dependent}
                                            onChange={(e) => handleChange('dependent', e.target.value)}
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
                                            onChange={(e) => handleChange('ethnic', e.target.value)}
                                            className="form-control"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Does the subject have an intellectual or mental impairment?</td>
                                    <td>
                                        <select
                                            value={forms.intellectual}
                                            onChange={(e) => handleChange('intellectual', e.target.value)}
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
                                            onChange={(e) => handleChange('pregnant', e.target.value)}
                                            className="form-control"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Does the research include a new treatment, medical procedure or test?</td>
                                    <td>
                                        <select
                                            value={forms.treatment}
                                            onChange={(e) => handleChange('treatment', e.target.value)}
                                            className="form-control"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Does the research involve the collection of biological samples including tissue extraction?</td>
                                    <td>
                                        <select
                                            value={forms.biological}
                                            onChange={(e) => handleChange('biological', e.target.value)}
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
                                            onChange={(e) => handleChange('radiation', e.target.value)}
                                            className="form-control"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Does the research cause pain or psychological distress?</td>
                                    <td>
                                        <select
                                            value={forms.distress}
                                            onChange={(e) => handleChange('distress', e.target.value)}
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
                                            onChange={(e) => handleChange('inducements', e.target.value)}
                                            className="form-control"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Does the research involve the collection of sensitive information?</td>
                                    <td>
                                        <select
                                            value={forms.sensitive}
                                            onChange={(e) => handleChange('sensitive', e.target.value)}
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
                                            onChange={(e) => handleChange('deception', e.target.value)}
                                            className="form-control"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Does the research involve assisted reproductive technology?</td>
                                    <td>
                                        <select
                                            value={forms.reproductive}
                                            onChange={(e) => handleChange('reproductive', e.target.value)}
                                            className="form-control"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Does the research involve human genetic or genomic studies?</td>
                                    <td>
                                        <select
                                            value={forms.genetic}
                                            onChange={(e) => handleChange('genetic', e.target.value)}
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
                                            onChange={(e) => handleChange('stemcell', e.target.value)}
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
                                            onChange={(e) => handleChange('biosafety', e.target.value)}
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
                                    <td>Generalizable knowledge about participants’ condition or disorder:</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            name="generalizableKnowledge"
                                            checked={forms.generalizableKnowledge || false}
                                            onChange={(e) => handleChange(e, "generalizableKnowledge")}
                                            className="form-check-input"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Generalizable knowledge about diseases or condition under study:</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            name="generalizableKnowledgeDisease"
                                            checked={forms.generalizableKnowledgeDisease || false}
                                            onChange={(e) => handleChange(e, "generalizableKnowledgeDisease")}
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

                                    <FormLabel className="PIforms-formtext">Select File:</FormLabel>
                                    <CldUploadWidget
                                        signatureEndpoint="/api/sign-cloudinary-params"
                                        multiple
                                        onSuccess={(res) =>
                                            handleFileUploadSuccess(res, setMainFileNames, "Main File")
                                        }
                                        onChange={handleChange}
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
                                </Row>

                                {/* Display uploaded files */}
                                <Row>
                                    {mainFileNames.length > 0 && (
                                        <div className="uploaded-files">
                                            <strong>Main Files:</strong>
                                            <ul>
                                                {mainFileNames.map((fileName, index) => (
                                                    <li key={index}>
                                                        {fileName}
                                                        <Button
                                                            variant="outline-danger"
                                                            size="sm"
                                                            className="ml-2"
                                                            onClick={() => handleRemoveFile(index, "main")}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
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
                                        isInvalid={!!errors.supplementaryFileType}
                                        onChange={handleChange}
                                    >
                                        <option disabled value="">
                                            Choose...
                                        </option>
                                        <option value="Supplementary Files">Supplementary Files</option>
                                    </FormSelect>
                                </Row>

                                <Row>
                                    <CldUploadWidget
                                        signatureEndpoint="/api/sign-cloudinary-params"
                                        multiple
                                        onSuccess={(res) =>
                                            handleFileUploadSuccess(
                                                res,
                                                setSupplementaryFileNames,
                                                "Supplementary File"
                                            )
                                        }
                                        onChange={handleChange}
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
                                </Row>

                                <Row>
                                    {supplementaryFileNames.length > 0 && (
                                        <div className="uploaded-files">
                                            <strong>Supplementary Files:</strong>
                                            <ul>
                                                {supplementaryFileNames.map((fileName, index) => (
                                                    <li key={index}>
                                                        {fileName}
                                                        <Button
                                                            variant="outline-danger"
                                                            size="sm"
                                                            className="ml-2"
                                                            onClick={() => handleRemoveFile(index, "supplementary")}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </Row>
                            </Container>
                        </Container>
                    </Col>
                    <Container>

                        <Row>
                            <h1>Your current Files:</h1>
                        </Row>
                        <Row>
                            {forms.mainFileLink && forms.mainFileLink.length > 0 && (
                                <div className="uploaded-files">
                                    <strong>Main Files:</strong>
                                    <ul>
                                        {forms.mainFileLink.map((file, index) => (
                                            <li key={index}>
                                                <a href={file} target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
                                                    View
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </Row>
                        <Row>
                            {forms.supplementaryFileLink && forms.supplementaryFileLink.length > 0 && (
                                <div className="uploaded-files">
                                    <strong>Supplementary Files:</strong>
                                    <ul>
                                        {forms.supplementaryFileLink.map((file, index) => (
                                            <li key={index}>
                                                <a href={file} target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
                                                    View
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </Row>
                    </Container>
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
                        Back to Home
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

        </div>
    );
}

