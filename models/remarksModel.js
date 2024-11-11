import mongoose from "mongoose";

const remarkSchema = new mongoose.Schema({
    subFormId: {
        type: String,
        required: true,
    },
    remarks: {
        type: String,
        required: true,
        default: 'Initial Submission'
    },
    remarksDate: {
        type: Date,
        default: Date.now
    }
});

const Remarks = mongoose.models.Remarks || mongoose.model("Remarks", remarkSchema);
export default Remarks;
