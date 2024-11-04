import React from 'react';
import { Carousel, Card, Col, Row, Image } from 'react-bootstrap';
// import whitefaqicon from './path/to/your/icon.png'; // Uncomment and update the path if needed
import '../../styles/carousel/cardcarousel.css';
const CardCarousel = () => {
  const steps = [
    { title: "Step 1", description: "If the principal investigator is within UST, they can access the portal using their UST Gmail account..." },
    { title: "Step 2", description: "The principal investigator reviews the REC initial requirements of the chosen college..." },
    { title: "Step 3", description: "When logged in at the UST IREB Portal, the principal investigator must complete online forms and upload documents..." },
    { title: "Step 4", description: "The REC evaluates the submitted requirements..." },
    { title: "Step 5", description: "The submission will be classified as expedited, exempt, or full board review..." },
    { title: "Step 6", description: "If revisions are requested, the principal investigator must resubmit in the portal..." },
    { title: "Step 7", description: "The principal investigator has 1-3 weeks to make revisions; if none are received, the submission is marked deferred..." },
    { title: "Step 8", description: "Each resubmission will take around 1-2 weeks for review..." },
    { title: "Step 9", description: "Upon approval, the principal investigator receives a certificate of ethics review..." },
  ];
  const groupedSteps = [];
  for (let i = 0; i < steps.length; i += 3) {
    groupedSteps.push(steps.slice(i, i + 3));
  }
  return (
    <Carousel controls indicators={false} interval={null}>
      {groupedSteps.map((group, index) => (
        <Carousel.Item key={index}>
          <Row className="justify-content-center">
            {group.map((step, idx) => (
              <Col md={4} key={idx} className="d-flex align-items-stretch">
                <Card className="text-center mb-4">
                  {/* {index === 0 && idx === 0 && (
                    <Image
                     src={whitefaqicon}
                      alt="FAQ icon"
                      className="section-4-faq"
                      fluid
                    />
                  )} */}
                  <Card.Body>
                    <Card.Title>{step.title}</Card.Title>
                    <Card.Text>{step.description}</Card.Text>
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