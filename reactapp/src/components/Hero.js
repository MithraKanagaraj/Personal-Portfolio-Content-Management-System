import React from "react";
import "../styles/Hero.css";

function Hero({ user, profile, skills = [], projects = [] }) {
  const displayName = user?.fullName || "Build, manage and showcase your";
  const headline = profile?.headline || "Full Stack Developer";
  const description =
    profile?.bio ||
    "A modern and dynamic personal portfolio platform where users can manage profile details, projects, skills, resume, certifications, and contact information through a professional content management system.";
  const projectCount = projects.length > 0 ? `${projects.length}+` : "15+";
  const skillCount = skills.length > 0 ? `${skills.length}+` : "10+";

  return (
    <section className="hero section-spacing" id="home">
      <div className="container hero__wrapper">
        <div className="hero__content">
          <p className="hero__tag">{headline} • Portfolio CMS</p>
          <h1>
            {displayName}
            <span> professional portfolio</span>
          </h1>
          <p className="hero__desc">{description}</p>

          <div className="hero__buttons">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-outline">Hire Me</a>
          </div>

          <div className="hero__stats">
            <div>
              <h3>{projectCount}</h3>
              <p>Projects Completed</p>
            </div>
            <div>
              <h3>{skillCount}</h3>
              <p>Technologies</p>
            </div>
            <div>
              <h3>{profile?.location ? "Global" : "100%"}</h3>
              <p>{profile?.location || "Responsive Design"}</p>
            </div>
          </div>
        </div>

        <div className="hero__card">
          <div className="hero__glass">
            <h3>Portfolio Overview</h3>
            <p>Manage projects, skills, resume and personal branding in one place.</p>
            <ul>
              <li>{projects.length > 0 ? `${projects.length} projects published` : "Dynamic Project Showcase"}</li>
              <li>{skills.length > 0 ? `${skills.length} skills highlighted` : "Resume and Certification Display"}</li>
              <li>Professional Contact Section</li>
              <li>Clean UI / Responsive Layout</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
