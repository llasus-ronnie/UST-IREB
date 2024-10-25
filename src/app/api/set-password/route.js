import connectDB from "../../../../utils/database";
import ExternalInvestigator from "../../../../models/externalInvestigatorModel";
import { hashPassword } from "../../../../pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { email, password } = await req.json();
  console.log("Received data:", { email, password });

  try {
    // Check if the user exists
    const investigator = await ExternalInvestigator.findOne({ email });

    if (!investigator) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password);
    console.log("Hashed password:", hashedPassword);

    // Update the user's password and remove the access token
    investigator.password = hashedPassword;
    delete investigator.accessToken; // Invalidate token

    await investigator.save();

    // Respond with success message, do not log in here
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
