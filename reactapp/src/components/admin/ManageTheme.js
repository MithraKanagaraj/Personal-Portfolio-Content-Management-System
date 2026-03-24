import React from "react";
import "../../styles/admin/ManageTheme.css";

function ManageTheme() {
  return (
    <div className="panel-page">
      <h2>Manage Theme</h2>

      <div className="theme-grid">
        <div className="theme-card active-theme">
          <h3>Dark Professional</h3>
          <p>Modern dark look for developers and designers</p>
          <button>Selected</button>
        </div>

        <div className="theme-card">
          <h3>Light Minimal</h3>
          <p>Clean white layout with elegant typography</p>
          <button>Apply Theme</button>
        </div>

        <div className="theme-card">
          <h3>Blue Gradient</h3>
          <p>Creative modern style with premium feel</p>
          <button>Apply Theme</button>
        </div>
      </div>
    </div>
  );
}

export default ManageTheme;