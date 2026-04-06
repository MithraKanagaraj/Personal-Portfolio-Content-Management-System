import React from "react";
import SectionTitle from "./SectionTitle";
import "../styles/Testimonials.css";

function Testimonials({ user, profile, projects = [], skills = [] }) {
  const testimonials = [
    {
      name: profile?.headline || "Project Reviewer",
      text: projects.length > 0
        ? `${user?.fullName || "This developer"} showcases ${projects.length} project${projects.length > 1 ? "s" : ""} with clear structure and polished presentation.`
        : "A clean and professional portfolio design with excellent structure and presentation."
    },
    {
      name: "Technical Snapshot",
      text: skills.length > 0
        ? `Strong capability across ${skills.slice(0, 3).map((skill) => skill.name).join(", ")} with a thoughtful full stack mindset.`
        : "Strong effort in combining frontend quality with full stack project thinking."
    }
  ];

  return (
    <section className="testimonials section-spacing">
      <div className="container">
        <SectionTitle subtitle="Feedback" title="Testimonials" />
        <div className="testimonials__grid">
          {testimonials.map((item, index) => (
            <div className="testimonials__card" key={`${item.name}-${index}`}>
              <p>"{item.text}"</p>
              <h4>- {item.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
