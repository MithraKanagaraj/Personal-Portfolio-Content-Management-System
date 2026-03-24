import React from "react";
import SectionTitle from "./SectionTitle";
import "../styles/Certifications.css";

const certificates = [
  "Java Programming Certification",
  "React Frontend Development",
  "Database Management Systems",
  "Web Development Fundamentals"
];

function Certifications() {
  return (
    <section className="certifications section-spacing" id="certifications">
      <div className="container">
        <SectionTitle subtitle="Achievements" title="Certifications" />
        <div className="certifications__grid">
          {certificates.map((item, index) => (
            <div className="certifications__card" key={index}>
              <h3>{item}</h3>
              <p>Certified skill that strengthens practical and technical expertise.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;