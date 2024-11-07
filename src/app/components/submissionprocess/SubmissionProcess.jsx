import '../../styles/home/submissionprocess.css';
import { Container, Row, Col } from "react-bootstrap";

export default function SubmissionProcess() {      
    const steps = [
        { number: 1, title: "Access the Portal", description: "UST investigators log in with their UST Gmail, while external investigators request access by submitting a letter of intent to IREB." },
        { number: 2, title: "Check REC Requirements", description: "Review the Research Ethics Committee (REC) requirements for your chosen college before beginning your submission." },
        { number: 3, title: "Complete Submission Forms", description: "Log into the UST IREB Portal, complete the online forms, and upload all required documents in PDF format." },
        { number: 4, title: "Initial Evaluation", description: "The REC will conduct an initial evaluation to ensure completeness and confirm eligibility to proceed." },
        { number: 5, title: "Process Payment", description: "Once eligible, process the REC fee payment and submit proof of payment in the portal." },
        { number: 6, title: "Classification of Review", description: "The REC will classify your submission as expedited, exempt, or full board review based on research type, assigning a primary reviewer if needed." },
        { number: 7, title: "Submit Revisions", description: "Submit any requested revisions within 1–3 weeks, or use the comment section to appeal if needed." },
        { number: 8, title: "Resubmission Review", description: "Resubmitted documents are reviewed in 1–2 weeks, and if not received within 1 month, the submission is deferred." },
        { number: 9, title: "Receive Decision", description: "Upon approval, receive a certificate of ethics review; otherwise, receive a letter of disapproval or a certification of exemption if applicable." }
    ];

    return (
        <Container>
            <Row>
                <Col>
                    <div className="submission-process-container">
                        <div className="submission-process-title">
                            <h1>Process of Submission</h1>
                        </div>

                        <div className="steps-container">
                            {steps.map((step) => (
                                <div key={step.number} className="steps-instructions">
                                    <Row>
                                        <Col xs={3} className="step-number">
                                            <h1>{step.number}</h1>
                                        </Col>
                                        <Col xs={9} className="step-content">
                                            <h2>{step.title}</h2>
                                            <p>{step.description}</p>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}