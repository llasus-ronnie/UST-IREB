"use client";

import "../../styles/navbar/navbar.css";
import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useSession, signOut } from "next-auth/react";
import ConfirmLogout from "../modals/ConfirmLogOutModal";

//images
import logout from "../../../../public/images/navbar/navbar-logout.png";
import userIcon from "../../../../public/images/navbar/sidenav-user.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          {/* Hamburger */}
          <div className="hamburger-bg">
            <div
              className={`hamburger ${isOpen ? "open" : ""}`}
              onClick={toggleMenu}
            >
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>

          {/* Navbar Title */}
          <h1 className="navbar-title">
            <span className="yellow-text">UST IREB </span>
            <span>Research Portal</span>
          </h1>
        </div>

        <div className="navbar-right">
          {session ? (
            <>
              <h1 className="navbar-subtitle-signedin">
                Welcome, {session.user.name}!
              </h1>
            </>
          ) : (
            <>
              <a href="/SignInOption" className="navbar-subtitle">
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  className="navsignin-icon"
                />
                Sign In
              </a>
            </>
          )}
        </div>
      </div>

      {/* Sidenav */}
      <div className={`sidenav ${isOpen ? "open" : ""}`}>
        <div className="sidenav-account">
          {session ? (
            <>
              <Image
                src={session.user.image || userIcon}
                alt="User Icon"
                className="logout-icon"
                width={200}
                height={200}
              />
              <p className="navbar-user-session">{session.user.name}</p>
              <a
                href="/PrincipalInvestigator/UserProfile"
                className="view-account"
              >
                View Account
              </a>
            </>
          ) : (
            <>
              <Image src={userIcon} alt="User Icon" className="logout-icon" />
              <a href="/SignInOption" className="view-account">
                Sign In
              </a>
            </>
          )}
        </div>

        <div className="sidenav-links">
          <a href="/">Home</a>
          <a href="/faqs">FAQs</a>
          <a href="/RECGuidelines">Submission Requirements</a>

          {session ? (
            <>
              <a href="/form">Submit Proposal</a>
              <a href="/PrincipalInvestigator/SubmissionList">
                View my Submissions
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowLogoutModal(true);
                }}
              >
                Logout
              </a>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <ConfirmLogout
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        onLogout={() => {
          setShowLogoutModal(false);
          signOut({ callbackUrl: "/" });
        }}
      />
    </>
  );
}
