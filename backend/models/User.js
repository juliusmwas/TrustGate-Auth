/**
 * @module models/User
 * @description This file defines the User schema for MongoDB using Mongoose.
 * It includes fields for local auth, social auth (Google), and verification status.
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

  // --- VERIFICATION FLAGS ---
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  phoneNumber: {
    type: String,
    default: null,
  },

  // --- SECURITY / OTP STORAGE ---
  // We store the hashed OTP and its expiry time here temporarily
  emailOtp: { type: String },
  phoneOtp: { type: String },
  otpExpiry: { type: Date },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
module.exports = mongoose.model("User", userSchema);
