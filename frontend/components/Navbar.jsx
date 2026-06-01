/**
 * @component Navbar
 * @description Reusable navigation bar with responsive Tailwind styling.
 */
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-slate-900 border-b border-slate-800 text-white">
      <Link
        to="/"
        className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"
      >
        TrustGate
      </Link>
      <div className="space-x-6">
        <Link to="/login" className="hover:text-blue-400 transition">
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
