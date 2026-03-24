import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__wrapper">
        <h3>MithraPortfolio</h3>
        <p>Designed for a modern personal portfolio content management system.</p>
        <div className="footer__links">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <span>© 2026 Mithra K. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;