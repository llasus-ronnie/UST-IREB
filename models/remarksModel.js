import mongoose from "mongoose";

const remarkSchema = new mongoose.Schema({
    subFormId: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    remarks: {
        type: String,
        required: true,
    },
    remarksDate: {
        type: Date,
        default: Date.now
    }
});

const Remarks = mongoose.models.Remarks || mongoose.model("Remarks", remarkSchema);
export default Remarks;
