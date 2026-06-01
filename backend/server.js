/**
 * @file server.js
 * @description Entry point for the TrustGate Auth API.
 * Handles database connection, middleware configuration, and server initialization.
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// 1. Load Environment Variables
// Documentation: This allows access to variables defined in .env (like MONGO_URI)
dotenv.config();

const app = express();

/**
 * --- MIDDLEWARE CONFIGURATION ---
 */

// Global Security: Cross-Origin Resource Sharing
// Allows our React frontend (port 5173) to talk to this backend (port 5000)
app.use(cors());

// Body Parser: Allows the server to understand JSON data sent in requests
app.use(express.json());

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
    process.exit(1); // Kill the server if the DB connection fails
  });

/**
 * --- API ROUTES ---
 */

// Base/Health Check Route
// Future Documentation: Use this to check if the server is alive on the web
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
