import React from "react";
import SectionTitle from "./SectionTitle";
import "../styles/Resume.css";

function Resume({ resume }) {
  const resumeUrl = resume?.fileUrl || "/";
  const hasResume = Boolean(resume?.fileUrl);

  return (
    <section className="resume section-spacing" id="resume">
      <div className="container">
        <SectionTitle subtitle="Profile" title="Resume" />
        <div className="resume__box">
          <h3>{hasResume ? "Download My Resume" : "Resume Coming Soon"}</h3>
          <p>
            {hasResume
              ? "View my academic background, skills, technical experience, and project achievements in detail."
              : "A downloadable resume has not been added yet. Please check back soon or use the contact section to request it."}
          </p>
          <a href={resumeUrl} className="resume__btn" target="_blank" rel="noreferrer">
            {hasResume ? "Download Resume" : "Explore Projects"}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Resume;
