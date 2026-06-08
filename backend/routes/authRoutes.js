/**
 * @file authRoutes.js
 * @description Routing endpoints for public authentication and protected security validation operations.
 */
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware"); // Import our JWT middleware guard

// 1. Public Authentication Endpoints
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// 2. Private Protected Email Security Endpoints (Token validation required)
router.post("/send-email-otp", protect, authController.sendEmailOtp);
router.post("/verify-email-otp", protect, authController.verifyEmailOtp);

// 3. Private Protected Mock SMS Security Endpoints (Token validation required)
router.post("/send-sms-otp", protect, authController.sendSmsOtp);
router.post("/verify-sms-otp", protect, authController.verifySmsOtp);

module.exports = router;
