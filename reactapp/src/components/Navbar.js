import React, { useState } from "react";
import "../styles/Navbar.css";

function Navbar({ displayName }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__logo">
        {displayName || "Mithra"}
        <span>Portfolio</span>
      </div>

      <nav className={`navbar__links ${menuOpen ? "active" : ""}`}>
        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
        <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
        <a href="#resume" onClick={() => setMenuOpen(false)}>Resume</a>
        <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
        <a href="#certifications" onClick={() => setMenuOpen(false)}>Certifications</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </nav>

      <button className="navbar__toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
    </header>
  );
}

export default Navbar;
