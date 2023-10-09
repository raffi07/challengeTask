const {getCart, createCart, updateCart, deleteCart} = require("../controllers/cart");
const {protect, authorize} = require("../middleware/auth");
const express = require("express");
const router = express.Router();


router
    .route("/")
    .get(getCart)
    .post(createCart)
    .put(protect, authorize("user", "admin"), updateCart)
    .delete(protect, authorize("user", "admin"), deleteCart);

module.exports = router;
