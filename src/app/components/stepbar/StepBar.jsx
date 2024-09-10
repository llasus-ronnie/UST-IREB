import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../../styles/forms/Forms.css";

const StepBar = ({ currentPage }) => {
  const getColor = (page) => {
    return currentPage === page ? "#FCBF15" : "#FFFFFF";
  };

  return (
    <div>
      <Container>
        <Row className="stepbar-nav">
          <Col className="d-flex flex-column align-items-center text-center stepbar-colpad">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="52"
              viewBox="0 0 62 62"
              fill="none"
            >
              <circle
                cx="31"
                cy="31"
                r="31"
                fill={getColor(1)}
                fill-opacity="0.93"
              />
              <text
                x="50%"
                y="50%"
                dominant-baseline="middle"
                text-anchor="middle"
                fill="black"
                font-size="20px"
                font-family="Poppins"
                font-weight="bold"
              >
                1
              </text>
            </svg>
            <p className="stepbar-navtext">Research Classification</p>
          </Col>

          <Col className="d-flex flex-column align-items-center text-center stepbar-colpad">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="52"
              viewBox="0 0 62 62"
              fill="none"
            >
              <circle
                cx="31"
                cy="31"
                r="31"
                fill={getColor(2)}
                fill-opacity="0.93"
              />
              <text
                x="50%"
                y="50%"
                dominant-baseline="middle"
                text-anchor="middle"
                fill="black"
                font-size="20px"
                font-family="Poppins"
                font-weight="bold"
              >
                2
              </text>
            </svg>
            <p className="stepbar-navtext">Proposal Metadata</p>
          </Col>

          <Col className="d-flex flex-column align-items-center text-center stepbar-colpad">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="52"
              viewBox="0 0 62 62"
              fill="none"
            >
              <circle
                cx="31"
                cy="31"
                r="31"
                fill={getColor(3)}
                fill-opacity="0.93"
              />
              <text
                x="50%"
                y="50%"
                dominant-baseline="middle"
                text-anchor="middle"
                fill="black"
                font-size="20px"
                font-family="Poppins"
                font-weight="bold"
              >
                3
              </text>
            </svg>
            <p className="stepbar-navtext">Supplementary Materials</p>
          </Col>

          <Col className="d-flex flex-column align-items-center text-center stepbar-colpad">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="52"
              viewBox="0 0 62 62"
              fill="none"
            >
              <circle
                cx="31"
                cy="31"
                r="31"
                fill="#FFFFFF"
                fill-opacity="0.93"
              />
              <text
                x="50%"
                y="50%"
                dominant-baseline="middle"
                text-anchor="middle"
                fill="black"
                font-size="20px"
                font-family="Poppins"
                font-weight="bold"
              >
                4
              </text>
            </svg>
            <p className="stepbar-navtext">Summary of Proposal</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StepBar;
