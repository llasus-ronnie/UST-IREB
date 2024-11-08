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
            {content.map((faq, index) => {
              const formattedHeading = faq.heading
                .replace(/([A-Z])/g, " $1")
                .trim();
              return (
                <Accordion.Item key={index} eventKey={index + 1}>
                  <Accordion.Header className="accheader">
                    {formattedHeading}
                  </Accordion.Header>
                  <Accordion.Body className="accbody">
                    {faq.body}
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
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
