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

    const data = await req.json();
    console.log("Received data:", data);

    // Validate the received data
    if (!Array.isArray(data.mainFileLink) || !Array.isArray(data.supplementaryFileLink)) {
      return NextResponse.json(
        { error: "Invalid file links format. Expected arrays." },
        { status: 400 }
      );
    }

    const saveForm = await SubmissionForm.create({
      mainFileLink: data.mainFileLink, 
      supplementaryFileLink: data.supplementaryFileLink, 
      ...data,
    });

    return NextResponse.json({ saveForm }, { status: 200 });
  } catch (error) {
    console.error("Error saving form:", error); 
    return NextResponse.json(
      { error: error.message || "Failed to save form" },
      { status: 500 }
    );
  }
}



export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const rec = searchParams.get("rec");
  const email = searchParams.get("email"); // Get the email from query params
  console.log("REC Parameter: ", rec);
  console.log("Email Parameter: ", email);

  try {
    const query = {};
    if (rec) {
      query.researchEthicsCommittee = rec.trim();
    }
    if (email) {
      query.email = email.trim(); // Add email to the query
    }

    const forms = await SubmissionForm.find(query);

    return NextResponse.json({ forms }, { status: 200 });
  } catch (error) {
    console.error("Error fetching forms:", error);
    return NextResponse.json(
      { error: "Failed to fetch forms" },
      { status: 500 }
    );
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

export async function PUT(req) {
  try{
    await connectDB();
    const formdata = await req.json();
    const { id } = formdata;
    const updatedForm = await SubmissionForm.findOneAndUpdate
    ({id}, formdata, { new: true });
    return NextResponse.json(updatedForm, { status: 200 });
  }catch(error){
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
