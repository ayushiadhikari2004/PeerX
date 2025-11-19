// src/components/GroupsPage.js
import React, { useState } from "react";
import axios from "axios";
import "./GroupsPage.css";

export default function GroupsPage({ groups = [], onRefresh, onSelectGroup, showNotification }) {
  const [createData, setCreateData] = useState({ name: "", description: "" });
  const [joinCode, setJoinCode] = useState("");
  const [loading, setLoading] = useState(false);

  const createGroup = async (e) => {
    e.preventDefault();
    if (!createData.name) return showNotification("Name required", "error");
    setLoading(true);
    try {
      const res = await axios.post("/groups/create", createData);
      showNotification("Group created", "success");
      setCreateData({ name: "", description: "" });
      onRefresh();
    } catch (err) {
      showNotification(err.response?.data?.error || "Create failed", "error");
    } finally { setLoading(false); }
  };

  const joinGroup = async (e) => {
    e.preventDefault();
    if (!joinCode) return showNotification("Invite code required", "error");
    setLoading(true);
    try {
      await axios.post("/groups/join", { inviteCode: joinCode });
      showNotification("Joined group", "success");
      setJoinCode("");
      onRefresh();
    } catch (err) {
      showNotification(err.response?.data?.error || "Join failed", "error");
    } finally { setLoading(false); }
  };

  return (
    <div className="groups-page">
      <div className="groups-header">
        <h2>My Groups</h2>
        <p className="muted">Manage groups, create new ones or join with invite code.</p>
      </div>

      <div className="groups-grid">
        <div className="card create-card">
          <h3>Create Group</h3>
          <form onSubmit={createGroup}>
            <input
              placeholder="Group name"
              value={createData.name}
              onChange={(e) => setCreateData({ ...createData, name: e.target.value })}
              required
            />
            <input
              placeholder="Short description"
              value={createData.description}
              onChange={(e) => setCreateData({ ...createData, description: e.target.value })}
            />
            <button type="submit" disabled={loading}>{loading ? "..." : "Create"}</button>
          </form>
        </div>

        <div className="card join-card">
          <h3>Join Group</h3>
          <form onSubmit={joinGroup}>
            <input
              placeholder="INVITE CODE"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>{loading ? "..." : "Join"}</button>
          </form>
        </div>
      </div>

      <div className="groups-list">
        <h3>Your Groups</h3>
        <div className="list">
          {groups.length === 0 ? (
            <div className="empty">No groups yet — create or join one.</div>
          ) : (
            groups.map((g) => (
              <div className="group-item" key={g.id}>
                <div>
                  <strong>{g.name}</strong>
                  <div className="muted small">{g.description}</div>
                </div>

                <div className="actions">
                  <button onClick={() => onSelectGroup(g)}>Open</button>
                  <div className="invite">Code: <code>{g.inviteCode}</code></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
