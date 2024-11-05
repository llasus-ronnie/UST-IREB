import connectDB from "../../../../utils/database";
import PaymentModel from "../../../../models/paymentModel";
import { NextRequest, NextResponse } from "next/server";
import express from "express";
import cors from "cors";

//cors
const app = express();
app.use(cors());
export async function POST(req, res) {
    try {
        await connectDB();
        const formdata = await req.json();

        // Log the incoming data
        console.log("Received formdata:", formdata);

        // Check for required fields
        if (!formdata.userEmail || !formdata.formId || !formdata.paymentFile) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const saveForm = await PaymentModel.create(formdata);
        return NextResponse.json(saveForm, { status: 201 });
    } catch (error) {
        console.error("Error in payment API:", error); // More specific error logging
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }   
}

export async function GET(req) {
    try {
        await connectDB();
        const url = new URL(req.url);
        const formId = url.searchParams.get('formId'); // Get formId from the URL parameters
        console.log("Form ID Parameter: ", formId);

        if (!formId) {
            return NextResponse.json({ error: "Form ID is required" }, { status: 400 });
        }

        // Find the payment document by formId instead of _id
        const payment = await PaymentModel.findOne({ formId });
        if (!payment) {
            return NextResponse.json({ error: "Payment not found" }, { status: 404 });
        }

        return NextResponse.json({ payment }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
