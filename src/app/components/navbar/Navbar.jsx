"use client";

import "../../styles/navbar/navbar.css";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

//images
import logout from "../../../../public/images/navbar/navbar-logout.png";
import userIcon from "../../../../public/images/navbar/sidenav-user.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

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
            <></>
          ) : (
            <>
              <button href="/signinoption" className="navbar-subtitle">
                Login
              </button>
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
              <p>{session.user.name}</p>
              <Link href="/" className="view-account">
                View Account
              </Link>
            </>
          ) : (
            <>
              <Image src={userIcon} alt="User Icon" className="logout-icon" />
              <Link href="/signinoption" className="view-account">
                Login
              </Link>
            </>
          )}
        </div>

        <div className="sidenav-links">
          <a href="/">Home</a>
          <Link href="/faqs">FAQs</Link>

          {session ? (
            <>
              <Link href="/PrincipalInvestigator/form1">Submission Forms</Link>
              <a href="/MySubmissions">View my Submissions</a>
              <Link href="/" onClick={() => signOut()}>
                Logout
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
