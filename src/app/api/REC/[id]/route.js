import connectDB from "../../../../../utils/database";
import REC from "../../../../../models/recModel";
import { NextResponse } from "next/server";

export async function PUT(req, context) {
  const { params } = await context;
  const { id } = params;
  try {
    await connectDB();
    const newREC = await req.json();
    const updatedREC = await REC.findByIdAndUpdate(id, newREC, {
      new: true,
    });
    return NextResponse.json(updatedREC, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req, context) {
  const { params } = await context;
  const { id } = params;
  await connectDB();
  const rec = await REC.findOne({ _id: id });
  return NextResponse.json({ rec }, { status: 200 });
}
