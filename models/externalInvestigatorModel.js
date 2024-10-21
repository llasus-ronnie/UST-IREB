import mongoose from "mongoose";

const externalInvestigatorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
});

const ExternalInvestigator =
  mongoose.model.externalInvestigator ||
  mongoose.model("externalInvestigator", externalInvestigatorSchema);

export default ExternalInvestigator;
