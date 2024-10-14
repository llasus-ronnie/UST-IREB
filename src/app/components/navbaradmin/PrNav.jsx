"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../styles/adminnav/adminnav.css";
import { useSession, signOut } from "next-auth/react";

const PrNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  // const handleImageClick = (event) => {
  //   event.preventDefault();
  //   toggleNav();
  // };

  return (
    <div className={`prnav adminnav ${isOpen ? "open" : ""}`}>
      <div className="adminnav-toggle" onClick={toggleNav}>
        <span>{isOpen ? "◄" : "►"}</span>
      </div>
      <div className="adminnav-content">
        <ul>
          <li>
            <Link href="../PrimaryReviewer/PRUserProfile" passHref>
              <div>
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
            <Link href="../PrimaryReviewer/PRDashboard" passHref>
              <div>
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

          <li>
            <Link href="/submissions" passHref>
              <div>
                <Image
                  src="/images/adminnav/adminnav-submissions.png"
                  alt="Submissions"
                  width={32}
                  height={32}
                />
              </div>
              {isOpen && <span>Submissions</span>}
            </Link>
          </li>
        </ul>
      </div>

      <div className="adminnav-logout">
        <ul>
          <li>
            <Link
              href="/#"
              onClick={() => signOut({ callbackUrl: "/signinadmin" })}
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
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PrNav;
