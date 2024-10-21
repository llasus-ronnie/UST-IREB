"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../styles/adminnav/adminnav.css";
import { useSession, signOut } from "next-auth/react";

const RecNavMobile = ({params}) => {
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
            <Link href="../" passHref>
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
            <Link href="../REC/RECdashboard/" passHref>
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
            <Link href={`../REC/RECSubmissions/${params}` } passHref>
              <div>
                <Image
                  src="/images/adminnav/adminnav-submissions.png"
                  alt="Submissions"
                  width={32}
                  height={32}
                />
                <p>Submissions</p>
              </div>
            </Link>
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
    </div>
  );
};

export default RecNavMobile;
