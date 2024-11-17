import connectDB from "../../../../utils/database";
import ResubmissionRemarksModel from "../../../../models/resubmissionRemarks";
import { NextRequest, NextResponse } from "next/server";
import express from "express";
import cors from "cors";

//cors
const app = express();
app.use(cors());

export async function POST(req, res) {
    try {
        const resubmission = await req.json();
        const { subFormId } = resubmission;
        await connectDB();

        // Fetch existing resubmissions for the given subFormId
        const existingResubmissions = await ResubmissionRemarksModel.find({ subFormId });

        console.log("Existing Resubmissions Count: ", existingResubmissions.length);

        // Initialize all resubmission flags as false
        let resubmission0 = false;
        let resubmission1 = false;
        let resubmission2 = false;

        // Set flags based on the number of existing resubmissions
        if (existingResubmissions.length === 0) {
            resubmission0 = true; // First resubmission
        } else if (existingResubmissions.length === 1) {
            resubmission1 = true; // Second resubmission
        } else if (existingResubmissions.length === 2) {
            resubmission2 = true; // Third resubmission
        }

        console.log("Resubmission Flags: ", { resubmission0, resubmission1, resubmission2 });

        // Construct the new resubmission object
        const newResubmission = {
            ...resubmission,
            resubmission0,
            resubmission1,
            resubmission2,
        };

        // Save the new resubmission to the database
        const savedResubmission = await ResubmissionRemarksModel.create(newResubmission);
        return NextResponse.json(savedResubmission, { status: 201 });

    } catch (error) {
        console.error("Error saving resubmission:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}



export async function GET(req) {
    try {
        await connectDB();
        const url = new URL(req.url);
        const subFormId = url.searchParams.get('subFormId');
        console.log("Form ID Parameter: ", subFormId);
        const getResubmissionRemarks = await ResubmissionRemarksModel.find({ subFormId });
        if (!getResubmissionRemarks) {
            return NextResponse.json({ error: "Remarks not found" }, { status: 404 });
        }

        return NextResponse.json({ getResubmissionRemarks }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}