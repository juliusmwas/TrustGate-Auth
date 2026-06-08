/**
 * @file authController.js
 * @description Logic for User Signup, Login, and Multi-Factor OTP Verification.
 * Implements password hashing (Bcrypt), stateless authentication (JWT), and Nodemailer.
 */

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user with email, password, and phone
 * @access  Public
 */
exports.signup = async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "A user with this email already exists.",
      });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the new user instance (including phone)
    const newUser = new User({
      email,
      password: hashedPassword,
      phoneNumber,
    });

    // 4. Save to MongoDB
    await newUser.save();

    // 5. Respond to Client
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: {
        id: newUser._id,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error during signup" });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return JWT
 * @access  Public
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find User
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // 2. Compare Password (Typed vs Hashed)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // 3. Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error during login" });
  }
};

/**
 * @route   POST /api/auth/send-email-otp
 * @desc    Get the logged-in user's email from DB, generate a 6-digit OTP, and email it
 * @access  Private (Protected by JWT)
 */
exports.sendEmailOtp = async (req, res) => {
  try {
    // 1. Get the user from the DB using the ID attached by our authMiddleware
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // 2. Generate a random 6-digit numeric code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Set expiration time for 15 minutes from now
    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    // 4. Save the OTP and expiry directly to this user's document
    user.emailOtp = otp;
    user.otpExpiry = expiry;
    await user.save();

    // 5. Configure the Nodemailer email transporter using your .env secrets
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 6. Design a professional HTML email template (using the email address they registered with)
    const mailOptions = {
      from: `"TrustGate Security" <${process.env.EMAIL_USER}>`,
      to: user.email, // Automatically sends to their registered email!
      subject: "Verify Your TrustGate Account Identity",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 30px; background-color: #0F172A; color: #ffffff; border-radius: 12px; max-width: 480px; margin: 0 auto; border: 1px solid #334155;">
          <h2 style="color: #3B82F6; margin-top: 0;">Account Verification</h2>
          <p style="color: #94A3B8; font-size: 15px; line-height: 1.6;">You requested a security code to verify your email address (<b>${user.email}</b>). Enter this code on your dashboard to unlock full access:</p>
          <div style="background-color: #1E293B; border: 1px solid #334155; padding: 20px; border-radius: 10px; text-align: center; font-size: 36px; font-weight: bold; letter-spacing: 6px; color: #60A5FA; margin: 24px 0;">
            ${otp}
          </div>
          <p style="color: #64748B; font-size: 12px; margin-bottom: 0;">This security code is active for 15 minutes. If you did not make this request, please ignore this message.</p>
        </div>
      `,
    };

    // 7. Fire off the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: `Security code successfully sent to ${user.email}!`,
    });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    res
      .status(500)
      .json({
        message:
          "Failed to send verification email. Check server configuration.",
      });
  }
};

/**
 * @route   POST /api/auth/verify-email-otp
 * @desc    Validate the 6-digit code inputted by the user
 * @access  Private (Protected by JWT)
 */
exports.verifyEmailOtp = async (req, res) => {
  try {
    const { otpInput } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if an OTP was even generated
    if (!user.emailOtp || !user.otpExpiry) {
      return res
        .status(400)
        .json({
          message: "No active verification code found. Request a new one.",
        });
    }

    // Check if the OTP has expired
    if (new Date() > user.otpExpiry) {
      return res
        .status(400)
        .json({ message: "This code has expired. Please request a new one." });
    }

    // Compare the user's input to the database record
    if (user.emailOtp !== otpInput) {
      return res
        .status(400)
        .json({ message: "Invalid verification code. Please try again." });
    }

    // Clear the security keys and update status flags on successful match
    user.isEmailVerified = true;
    user.emailOtp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Email address verified successfully! Your account is now secured.",
    });
  } catch (error) {
    console.error("Verification Error:", error);
    res
      .status(500)
      .json({ message: "Server error during verification processing." });
  }
};
