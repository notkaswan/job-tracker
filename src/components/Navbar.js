import React from "react";
import { Link } from "react-router";

export const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};
