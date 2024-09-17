"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import "../../styles/userloggedin/UserLoggedIn.css";

const UserInfo = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const userName = "IREB Chair";
  const profileImage = "/images/userloggedin/user-placeholder.png";

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
          {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;