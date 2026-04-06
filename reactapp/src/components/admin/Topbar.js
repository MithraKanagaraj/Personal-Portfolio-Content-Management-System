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
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/Topbar.css";

function Topbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const displayName = username || "User";
  const [shareStatus, setShareStatus] = useState({ type: "", message: "" });
  const portfolioUrl = useMemo(() => {
    if (!username) {
      return "";
    }

    return `${window.location.origin}/portfolio/${username}`;
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleCopyShareLink = async () => {
    if (!portfolioUrl) {
      setShareStatus({
        type: "error",
        message: "Your username is missing, so the share link is not available yet.",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setShareStatus({
        type: "success",
        message: "Portfolio link copied. You can now send it to recruiters.",
      });
    } catch (error) {
      setShareStatus({
        type: "error",
        message: `Copy failed. Share this link manually: ${portfolioUrl}`,
      });
    }
  };

  return (
    <header className="topbar">
      <div className="topbar__content">
        <h2>Admin Dashboard</h2>
        <p>Manage your portfolio content professionally</p>
        {shareStatus.message ? (
          <div className={`topbar-status topbar-status--${shareStatus.type}`}>
            {shareStatus.message}
          </div>
        ) : null}
      </div>
      <div className="topbar-user">
        <button
          type="button"
          className="topbar-portfolio-button"
          onClick={() => navigate(`/portfolio/${username}`)}
          disabled={!username}
        >
          Visit My Portfolio
        </button>
        <button
          type="button"
          className="topbar-share-button"
          onClick={handleCopyShareLink}
          disabled={!username}
        >
          Copy Share Link
        </button>
        <span>{displayName}</span>
        <button type="button" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Topbar;
