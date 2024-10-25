import mongoose from "mongoose";

const { Schema } = mongoose;

const externalInvestigatorSchema = new Schema({
  name: { type: String, required: true },
  affiliation: { type: String, required: true },
  email: { type: String, required: true },
  accessToken: { type: String, required: true },
  password: { type: String }, // Stores hashed password
  tokenUsed: { type: Boolean, default: false }, // Indicates if token was used
});

const ExternalInvestigator =
  mongoose.models.ExternalInvestigator ||
  mongoose.model("ExternalInvestigator", externalInvestigatorSchema);

export default ExternalInvestigator;
