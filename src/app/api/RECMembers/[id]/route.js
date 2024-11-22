import connectDB from "../../../../../utils/database";
import RECMembers from "../../../../../models/recmembersModel";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  await connectDB();

  const { id } = params;
  const { name, email, recRole, isArchived } = await req.json();

  try {
    const updateData = { name, email, recRole };
    if (isArchived !== undefined) {
      updateData.isArchived = isArchived;
    }

    const updatedMember = await RECMembers.findByIdAndUpdate(id, updateData, {
      new: true,
    });

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
    console.error("Error updating member:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
