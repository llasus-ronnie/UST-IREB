"use client";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";



const page = ({ params }) => {
    const [forms, setForms] = useState(null);

    //GET Form
    useEffect(() => {
        async function fetchData() {
            console.log(params.id);
            try {
                const response = await axios.get(`/api/forms/${params.id}`);
                setForms(response.data.submission);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <Container className="PIforms-cont1">
            <Row className="justify-content-center">
                <h1 className="PIforms-header">Summary of Proposal</h1>
            </Row>

            <Container className="PIforms-rescont">
                <Row>
                    <h1 className="PIforms-resconthead">Research Classification</h1>
                </Row>
                <Col>
                    <p className="PIforms-formtext">
                        <strong>Institution:</strong> {forms?.institution}
                    </p>
                    <p className="PIforms-formtext">
                        <strong>Research Ethics Committee:</strong>{" "}
                        {forms?.researchEthicsCommittee}
                    </p>
                </Col>
            </Container>
        </Container>
    );
}

export default page