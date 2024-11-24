import connectDB from "../../../../utils/database";
import RECMembers from "../../../../models/recmembersModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { name, email, rec, recRole } = await req.json();

  if (!name || !email || !rec || !recRole) {
    return NextResponse.json(
      { success: false, error: "All fields are required" },
      { status: 400 }
    );
  }

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
  const email = searchParams.get("email");
  const rec = searchParams.get("rec");

  const query = {};

  if (rec) {
    query.researchEthicsCommittee = rec.trim();
  }
  if (email) {
    query.$or = [
      { recMember: { $in: [email.trim()] } },
      { userEmail: email.trim() } 
    ];
  }
  
  try {
    const recMembers = await RECMembers.find(query);
    return NextResponse.json(
      { success: true, data: recMembers },
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

export async function PATCH(req) {
  await connectDB();

  const { rec, name, email, recRole } = await req.json();

  try {
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (recRole) updateData.recRole = recRole;

    const updatedMember = await RECMembers.findOneAndUpdate(
      { rec },
      { $set: updateData },
      { new: true }
    );

    if (!updatedMember) {
      return NextResponse.json(
        { success: false, error: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedMember },
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
