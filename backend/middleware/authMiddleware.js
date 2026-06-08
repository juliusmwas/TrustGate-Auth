/**
 * @file authMiddleware.js
 * @description Protects routes by verifying the incoming JSON Web Token (JWT).
 */
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Check for token in authorization headers (Format: Bearer <token>)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from header string
      token = req.headers.authorization.split(" ")[1];

      // Decode and verify token using secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from DB using decoded ID, exclude password string from returned user object
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      next(); // Pass control to the controller function
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }
};

module.exports = { protect };
