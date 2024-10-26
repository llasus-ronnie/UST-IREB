import mongoose from "mongoose";

const { Schema } = mongoose;

const RECContentSchema = new Schema({
  heading: { type: String, required: true },
  body: { type: String, required: true },
});

const RECContent =
  mongoose.models.RECContent || mongoose.model("RECContent", RECContentSchema);

export default RECContent;
