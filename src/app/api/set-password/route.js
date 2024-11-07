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
    // Try to find user as an external investigator
    let user = await ExternalInvestigator.findOne({ email });
    let userRole = "ExternalInvestigator";

    // If not found, check if the user is an external reviewer
    if (!user) {
      user = await ExternalReviewer.findOne({ email });
      userRole = user ? "ExternalReviewer" : null;
    }

    // If no user found, respond with a 404
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password);
    console.log("Hashed password:", hashedPassword);

    // Update the user's password and remove the access token
    user.password = hashedPassword;
    delete user.accessToken; // Invalidate token

    await user.save();

    // Respond with a success message, specifying the role updated
    return NextResponse.json(
      { success: true, message: `${userRole} password updated successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in set-password API:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
