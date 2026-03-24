import React from "react";
import SectionTitle from "./SectionTitle";
import "../styles/About.css";

function About() {
  return (
    <section className="about section-spacing" id="about">
      <div className="container">
        <SectionTitle subtitle="Introduction" title="About Me" />
        <div className="about__grid">
          <div className="about__left">
            <h3>Crafting user-focused digital experiences</h3>
            <p>
              I am a passionate full stack developer with interest in building
              modern web applications that are clean, scalable, and user-friendly.
              This portfolio content management system demonstrates how a user
              can manage portfolio content dynamically through an admin dashboard.
            </p>
            <p>
              My focus is on responsive interfaces, structured backend design,
              secure authentication, and smooth user experience.
            </p>
          </div>

          <div className="about__right">
            <div className="about__card">
              <h4>Name</h4>
              <p>Mithra K</p>
            </div>
            <div className="about__card">
              <h4>Email</h4>
              <p>mithra@example.com</p>
            </div>
            <div className="about__card">
              <h4>Location</h4>
              <p>Tamil Nadu, India</p>
            </div>
            <div className="about__card">
              <h4>Specialization</h4>
              <p>React, Java, Spring Boot, Full Stack Development</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;