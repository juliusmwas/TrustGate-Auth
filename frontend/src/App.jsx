/**
 * @file App.jsx
 * @description Root component that handles client-side routing.
 */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="App bg-slate-900 min-h-screen">
        <Routes>
          {/* 1. Default Route: Redirects anyone visiting the root to Login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* 2. Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 3. Protected Route (Post-Login) */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* 4. Catch-all: Redirects any unknown URL back to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
