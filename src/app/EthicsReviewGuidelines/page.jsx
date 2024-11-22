"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "../styles/faqs/faqs.css";
import { Container, Row, Accordion } from "react-bootstrap";

function EthicsReviewGuidelines() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/IREBContent");
        console.log("API Response:", response.data);
        setContent(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <div className="header">
          <Navbar />
        </div>

        <div style={{ paddingTop: "2em" }} className="faqheader">
          <h1 className="text-center">Ethics Review Guidelines</h1>
        </div>

        <Row className="faqdivider" />

        <Container className="erg-container">
          <div className="erg-maincontent">
            <div className="erg-ethics-guidelines">
              <h1>Ethics Guidelines</h1>

              <div className="erg-description">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-info-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
                <p>
                  Access the ethics review guidelines and essential links by
                  clicking on the files below.
                </p>
              </div>

              <ul>
                <li>
                  <a
                    href="https://res.cloudinary.com/dyrf8wr1i/image/upload/v1731219415/SupplementaryFiles/2022-NEGRIHP_OG-ver.pdf"
                    download
                  >
                    2022-NEGRIHP_OG-ver
                  </a>
                </li>

                <li>
                  <a
                    href="https://res.cloudinary.com/dyrf8wr1i/image/upload/v1731220103/SupplementaryFiles/ME22-ATCH-Process-Pathway-Requirements-1.pdf"
                    download
                  >
                    ME22-ATCH-Process-Pathway-Requirements-1
                  </a>
                </li>

                <li>
                  <a
                    href="https://res.cloudinary.com/dyrf8wr1i/image/upload/v1731220172/SupplementaryFiles/ME22-Personal-Data-Request-for-Data-Gathering-Purposes.pdf"
                    download
                  >
                    ME22-Personal-Data-Request-for-Data-Gathering-Purposes
                  </a>
                </li>

                <li>
                  <a
                    href="https://res.cloudinary.com/dyrf8wr1i/image/upload/v1731220248/SupplementaryFiles/MO01_IREB-General-Policies-and-Guidelines-2023.pdf"
                    download
                  >
                    MO01_IREB-General-Policies-and-Guidelines-2023
                  </a>
                </li>

                <li>
                  <a
                    href="https://res.cloudinary.com/dyrf8wr1i/image/upload/v1731220297/SupplementaryFiles/nuremburg_code.pdf"
                    download
                  >
                    nuremburg_code
                  </a>
                </li>

                <li>
                  <a
                    href="https://res.cloudinary.com/dyrf8wr1i/image/upload/v1731220360/SupplementaryFiles/OHRP-Categories-of-REVIEW-v2.pdf"
                    download
                  >
                    OHRP-Categories-of-REVIEW-v2
                  </a>
                </li>

                <li>
                  <a
                    href="https://res.cloudinary.com/dyrf8wr1i/image/upload/v1731220424/SupplementaryFiles/PHREB-Policies-v4.pdf"
                    download
                  >
                    PHREB-Policies-v4
                  </a>
                </li>

                <li>
                  <a
                    href="https://res.cloudinary.com/dyrf8wr1i/image/upload/v1731220471/SupplementaryFiles/Title-45-CFR-Part-46.pdf"
                    download
                  >
                    Title-45-CFR-Part-46
                  </a>
                </li>

                <li>
                  <a
                    href="https://res.cloudinary.com/dyrf8wr1i/image/upload/v1731220516/SupplementaryFiles/WEB-CIOMS-EthicalGuidelines.pdf"
                    download
                  >
                    WEB-CIOMS-EthicalGuidelines
                  </a>
                </li>

                <li>
                  <a
                    href="https://res.cloudinary.com/dyrf8wr1i/image/upload/v1731220602/SupplementaryFiles/wma-declaration-of-helsinki.pdf"
                    download
                  >
                    wma-declaration-of-helsinki
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>

        <div style={{ marginTop: "auto" }} className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default EthicsReviewGuidelines;
