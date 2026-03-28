// import React from "react";
// import "../../styles/admin/ManageSkills.css";

// function ManageSkills() {
//   const skills = ["React", "Java", "Spring Boot", "MySQL", "JavaScript"];

//   return (
//     <div className="panel-page">
//       <h2>Manage Skills</h2>

//       <form className="panel-form small-form">
//         <input type="text" placeholder="Skill Name" />
//         <input type="text" placeholder="Skill Level (ex: 90%)" />
//         <button type="submit">Add Skill</button>
//       </form>

//       <div className="list-box">
//         {skills.map((skill, index) => (
//           <div className="list-item" key={index}>
//             <span>{skill}</span>
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

// export default ManageSkills;
import React, { useEffect, useState } from "react";
import { addSkill, getSkills, deleteSkill } from "../../api/skillApi";
import "../../styles/admin/ManageSkills.css";
import "../../styles/admin/ManageProfile.css";

function ManageSkills() {
  const [formData, setFormData] = useState({
    name: "",
    level: "",
  });

  const [skills, setSkills] = useState([]);

  const loadSkills = async () => {
    try {
      const data = await getSkills();
      setSkills(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadSkills();
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
      await addSkill(formData);
      setFormData({ name: "", level: "" });
      loadSkills();
    } catch (error) {
      console.error(error);
      alert("Failed to add skill");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSkill(id);
      loadSkills();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="panel-page">
      <h2>Manage Skills</h2>

      <form className="panel-form small-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Skill Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="level"
          placeholder="Skill Level (ex: 90%)"
          value={formData.level}
          onChange={handleChange}
        />
        <button type="submit">Add Skill</button>
      </form>

      <div className="list-box">
        {skills.map((skill) => (
          <div className="list-item" key={skill.id}>
            <span>{skill.name} - {skill.level}</span>
            <div>
              <button className="danger" onClick={() => handleDelete(skill.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageSkills;