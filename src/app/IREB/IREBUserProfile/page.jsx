"use client";

import React, { useState } from "react";
import IrebNav from "../../components/navbaradmin/IrebNav";
import IrebNavMobile from "../../components/navbaradmin/IrebNavMobile";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import { Row, Col } from "react-bootstrap";
import { useSession } from "next-auth/react";
import Link from "next/link";
import "../../styles/userprofile/AdminUserProfile.css";

import withAuthorization from "../../../hoc/withAuthorization";

function IREBUserProfile() {
  const { data: session, status } = useSession();

  //loading
  const loadingContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "var(--secondary-color)",
  };
  const spinnerStyle = {
    width: "4rem",
    height: "4rem",
    color: "var(--tertiary-color)",
  };
  const loadingTextStyle = {
    fontFamily: "var(--poppins)",
    fontSize: "var(--paragraph-size)",
    color: "var(--primary-color)",
    marginTop: "1rem",
  };

  if (status === "loading") {
    return (
      <div style={loadingContainerStyle}>
        <Spinner animation="border" role="status" style={spinnerStyle}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p style={loadingTextStyle}>
          Please wait, we are verifying your access...
        </p>
      </div>
    );
  }

  return (
    <div className="adminpage-container">
      <div className="adminnav-mobile">
        <IrebNavMobile />
      </div>
      <IrebNav className="adminnav" />

      <div className="admin-userprofile">
        <div className="adminmain-content">
          <div className="admin-header-container">
            <div className="admin-header">
              <h1>IREB User Profile</h1>
              <p>View Admin Account Information</p>
            </div>
            <div className="userloggedin">
              <UserLoggedIn />
            </div>
          </div>

          <Row className="profile-container profile-maincard">
            <div className="profile-card-title">User Information</div>
            <Col className="profile-left">
              <div className="profile-cardleft">
                <div className="profile-card-body">
                  <img
                    src={
                      session && session.user.image
                        ? session.user.image
                        : "/images/userloggedin/user-placeholder2.png"
                    }
                    alt="Profile"
                    className="profile-image rounded-circle"
                  />
                  <h5>
                    {session && session.user.name ? session.user.name : "Guest"}
                  </h5>
                  <p>IREB Admin</p>
                </div>
              </div>
            </Col>

            <Col className="profile-right">
              <div className="profile-cardright">
                <Row className="profile-cardright-body">
                  <div className="profile-cardright-row">
                    <Col className="profile-cardright-labels">
                      <p>Name</p>
                    </Col>
                    <Col className="profile-cardright-content">
                      <p>
                        {session && session.user.name
                          ? session.user.name
                          : "N/A"}
                      </p>
                    </Col>
                  </div>

                  <div className="profile-cardright-row">
                    <Col className="profile-cardright-labels">
                      <p>Email Address</p>
                    </Col>
                    <Col className="profile-cardright-content">
                      <p>
                        {session && session.user.email
                          ? session.user.email
                          : "N/A"}
                      </p>
                    </Col>
                  </div>

                  <div className="profile-cardright-row">
                    <Col className="profile-cardright-labels">
                      <p>Category</p>
                    </Col>
                    <Col className="profile-cardright-content">
                      <p>IREB Administrator</p>
                    </Col>
                  </div>
                </Row>
              </div>
              <div className="return-dashboard">
                <Link href="../IREB/IREBDashboard">
                  <button className="return-dashboard">
                    Return to Dashboard
                  </button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(IREBUserProfile, "IREB");
