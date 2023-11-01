const {getCart, deleteCart, createOrUpdateCart} = require("../controllers/cart");
const {protect, authorize} = require("../middleware/auth");
const express = require("express");
const router = express.Router();


router
    .route("/")
    .get(getCart)
    .post(createOrUpdateCart)
    .delete(protect, authorize("user", "admin"), deleteCart);

module.exports = router;
