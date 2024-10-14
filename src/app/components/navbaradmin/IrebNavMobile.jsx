"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../styles/adminnav/adminnav.css";
import { useSession, signOut } from "next-auth/react";

const IrebNavMobile = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);

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

  return (
    <div className={`adminnav ${isNavVisible ? "visible" : "hidden"}`}>
      <div className="adminnav-content">
        <ul>
          <li>
            <Link href="../IREB/IREBUserProfile" passHref>
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
            <Link href="../IREB/IREBDashboard" passHref>
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
            <Link
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
                <p>Log Out</p>
              </div>
            </Link>
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
        <Link href="../IREB/IREBManageREC" passHref>
          <p>Manage REC Accounts</p>
        </Link>
        <Link href="../IREB/IREBManageExternal" passHref>
          <p>Manage External Accounts</p>
        </Link>
      </div>
    </div>
  );
};

export default IrebNavMobile;
