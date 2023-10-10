//@ts-nocheck
const ErrorResponse = require("../utils/errorResponse") ;
const asyncHandler = require("../middleware/async") ;
const Book = require("../models/Book") ;

// @desc get all books
// @route GET /api/v1/books
// @access Public
const getBooks = asyncHandler(async (req, res, next) => {
  const books = await Book.find();
  if (!books) {
    return next(new ErrorResponse(`No books found`, 404));
  }
  res.status(200).json({success: true, data: books});
});
// @desc get a book by ID
// @route GET /api/v1/books/:id
// @access Public
const getBook = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);

  const book = await Book.findById(req.params.id);
  console.log(await book, "book");
  if (!book) {
    return next(new ErrorResponse(`Book not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: book });
});
// @desc create books
// @route CREATE /api/v1/books
// @access Private
const createBook = asyncHandler(async (req, res, next) => {
  const book = await Book.create(req.body);

  if (req.user.role !== "admin") {
    return next(new ErrorResponse(`The logged in user doesn't not have permissions`, 400));
  }

  res.status(201).json({ success: true, data: book, msg: "create a book" });
});
// @desc update a book
// @route UPDATE /api/v1/books
// @access Public
const updateBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    return next(new ErrorResponse(`Book not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: book });
});
// @desc get all books
// @route DELETE /api/v1/books
// @access Public
const deleteBook = asyncHandler(async (req, res, next) => {
  // const book = await Book.findById(req.params.id);
  const book = await Book.findOne({ _id: req.params.id });

  console.log(book, "book");

  if (!book) {
    return next(new ErrorResponse(`Book not found with id of ${req.params.id}`, 404));
  }

  console.log(await book.deleteOne, "book.deleteOne"); //log the remove method

  await book.deleteOne();

  res.status(200).json({});
});


module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};