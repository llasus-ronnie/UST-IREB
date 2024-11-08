"use client";
// Dependencies
import { signIn, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// Images
import Image from "next/image";
import GoogleLogo from "../../../public/images/signin/signin-google-logo.png";
import bgAdmin from "../../../public/images/signin/AdminBg.jpg";
import USTLogo from "../../../public/images/signin/USTLogo.png";

// CSS
import "../styles/signin/SignInAdminExternal.css";

export default function SignIn() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const [role, setRole] = useState("ExternalReviewer");
  const router = useRouter();

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  const handleAccessTokenChange = (e) => {
    const tokenValue = e.target.value;
    setAccessToken(tokenValue);
    setIsTokenValid(tokenValue.length > 0);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRecaptchaChange = (value) => {
    setIsRecaptchaVerified(!!value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/externalReviewerLogin", {
        email,
        accessToken, // Could be either the access token or password
        role, // Include the role in the request
      });

      if (response.data.success) {
        // If successful, try to establish a session with NextAuth
        const nextAuthSignIn = await signIn("credentials", {
          redirect: false,
          email,
          password: accessToken, // Use accessToken here as it might be password or access token
        });

        if (nextAuthSignIn && !nextAuthSignIn.error) {
          toast.success("Login successful");
          router.push("/PrimaryReviewer/PRDashboard"); // Redirect to admin dashboard or another protected page
        } else {
          toast.error("Failed to create session");
        }

        // If first-time login, redirect to password setup
        if (response.data.message.includes("set your password")) {
          toast.success("Sign in successful, please create a password");
          router.push(
            `/SignInAdminExternal/SetPassword?accessToken=${accessToken}&role=${role}`
          );
        }
      } else {
        toast.error(response.data.error || "Invalid email or password");
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      toast.error("Invalid email or password");
    }
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
          <h1 className="admin-signin-title">External Reviewer Sign In</h1>
          <p className="admin-signin-text">
            Welcome, External Reviewer! To access the features of the UST IREB
            Research Portal, please enter your credentials below.
          </p>

          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            className="admin-input"
          />

          <input
            type="password"
            value={accessToken}
            onChange={handleAccessTokenChange}
            placeholder="Password or Access Token"
            className="admin-input"
          />

          <div className="recaptcha-wrapper">
            <ReCAPTCHA
              className="admin-recaptcha"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              size="normal"
              onChange={handleRecaptchaChange}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isRecaptchaVerified}
            className="admin-signin-button"
          >
            Sign In
          </button>

          <hr />

          <div className="admin-signin-footer">
            <p>
              Need help signing in? <a href="#">Learn More</a>
            </p>
            <p>
              <a href="/">Return to Home</a>
            </p>
          </div>
        </div>
      </div>
      {/* <ToastContainer position="bottom-right" /> */}
    </>
  );
}
