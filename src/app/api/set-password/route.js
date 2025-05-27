import connectDB from "../../../../utils/database";
import ExternalInvestigator from "../../../../models/externalInvestigatorModel";
import ExternalReviewer from "../../../../models/externalReviewerModel";
import { hashPassword } from "../../../../pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();
  console.log("Received data:", { email, password });

  try {
    let user = await ExternalInvestigator.findOne({ email });

    if (!user) {
      user = await ExternalReviewer.findOne({ email });
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const hashedPassword = await hashPassword(password);
    console.log("Hashed password:", hashedPassword);

    user.password = hashedPassword;
    delete user.accessToken;
    await user.save();

    return NextResponse.json(
      { success: true, message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during password update:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
