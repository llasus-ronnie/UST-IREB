import mongoose from "mongoose";

const { Schema } = mongoose;

const externalInvestigatorSchema = new Schema({
  email: { type: String, required: true },
  accessToken: { type: String, required: true },
});

const ExternalInvestigator =
  mongoose.models.ExternalInvestigator ||
  mongoose.model("ExternalInvestigator", externalInvestigatorSchema);

export default ExternalInvestigator;
