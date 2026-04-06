import React from "react";
import SectionTitle from "./SectionTitle";
import "../styles/Blog.css";

const fallbackBlogs = [
  {
    title: "How to Build a Portfolio CMS",
    desc: "Key ideas behind designing a dynamic portfolio management system."
  },
  {
    title: "Modern React UI Practices",
    desc: "How to create clean, responsive and professional user interfaces."
  }
];

function Blog({ projects = [], skills = [] }) {
  const blogs = projects.length > 0
    ? projects.slice(0, 2).map((project, index) => ({
        title: `Inside ${project.title}`,
        desc: project.techStack
          ? `A closer look at how this project was shaped using ${project.techStack}.`
          : project.description || `A behind-the-scenes breakdown of project ${index + 1}.`
      }))
    : skills.length > 0
      ? skills.slice(0, 2).map((skill) => ({
          title: `${skill.name} in Practice`,
          desc: `How ${skill.name} supports real-world project delivery at a ${skill.level || "practical"} level.`
        }))
      : fallbackBlogs;

  return (
    <section className="blog section-spacing">
      <div className="container">
        <SectionTitle subtitle="Insights" title="Latest Blog" />
        <div className="blog__grid">
          {blogs.map((blog, index) => (
            <div className="blog__card" key={`${blog.title}-${index}`}>
              <h3>{blog.title}</h3>
              <p>{blog.desc}</p>
              <a href="#projects">Read More</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
