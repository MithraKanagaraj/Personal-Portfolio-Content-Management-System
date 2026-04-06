import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";
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
import { normalizePortfolioTheme } from "../utils/theme";

function HomePage() {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState({
    user: null,
    profile: null,
    skills: [],
    projects: [],
    resume: null,
    experiences: [],
    certifications: [],
  });
  const [error, setError] = useState("");
  const resolvedTheme = normalizePortfolioTheme(portfolio.profile?.portfolioTheme);

  useEffect(() => {
    const loadPortfolio = async () => {
      if (!username) {
        setPortfolio({
          user: null,
          profile: null,
          skills: [],
          projects: [],
          resume: null,
          experiences: [],
          certifications: [],
        });
        setError("");
        return;
      }

      const loggedInUsername = localStorage.getItem("username");
      const token = localStorage.getItem("token");
      const isOwnerView =
        Boolean(token) &&
        Boolean(loggedInUsername) &&
        loggedInUsername.toLowerCase() === username.toLowerCase();

      try {
        setError("");

        let profile;

        try {
          const publicProfileResponse = await axios.get(`http://localhost:8080/api/profile/${username}`);
          profile = publicProfileResponse.data;
        } catch (profileError) {
          if (!isOwnerView) {
            throw profileError;
          }

          const myProfileResponse = await axiosInstance.get("/api/profile/me");
          profile = myProfileResponse.data;
        }

        const initialPortfolio = {
          user: profile?.user ?? null,
          profile,
          skills: [],
          projects: [],
          resume: null,
          experiences: [],
          certifications: [],
        };

        const [experiencesResult, certificationsResult] = await Promise.allSettled([
          axios.get(`http://localhost:8080/api/experiences/public/${username}`),
          axios.get(`http://localhost:8080/api/certifications/public/${username}`),
        ]);

        initialPortfolio.experiences =
          experiencesResult.status === "fulfilled" ? experiencesResult.value.data : [];
        initialPortfolio.certifications =
          certificationsResult.status === "fulfilled" ? certificationsResult.value.data : [];

        if (!isOwnerView) {
          setPortfolio(initialPortfolio);
          return;
        }

        const [skillsResult, projectsResult, resumeResult] = await Promise.allSettled([
          axiosInstance.get("/api/skills"),
          axiosInstance.get("/api/projects"),
          axiosInstance.get("/api/resume"),
        ]);

        setPortfolio({
          ...initialPortfolio,
          skills: skillsResult.status === "fulfilled" ? skillsResult.value.data : [],
          projects: projectsResult.status === "fulfilled" ? projectsResult.value.data : [],
          resume: resumeResult.status === "fulfilled" ? resumeResult.value.data : null,
        });
      } catch (loadError) {
        console.error(loadError);
        setError("Unable to load this portfolio right now.");
      }
    };

    loadPortfolio();
  }, [username]);

  useEffect(() => {
    document.body.setAttribute("data-portfolio-theme", resolvedTheme);

    return () => {
      document.body.removeAttribute("data-portfolio-theme");
    };
  }, [resolvedTheme]);

  const contactUsername = username || localStorage.getItem("username") || "mithra";

  return (
    <div className="portfolio-page">
      <Navbar displayName={portfolio.user?.fullName} />
      {error ? (
        <div
          style={{
            padding: "120px 24px 0",
            textAlign: "center",
            color: "var(--portfolio-text-strong)",
          }}
        >
          {error}
        </div>
      ) : null}
      <Hero
        user={portfolio.user}
        profile={portfolio.profile}
        skills={portfolio.skills}
        projects={portfolio.projects}
      />
      <About user={portfolio.user} profile={portfolio.profile} skills={portfolio.skills} />
      <Skills skills={portfolio.skills} />
      <Projects projects={portfolio.projects} />
      <Resume resume={portfolio.resume} />
      <Experience experiences={portfolio.experiences} profile={portfolio.profile} projects={portfolio.projects} skills={portfolio.skills} />
      <Certifications certifications={portfolio.certifications} skills={portfolio.skills} />
      <Testimonials user={portfolio.user} profile={portfolio.profile} projects={portfolio.projects} skills={portfolio.skills} />
      <Services skills={portfolio.skills} profile={portfolio.profile} />
      <Blog projects={portfolio.projects} skills={portfolio.skills} />
      <Contact username={contactUsername} user={portfolio.user} profile={portfolio.profile} />
      <Footer user={portfolio.user} />
    </div>
  );
}

export default HomePage;
