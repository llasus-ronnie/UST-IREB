"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "../../styles/adminnav/adminnav.css";

const RecNav = () => { 
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleImageClick = (event) => {
    event.preventDefault();
    toggleNav();
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
              <div onClick={handleImageClick}>
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
              <div onClick={handleImageClick}>
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

          <li>
            <Link href="/home" passHref>
              <div onClick={handleImageClick}>
                <Image
                  src="/images/adminnav/adminnav-submissions.png"
                  alt="Submissions"
                  width={32}
                  height={32}
                />
                {isOpen && <span>Submissions</span>}
              </div>
            </Link>
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
              <div onClick={handleImageClick}>
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

export default RecNav;