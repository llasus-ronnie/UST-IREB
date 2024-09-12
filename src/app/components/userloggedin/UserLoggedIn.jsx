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

  const userName = "John Doe";
  const profileImage = "/images/userloggedin/user-placeholder.png";

  return (
    <div className="container">
      <Image
        src={profileImage}
        alt="Profile"
        width={40}
        height={40}
        className="image"
      />
      <div className="textContainer">
        <div className="name">{userName}</div>
        <div className="time">
          {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;