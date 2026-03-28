// import React from "react";
// import "../../styles/admin/Topbar.css";

// function Topbar() {
//   return (
//     <header className="topbar">
//       <div>
//         <h2>Admin Dashboard</h2>
//         <p>Manage your portfolio content professionally</p>
//       </div>
//       <div className="topbar-user">
//         <span>Mithra K</span>
//         <button>Logout</button>
//       </div>
//     </header>
//   );
// }

// export default Topbar;
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/Topbar.css";

function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div>
        <h2>Admin Dashboard</h2>
        <p>Manage your portfolio content professionally</p>
      </div>
      <div className="topbar-user">
        <span>User</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Topbar;