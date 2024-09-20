"use client"
import React, { use, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import StepBar from "../stepbar/StepBar";
import Navbar from "../navbar/Navbar";
import {
    Container,
    Col,
    Row,
    Form,
    FormLabel,
    FormSelect,
    FormControl,
    Button,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateFormData } from "../../../redux/slices/submissionFormSlice";


export default function AdditionalResearcher({addResearcher, register, index}) {

    // index = useSelector((store) => store.submissionForm.additionalResearcher.length);
    const formData = useSelector((store) => store.submissionForm.formData);
    const dispatch = useDispatch();

    //react hook form
    const { 
        handleSubmit
     } = useForm({
        defaultValues: {
            ...formData
        }
     });

    //  async function processData(data) {
    //     dispatch(updateFormData(data));
    //  }
    return (
        <>
        <Form>
        {/* additional researcher  */}
        <Row style={{ marginTop: "20px" }}>
              <h1 className="resconthead">Additional Researcher {index+1} </h1>
            </Row>

            <Row>
                <Col xs={12} md={6}>
                    <FormLabel className="formtext">Full Name</FormLabel>
                    <FormControl
                        {...register("additionalFullName"+`${index+1}`)}
                        type="text"
                        className="form-control formtext"
                    />
                </Col>

                <Col xs={12} md={6}>
                    <FormLabel className="formtext">Email</FormLabel>
                    <FormControl
                        {...register("additionalEmail"+`${index+1}`)}
                        type="email"
                        className="form-control formtext"
                    />
                </Col>

                <Col xs={12} md={6}>
                    <FormLabel className="formtext">Phone Number</FormLabel>
                    <FormControl
                        {...register("additionalPhone"+`${index+1}`)}
                        type="number"
                        className="form-control formtext"
                    />
                </Col>

                <Col xs={12} md={6}>
                    <FormLabel className="formtext">
                        Institutional Affiliation
                    </FormLabel>
                    <FormControl
                        {...register("additionalInstitutionAffiliation"+`${index+1}`)}
                        type="text"
                        className="form-control formtext"
                    />
                </Col>
            </Row>

            <Row
                style={{ marginTop: "20px", paddingBottom: "20px" }}
                className="justify-content-around"
            >
                <Button variant="outline-secondary" className="formbtn">
                    Cancel
                </Button>
            </Row>
            </Form>
    </>
  )
}
