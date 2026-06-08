/**
 * @file authMiddleware.js
 * @description Securely protects private routes by extracting and verifying the HttpOnly token cookie.
 */
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // 1. Extract the token directly from the incoming cookies object
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // 2. Fallback check: If cookies are blocked but header exists (useful for troubleshooting tools)
  if (
    !token &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, authentication token missing." });
  }

  try {
    // 3. Decode and verify token using your server's secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Find the user attached to this session token, excluding their password
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user profile not found." });
    }

    // 5. Everything is secure, proceed to the requested controller function
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res
      .status(401)
      .json({
        message: "Not authorized, session token is invalid or expired.",
      });
  }
};

module.exports = { protect };
