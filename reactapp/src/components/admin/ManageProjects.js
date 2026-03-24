import React from "react";
import "../../styles/admin/ManageProjects.css";

function ManageProjects() {
  const projectList = [
    "Personal Portfolio CMS",
    "AI Skin Care Recommender",
    "Feedback Rating System"
  ];

  return (
    <div className="panel-page">
      <h2>Manage Projects</h2>

      <form className="panel-form">
        <div className="form-grid">
          <input type="text" placeholder="Project Title" />
          <input type="text" placeholder="Tech Stack" />
          <input type="text" placeholder="GitHub Link" />
          <input type="text" placeholder="Live Demo Link" />
          <input type="text" placeholder="Image URL" />
        </div>

        <textarea rows="5" placeholder="Project Description"></textarea>
        <button type="submit">Add Project</button>
      </form>

      <div className="list-box">
        {projectList.map((project, index) => (
          <div className="list-item" key={index}>
            <span>{project}</span>
            <div>
              <button>Edit</button>
              <button className="danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageProjects;