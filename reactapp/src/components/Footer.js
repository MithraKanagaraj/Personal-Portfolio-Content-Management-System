import React from "react";
import "../styles/Footer.css";

function Footer({ user }) {
  const displayName = user?.fullName || "Mithra K";

  return (
    <footer className="footer">
      <div className="container footer__wrapper">
        <h3>{displayName} Portfolio</h3>
        <p>Designed for a modern personal portfolio content management system.</p>
        <div className="footer__links">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <span>© 2026 {displayName}. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
