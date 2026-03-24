import React from "react";
import SectionTitle from "./SectionTitle";
import "../styles/Resume.css";

function Resume() {
  return (
    <section className="resume section-spacing" id="resume">
      <div className="container">
        <SectionTitle subtitle="Profile" title="Resume" />
        <div className="resume__box">
          <h3>Download My Resume</h3>
          <p>
            View my academic background, skills, technical experience, and
            project achievements in detail.
          </p>
          <a href="/" className="resume__btn">Download Resume</a>
        </div>
      </div>
    </section>
  );
}

export default Resume;