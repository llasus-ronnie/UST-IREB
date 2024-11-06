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
        } else {
          toast.error("Failed to create session");
        }

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
                  <input
                    type="password"
                    className="form-control"
                    value={accessToken}
                    onChange={handleAccessTokenChange}
                  />
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
