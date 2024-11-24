"use client";
// Dependencies
import { signIn, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "react-bootstrap";
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
  const [passwordError, setPasswordError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d.*\d).{10,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        "Password must contain at least one uppercase letter, a minimum of 10 characters, and at least two numbers."
      );
      setIsPasswordValid(false);
    } else {
      setPasswordError("");
      setIsPasswordValid(true);
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
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
            router.push("/PrimaryReviewer/PRDashboard");
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

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className="admin-input"
            />

            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye-slash"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
              )}
            </Button>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}

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
