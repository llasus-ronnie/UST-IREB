"use client";
import React from "react";
import Navbar from "../../components/navbar/Navbar";

import "../../styles/userprofile/UserProfile.css";

import { Row } from "react-bootstrap";

function UserProfile() {
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
                src="/images/userloggedin/user-placeholder2.png" 
                alt="Profile" 
                className="profile-image rounded-circle" 
              />
              <h5>Juan Dela Cruz</h5>
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
                    <p>Juan Dela Cruz</p>
                    <p>jmdelacruz@ust.edu.ph</p>
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

export default UserProfile ;