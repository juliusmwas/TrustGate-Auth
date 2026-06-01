import React from "react";
import { Mail, Phone, ShieldCheck } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <ShieldCheck size={48} className="mx-auto text-blue-500 mb-4" />
          <h1 className="text-3xl font-bold">Account Security</h1>
          <p className="text-slate-400 mt-2">
            Please complete verification to secure your account.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Email Verification Card */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <Mail className="text-blue-400 mb-4" size={24} />
            <h3 className="text-xl font-bold mb-2">Verify Email</h3>
            <p className="text-slate-400 text-sm mb-6">
              Confirm your email address to receive security alerts.
            </p>
            <button className="w-full bg-slate-700 hover:bg-blue-600 py-3 rounded-xl font-semibold transition">
              Send Email OTP
            </button>
          </div>

          {/* Phone Verification Card */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <Phone className="text-emerald-400 mb-4" size={24} />
            <h3 className="text-xl font-bold mb-2">Verify Phone</h3>
            <p className="text-slate-400 text-sm mb-6">
              Enable SMS verification for multi-factor authentication.
            </p>
            <button className="w-full bg-slate-700 hover:bg-emerald-600 py-3 rounded-xl font-semibold transition">
              Send SMS OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
