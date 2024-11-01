"use client";
import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../styles/userprofile/UserProfile.css";
import Navbar from "../../components/navbar/Navbar";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import withAuthorization from "../../../hoc/withAuthorization";

function UserProfile() {
  const { data: session } = useSession();

  const userImage =
    session && session.user.role === "ExternalInvestigator"
      ? "/images/navbar/sidenav-user.png"
      : session && session.user.image;

  const roleLabel =
    session && session.user.role === "ExternalInvestigator"
      ? "External Principal Investigator"
      : session && session.user.role === "PrincipalInvestigator"
      ? "Thomasian Principal Investigator"
      : "";

  return (
    <>
      <div className="header">
        <Navbar />
      </div>
      <div style={{ paddingTop: "2em" }} className="profileheader">
        <h1 className="text-center">My Profile</h1>
      </div>
      <Row className="profile-divider" />
      <Row className="profile-container">
        <Col className="profile-left">
          <div className="profile-cardleft">
            <div className="profile-card-body">
              <img
                src={userImage}
                alt="Profile"
                className="profile-image rounded-circle"
              />
              <h5>{session && session.user.name}</h5>
              <p>Principal Investigator</p>
            </div>
          </div>
        </Col>
        <Col className="profile-right">
          <div className="profile-cardright">
            <div className="profile-cardright-title">User Information</div>
            <Row className="profile-cardright-body">
              <div className="profile-cardright-row">
                <Col className="profile-cardright-labels">
                  <p>Name</p>
                </Col>
                <Col className="profile-cardright-content">
                  <p>{session && session.user.name}</p>
                </Col>
              </div>
              <div className="profile-cardright-row">
                <Col className="profile-cardright-labels">
                  <p>Email Address</p>
                </Col>
                <Col className="profile-cardright-content">
                  <p>{session && session.user.email}</p>
                </Col>
              </div>
              <div className="profile-cardright-row">
                <Col className="profile-cardright-labels">
                  <p>Category</p>
                </Col>
                <Col className="profile-cardright-content">
                  <p>{roleLabel}</p>
                </Col>
              </div>
            </Row>
          </div>
          <div className="check-status">
            <p>Want to check the status of your submissions?</p>
            <a href="./SubmissionList">
              <button className="check-status">View My Submissions</button>
            </a>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default withAuthorization(UserProfile, [
  "PrincipalInvestigator",
  "ExternalInvestigator",
]);
