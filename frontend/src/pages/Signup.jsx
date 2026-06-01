/**
 * @file Signup.jsx
 * @description Advanced Signup with Redirect, Confirm Password, and Phone fields.
 */
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { Eye, EyeOff, Mail, Lock, Phone, UserPlus } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation: Match Passwords
    if (formData.password !== formData.confirmPassword) {
      return setStatus({ type: "error", msg: "Passwords do not match" });
    }

    try {
      // 2. Submit to Backend
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      });

      setStatus({
        type: "success",
        msg: "✅ Account created! Redirecting to login...",
      });

      // 3. Redirect after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setStatus({
        type: "error",
        msg: err.response?.data?.message || "Signup failed",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] p-4 font-sans">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-blue-500/10 rounded-full mb-4 text-blue-500">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-slate-400 mt-2">Join TrustGate security network</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail
              className="absolute left-3 top-3.5 text-slate-500"
              size={18}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 outline-none transition"
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone
              className="absolute left-3 top-3.5 text-slate-500"
              size={18}
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number (e.g. +254...)"
              required
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 outline-none transition"
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              className="absolute left-3 top-3.5 text-slate-500"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full pl-10 pr-12 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 outline-none transition"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-slate-500 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock
              className="absolute left-3 top-3.5 text-slate-500"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 outline-none transition"
              onChange={handleChange}
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-blue-600/20 active:scale-95">
            Sign Up
          </button>
        </form>

        {/* Redirect to Login Link */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 font-bold hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>

        {status.msg && (
          <div
            className={`mt-6 p-3 rounded-lg text-center text-sm font-medium ${
              status.type === "success"
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}
          >
            {status.msg}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
