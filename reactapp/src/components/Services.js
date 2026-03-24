import React from "react";
import SectionTitle from "./SectionTitle";
import "../styles/Services.css";

const services = [
  "Portfolio Website Development",
  "Frontend UI Design",
  "Full Stack Web Application Development",
  "Responsive Web Design"
];

function Services() {
  return (
    <section className="services section-spacing">
      <div className="container">
        <SectionTitle subtitle="Capabilities" title="Services" />
        <div className="services__grid">
          {services.map((service, index) => (
            <div className="services__card" key={index}>
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