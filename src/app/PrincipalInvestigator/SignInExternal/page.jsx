"use client";

import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  FormLabel,
  Button,
} from "react-bootstrap";
import { useState } from "react";
import bg from "../../../../public/images/signin/bg.png";
import USTLogo from "../../../../public/images/signin/USTLogo.png";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "next-auth/react"; // Import signIn method

import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";

//css
import "../../styles/signin/SignIn.css";

//components
import SignInFooter from "../../components/siginin/SignInFooter";

function SignIn() {
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
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
    if (isEmailValid && isTokenValid && isRecaptchaVerified) {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password: accessToken,
      });

      if (result.error) {
        toast.error("Invalid email or access token");
      } else {
        toast.success("Sign in successful");
        router.push("/");
      }
    } else {
      toast.warn("Please complete all fields and verify the reCAPTCHA");
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

                  <FormLabel>Access Token</FormLabel>
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
