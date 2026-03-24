import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../../styles/admin/AdminLayout.css";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;