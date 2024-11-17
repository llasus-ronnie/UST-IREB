import connectDB from "../../../../utils/database";
import ResubmissionModel from "../../../../models/resubmissionModel";
import { NextRequest, NextResponse } from "next/server";
import express from "express";
import cors from "cors";

//cors
const app = express();
app.use(cors());

export async function POST(req, res) {
    try{
        const resubmission = await req.json();
        await connectDB();
        const saveResubmission = await ResubmissionModel.create(resubmission);
        return NextResponse.json(saveResubmission, { status: 201 });
    }catch(error){
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};