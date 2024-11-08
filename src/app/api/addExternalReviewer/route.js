import connectDB from "../../../../utils/database";
import ExternalReviewer from "../../../../models/externalReviewerModel";
import { hashPassword } from "../../../../pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();
  console.log("Received data:", { email, password });
  try {
    // Check if the user exists
    const reviewer = await ExternalReviewer.findOne({ email });
    if (!reviewer) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    // Hash the new password
    const hashedPassword = await hashPassword(password);
    console.log("Hashed password:", hashedPassword);
    // Update the user's password and remove the access token
    reviewer.password = hashedPassword;
    delete reviewer.accessToken; // Invalidate token
    await reviewer.save();
    // Respond with success message, do not log in here
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
