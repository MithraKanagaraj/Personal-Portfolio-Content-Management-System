// import React from "react";
// import "../../styles/admin/ManageProjects.css";

// function ManageProjects() {
//   const projectList = [
//     "Personal Portfolio CMS",
//     "AI Skin Care Recommender",
//     "Feedback Rating System"
//   ];

//   return (
//     <div className="panel-page">
//       <h2>Manage Projects</h2>

//       <form className="panel-form">
//         <div className="form-grid">
//           <input type="text" placeholder="Project Title" />
//           <input type="text" placeholder="Tech Stack" />
//           <input type="text" placeholder="GitHub Link" />
//           <input type="text" placeholder="Live Demo Link" />
//           <input type="text" placeholder="Image URL" />
//         </div>

//         <textarea rows="5" placeholder="Project Description"></textarea>
//         <button type="submit">Add Project</button>
//       </form>

//       <div className="list-box">
//         {projectList.map((project, index) => (
//           <div className="list-item" key={index}>
//             <span>{project}</span>
//             <div>
//               <button>Edit</button>
//               <button className="danger">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ManageProjects;
import React, { useEffect, useState } from "react";
import { addProject, getProjects, deleteProject } from "../../api/projectApi";
import "../../styles/admin/ManageProjects.css";
import "../../styles/admin/ManageProfile.css";

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveLink: "",
    imageUrl: "",
  });

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProject(formData);
      setFormData({
        title: "",
        description: "",
        techStack: "",
        githubLink: "",
        liveLink: "",
        imageUrl: "",
      });
      loadProjects();
    } catch (error) {
      console.error(error);
      alert("Failed to add project");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      loadProjects();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="panel-page">
      <h2>Manage Projects</h2>

      <form className="panel-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input name="title" placeholder="Project Title" value={formData.title} onChange={handleChange} />
          <input name="techStack" placeholder="Tech Stack" value={formData.techStack} onChange={handleChange} />
          <input name="githubLink" placeholder="GitHub Link" value={formData.githubLink} onChange={handleChange} />
          <input name="liveLink" placeholder="Live Demo Link" value={formData.liveLink} onChange={handleChange} />
          <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} />
        </div>

        <textarea
          rows="5"
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Add Project</button>
      </form>

      <div className="list-box">
        {projects.map((project) => (
          <div className="list-item" key={project.id}>
            <span>{project.title}</span>
            <div>
              <button className="danger" onClick={() => handleDelete(project.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageProjects;