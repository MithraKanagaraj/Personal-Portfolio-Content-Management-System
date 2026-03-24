import React from "react";
import "../../styles/admin/ManageResume.css";

function ManageResume() {
  return (
    <div className="panel-page">
      <h2>Manage Resume</h2>

      <div className="resume-box">
        <p>Upload your latest resume PDF</p>
        <input type="file" />
        <button>Upload Resume</button>
      </div>
    </div>
  );
}

export default ManageResume;