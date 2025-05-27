"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSession } from "next-auth/react";

//components
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import dynamic from "next/dynamic";
import Card from "../components/card/Card";
import Carousel from "../components/carousel/Slider";
import SubmissionProcess from "../components/submissionprocess/SubmissionProcess";
import ImageZoom from "../components/imagezoom/ImageZoom";

import flowchart from "../../../public/images/home/section-4-processflowchart.png";

// css
import "../styles/home/home.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Image from "next/image";

function Home() {
  const { data: session } = useSession();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <>
          <div className="header">
            <Navbar />
          </div>

          <div className="body">
            {/* section 1 */}
            <div className="section-1">
              <div className="section-1-content">
                <h3>Welcome to the</h3>
                <h1>Research Portal of the University of Santo Tomas</h1>
                <p>
                  This web portal offers a platform for research submissions,
                  feedback, and certificate issuance. Designed for Thomasian
                  researchers and external investigators, it supports effective
                  management of research ethics review.
                </p>

                <div className="buttons">
                  {session ? (
                    <a href="/form">
                      <button className="get-started">Get Started</button>
                    </a>
                  ) : (
                    <a href="/SignInOption">
                      <button className="get-started">Get Started</button>
                    </a>
                  )}

                  <a href="#submission-process">
                    <button className="learn-more">Learn More</button>
                  </a>
                </div>
              </div>
            </div>

            <div className="yellow-bar"></div>

            {/* section 2 */}
            <div className="section-2">
              <Card />
            </div>

            {/* section 3 */}
            <div className="section-3">
              <Carousel />
            </div>

            <div className="yellow-bar"></div>

            {/* section 4 */}
            <div className="section-4" id="submission-process">
              <SubmissionProcess />

              <div className="section-4-flowchart">
                <ImageZoom />
              </div>
            </div>
          </div>

          <div className="footer">
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default Home;
