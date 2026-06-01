/**
 * @page Home
 * @description The landing page featuring a Hero section to explain the product.
 */
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-10 py-24 text-center">
        <h1 className="text-6xl font-extrabold mb-6 leading-tight">
          Secure Authentication <br />
          <span className="text-blue-500">Made Simple.</span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          The ultimate boilerplate for developers. Google OAuth, Email OTP, and
          JWT security—all documented and ready to deploy.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/signup"
            className="bg-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
          >
            Start Building
          </Link>
          <button className="border border-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition">
            View Documentation
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {[
            {
              title: "OTP Verify",
              desc: "Secure email and SMS verification logic.",
            },
            {
              title: "Social Auth",
              desc: "One-click login with Google integration.",
            },
            {
              title: "Hashed Security",
              desc: "Industry-standard Bcrypt password encryption.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-8 bg-slate-800/50 border border-slate-700 rounded-2xl text-left"
            >
              <h3 className="text-xl font-bold mb-2 text-blue-400">
                {feature.title}
              </h3>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
