import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../utils/AuthContext";
import { logout } from "../utils/auth";

export const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">
          Job Tracker
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/jobs" className="px-3 py-1">
                Jobs
              </Link>
              <Link to="/" className="px-3 py-1">
                Dashboard
              </Link>
              <Link to="/profile" className="px-3 py-1">
                Profile
              </Link>
              <button onClick={handleLogout} className="px-3 p-1">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="px-3 py-1">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
