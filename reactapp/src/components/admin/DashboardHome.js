import React from "react";
import "../../styles/admin/DashboardHome.css";

function DashboardHome() {
  const stats = [
    { title: "Projects", count: 12 },
    { title: "Skills", count: 18 },
    { title: "Messages", count: 7 },
    { title: "Certificates", count: 5 }
  ];

  return (
    <div className="dashboard-home">
      <div className="dashboard-cards">
        {stats.map((item, index) => (
          <div className="dashboard-card" key={index}>
            <h3>{item.count}</h3>
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-widgets">
        <div className="widget">
          <h3>Portfolio Summary</h3>
          <p>
            This panel helps you manage your profile, projects, skills, resume,
            contact details, theme customization, and visitor messages.
          </p>
        </div>

        <div className="widget">
          <h3>Recent Activity</h3>
          <ul>
            <li>Profile updated successfully</li>
            <li>2 new messages received</li>
            <li>Project "Portfolio CMS" added</li>
            <li>Theme changed to dark blue</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;