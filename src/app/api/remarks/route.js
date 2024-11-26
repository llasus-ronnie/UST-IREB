import connectDB from "../../../../utils/database";
import RemarksModel from "../../../../models/remarksModel";
import { NextRequest, NextResponse } from "next/server";
import express from "express";
import cors from "cors";

//cors
const app = express();
app.use(cors());

export async function POST(req, res) {
  try {
    await connectDB();
    
    // In Next.js 13, you use the 'req.json()' method if using the app directory
    const remarks = await req.json(); // Ensure the parsing is happening correctly

    // Log the data received from the frontend
    console.log("Received Remarks Data:", remarks);

    const saveRemark = await RemarksModel.create(remarks);
    console.log("Saved Remark:", saveRemark);

    return NextResponse.json(saveRemark, { status: 201 });
  } catch (error) {
    console.error("Error saving remark:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET(req) {
  try {
      await connectDB();
      const url = new URL(req.url);
      const subFormId = url.searchParams.get('subFormId');
      console.log("Form ID Parameter: ", subFormId);
      const remarksData = await RemarksModel.find({ subFormId });
      if (!remarksData) {
          return NextResponse.json({ error: "Remarks not found" }, { status: 404 });
      }

      return NextResponse.json({ remarksData }, { status: 200 });
  } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
