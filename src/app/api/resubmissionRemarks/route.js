import connectDB from "../../../../utils/database";
import ResubmissionRemarksModel from "../../../../models/resubmissionRemarks";
import { NextRequest, NextResponse } from "next/server";
import express from "express";
import cors from "cors";

//cors
const app = express();
app.use(cors());

export async function POST(req, res) {
    try{
        const resubmissionRemarks = await req.json();
        await connectDB();
        const saveResubmissionRemarks = await ResubmissionRemarksModel.create(resubmissionRemarks);
        return NextResponse.json(saveResubmissionRemarks, { status: 201 });
    }catch(error){
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};

export async function GET(req) {
    try {
        await connectDB();
        const url = new URL(req.url);
        const subFormId = url.searchParams.get('subFormId');
        console.log("Form ID Parameter: ", subFormId);
        const getResubmissionRemarks = await ResubmissionRemarksModel.find({ subFormId });
        if (!getResubmissionRemarks) {
            return NextResponse.json({ error: "Remarks not found" }, { status: 404 });
        }

        return NextResponse.json({ getResubmissionRemarks }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}