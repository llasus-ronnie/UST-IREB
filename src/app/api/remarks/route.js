import connectDB from "../../../../utils/database";
import RemarksModel from "../../../../models/remarksModel";
import { NextRequest, NextResponse } from "next/server";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

export async function POST(req, res) {
  try {
    await connectDB();

    const remarks = await req.json();

    console.log("Received Remarks Data:", remarks);

    const saveRemark = await RemarksModel.create(remarks);
    console.log("Saved Remark:", saveRemark);

    return NextResponse.json(saveRemark, { status: 201 });
  } catch (error) {
    console.error("Error saving remark:", error);
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
    const subFormId = url.searchParams.get("subFormId");
    console.log("Form ID Parameter: ", subFormId);

    const remarksData = await RemarksModel.find({ subFormId });

    if (!remarksData || remarksData.length === 0) {
      return NextResponse.json({ error: "Remarks not found" }, { status: 404 });
    }

    return NextResponse.json(remarksData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
