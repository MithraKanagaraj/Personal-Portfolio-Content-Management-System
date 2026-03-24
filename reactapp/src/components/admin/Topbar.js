import React from "react";
import "../../styles/admin/Topbar.css";

function Topbar() {
  return (
    <header className="topbar">
      <div>
        <h2>Admin Dashboard</h2>
        <p>Manage your portfolio content professionally</p>
      </div>
      <div className="topbar-user">
        <span>Mithra K</span>
        <button>Logout</button>
      </div>
    </header>
  );
}

export default Topbar;