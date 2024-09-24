"use client";

//components
import "../../styles/submissionlist/SubmissionList.css";
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Row } from "react-bootstrap";

function SubmissionList() { 

    return (
    <>
    <div className="header">
        <Navbar />
    </div>

    <div style={{ paddingTop: "2em" }} className="submission_header">
        <h1 className="text-center">My Submissions</h1>
    </div>

    <Row className="profile-divider" />


    <div className="submission-list-container">
        <div className="submission-list-header">
            <h2>Submission List</h2>
        </div>
        <table className="submission-table">
            <thead>
                <tr>
                    <th>Research Title</th>
                    <th>Date of Application</th>
                    <th>Assigned REC</th>
                    <th>Review Classification</th>
                    <th>View Research</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>UST IREB: Research Portal for UST</td>
                    <td>July 31, 2024</td>
                    <td>UST CICS</td>
                    <td className="review-classification full-board">Full Board</td>
                    <td className="view-btn-cell"><button className="view-btn">View</button></td>
                </tr>
                <tr>
                    <td>UST IREB: Research Portal for Another Institution</td>
                    <td>August 10, 2024</td>
                    <td>UST CICS</td>
                    <td className="review-classification expedited">Expedited</td>
                    <td className="view-btn-cell"><button className="view-btn">View</button></td>
                </tr>
            </tbody>
        </table>
        <div className="submission-footer">
            <p><i>Click to see further details of your submission</i></p>
        </div>
    </div>

    </>
    );
}

export default SubmissionList;
