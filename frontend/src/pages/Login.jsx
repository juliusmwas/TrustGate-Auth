import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
      );
      // Save the token so the browser "remembers" us
      localStorage.setItem("token", res.data.token);
      setStatus("✅ Login Success! Token stored in browser.");
    } catch (err) {
      setStatus("❌ " + (err.response?.data?.message || "Login failed"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 bg-slate-700 rounded text-white border border-slate-600"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 bg-slate-700 rounded text-white border border-slate-600"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button className="w-full bg-blue-600 py-3 rounded font-bold text-white hover:bg-blue-500 transition">
            Login
          </button>
        </form>
        {status && (
          <p className="mt-4 text-center text-sm font-mono text-blue-400">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
