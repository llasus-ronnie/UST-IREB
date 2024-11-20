import mongoose from "mongoose";

const { Schema } = mongoose;

const RECContentSchema = new Schema({
  rec: { type: String, required: true, unique: true },
  heading: { type: String, required: true },
  body: { type: String, required: true },
  files: [
    {
      url: { type: String, required: true }, // Cloudinary URL
      filename: { type: String, required: true }, // Original filename
    },
  ],
});

const RECContent =
  mongoose.models.RECContent || mongoose.model("RECContent", RECContentSchema);

export default RECContent;
