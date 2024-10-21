import connectDB from "../../../../utils/database";
import SubmissionForm from "../../../../models/subFormModel";
import { NextRequest, NextResponse } from "next/server";
import express from "express";
import cors from "cors";

//cors
const app = express();
app.use(cors());
export async function POST(req, res) {
  try {
    await connectDB();
    const formdata = await req.json();
    const saveForm = await SubmissionForm.create(formdata);
    return NextResponse.json(saveForm, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await connectDB();
  
  // Extract query params from the request URL
  const { searchParams } = new URL(req.url);
  const rec = searchParams.get('rec'); // Get 'rec' from query params
  console.log("REC: ", rec);
  
  try {
    const forms = rec
      ? await SubmissionForm.find({ researchEthicsCommittee: rec.trim() })
      : await SubmissionForm.find({}); // Return all forms if no 'rec'
    
    return NextResponse.json({ forms }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch forms' }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "ID is required" }), {
      status: 400,
    });
  }

  try {
    await connectDB();
    await SubmissionForm.findByIdAndDelete(id);

    return new Response(JSON.stringify({ message: "Successfully deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
