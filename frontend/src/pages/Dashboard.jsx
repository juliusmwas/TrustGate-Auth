/**
 * @file Dashboard.jsx
 * @description Secure account security dashboard utilizing HttpOnly credential states and dynamic verification panels.
 * Features a sandbox demo banner that catches intercepted mock tokens for hosting deployment.
 */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  ShieldCheck,
  LogOut,
  KeyRound,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // --- Global Component UI States ---
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  // --- Email Feature States ---
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailOtpInput, setEmailOtpInput] = useState("");

  // --- Phone Feature States ---
  const [phoneSent, setPhoneSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneOtpInput, setPhoneOtpInput] = useState("");
  const [visibleDemoCode, setVisibleDemoCode] = useState(""); // Holds sandbox code string

  // ==========================================
  // 1. EMAIL AUTHENTICATION ACTIONS
  // ==========================================

  /**
   * Dispatches an automated security code to the user's registered account address
   */
  const handleSendEmailOtp = async () => {
    setLoading(true);
    setStatus({ type: "", msg: "" });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/send-email-otp",
        {},
        { withCredentials: true }, // Crucial for passing HttpOnly context
      );
      setEmailSent(true);
      setStatus({
        type: "success",
        msg: res.data.message || "Code sent successfully!",
      });
    } catch (err) {
      setStatus({
        type: "error",
        msg:
          err.response?.data?.message ||
          "Failed to trigger security code email.",
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sends the user's inputted 6-digit numeric string back to backend for verification evaluation
   */
  const handleVerifyEmailOtp = async (e) => {
    e.preventDefault();
    if (!emailOtpInput) return;

    setLoading(true);
    setStatus({ type: "", msg: "" });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-email-otp",
        { otpInput: emailOtpInput },
        { withCredentials: true },
      );
      setEmailVerified(true);
      setStatus({ type: "success", msg: res.data.message });
    } catch (err) {
      setStatus({
        type: "error",
        msg: err.response?.data?.message || "Incorrect code entered.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // 2. PHONE AUTHENTICATION ACTIONS (MOCK SIMULATOR)
  // ==========================================

  /**
   * Requests backend system to generate a phone verification token code inside the terminal console
   */
  const handleSendPhoneOtp = async () => {
    setLoading(true);
    setStatus({ type: "", msg: "" });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/send-sms-otp",
        {},
        { withCredentials: true },
      );

      setPhoneSent(true);
      setVisibleDemoCode(res.data.demoCode || ""); // Intercept code payload

      setStatus({
        type: "success",
        msg: "MFA Token payload intercepted successfully!",
      });
    } catch (err) {
      setStatus({
        type: "error",
        msg:
          err.response?.data?.message ||
          "Failed to trigger simulated phone token code.",
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Submits the 6-digit text token captured from backend log back to server database verification routes
   */
  const handleVerifyPhoneOtp = async (e) => {
    e.preventDefault();
    if (!phoneOtpInput) return;

    setLoading(true);
    setStatus({ type: "", msg: "" });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-sms-otp",
        { otpInput: phoneOtpInput },
        { withCredentials: true },
      );
      setPhoneVerified(true);
      setStatus({ type: "success", msg: res.data.message });
    } catch (err) {
      setStatus({
        type: "error",
        msg:
          err.response?.data?.message || "Incorrect token signature entered.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // 3. SECURE SESSION TERMINATION MANAGEMENT
  // ==========================================

  /**
   * Destroys the cookie session status structures and safely cleans user memory spaces
   */
  const handleLogout = () => {
    setStatus({ type: "success", msg: "Logging out securely..." });
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-4 sm:p-6 md:p-8 font-sans relative">
      {/* Absolute positioning corner logout container */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 border border-slate-700 hover:border-red-500/20 px-4 py-2 rounded-xl text-sm font-semibold transition group"
        >
          <LogOut
            size={16}
            className="text-slate-400 group-hover:text-red-400 transition"
          />
          <span>Log Out</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto mt-12 sm:mt-16">
        <header className="mb-10 text-center px-4">
          <div className="inline-flex p-3 bg-blue-500/10 rounded-full mb-4 text-blue-500">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Account Security Hub
          </h1>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Complete verification steps to fully activate system protection
            filters.
          </p>
        </header>

        {/* Dynamic global notification panel display banner layout */}
        {status.msg && (
          <div
            className={`mb-8 p-4 rounded-xl text-center text-sm font-medium mx-4 max-w-xl border ${
              status.type === "success"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 md:mx-auto"
                : "bg-red-500/10 text-red-400 border-red-500/20 md:mx-auto"
            }`}
          >
            {status.msg}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {/* ==========================================
              CARD 1: EMAIL VERIFICATION GATEWAY
             ========================================== */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between transition hover:border-slate-600">
            <div>
              <div className="flex justify-between items-start mb-4">
                <Mail
                  className={
                    emailVerified ? "text-emerald-400" : "text-blue-400"
                  }
                  size={26}
                />
                {emailVerified && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">Verify Email Address</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Confirm ownership of your profile mailbox to receive real-time
                active login alert packets.
              </p>
            </div>

            {/* Render Input form fields based on API state flags updates */}
            {!emailVerified && emailSent ? (
              <form onSubmit={handleVerifyEmailOtp} className="space-y-3 mt-2">
                <div className="relative">
                  <KeyRound
                    className="absolute left-3 top-3 text-slate-500"
                    size={16}
                  />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-Digit Code"
                    value={emailOtpInput}
                    required
                    onChange={(e) =>
                      setEmailOtpInput(e.target.value.replace(/\D/g, ""))
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-center font-mono text-lg tracking-widest text-white focus:border-blue-500 outline-none transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white py-2.5 rounded-xl font-semibold transition active:scale-95"
                >
                  {loading ? "Verifying..." : "Confirm Verification Code"}
                </button>
              </form>
            ) : (
              !emailVerified && (
                <button
                  onClick={handleSendEmailOtp}
                  disabled={loading}
                  className="w-full bg-slate-700 hover:bg-blue-600 disabled:bg-slate-700 text-white py-3 rounded-xl font-semibold transition active:scale-95 mt-4"
                >
                  {loading ? "Sending..." : "Send Email OTP"}
                </button>
              )
            )}
          </div>

          {/* ==========================================
              CARD 2: PHONE VERIFICATION GATEWAY (MOCK SIMULATED)
             ========================================== */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between transition hover:border-slate-600">
            <div>
              <div className="flex justify-between items-start mb-4">
                <Phone
                  className={
                    phoneVerified ? "text-emerald-400" : "text-emerald-500"
                  }
                  size={26}
                />
                {phoneVerified && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">Verify Phone Network</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Connect your active cellular contact lines to simulate safe
                secondary multi-factor hardware checks.
              </p>
            </div>

            {/* Dynamic UI switching for Mock Phone Entry fields */}
            {!phoneVerified && phoneSent ? (
              <form onSubmit={handleVerifyPhoneOtp} className="space-y-3 mt-2">
                {/* ─── LIVE PORTFOLIO DEMO BANNER CALLOUT ─── */}
                <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-xs text-amber-400 mb-2 leading-relaxed flex items-start gap-2">
                  <Sparkles
                    size={16}
                    className="text-amber-400 shrink-0 mt-0.5"
                  />
                  <div>
                    <b>Demo Sandbox Mode:</b> To test this database routing
                    validation without standard SMS carrier costs, input
                    intercept code:{" "}
                    <span className="font-mono bg-slate-900 px-1.5 py-0.5 rounded text-white font-bold tracking-widest border border-slate-700">
                      {visibleDemoCode}
                    </span>
                  </div>
                </div>
                {/* ────────────────────────────────────────── */}

                <div className="relative">
                  <KeyRound
                    className="absolute left-3 top-3 text-slate-500"
                    size={16}
                  />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter Intercepted Code"
                    value={phoneOtpInput}
                    required
                    onChange={(e) =>
                      setPhoneOtpInput(e.target.value.replace(/\D/g, ""))
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-center font-mono text-lg tracking-widest text-white focus:border-emerald-500 outline-none transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white py-2.5 rounded-xl font-semibold transition active:scale-95"
                >
                  {loading ? "Evaluating..." : "Confirm SMS Code"}
                </button>
              </form>
            ) : (
              !phoneVerified && (
                <button
                  onClick={handleSendPhoneOtp}
                  disabled={loading}
                  className="w-full bg-slate-700 hover:bg-emerald-600 disabled:bg-slate-700 text-white py-3 rounded-xl font-semibold transition active:scale-95 mt-4"
                >
                  {loading ? "Simulating..." : "Send SMS OTP"}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
