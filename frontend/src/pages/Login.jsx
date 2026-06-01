import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");
  const navigate = useNavigate(); // Hook for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
      );

      localStorage.setItem("token", res.data.token);
      setStatus("✅ Login Success! Redirecting...");

      // Redirect to the Auth Dashboard/Home after 1.5 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setStatus("❌ " + (err.response?.data?.message || "Login failed"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <Mail
              className="absolute left-3 top-3.5 text-slate-500"
              size={18}
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full pl-10 pr-4 py-3 bg-slate-900 rounded-lg text-white border border-slate-700 focus:border-blue-500 outline-none transition"
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
              className="w-full pl-10 pr-12 py-3 bg-slate-900 rounded-lg text-white border border-slate-700 focus:border-blue-500 outline-none transition"
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

          <button className="w-full bg-blue-600 py-3 rounded-lg font-bold text-white hover:bg-blue-500 transition transform active:scale-95 shadow-lg shadow-blue-600/20">
            Login
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

        {status && (
          <p
            className={`mt-4 text-center text-sm font-medium ${status.includes("✅") ? "text-emerald-400" : "text-red-400"}`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
