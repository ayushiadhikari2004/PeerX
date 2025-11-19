import React from "react";
import "./Sidebar.css";

function Sidebar({ currentView, setCurrentView }) {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Navigation</h3>

      <button
        className={currentView === "dashboard" ? "active" : ""}
        onClick={() => setCurrentView("dashboard")}
      >
        📊 Dashboard
      </button>

      <button
        className={currentView === "groups" ? "active" : ""}
        onClick={() => setCurrentView("groups")}
      >
        👥 My Groups
      </button>

      <button
        className={currentView === "creategroup" ? "active" : ""}
        onClick={() => setCurrentView("creategroup")}
      >
        ➕ Create Group
      </button>

      <button
        className={currentView === "joingroup" ? "active" : ""}
        onClick={() => setCurrentView("joingroup")}
      >
        🔗 Join Group
      </button>

      <button
        className={currentView === "peers" ? "active" : ""}
        onClick={() => setCurrentView("peers")}
      >
        💻 Peers
      </button>
    </aside>
  );
}

export default Sidebar;
