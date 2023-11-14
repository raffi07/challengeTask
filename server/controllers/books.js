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
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorResponse(`Book not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: book });
});
// @desc create books
// @route CREATE /api/v1/books/create
// @access Public
const createBook = asyncHandler(async (req, res, next) => {
  const { title, author, publisher, price } = req.body;

  // if (req.user.role !== "admin") {
  //   return next(new ErrorResponse(`The logged in user doesn't not have permissions`, 400));
  // }

  try {
     book = await Book.create({
      title,
      author,
      publisher,
      price
    });
  }catch(e){
    console.log(e);
    return next(new ErrorResponse ("Book already exists", 409))
  }

  res.status(201).json({ success: true, data: book, msg: "create a book" });
});
// @desc update a book
// @route UPDATE /api/v1/books
// @access Public
const updateBook = asyncHandler(async (req, res, next) => {

  if (req.user.role !== "admin") {
    return next(new ErrorResponse(`The logged in user doesn't not have permissions`, 400));
  }

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

  if (!book) {
    return next(new ErrorResponse(`Book not found with id of ${req.params.id}`, 404));
  }

  await book.deleteOne();

  res.status(200).json({});
});

const searchBook = asyncHandler(async (req, res, next)=> {
  const searchTerm = req.query.query; // Assuming the search term is in req.title

  // Create a query object to search by title or author
  const query = {
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for title
      { author: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for author
    ],
  };

  const books = await Book.find(query);

  if (!books || books.length === 0) {
    return next(new ErrorResponse(`No books found with the searched term: ${searchTerm}`, 404));
  }

  // Handle the case where books are found
  res.status(200).json(books);
});


module.exports = {
  getBooks,
  getBook,
  searchBook,
  createBook,
  updateBook,
  deleteBook,
};