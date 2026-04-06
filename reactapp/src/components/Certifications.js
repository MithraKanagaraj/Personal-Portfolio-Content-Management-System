import React from "react";
import SectionTitle from "./SectionTitle";
import "../styles/Certifications.css";

const fallbackCertificates = [
  "Java Programming Certification",
  "React Frontend Development",
  "Database Management Systems",
  "Web Development Fundamentals"
];

function Certifications({ certifications = [], skills = [] }) {
  const visibleCertifications = certifications.length > 0
    ? certifications
    : (skills.length > 0
      ? skills.slice(0, 6).map((skill) => ({
          title: skill.name,
          issuer: skill.level || "Validated Skill",
          issueYear: "",
          credentialUrl: "",
        }))
      : fallbackCertificates.map((title) => ({
          title,
          issuer: "Professional Learning",
          issueYear: "",
          credentialUrl: "",
        })));

  return (
    <section className="certifications section-spacing" id="certifications">
      <div className="container">
        <SectionTitle subtitle="Achievements" title="Certifications" />
        <div className="certifications__grid">
          {visibleCertifications.map((item, index) => (
            <div className="certifications__card" key={`${item.id || item.title}-${index}`}>
              <h3>{item.title}</h3>
              <p>
                {[item.issuer, item.issueYear].filter(Boolean).join(" • ") ||
                  "Recognized capability that strengthens hands-on technical expertise and delivery confidence."}
              </p>
              {item.credentialUrl ? (
                <a href={item.credentialUrl} target="_blank" rel="noreferrer">View Credential</a>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
