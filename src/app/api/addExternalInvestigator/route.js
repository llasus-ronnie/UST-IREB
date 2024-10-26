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

  const { id, name, affiliation } = await req.json();

  console.log("Updating investigator with ID:", id); // Log the ID

  try {
    const updatedInvestigator = await ExternalInvestigator.findByIdAndUpdate(
      id,
      { name, affiliation },
      { new: true }
    );

    if (!updatedInvestigator) {
      console.error("Investigator not found for ID:", id); // Log if not found
      return NextResponse.json(
        { success: false, error: "Investigator not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedInvestigator },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PATCH:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
