import connectDB from "../../../../utils/database";
import ExternalReviewer from "../../../../models/externalReviewerModel";
import { hashPassword } from "../../../../pages/api/auth/[...nextauth]";
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
  const name = searchParams.get("name");
  const rec = searchParams.get("rec");

  try {
    const filter = { ...(name && { name }), ...(rec && { rec }) };
    const reviewers = await ExternalReviewer.find(filter);
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
