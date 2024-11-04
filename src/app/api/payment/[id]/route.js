import connectDB from "../../../../utils/database";
import PaymentModel from "../../../../models/paymentModel";
import { NextRequest, NextResponse } from "next/server";
import express from "express";
import cors from "cors";

//cors
const app = express();
app.use(cors());

export async function GET(req, res){
    try {
        await connectDB();
        const id = req.query.id;
    const payment = await PaymentModel.findOne({ _id: id });
        return NextResponse.json(payment);
    }catch(error){
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}