import mongoose from "mongoose";

const { Schema } = mongoose;

const externalReviewersSchema = new Schema({
  name: { type: String, required: true },
  affiliation: { type: String, required: true },
  email: { type: String, required: true },
  accessToken: { type: String, required: true },
  password: { type: String },
  tokenUsed: { type: Boolean, default: false },
});

const ExternalReviewer =
  mongoose.models.ExternalReviewer ||
  mongoose.model("ExternalReviewer", externalReviewersSchema);

export default ExternalReviewer;
