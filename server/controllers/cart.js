const Cart = require("../models/Cart.js") ;
const User = require("../models/User.js") ;
const UnauthorizedUser = require("../models/UnauthorizedUser.js") ;
const Book = require("../models/Book.js") ;
const ErrorResponse = require("../utils/errorResponse.js") ;
const asyncHandler = require("../middleware/async.js") ;

const getCart = asyncHandler(async (req, res, next) => {
    try{
    const unauthorizedUser = await UnauthorizedUser.findById(req.cookies.sessionKey);
    if (!unauthorizedUser) {
        return next(new ErrorResponse(`UnauthorizedUser not found with id of ${req.user._id}`, 404));
    }
    if(unauthorizedUser.cartId !== nulls) {
        const cart = await Cart.findById(unauthorizedUser.cartId);
        console.log("Cart: ", cart);
        //TODO: return books with author, title etc.
        res.status(200).json({ success: true, data: cart });
    }
    }catch (e){
        console.log("Error finding unauthorized user: ", e);$
        res.status(400).json({ success: false});
    }
})


const createCart = asyncHandler(async (req, res, next) => {
    console.log("T:", req.body.token);
    let cart;
    const unauthorizedUser = await UnauthorizedUser.findById(req.body.token);
    console.log(("Unauth User: ", unauthorizedUser));
    if(!unauthorizedUser){
        return next(new ErrorResponse(`Session was not established`, 404));
    }
    cart = await Cart.findById(unauthorizedUser.cartId);
    console.log("cart: ", cart);

    const book = await Book.findById(req.body.bookId);

    if (!book) {
        return next(new ErrorResponse(`Book not found with id of ${req.body.bookId}`, 404));
    }

    if (!cart) {

   //const cartData = session.getCart(sessionToken)
    cart = await Cart.create({
        price: 0,
        books: [{
            bookId: req.body.bookId,
            quantity: req.body.quantity,
            price: req.body.price,
        }],
        token: req.body.token
    });}

    //TODO: add the logic if the cart exists already
    //} else {
        // Add the book to the cart
        /*const existingCartItem = cart.books.find((item) => item.req.params.bookId === book._id.toString());

        if (existingCartItem) {
            // If the book is already in the cart, update the quantity
            existingCartItem.quantity += 1;
        }*/
   // }

    // If it's a new book, add it to the cart
    //cart.books.push({bookId: book._id, quantity: 1});


    // TODO: Update the cart's custom price
    cart.price += 2;

    // Save the updated cart
    await cart.save();

    /*if(user){
        // You may want to set the initial price as needed
        user.cartId = cart._id;
        await user.save();
    }else*/ if(unauthorizedUser){
        unauthorizedUser.cartId = cart._id;
        await unauthorizedUser.save();
        console.log("updated unauth user: ", unauthorizedUser);
    }

    res
        .status(201)
        .json({ success: true, data: cart, msg: `there is a new book in your cart!` });
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