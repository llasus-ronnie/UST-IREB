"use client";

import React, { useState } from "react";
import RecNav from "../../../components/navbaradmin/RecNav";
import RecNavMobile from "../../../components/navbaradmin/RecNavMobile";
import UserLoggedIn from "../../../components/userloggedin/UserLoggedIn";
import { Row, Col } from "react-bootstrap";
import { useSession } from "next-auth/react";
import Link from "next/link";
import "../../../styles/userprofile/AdminUserProfile.css";

import withAuthorization from "../../../../hoc/withAuthorization";

function RECUserProfile() {
  const { data: session } = useSession();

  return (
    <div className="adminpage-container">
      <div className="adminnav-mobile">
        <RecNavMobile />
      </div>
      <RecNav className="adminnav" />

      <div className="admin-userprofile">
        <div className="adminmain-content">
          <div className="admin-header-container">
            <div className="admin-header">
              <h1>REC User Profile</h1>
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
                  <p>REC Admin</p>
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
                      <p>REC Administrator</p>
                    </Col>
                  </div>
                </Row>
              </div>
              <div className="return-dashboard">
                <Link href="../REC/RECDashboard">
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

export default withAuthorization(RECUserProfile, "REC");
