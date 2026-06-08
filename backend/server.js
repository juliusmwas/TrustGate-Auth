/**
 * @file server.js
 * @description Entry point for the TrustGate Auth API.
 * Handles database connection, middleware configuration, and server initialization with cookie support.
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser"); // Added for reading incoming cookies
const authRoutes = require("./routes/authRoutes");

// 1. Load Environment Variables
dotenv.config();

const app = express();

/**
 * --- MIDDLEWARE CONFIGURATION ---
 */

// Global Security: Updated CORS to handle HttpOnly cross-origin cookie transfers securely
app.use(
  cors({
    origin: "http://localhost:5173", // Explicitly map your Vite development server
    credentials: true, // Crucial: Permits cookie handshakes to pass through
  }),
);

// Body Parser: Allows the server to understand JSON data sent in requests
app.use(express.json());

// Cookie Parser: Exposes cookies sent by the client browser inside req.cookies
app.use(cookieParser());

// Use Routes
app.use("/api/auth", authRoutes);

/**
 * --- DATABASE CONNECTION ---
 */
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("-------------------------------------------");
    console.log("✅ DATABASE: Connected to MongoDB Atlas");
    console.log("-------------------------------------------");
  })
  .catch((err) => {
    console.error("❌ DATABASE: Connection Error:", err.message);
    process.exit(1);
  });

/**
 * --- API ROUTES ---
 */

// Base/Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "active",
    message: "TrustGate API is sprinting!",
    timestamp: new Date().toISOString(),
  });
});

/**
 * --- SERVER INITIALIZATION ---
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 SERVER: Running at http://localhost:${PORT}`);
  console.log(`📡 MONITOR: Listening for incoming requests...`);
});
