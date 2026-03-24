import React from "react";
import SectionTitle from "./SectionTitle";
import "../styles/Projects.css";

const projects = [
  {
    title: "Personal Portfolio CMS",
    description:
      "A full stack portfolio management platform with admin dashboard, dynamic content editing, and responsive frontend.",
    tech: "React, Node.js, Express, MongoDB"
  },
  {
    title: "AI Skin Care Recommendation",
    description:
      "A recommendation-based application that analyzes user needs and suggests personalized products.",
    tech: "React, Python, ML, API Integration"
  },
  {
    title: "Feedback and Rating System",
    description:
      "A product review system with ratings, comments, and admin moderation features.",
    tech: "React, Spring Boot, MySQL"
  }
];

function Projects() {
  return (
    <section className="projects section-spacing" id="projects">
      <div className="container">
        <SectionTitle subtitle="Portfolio" title="Featured Projects" />
        <div className="projects__grid">
          {projects.map((project, index) => (
            <div className="projects__card" key={index}>
              <div className="projects__image"></div>
              <div className="projects__content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span>{project.tech}</span>
                <div className="projects__buttons">
                  <a href="/">Live Demo</a>
                  <a href="/">GitHub</a>
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