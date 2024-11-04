import { type } from "os";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    userEmail: {
        type: String,
        required: true,
    },
    formId: {
        type: String,
        required: true,
    },
    paymentFile: {
        type: String,
        required: true,
    },
});
const payment =
    mongoose.models.payment || mongoose.model("payment", paymentSchema);
export default payment;
