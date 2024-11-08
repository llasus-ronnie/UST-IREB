"use client";

import React, { useState, useEffect } from "react";
import "../../styles/adminnav/adminnav.css";
import { useSession, signOut } from "next-auth/react";
import ConfirmLogOut from "../modals/ConfirmLogOutModal";

const RecNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const path = window.location.pathname;

    if (path.includes(`RECdashboard/${props.rec}`)) {
      setIsActive("home");
    } else if (path.includes("RECUserProfile")) {
      setIsActive("profile");
    } else if (path.includes(`RECSubmissions/${props.rec}`)) {
      setIsActive("submissions");
    } else if (path.includes("RECManageContent")) {
      setIsActive("content");
    } else if (path.includes("RECReports")) {
      setIsActive("reports");
    } else {
      setIsActive("");
    }
  }, [props.rec]);

  return (
    <>
      <div className={`recnav adminnav ${isOpen ? "open" : ""}`}>
        <div className="adminnav-toggle" onClick={toggleNav}>
          <span>{isOpen ? "◄" : "►"}</span>
        </div>
        <div className="adminnav-content">
          <ul>
            <li
              className={`adminnavline ${
                isActive === "profile" ? "active-linkline" : ""
              }`}
            >
              <a
                href={`/REC/RECUserProfile/${props.rec}`}
                onClick={() => isActive("profile")}
              >
                <div>
                  <svg
                    fill="#a58324"
                    width="30"
                    height="30"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${isActive === "profile" ? "active-link" : ""}`}
                  >
                    <path d="M16,8a5,5,0,1,0,5,5A5,5,0,0,0,16,8Zm0,8a3,3,0,1,1,3-3A3.0034,3.0034,0,0,1,16,16Z" />
                    <path d="M16,2A14,14,0,1,0,30,16,14.0158,14.0158,0,0,0,16,2ZM10,26.3765V25a3.0033,3.0033,0,0,1,3-3h6a3.0033,3.0033,0,0,1,3,3v1.3765a11.8989,11.8989,0,0,1-12,0Zm13.9925-1.4507A5.0016,5.0016,0,0,0,19,20H13a5.0016,5.0016,0,0,0-4.9925,4.9258,12,12,0,1,1,15.985,0Z" />
                  </svg>
                </div>
                {isOpen && <span>My Profile</span>}
              </a>
            </li>

            <li
              className={`adminnavline ${
                isActive === "home" ? "active-linkline" : ""
              }`}
            >
              <a
                href={`/REC/RECdashboard/${props.rec}`}
                onClick={() => isActive("home")}
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="#a58324"
                    className={`bi bi-house-door ${
                      isActive === "home" ? "active-link" : ""
                    }`}
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                  </svg>
                </div>
                {isOpen && <span>Home</span>}
              </a>
            </li>

            <li
              className={`adminnavline ${
                isActive === "submissions" ? "active-linkline" : ""
              }`}
            >
              <a
                href={`/REC/RECSubmissions/${props.rec}`}
                onClick={() => isActive("submissions")}
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="#a58324"
                    className={`bi bi-clipboard-check ${
                      isActive === "submissions" ? "active-link" : ""
                    }`}
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"
                    />
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                  </svg>
                </div>
                {isOpen && <span>Submissions</span>}
              </a>
            </li>

            <li
              className={`adminnavline ${
                isActive === "content" ? "active-linkline" : ""
              }`}
            >
              <a
                href={`/REC/RECManageContent/${props.rec}`}
                onClick={() => isActive("content")}
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="#a58324"
                    className={`bi bi-pencil-square ${
                      isActive === "content" ? "active-link" : ""
                    }`}
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>
                </div>
                {isOpen && <span>Content</span>}
              </a>
            </li>

            <li
              className={`adminnavline ${
                isActive === "reports" ? "active-linkline" : ""
              }`}
            >
              <a
                href={`/REC/RECReports/${props.rec}`}
                onClick={() => isActive("reports")}
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="#a58324"
                    className={`bi bi-folder2 ${isActive  === "reports" ? "active-link" : ""}`}
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5z" />
                  </svg>
                </div>
                {isOpen && <span>Reports</span>}
              </a>
            </li>
          </ul>
        </div>

        <div className="adminnav-logout">
          <ul>
            <li className="adminnavline">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowLogoutModal(true);
                }}
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 12L13 12"
                      stroke="#fcbf15"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9"
                      stroke="#fcbf15"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19"
                      stroke="#fcbf15"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                {isOpen && <span>Log Out</span>}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <ConfirmLogOut
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        onLogout={() => {
          setShowLogoutModal(false);
          signOut({ callbackUrl: "/SignInAdmin" });
        }}
      />
    </>
  );
};

export default RecNav;
