import mongoose from "mongoose";

const resubmissionRemarkSchema = new mongoose.Schema({
    subFormId: {
        type: String,
        required: true,
    },
    resubmissionRemarksFile: {
        type: String,
        required: true,
    },
    resubmissionRemarksDate: {
        type: Date,
        default: Date.now
    }
});

const resubmissionRemarks =
  mongoose.models.resubmissionRemarks || mongoose.model("resubmissionRemarks", resubmissionRemarkSchema);
export default resubmissionRemarks;
