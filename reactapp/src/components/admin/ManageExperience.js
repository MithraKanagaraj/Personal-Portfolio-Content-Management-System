import React, { useEffect, useState } from "react";
import { addExperience, deleteExperience, getExperiences } from "../../api/experienceApi";
import "../../styles/admin/ManageProjects.css";
import "../../styles/admin/ManageProfile.css";

function ManageExperience() {
  const [experiences, setExperiences] = useState([]);
  const [formData, setFormData] = useState({
    role: "",
    organization: "",
    duration: "",
    description: "",
  });

  const loadExperiences = async () => {
    try {
      const data = await getExperiences();
      setExperiences(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadExperiences();
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
      await addExperience(formData);
      setFormData({
        role: "",
        organization: "",
        duration: "",
        description: "",
      });
      loadExperiences();
    } catch (error) {
      console.error(error);
      alert("Failed to add experience");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExperience(id);
      loadExperiences();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="panel-page">
      <h2>Manage Experience</h2>

      <form className="panel-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} />
          <input name="organization" placeholder="Organization" value={formData.organization} onChange={handleChange} />
          <input name="duration" placeholder="Duration (ex: 2024 - Present)" value={formData.duration} onChange={handleChange} />
        </div>

        <textarea
          rows="5"
          name="description"
          placeholder="Describe your work and impact"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Add Experience</button>
      </form>

      <div className="list-box">
        {experiences.map((experience) => (
          <div className="list-item" key={experience.id}>
            <span>{experience.role} - {experience.organization || experience.duration || "Experience"}</span>
            <div>
              <button className="danger" onClick={() => handleDelete(experience.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageExperience;
