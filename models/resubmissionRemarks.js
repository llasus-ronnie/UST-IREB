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
    resubmissionRemarksFile: [{
        url: String,
        filename: String,
    }],
    resubmissionRemarksComments: {
        type: String,
        required: false,
    },
    resubmissionRemarksDate: {
        type: Date,
        default: Date.now
    }, 
});

const resubmissionRemarks =
  mongoose.models.resubmissionRemarks || mongoose.model("resubmissionRemarks", resubmissionRemarkSchema);
export default resubmissionRemarks;
