import mongoose from "mongoose";

const resubmissionFileSchema = new mongoose.Schema({
    subFormId: {
        type: String,
        required: true,
    },
    resubmissionFile: {
        type: String,
        required: true,
    },
    resubmissionComments: {
        type: String,
        required: false,
    },
    resubmissionFileDate: {
        type: Date,
        default: Date.now
    }
});

const resubmissionFile =
    mongoose.models.resubmissionFile || mongoose.model("resubmissionFile", resubmissionFileSchema);
export default resubmissionFile;

