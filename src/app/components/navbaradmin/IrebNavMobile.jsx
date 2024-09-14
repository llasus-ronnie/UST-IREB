"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "../../styles/adminnav/adminnav.css";

const IrebNavMobile = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  const handlePopupToggle = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className={`adminnav ${isNavVisible ? 'visible' : 'hidden'}`}>
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
                <p>Profile</p>
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
                <p>Home</p>
              </div>
            </Link>
          </li>

          <li>
            <div className="accounts-icon" onClick={handlePopupToggle}>
              <Image
                src="/images/adminnav/adminnav-manageaccounts.png"
                alt="Manage Accounts"
                width={32}
                height={32}
              />
              <p>Accounts</p>
            </div>
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
                <p>Reports</p>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/logout" passHref>
              <div>
                <Image
                  src="/images/adminnav/adminnav-logout.png"
                  alt="Log Out"
                  width={32}
                  height={32}
                />
                <p>Log Out</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      <div className={`adminnav-pop-up ${isPopupVisible ? 'show' : 'hide'}`}>
        <button className="popup-close-btn" onClick={handleClosePopup}>×</button>
        <p>Manage REC Accounts</p>
        <p>Manage External Accounts</p>
      </div>
    </div>
  );
};

export default IrebNavMobile;