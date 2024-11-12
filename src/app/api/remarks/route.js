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
    const remarks = await req.json();
    const saveRemark = await RemarksModel.create(remarks);
    console.log("REMARKS:", saveRemark);
    return NextResponse.json(saveRemark, { status: 201 });
  } catch (error) {
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
      const subFormId = url.searchParams.get('subFormId');
      console.log("Form ID Parameter: ", subFormId);
      const remarksData = await RemarksModel.findOne({ subFormId });
      if (!remarksData) {
          return NextResponse.json({ error: "Remarks not found" }, { status: 404 });
      }

      return NextResponse.json({ remarksData }, { status: 200 });
  } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
