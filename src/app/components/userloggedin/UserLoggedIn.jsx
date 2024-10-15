"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import "../../styles/userloggedin/UserLoggedIn.css";
import { useSession } from "next-auth/react";

const UserInfo = () => {
  const { data: session } = useSession();
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const userName = session?.user?.name || "IREB Chair";
  const profileImage =
    session?.user?.image || "/images/userloggedin/user-placeholder.png";

  const formattedDate = currentTime
    ? currentTime.toLocaleDateString("en-US")
    : ""; // For MM/DD/YYYY format
  const formattedTime = currentTime
    ? currentTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true, // For 12-hour format with AM/PM
      })
    : "";

  return (
    <div className="uli-container">
      <Image
        src={profileImage}
        alt="Profile"
        width={40}
        height={40}
        className="uli-image"
      />
      <div className="uli-textContainer">
        <div className="uli-name">{userName}</div>
        <div className="uli-time">
          {formattedDate} {formattedTime}{" "}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
