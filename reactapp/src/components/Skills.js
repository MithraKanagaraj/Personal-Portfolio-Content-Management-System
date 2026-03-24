import React from "react";
import SectionTitle from "./SectionTitle";
import "../styles/Skills.css";

const skills = [
  { name: "React.js", level: "90%" },
  { name: "JavaScript", level: "88%" },
  { name: "Java", level: "85%" },
  { name: "Spring Boot", level: "80%" },
  { name: "HTML/CSS", level: "92%" },
  { name: "MySQL", level: "78%" }
];

function Skills() {
  return (
    <section className="skills section-spacing" id="skills">
      <div className="container">
        <SectionTitle subtitle="Expertise" title="Technical Skills" />
        <div className="skills__grid">
          {skills.map((skill, index) => (
            <div className="skills__card" key={index}>
              <div className="skills__head">
                <h4>{skill.name}</h4>
                <span>{skill.level}</span>
              </div>
              <div className="skills__bar">
                <div className="skills__fill" style={{ width: skill.level }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;