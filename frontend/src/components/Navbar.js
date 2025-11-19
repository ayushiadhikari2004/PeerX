import React from "react";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

function Navbar({ user, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2 className="app-title">DeCloud</h2>

        <input
          type="text"
          placeholder="Search files, groups..."
          className="navbar-search"
        />
      </div>

      <div className="navbar-right">
        <ThemeToggle />

        <div className="user-menu">
          <span className="username">{user?.username || "User"}</span>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
