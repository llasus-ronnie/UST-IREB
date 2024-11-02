"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

//components
import Navbar from "../components/navbar/Navbar";
import Card from "../components/card/Card";
import Footer from "../components/footer/Footer";
import dynamic from "next/dynamic";
const Carousel = dynamic(() => import("react-bootstrap/Carousel"), {
  ssr: false,
});
import CardCarousel from "../components/cardcarousel/CardCarousel";

//images
import viewIcon from "../../../public/images/card/card-view-icon.png";
import submitIcon from "../../../public/images/card/card-submit-icon.png";
import profileIcon from "../../../public/images/card/card-profile-icon.png";
import faqIcon from "../../../public/images/card/card-faq-icon.png";
import whitefaqicon from "../../../public/images/home/white-faq-icon.png";
import flowchart from "../../../public/images/home/section-4-flowchart.png";

// css
import "../styles/home/home.css";
import "bootstrap/dist/css/bootstrap.min.css";

//extra dependencies
import Image from "next/image";

function Home() {
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
                  <button className="get-started">Get Started</button>
                  <button className="learn-more">Learn More</button>
                </div>
              </div>
            </div>

            <div className="yellow-bar"></div>

            {/* section 2 */}
            <div className="section-2">
              <div className="section-2-content">
                {/* card 1 */}
                <Card
                  image={viewIcon}
                  alt="view icon"
                  title="Ethics Review Guidelines"
                  content="View an overview of the ethics review process and guidelines here."
                />

                {/* card 2 */}
                <Card
                  image={submitIcon}
                  alt="submit icon"
                  title="Submission Requirements"
                  content="Access the submission requirements and necessary links here."
                />

                {/* card 3 */}
                <Card
                  image={profileIcon}
                  alt="profile icon"
                  title="How to Create an Account"
                  content="Learn how both Thomasian and external researchers can create an account here."
                />

                {/* card 4 */}
                <Card
                  image={faqIcon}
                  alt="faq icon"
                  title="Frequent Questions"
                  content="Get answers to frequently asked questions about UST ethics review here."
                />
              </div>
            </div>

            {/* section 3 */}
            <div className="section-3">
              <Carousel />
            </div>

            <div className="yellow-bar"></div>

            {/* section 4 */}
            <div className="section-4">
              <Container>
                <Row className="row-alignment">

                  <CardCarousel />

                  <Image
                      src={flowchart}
                      alt="flowchart"
                      className="section-4-flowchart"
                    />
                    
                  {/* <Col>
                    <Image
                      src={whitefaqicon}
                      alt="faq icon"
                      className="section-4-faq"
                    />
                    <CardCarousel />
                  </Col> */}

                  {/* column 2 */}
                  {/* <Col>
                    <Image
                      src={flowchart}
                      alt="flowchart"
                      className="section-4-flowchart"
                    />
                  </Col> */}
                </Row>
              </Container>
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
