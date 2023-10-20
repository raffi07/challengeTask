//@ts-nocheck
const mongoose = require("mongoose");

const ShippingAddressSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        address: String,
        city: String,
        state: String,
        zipCode: String
    }
);

const ShippingAddress = mongoose.model("ShippingAddress", ShippingAddressSchema);
module.exports = ShippingAddress;
