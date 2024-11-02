import React from 'react';
import { Carousel, Card, Col, Row } from 'react-bootstrap';
// import whitefaqicon from "../../../public/images/card/card-faq-icon.png";

import '../../styles/carousel/cardcarousel.css';

const CardCarousel = () => {
  const steps = [
    { title: "Step 1", description: "If the principal investigator is within UST, they can access the portal using their UST Gmail account. If the principal investigator is outside UST, they must request an account from IREB by submitting a letter of intent. Once endorsed, IREB will provide a unique token to access the portal. Click here to learn more about creating an account." },
    { title: "Step 2", description: "The principal investigator reviews the Research Ethics Committee (REC) initial requirements of the chosen college where the research paper will be submitted." },
    { title: "Step 3", description: "When logged in at the UST IREB Portal, the principal investigator must complete the online forms and upload all the required documents in PDF format." },
    { title: "Step 4", description: "The REC evaluates the submitted requirements. If the requirements meet REC standards, the principal investigator must process the payment fee for the chosen REC and submit proof of payment." },
    { title: "Step 5", description: "The submission will then be classified as expedited, exempt, or subject to a full board review, depending on the nature of the research. If the submission undergoes a full board or expedited review, the REC designates a primary reviewer to assess the content of the research paper." },
    { title: "Step 6", description: "If revisions are requested by the primary reviewer, the principal investigator must resubmit the necessary revisions in the portal. If they wish to appeal the requested revision, they can do so using the designated comment section in the resubmission." },
    { title: "Step 7", description: "The principal investigator has 1-3 weeks to make revisions. If no resubmissions are received after 1 month, the research submission will be marked as deferred." },
    { title: "Step 8", description: "Each resubmission will take around 1-2 weeks to be reviewed. If no further revisions are required, the paper proceeds to the final review by the respective REC Chair." },
    { title: "Step 9", description: "Upon approval, the principal investigator receives a certificate of ethics review. If disapproved, they receive a letter of disapproval. If the research is classified as exempt, a certification of exemption from ethical review is issued." },
  ];

  const groupedSteps = [];
  for (let i = 0; i < steps.length; i += 3) {
    groupedSteps.push(steps.slice(i, i + 3));
  }

  return (
    <Carousel controls indicators={false} interval={null} className="card-carousel">
      {groupedSteps.map((group, index) => (
        <Carousel.Item key={index} className="carousel-item">
          <Row className="justify-content-center">
            {group.map((step, idx) => (
              <Col md={4} key={idx} className="d-flex align-items-stretch">
                <Card className="carousel-card">
                  {/* Uncomment and update the path if needed */}
                  {/* {index === 0 && idx === 0 && (
                    <Image
                      src={whitefaqicon}
                      alt="FAQ icon"
                      className="section-4-faq"
                      fluid
                    />
                  )} */}
                  <Card.Body className="carousel-card-body">
                    <Card.Title className="card-title">{step.title}</Card.Title>
                    <Card.Text className="carousel-card-text">{step.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CardCarousel;
