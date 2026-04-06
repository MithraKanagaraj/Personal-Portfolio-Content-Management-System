import React, { useEffect, useMemo, useState } from "react";
import { getProjects } from "../../api/projectApi";
import { getSkills } from "../../api/skillApi";
import { getMessages } from "../../api/messageApi";
import { getCertifications } from "../../api/certificationApi";
import "../../styles/admin/DashboardHome.css";

function DashboardHome() {
  const [dashboardData, setDashboardData] = useState({
    projects: [],
    skills: [],
    messages: [],
    certifications: [],
  });
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    messages: 0,
    certifications: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [projectsResult, skillsResult, messagesResult, certificationsResult] =
          await Promise.allSettled([
            getProjects(),
            getSkills(),
            getMessages(),
            getCertifications(),
          ]);

        const projects = projectsResult.status === "fulfilled" ? projectsResult.value : [];
        const skills = skillsResult.status === "fulfilled" ? skillsResult.value : [];
        const messages = messagesResult.status === "fulfilled" ? messagesResult.value : [];
        const certifications =
          certificationsResult.status === "fulfilled" ? certificationsResult.value : [];

        setDashboardData({
          projects,
          skills,
          messages,
          certifications,
        });

        setStats({
          projects: projects.length,
          skills: skills.length,
          messages: messages.length,
          certifications: certifications.length,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, []);

  const statCards = useMemo(
    () => [
      { title: "Projects", count: stats.projects },
      { title: "Skills", count: stats.skills },
      { title: "Messages", count: stats.messages },
      { title: "Certificates", count: stats.certifications },
    ],
    [stats]
  );

  const recentActivity = useMemo(
    () => [
      dashboardData.projects[0]?.title
        ? `Latest project: ${dashboardData.projects[0].title}`
        : `${stats.projects} project${stats.projects === 1 ? "" : "s"} published`,
      dashboardData.skills[0]?.name
        ? `Newest skill: ${dashboardData.skills[0].name}`
        : `${stats.skills} skill${stats.skills === 1 ? "" : "s"} added`,
      dashboardData.messages[0]?.senderName
        ? `Latest message from ${dashboardData.messages[0].senderName}`
        : `${stats.messages} message${stats.messages === 1 ? "" : "s"} received`,
      dashboardData.certifications[0]?.title
        ? `Newest certification: ${dashboardData.certifications[0].title}`
        : `${stats.certifications} certification${stats.certifications === 1 ? "" : "s"} showcased`,
    ],
    [dashboardData, stats]
  );

  return (
    <div className="dashboard-home">
      <div className="dashboard-cards">
        {statCards.map((item, index) => (
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
        <div className="widget portfolio-preview-widget">
          <h3>Live Preview</h3>
          <p>
            Open your current portfolio in a new tab to verify how your public
            page looks.
          </p>
        </div>
        <div className="widget">
          <h3>Recent Activity</h3>
          <ul>
            {recentActivity.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
