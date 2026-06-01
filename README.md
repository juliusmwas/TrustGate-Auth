# TrustGate Auth

A production-ready, secure authentication portal designed to handle the full user trust journey—from initial identity creation to multi-channel verification.

## 🔐 Key Features
* **Dual-Authentication:** Native Email/Password signup + Google OAuth 2.0 integration.
* **Security-First Design:** Passwords hashed with Bcrypt, sessions secured using HTTP-only cookies (JWT), and automated input validation via Zod/Joi.
* **Multi-Factor Verification:** On-demand SMS & Email OTP generation with time-bound expiry logic.
* **Brute-Force Protection:** Rate-limiting middleware to block automated OTP guessing scripts.

## 🛠️ Tech Stack
* **Frontend:** React, Tailwind CSS, Axios, React Context API
* **Backend:** Node.js, Express, Passport.js, JSON Web Tokens (JWT)
* **Database:** MongoDB / Mongoose
