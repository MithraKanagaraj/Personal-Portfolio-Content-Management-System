// import React from "react";
// import { Link } from "react-router-dom";
// import "../../styles/admin/Auth.css";

// function Signup() {
//   return (
//     <div className="auth-page">
//       <div className="auth-box">
//         <h2>Create Account</h2>
//         <p>Signup and create your own portfolio</p>

//         <form className="auth-form">
//           <input type="text" placeholder="Full Name" />
//           <input type="text" placeholder="Username" />
//           <input type="email" placeholder="Email Address" />
//           <input type="password" placeholder="Password" />
//           <button type="submit">Signup</button>
//         </form>

//         <p className="auth-switch">
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";
import "../../styles/admin/Auth.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
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
      const data = await registerUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      navigate("/admin");
    } catch (error) {
      alert("Signup failed");
      console.error(error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Create Account</h2>
        <p>Signup and create your own portfolio</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input name="fullName" type="text" placeholder="Full Name" onChange={handleChange} />
          <input name="username" type="text" placeholder="Username" onChange={handleChange} />
          <input name="email" type="email" placeholder="Email Address" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
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