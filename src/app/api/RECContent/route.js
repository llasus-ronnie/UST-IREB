import connectDB from "../../../../utils/database";
import RECContent from "../../../../models/reccontentModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { rec, heading, body, files } = await req.json();

  try {
    if (files && !files.every((file) => file.url && file.filename)) {
      throw new Error(
        "Invalid file data. Ensure each file has 'url' and 'filename'."
      );
    }

    let recContent = await RECContent.findOne({ rec });

    if (recContent) {
      recContent.heading = heading;
      recContent.body = body;
      recContent.files = files;
      await recContent.save();
    } else {
      recContent = new RECContent({
        rec,
        heading,
        body,
        files,
      });
      await recContent.save();
    }

    return NextResponse.json(
      { success: true, data: recContent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating or updating content:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const rec = searchParams.get("rec");

  try {
    const filter = rec ? { rec } : {};
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
