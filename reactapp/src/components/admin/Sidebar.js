import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/admin/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">PortfolioCMS</div>

      <nav className="sidebar-nav">
        <NavLink to="/admin">Dashboard</NavLink>
        <NavLink to="/admin/profile">Manage Profile</NavLink>
        <NavLink to="/admin/projects">Manage Projects</NavLink>
        <NavLink to="/admin/skills">Manage Skills</NavLink>
        <NavLink to="/admin/resume">Manage Resume</NavLink>
        <NavLink to="/admin/contact">Contact Details</NavLink>
        <NavLink to="/admin/theme">Theme Settings</NavLink>
        <NavLink to="/admin/messages">Messages</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;