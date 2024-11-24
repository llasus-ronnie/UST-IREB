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
        const { subFormId, resubmissionFile, resubmissionComments } = resubmission;
        await connectDB();

        const newResubmission = {
            subFormId,
            resubmissionFile,
            resubmissionComments,
            resubmissionFileDate: new Date(),
        };

        const savedResubmission = await ResubmissionModel.create(newResubmission);

        return NextResponse.json(savedResubmission, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error", error }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const subFormId = searchParams.get("subFormId");

        if (!subFormId) {
            return NextResponse.json({ error: "Missing 'subFormId' parameter" }, { status: 400 });
        }

        await connectDB();

        const resubmissions = await ResubmissionModel.find({ subFormId });

        if (!resubmissions || resubmissions.length === 0) {
            return NextResponse.json({ error: "No resubmissions found" }, { status: 404 });
        }

        // Return all resubmissions without sorting
        return NextResponse.json({ resubmissions }, { status: 200 });

    } catch (error) {
        console.error("Error fetching resubmissions:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

