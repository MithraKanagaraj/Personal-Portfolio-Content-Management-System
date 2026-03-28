// import React from "react";
// import { Link } from "react-router-dom";
// import "../../styles/admin/Auth.css";

// function Login() {
//   return (
//     <div className="auth-page">
//       <div className="auth-box">
//         <h2>Welcome Back</h2>
//         <p>Login to manage your portfolio dashboard</p>

//         <form className="auth-form">
//           <input type="email" placeholder="Email Address" />
//           <input type="password" placeholder="Password" />
//           <button type="submit">Login</button>
//         </form>

//         <p className="auth-switch">
//           Don’t have an account? <Link to="/signup">Signup</Link>
//         </p>
//       </div>
//     </div>
//   );
// }


// export default Login;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import "../../styles/admin/Auth.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      navigate("/admin");
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <p>Login to manage your portfolio dashboard</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
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