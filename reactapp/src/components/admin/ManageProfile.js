import React from "react";
import "../../styles/admin/ManageProfile.css";

function ManageProfile() {
  return (
    <div className="panel-page">
      <h2>Manage Profile</h2>

      <form className="panel-form">
        <div className="form-grid">
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Headline" />
          <input type="text" placeholder="Location" />
          <input type="text" placeholder="Profile Image URL" />
          <input type="text" placeholder="GitHub Link" />
          <input type="text" placeholder="LinkedIn Link" />
        </div>

        <textarea rows="6" placeholder="Write your bio"></textarea>

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default ManageProfile;