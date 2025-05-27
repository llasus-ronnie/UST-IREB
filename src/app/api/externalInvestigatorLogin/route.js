import connectDB from "../../../../utils/database";
import ExternalInvestigator from "../../../../models/externalInvestigatorModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const { email, accessToken } = await req.json();

  try {
    const investigator = await ExternalInvestigator.findOne({ email });

    if (!investigator) {
      console.log("Investigator not found");
      return NextResponse.json(
        { success: false, error: "Invalid email or access token/password" },
        { status: 400 }
      );
    }

    if (investigator.password) {
      const isPasswordMatch = await bcrypt.compare(
        accessToken,
        investigator.password
      );
      if (!isPasswordMatch) {
        console.log("Password does not match");
        return NextResponse.json(
          { success: false, error: "Invalid email or password" },
          { status: 400 }
        );
      }
      console.log("Password matches, login successful");

      return NextResponse.json(
        { success: true, message: "Login successful" },
        { status: 200 }
      );
    } else {
      if (investigator.accessToken === accessToken) {
        investigator.tokenUsed = true;
        await investigator.save();
        console.log("Access token matches, please set your password");
        return NextResponse.json(
          {
            success: true,
            message: "Login successful, please set your password.",
          },
          { status: 200 }
        );
      } else {
        console.log("Invalid access token");
        return NextResponse.json(
          { success: false, error: "Invalid access token" },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
