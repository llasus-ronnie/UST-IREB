"use client";
// Dependencies
import { signIn, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Images
import Image from "next/image";
import GoogleLogo from "../../../public/images/signin/signin-google-logo.png";
import bgAdmin from "../../../public/images/signin/AdminBg.jpg";
import USTLogo from "../../../public/images/signin/USTLogo.png";

// CSS
import "../styles/signin/SignInAdminThomasian.css";

export default function SignIn() {
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const routeUserByRole = async () => {
      if (status === "authenticated") {
        setIsLoading(true);
        const { role, email } = session.user;

        try {
          // First check for IREB role
          if (role === "IREB") {
            toast.success("Successfully logged in!");
            router.push("/IREB/IREBDashboard");
            return;
          }

          // Finally check for PrimaryReviewer role
          if (role === "PrimaryReviewer") {
            toast.success("Successfully logged in!");
            router.push("/PrimaryReviewer/PRDashboard");
            return;
          }

          // Then check for REC role
          const recResponse = await axios.get(`/api/REC?email=${email}`);
          const recData = recResponse.data.data;

          let userRec = recData.find((rec) => rec.email === email);

          if (!userRec) {
            // If not found in REC table, check RECMembers table
            const recMembersResponse = await axios.get(
              `/api/RECMembers?email=${email}`
            );
            const recMembersData = recMembersResponse.data.data;

            userRec = recMembersData.find(
              (recMember) => recMember.email === email
            );
          }

          if (userRec) {
            const recName = userRec.rec
              ? userRec.rec.replace(/\s+/g, "")
              : userRec.name.replace(/\s+/g, "");
            toast.success("Successfully logged in!");
            router.push(`/REC/RECdashboard/${recName}`);
            return;
          }

          // If no role matches, route to Unauthorized
          router.push("../Unauthorized");
        } catch (error) {
          console.error("Error routing user by role:", error);
          toast.error("Error logging in. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    routeUserByRole();
  }, [status, session, router]);

  const handleRecaptchaChange = (value) => {
    setIsRecaptchaVerified(!!value);
  };

  const handleSignIn = () => {
    signIn("google");
  };

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="spinner-container">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }

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
          <h1 className="admin-signin-title">Thomasian Admin Sign In</h1>
          <p className="admin-signin-text">
            Welcome, Thomasian Admin! To access your account, please sign in
            using your UST Google Account.
          </p>

          <button
            className="admin-google-btn"
            onClick={handleSignIn}
            disabled={!isRecaptchaVerified}
          >
            <Image src={GoogleLogo} alt="Google Logo" className="google-logo" />
            Sign in with Google
          </button>

          <div className="recaptcha-wrapper">
            <ReCAPTCHA
              className="admin-recaptcha"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              size="normal"
              onChange={handleRecaptchaChange}
            />
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
      <ToastContainer position="bottom-right" />
    </div>
  );
}
