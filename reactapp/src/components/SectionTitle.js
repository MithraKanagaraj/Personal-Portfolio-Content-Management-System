import React from "react";
import "../styles/SectionTitle.css";

function SectionTitle({ subtitle, title }) {
  return (
    <div className="section-title">
      <p>{subtitle}</p>
      <h2>{title}</h2>
    </div>
  );
}

export default SectionTitle;