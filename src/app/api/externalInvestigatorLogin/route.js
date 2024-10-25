import connectDB from "../../../../utils/database";
import ExternalInvestigator from "../../../../models/externalInvestigatorModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { email, accessToken } = await req.json();

  try {
    // Find the user with matching email and token
    const investigator = await ExternalInvestigator.findOne({
      email,
      accessToken,
    });

    if (!investigator) {
      return NextResponse.json(
        { success: false, error: "Invalid email or access token" },
        { status: 400 }
      );
    }

    // If token is being used for the first time, mark it as used
    if (!investigator.tokenUsed) {
      investigator.tokenUsed = true;
      await investigator.save();
      return NextResponse.json(
        {
          success: true,
          message: "Login successful, please set your password.",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: "Access token has already been used" },
        { status: 403 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
