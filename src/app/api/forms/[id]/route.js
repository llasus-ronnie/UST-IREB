import connectDB from "../../../../../utils/database";
import SubmissionForm from "../../../../../models/subFormModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  await connectDB();
  const submission = await SubmissionForm.findOne({ _id: id });
  return NextResponse.json({ submission }, { status: 200 });
}