import React from "react";
import { Link } from "react-router-dom";
import "../../styles/admin/Auth.css";

function Login() {
  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <p>Login to manage your portfolio dashboard</p>

        <form className="auth-form">
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>

        <p className="auth-switch">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;