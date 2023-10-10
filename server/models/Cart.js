//@ts-nocheck
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");


//TODO: check if it works
const CartSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
            required: true,
        },
        books:{
            type: [{
                bookId: String,
                quantity: Number,
                price: Number
            }],
            default: [],
            required: false
        },
        price: {
            type: Number,
            required: [true, "Please add a price"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
);


const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;

