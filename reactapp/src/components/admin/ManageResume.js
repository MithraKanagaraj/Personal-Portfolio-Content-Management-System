// import React from "react";
// import "../../styles/admin/ManageResume.css";

// function ManageResume() {
//   return (
//     <div className="panel-page">
//       <h2>Manage Resume</h2>

//       <div className="resume-box">
//         <p>Upload your latest resume PDF</p>
//         <input type="file" />
//         <button>Upload Resume</button>
//       </div>
//     </div>
//   );
// }

// export default ManageResume;
import React, { useEffect, useState } from "react";
import { saveResume, getResume } from "../../api/resumeApi";
import "../../styles/admin/ManageResume.css";

function ManageResume() {
  const [fileUrl, setFileUrl] = useState("");
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSaving, setIsSaving] = useState(false);

  const loadResume = async () => {
    try {
      const data = await getResume();
      setResume(data);
      if (data) setFileUrl(data.fileUrl);
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Unable to load resume details right now." });
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  const isValidUrl = (value) => {
    try {
      const parsedUrl = new URL(value);
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedUrl = fileUrl.trim();

    if (!trimmedUrl || !isValidUrl(trimmedUrl)) {
      setStatus({ type: "error", message: "Enter a valid resume URL (http/https)." });
      return;
    }

    try {
      setIsSaving(true);
      setStatus({ type: "", message: "" });
      await saveResume({ fileUrl: trimmedUrl });
      loadResume();
      setStatus({ type: "success", message: "Resume saved successfully." });
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Failed to save resume. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="panel-page">
      <h2>Manage Resume</h2>

      <div className="resume-box">
        <div className="resume-header">
          <h3>Resume Link Setup</h3>
          <p>Paste a public PDF URL so visitors can view your latest resume.</p>
        </div>

        <form className="resume-form" onSubmit={handleSubmit}>
          <label htmlFor="resume-url">Resume URL</label>
          <input
            id="resume-url"
            type="text"
            placeholder="https://example.com/my-resume.pdf"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
          />
          <div className="resume-actions">
            <button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Resume"}
            </button>
            <a
              className={`resume-preview-link${!resume?.fileUrl ? " disabled" : ""}`}
              href={resume?.fileUrl || "#"}
              target="_blank"
              rel="noreferrer"
              aria-disabled={!resume?.fileUrl}
              onClick={(e) => {
                if (!resume?.fileUrl) {
                  e.preventDefault();
                }
              }}
            >
              Open Current Resume
            </a>
          </div>
        </form>

        {status.message ? (
          <p className={`resume-status resume-status--${status.type}`}>{status.message}</p>
        ) : null}

        <div className="resume-current">
          <p className="resume-current-label">Current Resume</p>
          {resume?.fileUrl ? (
            <a href={resume.fileUrl} target="_blank" rel="noreferrer">
              {resume.fileUrl}
            </a>
          ) : (
            <p className="resume-empty">No resume URL saved yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageResume;
