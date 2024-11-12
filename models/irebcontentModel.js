import mongoose from "mongoose";

const { Schema } = mongoose;

const IREBContentSchema = new Schema({
  heading: { type: String, required: true },
  body: { type: String, required: true },
  isArchived: { type: Boolean, default: false },
});

const IREBContent =
  mongoose.models.IREBContent ||
  mongoose.model("IREBContent", IREBContentSchema);

export default IREBContent;
