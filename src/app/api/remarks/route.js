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