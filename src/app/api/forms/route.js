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

    if (
      !Array.isArray(data.mainFileLink) ||
      data.mainFileLink.some((file) => typeof file.url !== "string" || typeof file.filename !== "string")
    ) {
      return NextResponse.json(
        { error: "Invalid mainFileLink format. Expected an array of objects with url and filename." },
        { status: 400 }
      );
    }

    if (
      data.supplementaryFileLink &&
      (!Array.isArray(data.supplementaryFileLink) ||
        data.supplementaryFileLink.some((file) => typeof file.url !== "string" || typeof file.filename !== "string"))
    ) {
      return NextResponse.json(
        { error: "Invalid supplementaryFileLink format. Expected an array of objects with url and filename." },
        { status: 400 }
      );
    }

    const saveForm = await SubmissionForm.create({
      ...data,
      mainFileLink: data.mainFileLink, // no transformation needed here
      supplementaryFileLink: data.supplementaryFileLink || [], // if supplementaryFileLink is present
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
  const email = searchParams.get("email"); 
  const subformId = searchParams.get("subformId");

  try {
    const query = { isArchived: false };

    if (subformId) {
      query._id = subformId.trim();
    }
    if (rec) {
      query.researchEthicsCommittee = rec.trim();
    }
    if (email) {
      query.$or = [
        { recMember: { $in: [email.trim()] } },
        { userEmail: email.trim() } 
      ];
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
  try {
    await connectDB();
    const formData = await req.json();
    const { id, archived, mainFileLink, supplementaryFileLink, ...otherData } = formData;

    console.log("Received formData:", formData);

    if (!id) {
      console.error("Error: ID is required");
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    if (
      mainFileLink &&
      (!Array.isArray(mainFileLink) ||
        mainFileLink.some(
          (file) => typeof file.url !== "string" || typeof file.filename !== "string"
        ))
    ) {
      console.error("Invalid mainFileLink format:", mainFileLink);
      return NextResponse.json(
        { error: "Invalid mainFileLink format. Expected an array of objects with url and filename." },
        { status: 400 }
      );
    }

    if (
      supplementaryFileLink &&
      (!Array.isArray(supplementaryFileLink) ||
        supplementaryFileLink.some(
          (file) => typeof file.url !== "string" || typeof file.filename !== "string"
        ))
    ) {
      console.error("Invalid supplementaryFileLink format:", supplementaryFileLink);
      return NextResponse.json(
        { error: "Invalid supplementaryFileLink format. Expected an array of objects with url and filename." },
        { status: 400 }
      );
    }

    const existingForm = await SubmissionForm.findById(id);
    if (!existingForm) {
      console.error("Error: Form not found with ID", id);
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    if (typeof archived === 'boolean') {
      existingForm.archived = archived; 
    }


    const updatedForm = await SubmissionForm.findByIdAndUpdate(
      id,
      {
        ...otherData,
        mainFileLink: mainFileLink || existingForm.mainFileLink,
        supplementaryFileLink: supplementaryFileLink || existingForm.supplementaryFileLink,
        archived: archived !== undefined ? archived : existingForm.archived, // Only update if passed
      },
      { new: true }
    );

    console.log("Updated Form:", updatedForm);

    return NextResponse.json(updatedForm, { status: 200 });
  } catch (error) {
    console.error("Error in PUT:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

