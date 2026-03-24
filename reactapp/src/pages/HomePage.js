import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Resume from "../components/Resume";
import Experience from "../components/Experience";
import Certifications from "../components/Certifications";
import Testimonials from "../components/Testimonials";
import Services from "../components/Services";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Experience />
      <Certifications />
      <Testimonials />
      <Services />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}

export default HomePage;