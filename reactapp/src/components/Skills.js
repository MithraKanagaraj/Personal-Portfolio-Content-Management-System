import React from "react";
import SectionTitle from "./SectionTitle";
import "../styles/Skills.css";

const fallbackSkills = [
  { name: "React.js", level: "90%" },
  { name: "JavaScript", level: "88%" },
  { name: "Java", level: "85%" },
  { name: "Spring Boot", level: "80%" },
  { name: "HTML/CSS", level: "92%" },
  { name: "MySQL", level: "78%" }
];

const levelToPercent = {
  beginner: "55%",
  intermediate: "75%",
  advanced: "90%",
  expert: "96%"
};

function normalizeSkill(skill) {
  const rawLevel = skill?.level || "Intermediate";
  const mappedLevel = levelToPercent[rawLevel.toLowerCase()] || rawLevel;
  const width = mappedLevel.endsWith("%") ? mappedLevel : "75%";

  return {
    name: skill?.name || "Skill",
    label: rawLevel,
    width,
  };
}

function Skills({ skills = [] }) {
  const visibleSkills = (skills.length > 0 ? skills : fallbackSkills).map(normalizeSkill);

  return (
    <section className="skills section-spacing" id="skills">
      <div className="container">
        <SectionTitle subtitle="Expertise" title="Technical Skills" />
        <div className="skills__grid">
          {visibleSkills.map((skill, index) => (
            <div className="skills__card" key={`${skill.name}-${index}`}>
              <div className="skills__head">
                <h4>{skill.name}</h4>
                <span>{skill.label}</span>
              </div>
              <div className="skills__bar">
                <div className="skills__fill" style={{ width: skill.width }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
