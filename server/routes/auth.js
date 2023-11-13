const express = require("express") ;
const { register, login, getMe, isAdmin } = require("../controllers/auth.js") ;

const router = express.Router();

const { protect, authorize} = require("../middleware/auth.js") ;

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/admin", protect,authorize("admin"), isAdmin)

module.exports = router;
