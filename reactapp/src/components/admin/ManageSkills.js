import React from "react";
import "../../styles/admin/ManageSkills.css";

function ManageSkills() {
  const skills = ["React", "Java", "Spring Boot", "MySQL", "JavaScript"];

  return (
    <div className="panel-page">
      <h2>Manage Skills</h2>

      <form className="panel-form small-form">
        <input type="text" placeholder="Skill Name" />
        <input type="text" placeholder="Skill Level (ex: 90%)" />
        <button type="submit">Add Skill</button>
      </form>

      <div className="list-box">
        {skills.map((skill, index) => (
          <div className="list-item" key={index}>
            <span>{skill}</span>
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

export default ManageSkills;