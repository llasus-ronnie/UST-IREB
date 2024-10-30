import { type } from "os";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchhema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    paymentFile: {
        type: String,
        require: true,
    },
});
const payment =
    mongoose.models.payment || mongoose.model("payment", paymentSchema);
export default payment;
