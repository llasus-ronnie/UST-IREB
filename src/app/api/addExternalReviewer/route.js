import connectDB from "../../../../utils/database";
import ExternalReviewer from "../../../../models/externalReviewerModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { name, affiliation, email, token, rec } = await req.json();

  try {
    const newReviewer = new ExternalReviewer({
      name,
      affiliation,
      email,
      accessToken: token,
      rec,
    });
    await newReviewer.save();
    return NextResponse.json(
      { success: true, data: newReviewer },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const rec = searchParams.get("rec");

  try {
  const query = {};
  if (rec) {
    query.rec = rec.trim();
  }
    const reviewers = await ExternalReviewer.find(query);
    return NextResponse.json(
      { success: true, data: reviewers },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching reviewers:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  await connectDB();

  const { id, name, affiliation, isArchived } = await req.json();

  try {
    const updateData = { name, affiliation };
    if (isArchived !== undefined) {
      updateData.isArchived = isArchived;
    }

    const updatedReviewer = await ExternalReviewer.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedReviewer) {
      return NextResponse.json(
        { success: false, error: "Reviewer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedReviewer },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating reviewer:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
