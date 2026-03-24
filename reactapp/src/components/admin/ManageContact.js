import React from "react";
import "../../styles/admin/ManageContact.css";

function ManageContact() {
  return (
    <div className="panel-page">
      <h2>Manage Contact Details</h2>

      <form className="panel-form">
        <div className="form-grid">
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number" />
          <input type="text" placeholder="Location" />
          <input type="text" placeholder="Website URL" />
        </div>

        <button type="submit">Save Contact Info</button>
      </form>
    </div>
  );
}

export default ManageContact;