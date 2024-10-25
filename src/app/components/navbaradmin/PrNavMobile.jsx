"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../../styles/adminnav/adminnav.css";
import { useSession, signOut } from "next-auth/react";

const PrNavMobile = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

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

  return (
    <div className={`adminnav ${isNavVisible ? "visible" : "hidden"}`}>
      <div className="adminnav-content">
        <ul>
          <li>
            <Link href="../PrimaryReviewer/PRUserProfile" passHref>
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#fcbf15" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
              </svg>
                <p>Profile</p>
              </div>
            </Link>
          </li>

          <li>
            <Link href="../PrimaryReviewer/PRDashboard" passHref>
              <div>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="#fcbf15"
                  className="bi bi-house-door"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                </svg>
                <p>Home</p>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/submissions" passHref>
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#fcbf15" className="bi bi-clipboard-check" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
              </svg>
                <p>Submissions</p>
              </div>
            </Link>
          </li>

          <li>
            <Link
              href="/#"
              onClick={() => signOut({ callbackUrl: "/SignInAdmin" })}
            >
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M21 12L13 12" stroke="#fcbf15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9" stroke="#fcbf15" stroke-width= "2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19" stroke="#fcbf15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
                <p>Log Out</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PrNavMobile;
