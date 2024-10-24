import connectDB from "../../../../utils/database";
import RECMembers from "../../../../models/recmembersModel";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  await connectDB();

  const { name, email, rec, recRole } = await req.json();

  try {
    const newRECMember = new RECMembers({
      name,
      email,
      rec,
      recRole,
    });
    await newRECMember.save();
    return NextResponse.json(
      { success: true, data: newRECMember },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating member:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const recName = searchParams.get("rec");

  try {
    const filter = recName ? { rec: recName } : {};
    const recmembers = await RECMembers.find(filter);
    return NextResponse.json(
      { success: true, data: recmembers },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching REC members:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

async function addRECMember(memberData, REC) {
  try {
    const response = await axios.post("/api/RECMembers", {
      ...memberData,
      rec: REC?.name,
    });
    console.log("Member added:", response.data);
  } catch (error) {
    console.error("Error adding member:", error);
  }
}
