"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import "../styles/faqs/faqs.css";
import { Container, Row, Accordion } from "react-bootstrap";

function FAQs() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/IREBContent");
        console.log("API Response:", response.data);

        const filteredContent = response.data.data.filter(
          (faq) => !faq.isArchived
        );

        setContent(filteredContent);
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
          <h1 className="text-center">Frequently Asked Questions</h1>
        </div>

        <Row className="faqdivider" />

        <Container>
          <Accordion style={{ paddingTop: "2em", paddingBottom: "2em" }}>
            {content.map((faq, index) => (
              <Accordion.Item key={index} eventKey={index + 1}>
                <Accordion.Header className="accheader">
                  {faq.heading}
                </Accordion.Header>
                <Accordion.Body className="accbody">{faq.body}</Accordion.Body>
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

export default FAQs;
