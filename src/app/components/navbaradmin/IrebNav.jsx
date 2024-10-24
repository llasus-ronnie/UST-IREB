"use client";

import React, { useState } from "react";
import Image from "next/image";
import "../../styles/adminnav/adminnav.css";
import { useSession, signOut } from "next-auth/react";

const IrebNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleImageClick = (event) => {
    event.preventDefault();
    toggleNav();
  };

  return (
    <div className={`irebnav adminnav ${isOpen ? "open" : ""}`}>
      <div className="adminnav-toggle" onClick={toggleNav}>
        <span>{isOpen ? "◄" : "►"}</span>
      </div>
      <div className="adminnav-content">
        <ul>
          <li>
            <a href="../IREB/IREBUserProfile">
              <div>
                <Image
                  src="/images/adminnav/adminnav-account.png"
                  alt="Account"
                  width={32}
                  height={32}
                />
              </div>
              {isOpen && <span>My Profile</span>}
            </a>
          </li>

          <li>
            <a href="../IREB/IREBDashboard">
              <div>
                <Image
                  src="/images/adminnav/adminnav-home.png"
                  alt="Home"
                  width={32}
                  height={32}
                />
              </div>
              {isOpen && <span>Home</span>}
            </a>
          </li>

          {/* Manage Accounts */}
          <li className="dropdown">
            <div className="dropdown-div">
              <Image
                src="/images/adminnav/adminnav-manageaccounts.png"
                alt="Manage Accounts"
                width={32}
                height={32}
                onClick={handleImageClick}
              />
              {isOpen && (
                <>
                  <div className="dropdown-div" onClick={toggleDropdown}>
                    <span>Manage Accounts</span>
                    <span className="dropdown-toggle" />
                  </div>
                </>
              )}
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && isOpen && (
              <ul className="adminnav-dropdown">
                <li>
                  <a href="../IREB/IREBManageREC" legacyBehavior>
                    <a>
                      <span>REC Accounts</span>
                    </a>
                  </a>
                </li>
                <li>
                  <a href="../IREB/IREBManageExternal" legacyBehavior>
                    <a>
                      <span>External Accounts</span>
                    </a>
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <a href="/reports">
              <div>
                <Image
                  src="/images/adminnav/adminnav-reports.png"
                  alt="Reports"
                  width={32}
                  height={32}
                />
              </div>
              {isOpen && <span>Reports</span>}
            </a>
          </li>
        </ul>
      </div>

      <div className="adminnav-logout">
        <ul>
          <li>
            <a
              href="/#"
              onClick={() => signOut({ callbackUrl: "/SignInAdmin" })}
            >
              <div>
                <Image
                  src="/images/adminnav/adminnav-logout.png"
                  alt="Log Out"
                  width={32}
                  height={32}
                />
              </div>
              {isOpen && <span>Log Out</span>}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IrebNav;
