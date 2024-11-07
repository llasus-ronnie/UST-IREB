import connectDB from "../../../../utils/database";
import ExternalReviewer from "../../../../models/externalReviewerModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { name, affiliation, email, token } = await req.json();

  try {
    const newReviewer = new ExternalReviewer({
      name,
      affiliation,
      email,
      accessToken: token,
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

export async function GET() {
  await connectDB();

  try {
    const externalReviewers = await ExternalReviewer.find({});
    return NextResponse.json(
      { success: true, data: externalReviewers },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  await connectDB();

  const { id, name, affiliation } = await req.json();

  console.log("Updating reviewer with ID:", id); // Log the ID

  try {
    const updatedReviewer = await ExternalReviewer.findByIdAndUpdate(
      id,
      { name, affiliation },
      { new: true }
    );

    if (!updatedReviewer) {
      console.error("Reviewer not found for ID:", id); // Log if not found
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
    console.error("Error in PATCH:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
