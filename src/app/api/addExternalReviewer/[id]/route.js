import connectDB from "../../../../../utils/database";
import ExternalReviewer from "../../../../../models/externalReviewerModel";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  await connectDB();

  const { id } = params; // Capture the ID from the URL
  const { name, affiliation, isArchived } = await req.json();

  try {
    const updateData = { name, affiliation };
    if (isArchived !== undefined) {
      updateData.isArchived = isArchived;
    }

    const updatedReviewer = await ExternalReviewer.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
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
