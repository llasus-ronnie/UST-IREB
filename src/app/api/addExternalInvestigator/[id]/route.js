import connectDB from "../../../../../utils/database";
import ExternalInvestigator from "../../../../../models/externalInvestigatorModel";
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

    const updatedInvestigator = await ExternalInvestigator.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedInvestigator) {
      return NextResponse.json(
        { success: false, error: "Investigator not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedInvestigator },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating investigator:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
