"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "../styles/subreqs/faqs.css";
import { Container, Row, Accordion } from "react-bootstrap";

function Requirements() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/RECContent");
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
          <h1 className="text-center">Submission Requirements</h1>
        </div>

        <Row className="faqdivider" />

        <Container>
          <Accordion style={{ paddingTop: "2em" }}>
            {content.map((faq, index) => (
              <Accordion.Item key={index} eventKey={index + 1}>
                <Accordion.Header className="accheader">
                  {faq.heading}
                </Accordion.Header>
                <Accordion.Body className="accbody">
                  {faq.body}

                  {faq.files && faq.files.length > 0 && (
                    <div className="file-links" style={{ marginTop: "1em" }}>
                      <strong>Download Files:</strong>
                      <ul>
                        {faq.files.map((file, fileIndex) => (
                          <li key={fileIndex}>
                            <a
                              href={file.url} // Assuming file.url contains the file's Cloudinary URL
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {file.filename}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>

        <div style={{ marginTop: "auto" }} className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Requirements;
