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
                  {/* column 1 */}
                  <Col>
                    <Image
                      src={whitefaqicon}
                      alt="faq icon"
                      className="section-4-faq"
                    />
                    <h1>Process of Submission</h1>

                    <p>
                      This section describes the submission procedures of an
                      application for research ethics review to the UST
                      Institutional Research Ethics Board (IREB).
                    </p>

                    <p>
                      1. If the principal investigator is within UST, they can
                      access the portal using their UST Gmail account. If the
                      principal investigator is outside UST, they must request
                      an account from IREB by submitting a letter of intent.
                      Once endorsed, IREB will provide a unique token to access
                      the portal. Click here to learn more about creating an
                      account.
                    </p>

                    <p>
                      2. The principal investigator reviews the Research Ethics
                      Committee (REC) initial requirements of the chosen college
                      where the research paper will be submitted.
                    </p>

                    <p>
                      3. When logged in at the UST IREB Portal, the principal
                      investigator must complete the online forms and upload all
                      the required documents in PDF format.
                    </p>

                    <p>
                      4. The REC evaluates the submitted requirements. If the
                      requirements meet REC standards, the principal
                      investigator must process the payment fee for the chosen
                      REC and submit proof of payment.
                    </p>

                    <p>
                      5. The submission will then be classified as expedited,
                      exempt, or subject to a full board review, depending on
                      the nature of the research. If the submission undergoes a
                      full board or expedited review, the REC designates a
                      primary reviewer to assess the content of the research
                      paper.
                    </p>

                    <p>
                      6. If revisions are requested by the primary reviewer, the
                      principal investigator must resubmit the necessary
                      revisions in the portal. If they wish to appeal the
                      requested revision, they can do so using the designated
                      comment section in the resubmission.
                    </p>

                    <p>
                      7. The principal investigator has 1-3 weeks to make
                      revisions. If no resubmissions are received after 1 month,
                      the research submission will be marked as deferred.
                    </p>

                    <p>
                      8. Each resubmission will take around 1-2 weeks to be
                      reviewed. If no further revisions are required, the paper
                      proceeds to the final review by the respective REC Chair.
                    </p>

                    <p>
                      9. Upon approval, the principal investigator receives a
                      certificate of ethics review. If disapproved, they receive
                      a letter of disapproval. If the research is classified as
                      exempt, a certification of exemption from ethical review
                      is issued.
                    </p>
                  </Col>

                  {/* column 2 */}
                  <Col>
                    <Image
                      src={flowchart}
                      alt="flowchart"
                      className="section-4-flowchart"
                    />
                  </Col>
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
