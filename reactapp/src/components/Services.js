import React from "react";
import SectionTitle from "./SectionTitle";
import "../styles/Services.css";

const fallbackServices = [
  "Portfolio Website Development",
  "Frontend UI Design",
  "Full Stack Web Application Development",
  "Responsive Web Design"
];

function Services({ skills = [], profile }) {
  const services = skills.length > 0
    ? [
        `${skills[0]?.name || "Frontend"} Implementation`,
        `${skills[1]?.name || "Backend"} Integration`,
        `${profile?.portfolioTheme || "Portfolio"} Experience Design`,
        "Responsive Web Delivery"
      ]
    : fallbackServices;

  return (
    <section className="services section-spacing">
      <div className="container">
        <SectionTitle subtitle="Capabilities" title="Services" />
        <div className="services__grid">
          {services.map((service, index) => (
            <div className="services__card" key={`${service}-${index}`}>
              <h3>{service}</h3>
              <p>
                Delivering modern, scalable, and user-friendly web experiences
                with clean interface design.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
