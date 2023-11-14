//@ts-nocheck
const express = require("express");
const {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  searchBook
} = require("../controllers/books.js");
// const advancedResults = require("../middleware/advancedResults.js");


const router = express.Router();

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
