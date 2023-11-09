//@ts-nocheck
const mongoose = require("mongoose");
const ShippingAddress = require("./ShippingAddress").schema;
const PaymentMethod = require("./PaymentMethod").schema;
const { v4: uuidv4 } = require("uuid");


const UnauthorizedUserSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: [true]
        },
        cartId: {type: String},
        shippingAddress:{ type: ShippingAddress, ref: "ShippingAddress"},
        paymentMethod:{ type: PaymentMethod, ref: "PaymentMethod"}
    },
    // virtuals
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Define a virtual property for cart
UnauthorizedUserSchema.virtual("populatedReviews", {
    ref: "Cart",
    localField: "_id",
    foreignField: "cartId",
    justOne: true,
});
// Define a virtual property for populating address
UnauthorizedUserSchema.virtual("populatedAddress", {
    ref: "ShippingAddress",
    localField: "_id",
    foreignField: "shippingAddress",
    justOne: false,
});

// Define a virtual property for populating paymentmethod
UnauthorizedUserSchema.virtual("populatedPaymentMethod", {
    ref: "PaymentMethod",
    localField: "_id",
    foreignField: "paymentMethod",
    justOne: false,
});

const UnauthorizedUser = mongoose.model("UnauthorizedUser", UnauthorizedUserSchema);
module.exports = UnauthorizedUser;
