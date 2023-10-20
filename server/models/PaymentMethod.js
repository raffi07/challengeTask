//@ts-nocheck
const mongoose = require("mongoose");

const PaymentMethodSchema = new mongoose.Schema(
    {
        cardNumber: String,
        cardExpiration: String,
        cvv: String
    }
);

const PaymentMethod = mongoose.model("PaymentMethod", PaymentMethodSchema);
module.exports = PaymentMethod;