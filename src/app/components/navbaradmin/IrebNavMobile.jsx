"use client";

import React, { useState, useEffect } from "react";
import "../../styles/adminnav/adminnav.css";
import { useSession, signOut } from "next-auth/react";

const IrebNavMobile = (props) => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [isActive, setIsActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const handlePopupToggle = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartY(e.clientY || e.touches[0].clientY);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentY = e.clientY || e.touches[0].clientY;
    if (currentY - startY > 50) {
      setIsPopupVisible(false);
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const path = window.location.pathname;

    if (path.includes("IREBDashboard")) {
      setIsActive("home");
    } else if (path.includes("IREBUserProfile")) {
      setIsActive("profile");
    } else if (path.includes("IREBManageREC")) {
      setIsActive("accounts");
    } else if (path.includes("IREBManageRECRoles")) {
      setIsActive("accounts");
    } else if (path.includes("IREBManageExternal")) {
      setIsActive("accounts");
    } else if (path.includes("IREBManageContent")) {
      setIsActive("content");
    } else if (path.includes("IREBReports")) {
      setIsActive("reports");
    } else {
      setIsActive("");
    }
  }, [props.rec]);

  return (
    <div className={`adminnav ${isNavVisible ? "visible" : "hidden"}`}>
      <div className="adminnav-content">
        <ul>
          <li className={`${isActive === "profile" ? "active-linkline" : ""}`}>
            <a href="../IREB/IREBUserProfile">
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
                <p>Profile</p>
              </div>
            </a>
          </li>
          <li className={`${isActive === "home" ? "active-linkline" : ""}`}>
            <a href="../IREB/IREBDashboard">
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
                <p>Home</p>
              </div>
            </a>
          </li>
          <li className={`${isActive === "accounts" ? "active-linkline" : ""}`}>
            <div className="accounts-icon" onClick={handlePopupToggle}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  isActive === "accounts" ? "active-link-accounts" : ""
                }`}
              >
                <path
                  d="M8.5 21H4C4 17.134 7.13401 14 11 14C11.1681 14 11.3348 14.0059 11.5 14.0176M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7ZM12.5898 21L14.6148 20.595C14.7914 20.5597 14.8797 20.542 14.962 20.5097C15.0351 20.4811 15.1045 20.4439 15.1689 20.399C15.2414 20.3484 15.3051 20.2848 15.4324 20.1574L19.5898 16C20.1421 15.4477 20.1421 14.5523 19.5898 14C19.0376 13.4477 18.1421 13.4477 17.5898 14L13.4324 18.1574C13.3051 18.2848 13.2414 18.3484 13.1908 18.421C13.1459 18.4853 13.1088 18.5548 13.0801 18.6279C13.0478 18.7102 13.0302 18.7985 12.9948 18.975L12.5898 21Z"
                  stroke="#a58324"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Accounts</p>
            </div>
          </li>

          <li className={`${isActive === "content" ? "active-linkline" : ""}`}>
            <a href="../IREB/IREBManageContent">
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
                <p>Content</p>
              </div>
            </a>
          </li>

          <li className={`${isActive === "reports" ? "active-linkline" : ""}`}>
            <a href="../IREB/IREBReports">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="#a58324"
                  className={`bi bi-folder2 ${
                    isActive === "reports" ? "active-link" : ""
                  }`}
                  viewBox="0 0 16 16"
                >
                  <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5z" />
                </svg>
                <p>Reports</p>
              </div>
            </a>
          </li>
          <li>
            <a
              href="/#"
              onClick={() => signOut({ callbackUrl: "/SignInAdmin" })}
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
                    stroke="#a58324"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9"
                    stroke="#a58324"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19"
                    stroke="#a58324"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <p>Log Out</p>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div
        className={`adminnav-pop-up ${isPopupVisible ? "show" : "hide"}`}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onMouseMove={handleDragMove}
        onTouchMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchEnd={handleDragEnd}
      >
        <div className="grab-handle"></div>
        <a href="../IREB/IREBManageREC">
          <p>Manage REC Accounts</p>
        </a>
        <a href="../IREB/IREBManageExternal">
          <p>Manage External Accounts</p>
        </a>
      </div>
    </div>
  );
};

export default IrebNavMobile;
