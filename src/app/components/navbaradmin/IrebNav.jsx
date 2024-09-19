"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "../../styles/adminnav/adminnav.css";

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
    <div className={`irebnav adminnav ${isOpen ? 'open' : ''}`}>
      <div className="adminnav-toggle" onClick={toggleNav}>
        <span>{isOpen ? '◄' : '►'}</span>
      </div>
      <div className="adminnav-content">
        <ul>
          <li>
            <Link href="/account" passHref>
              <div onClick={handleImageClick}>
                <Image
                  src="/images/adminnav/adminnav-account.png"
                  alt="Account"
                  width={32}
                  height={32}
                />
              </div>
                {isOpen && <span>My Profile</span>}
            </Link>
          </li>

          <li>
            <Link href="../IREB/IREBDashboard" passHref>
              <div onClick={handleImageClick}>
                <Image
                  src="/images/adminnav/adminnav-home.png"
                  alt="Home"
                  width={32}
                  height={32}
                />
              </div>
                {isOpen && <span>Home</span>}
            </Link>
          </li>

          {/* Manage Accounts */}
          <li className="dropdown">
            <div className="dropdown-div" >
              <Image
                src="/images/adminnav/adminnav-manageaccounts.png"
                alt="Manage Accounts"
                width={32}
                height={32}
                onClick={handleImageClick}
              />
              {isOpen && (
                <>
                  <span>Manage Accounts</span>
                  <span onClick={toggleDropdown} className="dropdown-toggle">
                    {/* Dropdown toggle icon or text */}
                  </span>
                </>
              )}
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && isOpen && (
              <ul className="adminnav-dropdown">
                <li>
                  <Link href="../IREB/IREBManageREC" passHref legacyBehavior>
                    <a>
                      <span>REC Accounts</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="../IREB/IREBManageExternal" passHref legacyBehavior>
                    <a>
                      <span>External Accounts</span>
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link href="/reports" passHref>
              <div onClick={handleImageClick}>
                <Image
                  src="/images/adminnav/adminnav-reports.png"
                  alt="Reports"
                  width={32}
                  height={32}
                />
              </div>
              {isOpen && <span>Reports</span>}
            </Link>
          </li>
        </ul>
      </div>

      <div className="adminnav-logout">
        <ul>
          <li>
            <Link href="/logout" passHref>
              <div onClick={handleImageClick}>
                <Image
                  src="/images/adminnav/adminnav-logout.png"
                  alt="Log Out"
                  width={32}
                  height={32}
                />
              </div>
              {isOpen && <span>Log Out</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IrebNav;