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
import "../styles/signin/SignInAdminThomasian.css";

export default function SignIn() {
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const userRole = session.user.role;
      if (userRole === "IREB") {
        router.push("/IREB/IREBDashboard");
      } else if (userRole === "PrimaryReviewer") {
        router.push("/PrimaryReviewer/PRDashboard");
      } else if (userRole === "REC") {
        router.push("/REC/RECdashboard/[rec]");
      } else {
        router.push("../Unauthorized");
      }
    }
  }, [session, status, router]);

  const handleRecaptchaChange = (value) => {
    setIsRecaptchaVerified(!!value);
  };

  const handleSignIn = () => {
    signIn("google");
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
          <h1 className="admin-signin-title">Thomasian Admin Sign In</h1>
          <p className="admin-signin-text">
          Welcome, Thomasian Admin! To access your account, please sign in using your UST Google Account.</p>

          <button className="admin-google-btn" onClick={handleSignIn}>
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
