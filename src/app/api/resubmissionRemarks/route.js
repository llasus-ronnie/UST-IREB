import connectDB from "../../../../utils/database";
import ResubmissionRemarksModel from "../../../../models/resubmissionRemarks";
import { NextRequest, NextResponse } from "next/server";
import express from "express";
import cors from "cors";

//cors
const app = express();
app.use(cors());

// POST Route: Adjusting to handle subFormId from request body
export async function POST(req) {
    try {
      // Parse the incoming JSON payload
      const resubmission = await req.json();
  
      const { subFormId, resubmissionFile, resubmissionComments } = resubmission;
  
      if (!subFormId) {
        console.log("Error: subFormId is required");
        return NextResponse.json({ error: "subFormId is required" }, { status: 400 });
      }
  
      console.log("Received resubmission data:", { resubmissionFile, resubmissionComments });
  
      await connectDB();
  
      const existingResubmissions = await ResubmissionRemarksModel.find({ subFormId });
      console.log("Existing Resubmissions Count: ", existingResubmissions.length);
  
      const newResubmission = {
        subFormId,
        resubmissionFile: resubmissionFile || [], // Default to an empty array if not provided
        resubmissionComments: resubmissionComments || "", // Optional field
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