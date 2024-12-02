const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserById } = require("../controllers/authController");



router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/:id", getUserById);




module.exports = router;
