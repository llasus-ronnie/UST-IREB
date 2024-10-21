import connectDB from "../../../../utils/database";
import StatusModel from "../../../../models/statusModel";
import { NextRequest, NextResponse } from "next/server";
import express from "express";
import cors from "cors";

//cors
const app = express();
app.use(cors());

//GET

