import connectDB from "../../../../utils/database";
import ExternalReviewer from "../../../../models/externalReviewerModel";
import User from "../../../../models/users/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const { email, accessToken } = await req.json();

  try {
    const reviewer = await ExternalReviewer.findOne({ email });

    if (!reviewer) {
      console.log("Reviewer not found");
      return NextResponse.json(
        { success: false, error: "Invalid email or access token/password" },
        { status: 400 }
      );
    }

    if (reviewer.password) {
      const isPasswordMatch = await bcrypt.compare(
        accessToken,
        reviewer.password
      );
      if (!isPasswordMatch) {
        console.log("Password does not match");
        return NextResponse.json(
          { success: false, error: "Invalid email or password" },
          { status: 400 }
        );
      }
      console.log("Password matches, login successful");

      await addUserToUserTableIfNotExist(
        reviewer.email,
        reviewer.name,
        "ExternalReviewer"
      );

      return NextResponse.json(
        { success: true, message: "Login successful" },
        { status: 200 }
      );
    } else {
      if (reviewer.accessToken === accessToken) {
        reviewer.tokenUsed = true;
        await reviewer.save();
        console.log("Access token matches, please set your password");

        await addUserToUserTableIfNotExist(
          reviewer.email,
          reviewer.name,
          "ExternalReviewer"
        );

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

async function addUserToUserTableIfNotExist(email, name, role) {
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    await User.create({ email, name, role });
  }
}
