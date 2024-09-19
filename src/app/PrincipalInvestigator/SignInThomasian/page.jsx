"use client";
//dependencies
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

import Image from "next/image";
import Link from "next/link";

//images
import GoogleLogo from "../../../../public/images/signin/signin-google-logo.png";
import bg from "../../../../public/images/signin/bg.png";
import USTLogo from "../../../../public/images/signin/USTLogo.png";

//css
import "../../styles/signin/SignIn.css";

//components
import SignInFooter from "../../components/siginin/SignInFooter";

export default function SignIn() {
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);

  const handleRecaptchaChange = (value) => {
    setIsRecaptchaVerified(!!value);
  };

  return (
    <>
      <div className="thomasian-cont">
        <Container>
          <Row className="thomasian-cont-border justify-content-md-center g-0">
            <Col className="thomasian-lft">
              <Image src={bg} alt="" className="thomasian-bg" />
            </Col>

            <Col className="thomasian-SignInHeader">
              <div className="thomasian-Sign">
                <Image src={USTLogo} alt="" className="thomasian-logo" />
                <h1 className="d-inline">
                  <b>UST IREB</b> Research Portal
                </h1>
              </div>

              <h1 className="thomasian-signin">Sign In</h1>

              <p className="thomasian-text">
                Welcome, Thomasian! To access all IREB research portal
                submission features, sign in with your UST Google Account.{" "}
                <br /> <br /> Kindly check the box below to proceed.
              </p>

              <div className="thomasian-recap">
                <button
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="thomasian-google"
                  disabled={!isRecaptchaVerified}
                >
                  <Image
                    src={GoogleLogo}
                    alt="Google Logo"
                    className="google-logo"
                    width={20}
                    height={20}
                  />
                  Sign in
                </button>

                <div className="captchasign-container">
                  <ReCAPTCHA
                    className="thomasian-captchasign"
                    sitekey="6LfgAgkqAAAAAC_WvkqfnkIF-NUvwHnVOPyDkD2G"
                    size="normal"
                    onChange={handleRecaptchaChange}
                  />
                </div>
              </div>

              <hr />

              <SignInFooter />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
