import React from "react";
import SectionTitle from "./SectionTitle";
import "../styles/Blog.css";

const blogs = [
  {
    title: "How to Build a Portfolio CMS",
    desc: "Key ideas behind designing a dynamic portfolio management system."
  },
  {
    title: "Modern React UI Practices",
    desc: "How to create clean, responsive and professional user interfaces."
  }
];

function Blog() {
  return (
    <section className="blog section-spacing">
      <div className="container">
        <SectionTitle subtitle="Insights" title="Latest Blog" />
        <div className="blog__grid">
          {blogs.map((blog, index) => (
            <div className="blog__card" key={index}>
              <h3>{blog.title}</h3>
              <p>{blog.desc}</p>
              <a href="/">Read More</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;