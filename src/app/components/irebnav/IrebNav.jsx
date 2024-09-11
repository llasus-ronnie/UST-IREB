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

  return (
    <div className={`adminnav ${isOpen ? 'open' : ''}`}>
      <div className="adminnav-toggle" onClick={toggleNav}>
        <span>{isOpen ? '◄' : '►'}</span>
      </div>
      <div className="adminnav-content">
        <ul>
          <li>
            <Link href="/account" passHref>
              <div>
                <Image
                  src="/images/adminnav/adminnav-account.png"
                  alt="Account"
                  width={32}
                  height={32}
                />
                {isOpen && <span>My Account</span>}
              </div>
            </Link>
          </li>

          <li>
            <Link href="/home" passHref>
              <div>
                <Image
                  src="/images/adminnav/adminnav-home.png"
                  alt="Home"
                  width={32}
                  height={32}
                />
                {isOpen && <span>Home</span>}
              </div>
            </Link>
          </li>

          {/* Manage Accounts */}
          <li className="dropdown">
            <div className="dropdown-div">
              <Image
                src="/images/adminnav/adminnav-manageaccounts.png"
                alt="Manage Accounts"
                width={32}
                height={32}
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
                  <Link href="/manageaccounts/create" passHref legacyBehavior>
                    <a>
                      <span>REC Accounts</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/manageaccounts/view" passHref legacyBehavior>
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
              <div>
                <Image
                  src="/images/adminnav/adminnav-reports.png"
                  alt="Reports"
                  width={32}
                  height={32}
                />
                {isOpen && <span>Reports</span>}
              </div>
            </Link>
          </li>
        </ul>
      </div>

      <div className="adminnav-logout">
        <ul>
          <li>
            <Link href="/logout" passHref>
              <div>
                <Image
                  src="/images/adminnav/adminnav-logout.png"
                  alt="Log Out"
                  width={32}
                  height={32}
                />
                {isOpen && <span>Log Out</span>}
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IrebNav;