import React, { useEffect, useState } from "react";
import { addCertification, deleteCertification, getCertifications } from "../../api/certificationApi";
import "../../styles/admin/ManageProjects.css";
import "../../styles/admin/ManageProfile.css";

function ManageCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issueYear: "",
    credentialUrl: "",
  });

  const loadCertifications = async () => {
    try {
      const data = await getCertifications();
      setCertifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCertifications();
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
      await addCertification(formData);
      setFormData({
        title: "",
        issuer: "",
        issueYear: "",
        credentialUrl: "",
      });
      loadCertifications();
    } catch (error) {
      console.error(error);
      alert("Failed to add certification");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCertification(id);
      loadCertifications();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="panel-page">
      <h2>Manage Certifications</h2>

      <form className="panel-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input name="title" placeholder="Certification Title" value={formData.title} onChange={handleChange} />
          <input name="issuer" placeholder="Issuer" value={formData.issuer} onChange={handleChange} />
          <input name="issueYear" placeholder="Issue Year" value={formData.issueYear} onChange={handleChange} />
          <input name="credentialUrl" placeholder="Credential URL" value={formData.credentialUrl} onChange={handleChange} />
        </div>

        <button type="submit">Add Certification</button>
      </form>

      <div className="list-box">
        {certifications.map((certification) => (
          <div className="list-item" key={certification.id}>
            <span>{certification.title} - {certification.issuer || certification.issueYear || "Certification"}</span>
            <div>
              <button className="danger" onClick={() => handleDelete(certification.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageCertifications;
