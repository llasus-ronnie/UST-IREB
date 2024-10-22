import connectDB from "../../../../utils/database";
import ExternalInvestigator from "../../../../models/externalInvestigatorModel";
import { NextRequest, NextResponse } from "next/server";
import express from "express";
import cors from "cors";

// Initialize express app and use CORS
const app = express();
app.use(cors());

export async function POST(req, res) {
  await connectDB();

  const { email, token } = await req.json();

  try {
    const newInvestigator = new ExternalInvestigator({
      email,
      accessToken: token,
    });
    await newInvestigator.save();
    return NextResponse.json(
      { success: true, data: newInvestigator },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
