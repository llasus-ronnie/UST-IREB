"use client";

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
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import USTLogo from "../../../../../public/images/signin/USTLogo.png";
import bg from "../../../../../public/images/signin/bg.png";
import { signIn } from "next-auth/react";

//css
import "../../../styles/signin/SignIn.css";

//components
import SignInFooter from "../../../components/siginin/SignInFooter";

function SetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

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
            router.push("/"); // Redirect to homepage or dashboard
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
    <div className="thomasian-cont">
      <Container>
        <Row className="thomasian-cont-border g-0">
          <Col>
            <Image src={bg} alt="Background" className="thomasian-bg" />
          </Col>
          <Col className="thomasian-SignInHeader">
            <div className="thomasian-Sign">
              <Image src={USTLogo} alt="UST Logo" className="thomasian-logo" />
              <h1 className="d-inline">
                <b>UST IREB</b> Research Portal
              </h1>
            </div>

            <h1 className="thomasian-signin">Set Password</h1>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <div className="thomasian-formtext">
                  <FormLabel>Email</FormLabel>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />

                  <FormLabel>New Password</FormLabel>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  {passwordError && (
                    <p className="error-message">{passwordError}</p>
                  )}
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
                        !isEmailValid ||
                        !isPasswordValid ||
                        !isRecaptchaVerified
                      }
                    >
                      Set Password
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

export default SetPassword;
