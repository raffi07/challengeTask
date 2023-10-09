const Cart = require("../models/Cart.js") ;
const User = require("../models/User.js") ;
const Book = require("../models/Book.js") ;
const ErrorResponse = require("../utils/errorResponse.js") ;
const asyncHandler = require("../middleware/async.js") ;

const getCart = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.user._id}`, 404));
    }
    const cart = await Cart.findOne({user: req.user._id});

    res.status(200).json({ success: true, data: cart })
})


const createCart = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new ErrorResponse(`User not found with id ${req.user._id}`, 404));
    }

    const book = await Book.findById(req.params.bookId);

    if (!book) {
        return next(new ErrorResponse(`Book not found with id of ${req.params.bookId}`, 404));
    }
    // Check if the user already has a cart, if not, create one
    let cart = await Cart.findOne({ _id: user.cartId });


    if (!cart) {
        cart = await Cart.create({price: 0}); // You may want to set the initial price as needed
        user.cartId = cart._id;
        await user.save();
    } else {
        // Add the book to the cart
        const existingCartItem = cart.books.find((item) => item.bookId === book._id.toString());

        if (existingCartItem) {
            // If the book is already in the cart, update the quantity
            existingCartItem.quantity += 1;
        }
    }
    // If it's a new book, add it to the cart
    cart.books.push({bookId: book._id, quantity: 1});

    // Update the cart's price as needed
    cart.price += book.price;

    // Save the updated cart
    await cart.save();

    res
        .status(201)
        .json({ success: true, data: cart, msg: `${user.username}, there is a new book in your cart!` });
});

const updateCart = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new ErrorResponse(`User not found with id ${req.user._id}`, 404));
    }

    const book = await Book.findById(req.params.bookId);

    if (!book) {
        return next(new ErrorResponse(`Book not found with id of ${req.params.bookId}`, 404));
    }
    // Check if the user already has a cart, if not, create one
    let cart = await Cart.findOne({ _id: user.cartId });


    if (!cart) {
        cart = await Cart.create({price: 0}); // You may want to set the initial price as needed
        user.cartId = cart._id;
        await user.save();
    } else {
        // Add the book to the cart
        const existingCartItem = cart.books.find((item) => item.bookId === book._id.toString());

        if (existingCartItem) {
            // If the book is already in the cart, update the quantity
            existingCartItem.quantity += 1;
        }
    }
    // If it's a new book, add it to the cart
    cart.books.push({bookId: book._id, quantity: 1});

    // Update the cart's price as needed
    cart.price += book.price;

    // Save the updated cart
    await cart.save();

    res
        .status(201)
        .json({ success: true, data: cart, msg: `${user.username}, there is a new book in your cart!` });
});

const deleteCart = asyncHandler(async (req, res, next) => {
    let cart = await Cart.findById(req.params.id);

    if (!cart) {
        return next(new ErrorResponse(`Cart not found with id of ${req.params.id}`, 404));
    }

    await cart.remove();

    res.status(200).json({});
});

module.exports = {
    getCart,
    createCart,
    updateCart,
    deleteCart,
};