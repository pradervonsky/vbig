"use client";
import { useState } from "react";

export default function UploadPage() {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (!res.ok) {
      alert("Upload failed!");
      return;
    }

    alert("Upload complete!");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Mockup Daily Dashboard</h2>

        <p style={styles.paragraph}>
          Temporary upload form of the dashboard screenshot. The plan is to
          automatically capture the KPI Superstore Sales dashboard from previous
          day at 05.00 AM daily and run it through the agentic workflow.
        </p>

        <form onSubmit={handleUpload} style={styles.form}>
          <label style={styles.label}>Select PNG File</label>

          <div style={styles.fileWrapper}>
            <input
              id="fileInput"
              type="file"
              name="file"
              accept="image/png"
              required
              style={styles.hiddenFile}
              onChange={(e) =>
                setFileName(e.target.files[0]?.name || "No file chosen")
              }
            />

            <button
              type="button"
              onClick={() => document.getElementById("fileInput").click()}
              style={styles.fileButton}
            >
              Choose File
            </button>

            <span style={styles.fileName}>{fileName}</span>
          </div>

          <label style={styles.label}>Date</label>
          <input type="date" name="date" required style={styles.input} />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ------------------------- INLINE STYLES ------------------------- */

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#111",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "380px",
    background: "#1c1c1c",
    padding: "28px",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
    color: "#fff",
  },
  title: {
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: 600,
    textAlign: "center",
  },
  paragraph: {
    marginBottom: "10px",
    fontSize: "16px",
    textAlign: "justify",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  label: {
    fontSize: "14px",
    opacity: 0.9,
    fontWeight: 600,
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #444",
    background: "#222",
    color: "#fff",
  },
  fileWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#222",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #444",
  },
  hiddenFile: {
    display: "none",
  },
  fileButton: {
    background: "#444",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
  },
  fileName: {
    color: "#bbb",
    fontSize: "14px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    background: "#4f46e5",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.2s",
  },
};