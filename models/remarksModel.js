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
    remarks: [{
        url: String,  
        filename: String,  
    }],
    remarksComment:{
        type: String,
        required: false,
    },
    remarksDate: {
        type: Date,
        default: Date.now
    }
});

const Remarks = mongoose.models.Remarks || mongoose.model("Remarks", remarkSchema);
export default Remarks;
