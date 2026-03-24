import React from "react";
import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero section-spacing" id="home">
      <div className="container hero__wrapper">
        <div className="hero__content">
          <p className="hero__tag">Full Stack Developer • Portfolio CMS</p>
          <h1>
            Build, manage and showcase your
            <span> professional portfolio</span>
          </h1>
          <p className="hero__desc">
            A modern and dynamic personal portfolio platform where users can
            manage profile details, projects, skills, resume, certifications,
            and contact information through a professional content management system.
          </p>

          <div className="hero__buttons">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-outline">Hire Me</a>
          </div>

          <div className="hero__stats">
            <div>
              <h3>15+</h3>
              <p>Projects Completed</p>
            </div>
            <div>
              <h3>10+</h3>
              <p>Technologies</p>
            </div>
            <div>
              <h3>100%</h3>
              <p>Responsive Design</p>
            </div>
          </div>
        </div>

        <div className="hero__card">
          <div className="hero__glass">
            <h3>Portfolio Overview</h3>
            <p>Manage projects, skills, resume and personal branding in one place.</p>
            <ul>
              <li>Dynamic Project Showcase</li>
              <li>Resume & Certification Display</li>
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