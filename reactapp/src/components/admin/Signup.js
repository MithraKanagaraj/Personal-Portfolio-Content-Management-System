import React from "react";
import { Link } from "react-router-dom";
import "../../styles/admin/Auth.css";

function Signup() {
  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Create Account</h2>
        <p>Signup and create your own portfolio</p>

        <form className="auth-form">
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <button type="submit">Signup</button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;