import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";

function PortfolioViewPage() {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState({
    user: null,
    profile: null,
    skills: [],
    projects: [],
    resume: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPortfolio = async () => {
      const loggedInUsername = localStorage.getItem("username");
      const token = localStorage.getItem("token");
      const isOwnerView = Boolean(token) && loggedInUsername === username;

      try {
        setLoading(true);
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
        };

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
      } catch (err) {
        console.error(err);
        setError("Failed to load portfolio. Save your profile once in the admin dashboard and try again.");
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, [username]);

  if (error) {
    return <h2 style={{ padding: "30px" }}>{error}</h2>;
  }

  if (loading) {
    return <h2 style={{ padding: "30px" }}>Loading portfolio...</h2>;
  }

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h1>{portfolio.user?.fullName}</h1>
      <h3>{portfolio.profile?.headline}</h3>
      <p>{portfolio.profile?.bio}</p>
      <p><b>Location:</b> {portfolio.profile?.location}</p>

      <hr />

      <h2>Skills</h2>
      {portfolio.skills.length > 0 ? (
        <ul>
          {portfolio.skills.map((skill) => (
            <li key={skill.id}>
              {skill.name} - {skill.level}
            </li>
          ))}
        </ul>
      ) : (
        <p>No skills available yet.</p>
      )}

      <hr />

      <h2>Projects</h2>
      {portfolio.projects.length > 0 ? (
        portfolio.projects.map((project) => (
          <div key={project.id} style={{ marginBottom: "20px" }}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><b>Tech Stack:</b> {project.techStack}</p>
          </div>
        ))
      ) : (
        <p>No projects available yet.</p>
      )}

      <hr />

      <h2>Resume</h2>
      {portfolio.resume ? (
        <a href={portfolio.resume.fileUrl} target="_blank" rel="noreferrer">
          View Resume
        </a>
      ) : (
        <p>No resume uploaded</p>
      )}
    </div>
  );
}

export default PortfolioViewPage;
