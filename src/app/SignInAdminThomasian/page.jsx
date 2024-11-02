"use client";
// Dependencies
import { signIn, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import { Spinner } from "react-bootstrap";
import axios from "axios";

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
          // Fetch REC member data by email
          const response = await axios.get(`/api/RECMembers?email=${email}`);
          const recMemberData = response.data.data;

          console.log("REC Member Data:", recMemberData);

          if (role === "IREB") {
            router.push("/IREB/IREBDashboard");
          } else if (role === "PrimaryReviewer") {
            router.push("/PrimaryReviewer/PRDashboard");
          } else if (role === "REC" && recMemberData.length > 0) {
            // Route to the specific REC dashboard based on fetched data
            const recName = recMemberData[0].rec.replace(/\s+/g, "");
            console.log("Redirecting to REC Dashboard:", recName);
            router.push(`/REC/RECdashboard/${recName}`);
          } else {
            router.push("../Unauthorized");
          }
        } catch (error) {
          console.error("Error fetching REC member data:", error);
          router.push("../Unauthorized");
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
              Need help signing in? <a href="#">Learn More</a>
            </p>
            <p>
              <a href="/">Return to Home</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
