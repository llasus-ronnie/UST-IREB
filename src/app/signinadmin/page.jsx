"use client";
// Dependencies
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

// Images
import Image from "next/image";
import GoogleLogo from "../../../public/images/signin/signin-google-logo.png";
import bgAdmin from "../../../public/images/signin/AdminBg.jpg";
import USTLogo from "../../../public/images/signin/USTLogo.png";

// CSS
import "../styles/signin/SignInAdmin.css";

export default function SignIn() {
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);

  const handleRecaptchaChange = (value) => {
    setIsRecaptchaVerified(!!value);
  };

  return (
    <>
      <div className="admin-signin-container">
        <Image
          src={bgAdmin}
          alt="Background"
          layout="fill"
          className="admin-bg"
        />

        <div className="admin-signin-logo-container">
          <Image src={USTLogo} alt="UST Logo" className="admin-logo" />
          <h1 className="admin-title">
            <b>UST IREB</b>
            <br />
            <span className="research-portal-text">Research Portal</span>
          </h1>
        </div>

        <div className="admin-signin-box">
          <h1 className="admin-signin-title">Sign In</h1>
          <br />
          <p className="admin-signin-text">
            Welcome, Admin! To access role features in the web portal, sign in
            with your UST Google Account.
          </p>

          <button
            onClick={() => signIn("google")}
            className="admin-google-btn"
            disabled={!isRecaptchaVerified}
          >
            <Image
              src={GoogleLogo}
              alt="Google Logo"
              className="google-logo"
              width={20}
              height={20}
            />
            Continue with Google
          </button>

          <div className="recaptcha-wrapper">
            <ReCAPTCHA
              className="admin-recaptcha"
              sitekey="6LfgAgkqAAAAAC_WvkqfnkIF-NUvwHnVOPyDkD2G"
              size="normal"
              onChange={handleRecaptchaChange}
            />
          </div>

          <hr />

          <div className="admin-signin-footer">
            <p>
              Need help signing in? <a href="#">Learn More</a>
            </p>
            <p>
              <a href="#">Return to Home</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
