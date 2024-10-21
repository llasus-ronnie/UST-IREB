import connectDB from "../../../../../utils/database";
import SubmissionForm from "../../../../../models/subFormModel";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  try{
    await connectDB();
    const formdata = await req.json();
    const updatedForm = await SubmissionForm.findByIdAndUpdate
    (id, formdata, { new: true });
    return NextResponse.json(updatedForm, { status: 200 });
  }catch(error){
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  const { id } = params;
  await connectDB();
  const submission = await SubmissionForm.findOne({ _id: id });
  return NextResponse.json({ submission }, { status: 200 });
}