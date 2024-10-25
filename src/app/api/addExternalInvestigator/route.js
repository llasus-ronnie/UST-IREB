import connectDB from "../../../../utils/database";
import ExternalInvestigator from "../../../../models/externalInvestigatorModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { name, affiliation, email, token } = await req.json();

  try {
    const newInvestigator = new ExternalInvestigator({
      name,
      affiliation,
      email,
      accessToken: token,
    });
    await newInvestigator.save();
    return NextResponse.json(
      { success: true, data: newInvestigator },
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
    const externalInvestigators = await ExternalInvestigator.find({});
    return NextResponse.json(
      { success: true, data: externalInvestigators },
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

  const { email, password } = await req.json();

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find the investigator by email and update the password
    const investigator = await ExternalInvestigator.findOneAndUpdate(
      { email },
      { password: hashedPassword, accessToken: "", tokenUsed: true }, // Invalidate the access token
      { new: true }
    );

    if (!investigator) {
      return NextResponse.json(
        { success: false, error: "Investigator not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Password set successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
