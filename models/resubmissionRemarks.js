import mongoose from "mongoose";

const resubmissionRemarkSchema = new mongoose.Schema({
    subFormId: {
        type: String,
        required: true,
    },
    resubmissionId:{
        type: String,
        required: false,
    },
    resubmissionRemarksFile: {
        type: String,
        required: true,
    },
    resubmissionRemarksDate: {
        type: Date,
        default: Date.now
    },
    resubmission0: { type: Boolean, default: false },
     resubmission1: { type: Boolean, default: false },
        resubmission2: { type: Boolean, default: false }, 
});

const resubmissionRemarks =
  mongoose.models.resubmissionRemarks || mongoose.model("resubmissionRemarks", resubmissionRemarkSchema);
export default resubmissionRemarks;
