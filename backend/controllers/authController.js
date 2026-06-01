/**
 * @file authController.js
 * @description Logic for user authentication actions: Signup, Login, etc.
 */

const User = require("../models/User");
const bcrypt = require("bcryptjs");

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // 2. Hash the password (Security Pillar)
    // Documentation: Salt adds random noise to the hash. 10 rounds is the industry standard.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the new user instance
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // 4. Save to MongoDB
    await newUser.save();

    // 5. Respond to Client
    // Note: Do NOT send the password back, even the hashed one!
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: { id: newUser._id, email: newUser.email },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};
