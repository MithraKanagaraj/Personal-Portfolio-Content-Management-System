import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import DashboardHome from "../components/admin/DashboardHome";
import ManageProfile from "../components/admin/ManageProfile";
import ManageProjects from "../components/admin/ManageProjects";
import ManageSkills from "../components/admin/ManageSkills";
import ManageExperience from "../components/admin/ManageExperience";
import ManageCertifications from "../components/admin/ManageCertifications";
import ManageResume from "../components/admin/ManageResume";
import ManageContact from "../components/admin/ManageContact";
import ManageTheme from "../components/admin/ManageTheme";
import ManageMessages from "../components/admin/ManageMessages";

function AdminPage() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="profile" element={<ManageProfile />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="skills" element={<ManageSkills />} />
        <Route path="experience" element={<ManageExperience />} />
        <Route path="certifications" element={<ManageCertifications />} />
        <Route path="resume" element={<ManageResume />} />
        <Route path="contact" element={<ManageContact />} />
        <Route path="theme" element={<ManageTheme />} />
        <Route path="messages" element={<ManageMessages />} />
      </Routes>
    </AdminLayout>
  );
}

export default AdminPage;
