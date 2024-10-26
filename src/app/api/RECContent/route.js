import connectDB from "../../../../utils/database";
import RECContent from "../../../../models/reccontentModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { heading, body } = await req.json();

  try {
    const newRECContent = new RECContent({
      heading,
      body,
    });
    await newRECContent.save();
    return NextResponse.json(
      { success: true, data: newRECContent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating content:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const heading = searchParams.get("heading");

  try {
    const filter = heading ? { heading } : {};
    const recContents = await RECContent.find(filter);
    return NextResponse.json(
      { success: true, data: recContents },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching REC content:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
