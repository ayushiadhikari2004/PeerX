// src/components/FilesPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FilesPage.css";

export default function FilesPage({ group = null, showNotification }) {
  const [files, setFiles] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTags, setUploadTags] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (group) loadGroupFiles(group.id || group._id);
    else loadAllFiles();
    // eslint-disable-next-line
  }, [group]);

  const loadGroupFiles = async (groupId) => {
    try {
      const res = await axios.get(`/files/group/${groupId}`);
      setFiles(res.data);
    } catch (err) {
      showNotification("Could not load files", "error");
    }
  };

  const loadAllFiles = async () => {
    // If you have an endpoint to list all user files use it.
    try {
      const res = await axios.get("/files/group"); // fallback (may need backend)
      setFiles(res.data || []);
    } catch {
      setFiles([]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) return showNotification("Choose a file", "error");
    if (!group) return showNotification("Select a group first", "error");

    setLoading(true);
    const fd = new FormData();
    fd.append("file", uploadFile);
    fd.append("groupId", group.id || group._id);
    fd.append("tags", JSON.stringify(uploadTags.split(",").map(t=>t.trim()).filter(Boolean)));

    try {
      await axios.post("/files/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      showNotification("Uploaded", "success");
      setUploadFile(null);
      setUploadTags("");
      loadGroupFiles(group.id || group._id);
    } catch (err) {
      showNotification(err.response?.data?.error || "Upload failed", "error");
    } finally { setLoading(false); }
  };

  const downloadFile = async (file) => {
    try {
      showNotification("Downloading...", "success");
      const res = await axios.get(`/files/download/${file._id}`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = file.originalName || "file";
      document.body.appendChild(a);
      a.click();
      a.remove();
      showNotification("Downloaded", "success");
    } catch (err) {
      showNotification("Download failed", "error");
    }
  };

  const deleteFile = async (file) => {
    if (!window.confirm("Delete this file?")) return;
    try {
      await axios.delete(`/files/${file._id}`);
      showNotification("Deleted", "success");
      if (group) loadGroupFiles(group.id || group._id);
    } catch {
      showNotification("Delete failed", "error");
    }
  };

  return (
    <div className="files-page">
      <div className="files-header">
        <h2>{group ? `Files — ${group.name}` : "Files"}</h2>
        <p className="muted">Upload encrypted files to the selected group.</p>
      </div>

      <div className="upload-row card">
        <form className="upload-form" onSubmit={handleUpload}>
          <input
            type="file"
            onChange={(e) => setUploadFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="tags (comma separated)"
            value={uploadTags}
            onChange={(e) => setUploadTags(e.target.value)}
          />
          <button type="submit" disabled={loading}>{loading ? "Uploading..." : "Upload"}</button>
        </form>
      </div>

      <div className="files-list">
        {files.length === 0 ? (
          <div className="empty">No files yet.</div>
        ) : (
          files.map((f) => (
            <div className="file-item card" key={f._id}>
              <div className="file-main">
                <div className="file-name">{f.originalName}</div>
                <div className="file-meta muted">{(f.size/1024/1024).toFixed(2)} MB • {new Date(f.uploadedAt).toLocaleString()}</div>
              </div>

              <div className="file-actions">
                <button onClick={() => downloadFile(f)}>Download</button>
                {f.owner && (
                  <button className="danger" onClick={() => deleteFile(f)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
