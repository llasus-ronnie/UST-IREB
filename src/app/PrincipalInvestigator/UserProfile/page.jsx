"use client";
import React from "react";
import Navbar from "../../components/navbar/Navbar";

import "../../styles/userprofile/UserProfile.css";
import { useSession } from "next-auth/react";

import { Row } from "react-bootstrap";

function UserProfile() {
  const { data: session } = useSession();
  return (
    <>
      <div className="header">
        <Navbar />
      </div>

      <div style={{ paddingTop: "2em" }} className="profileheader">
        <h1 className="text-center">My Profile</h1>
      </div>

      <Row className="profile-divider" />

      <div className="row profile-container">
        <div className="col profile-left">
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
              <p>Principal Investigator</p>
            </div>
          </div>
        </div>

        <div className="col profile-right">
          <div className="profile-cardright-title"> User Information </div>
          <div className="profile-cardright">
            <div className="row profile-cardright-body">
              <div className="col profile-cardright-labels">
                <p>Name</p>
                <p>Email Address</p>
                <p>Category</p>
              </div>
              <div className="col profile-cardright-content">
                <p>
                  {session && session.user.name ? session.user.name : "N/A"}
                </p>
                <p>
                  {session && session.user.email ? session.user.email : "N/A"}
                </p>
                <p>Thomasian Principal Investigator</p>
              </div>
            </div>
          </div>
          <div className="check-status">
            <p>Want to check the status of your submissions?</p>
            <button className="check-status">View My Submissions</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
