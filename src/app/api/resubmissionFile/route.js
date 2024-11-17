import connectDB from "../../../../utils/database";
import ResubmissionModel from "../../../../models/resubmissionModel";
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

        const existingResubmissions = await ResubmissionModel.find({ subFormId });

        console.log("Existing Resubmissions Count: ", existingResubmissions.length);

        let resubmission1 = false;
        let resubmission2 = false;

        if (existingResubmissions.length === 0) {
            resubmission1 = true; 
        } else if (existingResubmissions.length === 1) {
            resubmission2 = true; 
        }

        const newResubmission = {
            ...resubmission,
            resubmission1,
            resubmission2,
        };
        const savedResubmission = await ResubmissionModel.create(newResubmission);
        return NextResponse.json(savedResubmission, { status: 201 });

    } catch (error) {
        console.error("Error saving resubmission:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};


export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const subFormId = searchParams.get("subFormId");

        if (!subFormId) {
            return NextResponse.json({ error: "Missing 'subFormId' parameter" }, { status: 400 });
        }

        await connectDB();

        const resubmission = await ResubmissionModel.find({ subFormId });

        if (!resubmission || resubmission.length === 0) {
            return NextResponse.json({ error: "No data found" }, { status: 404 });
        }

        const sortedResubmissions = resubmission.sort((a, b) => {
            const dateA = new Date(a.resubmissionFileDate);
            const dateB = new Date(b.resubmissionFileDate);
            return dateA - dateB; 
        });

        // Return sorted data
        return NextResponse.json(
            {
                resubmission1: sortedResubmissions[0] || null,
                resubmission2: sortedResubmissions[1] || null,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching resubmission:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
