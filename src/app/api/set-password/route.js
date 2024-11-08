import connectDB from "../../../../utils/database";
import ExternalInvestigator from "../../../../models/externalInvestigatorModel";
import ExternalReviewer from "../../../../models/externalReviewerModel";
import User from "../../../../models/users/user";
import { hashPassword } from "../../../../pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { email, password, role } = await req.json();
  console.log("Received data:", { email, password, role });

  try {
    // Determine the model based on the role
    const Model =
      role === "ExternalReviewer" ? ExternalReviewer : ExternalInvestigator;
    const user = await Model.findOne({ email });

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

    // Check if the user already exists in User table
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      // Create a new entry in the User table
      await User.create({
        email,
        name: user.name,
        role,
      });
    }

    return NextResponse.json(
      { success: true, message: "Password updated successfully" },
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
