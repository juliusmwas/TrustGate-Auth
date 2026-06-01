/**
 * @module models/User
 * @description Defines the User schema for MongoDB.
 * Optimized for local auth, Google OAuth, and multi-factor verification.
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // --- IDENTITY ---
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    }, // Password only required if not using Google Auth
  },
  googleId: {
    type: String,
    default: null,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required for security verification"],
    trim: true,
  },

  // --- VERIFICATION FLAGS ---
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },

  // --- SECURITY / OTP STORAGE ---
  emailOtp: { type: String },
  phoneOtp: { type: String },
  otpExpiry: { type: Date },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
