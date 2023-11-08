const Cart = require("../models/Cart.js") ;
const User = require("../models/User.js") ;
const UnauthorizedUser = require("../models/UnauthorizedUser.js") ;
const Book = require("../models/Book.js") ;
const ErrorResponse = require("../utils/errorResponse.js") ;
const asyncHandler = require("../middleware/async.js") ;
const {updateUnauthorizedUser} = require("./unauthorizedUser");

const getCart = asyncHandler(async (req, res, next) => {
    try{
    const unauthorizedUser = await UnauthorizedUser.findById(req.cookies.sessionKey);
    if (!unauthorizedUser) {
        return next(new ErrorResponse(`UnauthorizedUser not found with id of ${req.user._id}`, 404));
    }
        //TODO: return books with author, title etc.
    if(unauthorizedUser.cartId !== null) {
        const cart = await Cart.findById(unauthorizedUser.cartId);
        console.log("Cart: ", cart);
        res.status(200).json({ success: true, data: cart });
    }
    }catch (e){
        console.log("Error finding unauthorized user: ", e);
        res.status(400).json({ success: false});
    }
})


const createOrUpdateCart = asyncHandler(async (req, res, next) => {
    let cart;
    const unauthorizedUser = await UnauthorizedUser.findById(req.cookies.sessionKey);
    if(!unauthorizedUser){
        return next(new ErrorResponse(`Session was not established`, 404));
    }
    cart = await Cart.findById(unauthorizedUser.cartId);

    const book = await Book.findById(req.body.bookId);

    if (!book) {
        return next(new ErrorResponse(`Book not found with id of ${req.body.bookId}`, 404));
    }

    if (!cart) {

    cart = await Cart.create({
        price: 0,
        books: [{
            bookId: book._id,
            book: book,
            quantity: req.body.quantity,
            price: book.price,
        }],
        token: req.cookies.sessionKey
    });
    //if the cart exists already
    } else {
        // Add the book to the cart
        const existingCartItem = cart.books.find((item) => item.bookId === book._id);
        console.log("Existing CartItem: ", existingCartItem);
        if (existingCartItem) {
            // If the book is already in the cart, update the quantity
            existingCartItem.quantity += 1;
        } else {
            // If it's a new book, add it to the cart
            cart.books.push({bookId: book._id, book: book, price: book.price, quantity: 1});
        }
    }

    cart.price += book.price;

    // Save the updated cart
    await cart.save();

    if(unauthorizedUser){
        unauthorizedUser.cartId = cart._id;
        await unauthorizedUser.save();
        console.log("updated unauth user: ", unauthorizedUser);
    }

    res
        .status(201)
        .json({ success: true, data: cart, msg: `there is a new book in your cart!` });
});

const deleteCart = asyncHandler(async (req, res, next) => {
    let cart = await Cart.findById(req.params.id);

    if (!cart) {
        return next(new ErrorResponse(`Cart not found with id of ${req.params.id}`, 404));
    }

    await cart.remove();

    res.status(200).json({});
});

const updateCheckoutInformation = asyncHandler(async (req, res, next) => {
    try {
        const unauthorizedUser = await UnauthorizedUser.findByIdAndUpdate(req.cookies.sessionKey, req.body);

        if (!unauthorizedUser) {
            return next(new ErrorResponse(`No authenticated user with this exists`, 404));
        }

        await unauthorizedUser.save();

        console.log(unauthorizedUser);

        res.status(200).json({ success: true, data: unauthorizedUser, msg: `Checkout information is updated` });
    } catch (e) {
        console.log(e);
    }


})

module.exports = {
    getCart,
    createOrUpdateCart,
    deleteCart,
    updateCheckoutInformation
};