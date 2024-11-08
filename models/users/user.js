import { Schema, model, models } from "mongoose";
import roles from "../../src/app/api/roles/roles";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  image: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: roles,
    required: true,
  },
});

const User = models.User || model("User", userSchema);
export default User;
