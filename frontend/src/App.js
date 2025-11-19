// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import { ThemeProvider } from "./contexts/ThemeContext";

import GroupsPage from "./components/GroupsPage";
import FilesPage from "./components/FilesPage";
import PeersPage from "./components/PeersPage";

import "./App.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
axios.defaults.baseURL = API_URL;

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [user, setUser] = useState(null);

  const [stats, setStats] = useState(null);
  const [groups, setGroups] = useState([]);
  const [peers, setPeers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  const showNotification = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // boot
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setIsAuthenticated(true);
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [gRes, sRes, pRes] = await Promise.all([
        axios.get("/groups"),
        axios.get("/stats/dashboard"),
        axios.get("/peers"),
      ]);
      setGroups(gRes.data);
      setStats(sRes.data);
      setPeers(pRes.data);
    } catch (err) {
      console.error("loadDashboard:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView("login");
    showNotification("Logged out", "success");
  };

  // auth UI omitted for brevity — reuse the auth UI from the previous App.js you have.
  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1>DeCloud</h1>
          <div className="auth-switch">
            <button
              className={currentView === "login" ? "active" : ""}
              onClick={() => setCurrentView("login")}
            >
              Login
            </button>
            <button
              className={currentView === "register" ? "active" : ""}
              onClick={() => setCurrentView("register")}
            >
              Register
            </button>
          </div>

          {currentView === "login" ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                  const res = await axios.post("/auth/login", loginData);
                  localStorage.setItem("token", res.data.token);
                  axios.defaults.headers.common["Authorization"] =
                    "Bearer " + res.data.token;
                  setUser(res.data.user);
                  setIsAuthenticated(true);
                  setCurrentView("dashboard");
                  loadDashboard();
                } catch (err) {
                  showNotification("Login failed", "error");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <input
                type="email"
                placeholder="Email"
                value={loginData.email}
                required
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                required
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              <button type="submit">{loading ? "..." : "Login"}</button>
            </form>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                  const res = await axios.post("/auth/register", registerData);
                  localStorage.setItem("token", res.data.token);
                  axios.defaults.headers.common["Authorization"] =
                    "Bearer " + res.data.token;
                  setUser(res.data.user);
                  setIsAuthenticated(true);
                  setCurrentView("dashboard");
                  loadDashboard();
                } catch {
                  showNotification("Registration failed", "error");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <input
                type="text"
                placeholder="Username"
                value={registerData.username}
                required
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                value={registerData.email}
                required
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                value={registerData.password}
                required
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />
              <button type="submit">{loading ? "..." : "Register"}</button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="app-body">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        <main className="main-content">
          {currentView === "dashboard" && stats && (
            <div>
              <h1 className="page-title">Dashboard</h1>
              <div className="stats-grid">
                <div className="stat-box">
                  <h3>Storage Used</h3>
                  <p>{(stats.storageUsed / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <div className="stat-box">
                  <h3>Total Files</h3>
                  <p>{stats.fileCount}</p>
                </div>
                <div className="stat-box">
                  <h3>Groups</h3>
                  <p>{stats.groupCount}</p>
                </div>
                <div className="stat-box">
                  <h3>Peers</h3>
                  <p>{stats.peersOnline}</p>
                </div>
              </div>
            </div>
          )}

          {currentView === "groups" && (
            <GroupsPage
              groups={groups}
              onRefresh={loadDashboard}
              onSelectGroup={(g) => {
                setSelectedGroup(g);
                setCurrentView("groupfiles");
              }}
              showNotification={showNotification}
            />
          )}

          {currentView === "groupfiles" && selectedGroup && (
            <FilesPage
              group={selectedGroup}
              showNotification={showNotification}
            />
          )}

          {currentView === "files" && (
            <FilesPage group={null} showNotification={showNotification} />
          )}

          {currentView === "peers" && (
            <PeersPage peers={peers} onRefresh={loadDashboard} />
          )}
        </main>
      </div>

      <Footer />
      <CookieBanner />
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.msg}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
