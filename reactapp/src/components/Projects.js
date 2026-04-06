import React from "react";
import SectionTitle from "./SectionTitle";
import "../styles/Projects.css";

const fallbackProjects = [
  {
    title: "Personal Portfolio CMS",
    description:
      "A full stack portfolio management platform with admin dashboard, dynamic content editing, and responsive frontend.",
    techStack: "React, Node.js, Express, MongoDB",
    liveLink: "/",
    githubLink: "/"
  },
  {
    title: "AI Skin Care Recommendation",
    description:
      "A recommendation-based application that analyzes user needs and suggests personalized products.",
    techStack: "React, Python, ML, API Integration",
    liveLink: "/",
    githubLink: "/"
  },
  {
    title: "Feedback and Rating System",
    description:
      "A product review system with ratings, comments, and admin moderation features.",
    techStack: "React, Spring Boot, MySQL",
    liveLink: "/",
    githubLink: "/"
  }
];

function Projects({ projects = [] }) {
  const visibleProjects = projects.length > 0 ? projects : fallbackProjects;

  return (
    <section className="projects section-spacing" id="projects">
      <div className="container">
        <SectionTitle subtitle="Portfolio" title="Featured Projects" />
        <div className="projects__grid">
          {visibleProjects.map((project, index) => (
            <div className="projects__card" key={project.id || `${project.title}-${index}`}>
              <div className="projects__image"></div>
              <div className="projects__content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span>{project.techStack || project.tech}</span>
                <div className="projects__buttons">
                  <a href={project.liveLink || "/"} target="_blank" rel="noreferrer">Live Demo</a>
                  <a href={project.githubLink || "/"} target="_blank" rel="noreferrer">GitHub</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
