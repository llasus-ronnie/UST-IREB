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
