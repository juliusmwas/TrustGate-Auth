/**
 * @file Index.jsx
 * @description Fully responsive landing/index page explaining TrustGate across mobile, tablet, and desktop viewports.
 */
import React from "react";
import { Link } from "react-router-dom";
import { Shield, Smartphone, Lock, Mail } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col justify-center">
      {/* Hero Section Container */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 text-center">
        {/* Animated Badge Icon */}
        <div className="inline-flex p-3 bg-blue-500/10 rounded-full mb-6 text-blue-500 animate-pulse">
          <Shield size={40} className="w-8 h-8 md:w-10 md:h-10" />
        </div>

        {/* Dynamic Typography Scale */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
          Next-Gen Authentication <br className="hidden sm:inline" />
          <span className="text-blue-500">Made Simple.</span>
        </h1>

        <p className="text-sm sm:text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Experience bulletproof security. TrustGate provides dual-layer
          identity verification using localized hashing protocols and
          multi-factor OTP validation.
        </p>

        {/* Responsive CTA Buttons (Stacks on Mobile, Rows on Desktop) */}
        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 max-w-xs sm:max-w-none mx-auto">
          <Link
            to="/signup"
            className="bg-blue-600 hover:bg-blue-500 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg text-center transition shadow-lg shadow-blue-600/20 active:scale-95"
          >
            Create Free Account
          </Link>
          <Link
            to="/login"
            className="border border-slate-700 bg-slate-800/50 hover:bg-slate-800 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg text-center transition active:scale-95"
          >
            Log In
          </Link>
        </div>

        {/* Responsive Layout Grid (1 Column Mobile -> 2 Columns Tablet -> 3 Columns Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-24">
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
              className="p-6 md:p-8 bg-slate-800/40 border border-slate-800 rounded-2xl text-left hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="p-3 bg-slate-900 w-fit rounded-xl mb-4 border border-slate-800">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
