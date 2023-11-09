//@ts-nocheck
const express = require("express");
const Book = require("../models/Book.js");
const {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  searchBook
} = require("../controllers/books.js");
// const advancedResults = require("../middleware/advancedResults.js");

// Include other resource routers
// const reviewRouter = require("./reviews.js");

const router = express.Router();

// Re-route into other resource routers
// router.use("/:bookId/reviews", reviewRouter);

const { protect, authorize } = require("../middleware/auth.js");

router
  .route("/")
  .get(getBooks)
  // .post(protect, authorize("admin"), createBook);

router
  .route("/create")
  .post(protect,authorize("admin"),
    createBook);

router
  .route("/search")
  .get(searchBook)

router
  .route("/:id")
  .get(getBook)
  .put(protect, authorize("user", "admin"), updateBook)
  .delete(protect, authorize("admin"), deleteBook);

module.exports = router;
