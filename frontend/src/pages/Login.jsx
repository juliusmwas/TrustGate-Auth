/**
 * @file Login.jsx
 * @description Secure production-grade login gateway using HttpOnly cookies instead of LocalStorage.
 */
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // CRUCIAL: 'withCredentials: true' tells the browser to accept cookies from the backend cross-origin
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true },
      );

      setStatus({ type: "success", msg: "✅ Login Success! Redirecting..." });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setStatus({
        type: "error",
        msg: err.response?.data?.message || "Login failed",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] p-4 font-sans">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8">
        {/* Branding header block */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-blue-500/10 rounded-full mb-4 text-blue-500">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-slate-400 mt-2">
            Access your TrustGate security hub
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <Mail
              className="absolute left-3 top-3.5 text-slate-500"
              size={18}
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 outline-none transition"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-3 top-3.5 text-slate-500"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full pl-10 pr-12 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 outline-none transition"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-slate-500 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-blue-600/20 active:scale-95">
            Log In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 font-bold hover:underline"
            >
              Create Account
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

export default Login;
