import React from "react";
import SectionTitle from "./SectionTitle";
import "../styles/Experience.css";

const fallbackExperiences = [
  {
    role: "Frontend Developer",
    org: "Freelance / Academic Projects",
    year: "2024 - Present",
    desc: "Built responsive user interfaces with React and modern CSS."
  },
  {
    role: "Full Stack Project Developer",
    org: "College Project Work",
    year: "2025 - Present",
    desc: "Developing full stack systems with authentication, APIs, and database integration."
  }
];

function Experience({ experiences = [], profile, projects = [], skills = [] }) {
  const derivedExperiences = projects.slice(0, 3).map((project, index) => ({
    role: project.title || `Project Spotlight ${index + 1}`,
    organization: profile?.headline || "Independent Portfolio Work",
    duration: `Phase ${index + 1}`,
    description: project.description || `Built using ${project.techStack || skills.slice(0, 3).map((skill) => skill.name).join(", ") || "modern web technologies"}.`
  }));

  const visibleExperiences = experiences.length > 0
    ? experiences
    : (derivedExperiences.length > 0 ? derivedExperiences : fallbackExperiences.map((item) => ({
        role: item.role,
        organization: item.org,
        duration: item.year,
        description: item.desc,
      })));

  return (
    <section className="experience section-spacing" id="experience">
      <div className="container">
        <SectionTitle subtitle="Journey" title="Experience" />
        <div className="experience__timeline">
          {visibleExperiences.map((item, index) => (
            <div className="experience__item" key={`${item.id || item.role}-${index}`}>
              <h3>{item.role}</h3>
              <h4>{item.organization || "Independent Portfolio Work"}</h4>
              <span>{item.duration || "Recent Work"}</span>
              <p>{item.description || "Built with care and attention to clean product delivery."}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
