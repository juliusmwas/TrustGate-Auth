const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Documentation: Route for user registration
router.post("/signup", authController.signup);

module.exports = router;
