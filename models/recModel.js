import mongoose from "mongoose";

const { Schema } = mongoose;

const RECSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, required: true },
  logo: { type: String, required: true },
});

const REC = mongoose.models.REC || mongoose.model("REC", RECSchema);

export default REC;
