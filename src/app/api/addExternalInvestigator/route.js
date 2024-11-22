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

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  try {
    const filter = name ? { name } : {};
    const investigators = await ExternalInvestigator.find(filter);
    return NextResponse.json(
      { success: true, data: investigators },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching investigators:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  await connectDB();

  const { id, name, affiliation, isArchived } = await req.json();

  try {
    const updateData = { name, affiliation };
    if (isArchived !== undefined) {
      updateData.isArchived = isArchived;
    }

    const updatedInvestigator = await ExternalInvestigator.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedInvestigator) {
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
    console.error("Error updating investigator:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
