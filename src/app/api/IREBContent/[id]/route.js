import connectDB from "../../../../../utils/database";
import IREBContent from "../../../../../models/irebcontentModel";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  await connectDB();

  const { id } = params;
  const { heading, body, isArchived } = await req.json();

  try {
    const updatedIREBContent = await IREBContent.findByIdAndUpdate(
      id,
      { heading, body, isArchived },
      { new: true }
    );

    if (!updatedIREBContent) {
      return NextResponse.json(
        { success: false, error: "Content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedIREBContent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
