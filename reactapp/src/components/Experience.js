import React from "react";
import SectionTitle from "./SectionTitle";
import "../styles/Experience.css";

const experiences = [
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

function Experience() {
  return (
    <section className="experience section-spacing" id="experience">
      <div className="container">
        <SectionTitle subtitle="Journey" title="Experience" />
        <div className="experience__timeline">
          {experiences.map((item, index) => (
            <div className="experience__item" key={index}>
              <h3>{item.role}</h3>
              <h4>{item.org}</h4>
              <span>{item.year}</span>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;