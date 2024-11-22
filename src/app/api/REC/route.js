import connectDB from "../../../../utils/database";
import REC from "../../../../models/recModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { name, email, status, logo } = await req.json();

  try {
    const newREC = new REC({
      name,
      email,
      status,
      logo,
    });
    await newREC.save();
    return NextResponse.json({ success: true, data: newREC }, { status: 201 });
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
    const recs = await REC.find({});
    return NextResponse.json({ success: true, data: recs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching RECs:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  await connectDB();

  const { id, name, email, status, logo } = await req.json();

  const updateData = { name, email, status };
  if (logo) {
    updateData.logo = logo;
  }

  try {
    const updatedREC = await REC.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json(
      { success: true, data: updatedREC },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
