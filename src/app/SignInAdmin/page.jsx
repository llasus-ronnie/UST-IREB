"use client";
// Dependencies
import { signIn, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";

// Images
import Image from "next/image";
import GoogleLogo from "../../../public/images/signin/signin-google-logo.png";
import bgAdmin from "../../../public/images/signin/AdminBg.jpg";
import USTLogo from "../../../public/images/signin/USTLogo.png";

// CSS
import "../styles/signin/SignInAdmin.css";

const SignInAdmin = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/admin-dashboard" });
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
          <p className="admin-signin-text">
            Welcome, Admin! To access role features in the web portal, kindly
            select your category to login.
          </p>

          <div className="signin-options">
            <a href="../SignInAdminThomasian" className="btn-thomasian">
              Thomasian Admin
            </a>
            <a href="../SignInAdminExternal" className="btn-external">
              External Reviewer
            </a>
          </div>

          <hr />

          <div className="admin-signin-footer">
            <p>
              Need help signing in? <a href="/faqs">Learn More</a>
            </p>
            <p>
              <a href="/">Return to Home</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInAdmin;
