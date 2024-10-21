import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
    subFormId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subForm',
        require: true,
    },
    status: {
        type: String,
        require: true,
        default:'Initial Submission'
    },
});

const status =
  mongoose.models.status || mongoose.model("status", statusSchema);
export default status;
