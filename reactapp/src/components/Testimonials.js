import React from "react";
import SectionTitle from "./SectionTitle";
import "../styles/Testimonials.css";

const testimonials = [
  {
    name: "Project Reviewer",
    text: "A clean and professional portfolio design with excellent structure and presentation."
  },
  {
    name: "Mentor",
    text: "Strong effort in combining frontend quality with full stack project thinking."
  }
];

function Testimonials() {
  return (
    <section className="testimonials section-spacing">
      <div className="container">
        <SectionTitle subtitle="Feedback" title="Testimonials" />
        <div className="testimonials__grid">
          {testimonials.map((item, index) => (
            <div className="testimonials__card" key={index}>
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