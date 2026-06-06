/**
 * @file Index.jsx
 * @description The main landing/index page explaining TrustGate before users log in.
 */
import React from "react";
import { Link } from "react-router-dom";
import { Shield, Key, Smartphone, Lock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex p-3 bg-blue-500/10 rounded-full mb-6 text-blue-500 animate-pulse">
          <Shield size={40} />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
          Next-Gen Authentication <br />
          <span className="text-blue-500">Made Simple.</span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Experience bulletproof security. TrustGate provides dual-layer
          identity verification using localized hashing protocols and
          multi-factor OTP validation.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/signup"
            className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-600/20 active:scale-95"
          >
            Create Free Account
          </Link>
          <Link
            to="/login"
            className="border border-slate-700 bg-slate-800/50 hover:bg-slate-800 px-8 py-4 rounded-xl font-bold text-lg transition active:scale-95"
          >
            Log In
          </Link>
        </div>

        {/* Feature Matrix */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {[
            {
              icon: <Mail className="text-blue-400" size={24} />,
              title: "Email Verification",
              desc: "Instant one-time passcodes dispatched via secure automated mail servers.",
            },
            {
              icon: <Smartphone className="text-emerald-400" size={24} />,
              title: "SMS Validation",
              desc: "Direct network-level mobile handshakes using modern gateway routing.",
            },
            {
              icon: <Lock className="text-purple-400" size={24} />,
              title: "Asymmetric Security",
              desc: "Industry-standard Bcrypt protective layering combined with signed JWT access keys.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-8 bg-slate-800/40 border border-slate-800 rounded-2xl text-left hover:border-slate-700 transition"
            >
              <div className="p-3 bg-slate-900 w-fit rounded-xl mb-4 border border-slate-800">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Quick layout fallback import fix for dynamic map rendering below
import { Mail } from "lucide-react";

export default Index;
