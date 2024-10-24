import mongoose from "mongoose";

const { Schema } = mongoose;

const RECMembersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rec: { type: String, required: true },
  recRole: { type: String, required: true },
});

const RECMembers =
  mongoose.models.RECMembers || mongoose.model("RECMembers", RECMembersSchema);

export default RECMembers;
