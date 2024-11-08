"use client";
// Dependencies
import { signIn, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Images
import Image from "next/image";
import GoogleLogo from "../../../../public/images/signin/signin-google-logo.png";
import bgAdmin from "../../../../public/images/signin/AdminBg.jpg";
import USTLogo from "../../../../public/images/signin/USTLogo.png";

// CSS
import "../../styles/signin/SignInAdminExternal.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setIsPasswordValid(passwordValue.length >= 6);
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

    if (isEmailValid && isPasswordValid && isRecaptchaVerified) {
      try {
        // Send email and password to the API to update the password
        const response = await axios.post("/api/set-password", {
          email,
          password,
        });

        if (response.data.success) {
          // Automatically log the user in after setting the password
          const loginResult = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });

          if (loginResult.error) {
            toast.error("Login failed. Please check your credentials.");
          } else {
            toast.success("Password set successfully and logged in.");
            router.push("/PrimaryReviewer/PRDashboard"); // Redirect to homepage or dashboard
          }
        } else {
          toast.error("Error setting password: " + response.data.message);
        }
      } catch (error) {
        toast.error("Failed to set password: " + error.message);
      }
    } else {
      toast.warn("Please complete all fields and verify the reCAPTCHA.");
    }
  };
  return (
    <div>
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
          <h1 className="admin-signin-title">Set Password</h1>
          <p className="admin-signin-text">
            Please set your password to complete the sign in process.
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
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
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
              Need help signing in? <a href="/faqs">Learn More</a>
            </p>
            <p>
              <a href="/">Return to Home</a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
