// import React from "react";
// import "../../styles/admin/ManageResume.css";

// function ManageResume() {
//   return (
//     <div className="panel-page">
//       <h2>Manage Resume</h2>

//       <div className="resume-box">
//         <p>Upload your latest resume PDF</p>
//         <input type="file" />
//         <button>Upload Resume</button>
//       </div>
//     </div>
//   );
// }

// export default ManageResume;
import React, { useEffect, useState } from "react";
import { saveResume, getResume } from "../../api/resumeApi";
import "../../styles/admin/ManageResume.css";

function ManageResume() {
  const [fileUrl, setFileUrl] = useState("");
  const [resume, setResume] = useState(null);

  const loadResume = async () => {
    try {
      const data = await getResume();
      setResume(data);
      if (data) setFileUrl(data.fileUrl);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  const handleSubmit = async () => {
    try {
      await saveResume({ fileUrl });
      loadResume();
      alert("Resume saved");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="panel-page">
      <h2>Manage Resume</h2>

      <div className="resume-box">
        <p>Enter your resume file URL</p>
        <input
          type="text"
          placeholder="Resume URL"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
        />
        <button onClick={handleSubmit}>Save Resume</button>

        {resume && (
          <p>
            Current Resume: <a href={resume.fileUrl} target="_blank" rel="noreferrer">{resume.fileUrl}</a>
          </p>
        )}
      </div>
    </div>
  );
}

export default ManageResume;