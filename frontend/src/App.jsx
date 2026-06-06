/**
 * @file App.jsx
 * @description Root component that handles client-side routing, now featuring the Index portal.
 */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Index from "./pages/Index"; // Added the new landing page
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="App bg-slate-900 min-h-screen">
        <Routes>
          {/* 1. Main Landing Portal (The Front Storefront) */}
          <Route path="/" element={<Index />} />

          {/* 2. Authentication Gateways */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 3. Protected Route (Post-Login View) */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* 4. Catch-all: Redirects any completely unknown URL back to landing page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
