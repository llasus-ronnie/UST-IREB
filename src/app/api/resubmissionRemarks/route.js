import connectDB from "../../../../utils/database";
import ResubmissionRemarksModel from "../../../../models/resubmissionRemarks";
import { NextRequest, NextResponse } from "next/server";
import express from "express";
import cors from "cors";

//cors
const app = express();
app.use(cors());

export async function POST(req) {
  try {
    const resubmission = await req.json();

    const {
      subFormId,
      resubmissionRemarksFile,
      resubmissionRemarksComments, 
      resubmissionRemarksMember,
    } = resubmission;

    if (!subFormId) {
      console.error("Error: subFormId is required");
      return NextResponse.json({ error: "subFormId is required" }, { status: 400 });
    }

    await connectDB();

    const newResubmission = {
      subFormId,
      resubmissionRemarksFile: resubmissionRemarksFile || [],
      resubmissionRemarksComments: resubmissionRemarksComments || "", 
      resubmissionRemarksMember
    };

    const savedResubmission = await ResubmissionRemarksModel.create(newResubmission);

    return NextResponse.json(savedResubmission, { status: 201 });
  } catch (error) {
    console.error("Error saving resubmission:", error.message);
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