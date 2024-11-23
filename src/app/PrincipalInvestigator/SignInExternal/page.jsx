"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState } from "react";
import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  FormLabel,
  Button,
} from "react-bootstrap";
import bg from "../../../../public/images/signin/bg.png";
import USTLogo from "../../../../public/images/signin/USTLogo.png";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";

// CSS
import "../../styles/signin/SignIn.css";

// Components
import SignInFooter from "../../components/siginin/SignInFooter";

function SignIn() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const [enterPassword, setEnterPassword] = useState(false); // Reflects whether to enter password
  const [showPassword, setShowPassword] = useState(false);
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
      const response = await axios.post("/api/externalInvestigatorLogin", {
        email,
        accessToken, // Could be either the access token or password
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
          router.push("/"); // Redirect to home or another protected page
        }
        // else {
        //   toast.error("Failed to create session");
        // }
        // If first-time login, redirect to password setup
        if (response.data.message.includes("set your password")) {
          toast.success("Sign in successful, please create a password");
          router.push(
            `/PrincipalInvestigator/SignInExternal/SetPassword?accessToken=${accessToken}`
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
    <div className="thomasian-cont">
      <Container>
        <Row className="thomasian-cont-border g-0">
          <Col>
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

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <div className="thomasian-formtext">
                  <FormLabel>Email</FormLabel>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={handleEmailChange}
                  />

                  <FormLabel>Password or Access Token</FormLabel>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      value={accessToken}
                      onChange={handleAccessTokenChange}
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
                </div>

                <Row className="align-items-center">
                  <Col>
                    <div className="thomasian-captchasign-container">
                      <ReCAPTCHA
                        className="thomasian-captchasign"
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        size="normal"
                        onChange={handleRecaptchaChange}
                      />
                    </div>
                  </Col>

                  <Col>
                    <Button
                      type="submit"
                      variant="outline-warning"
                      className="thomasian-btnlogin"
                      disabled={
                        !isEmailValid || !isTokenValid || !isRecaptchaVerified
                      }
                    >
                      Log In
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
            </Form>

            <hr />

            <SignInFooter />
          </Col>
        </Row>
      </Container>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default SignIn;
