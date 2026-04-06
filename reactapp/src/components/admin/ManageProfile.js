import React, { useEffect, useState } from "react";
import { getMyProfile, saveProfile } from "../../api/profileApi";
import "../../styles/admin/ManageProfile.css";

function ManageProfile() {
  const [formData, setFormData] = useState({
    headline: "",
    location: "",
    profileImage: "",
    githubLink: "",
    linkedinLink: "",
    twitterLink: "",
    bio: "",
    portfolioTheme: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getMyProfile();
        setFormData({
          headline: profile?.headline ?? "",
          location: profile?.location ?? "",
          profileImage: profile?.profileImage ?? "",
          githubLink: profile?.githubLink ?? "",
          linkedinLink: profile?.linkedinLink ?? "",
          twitterLink: profile?.twitterLink ?? "",
          bio: profile?.bio ?? "",
          portfolioTheme: profile?.portfolioTheme ?? "",
        });
      } catch (error) {
        const statusCode = error?.response?.status;

        if (statusCode !== 404) {
          setStatus({
            type: "error",
            message: "Unable to load your profile right now.",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      await saveProfile(formData);
      setStatus({
        type: "success",
        message: "Profile saved successfully. Your portfolio preview is ready.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to save profile. Please try again.",
      });
    }
  };

  return (
    <div className="panel-page">
      <h2>Manage Profile</h2>

      <form className="panel-form" onSubmit={handleSubmit}>
        {status.message ? (
          <div className={`panel-status panel-status--${status.type}`}>
            {status.message}
          </div>
        ) : null}

        <div className="form-grid">
          <input
            type="text"
            name="headline"
            placeholder="Headline"
            value={formData.headline}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />
          <input
            type="text"
            name="profileImage"
            placeholder="Profile Image URL"
            value={formData.profileImage}
            onChange={handleChange}
          />
          <input
            type="text"
            name="githubLink"
            placeholder="GitHub Link"
            value={formData.githubLink}
            onChange={handleChange}
          />
          <input
            type="text"
            name="linkedinLink"
            placeholder="LinkedIn Link"
            value={formData.linkedinLink}
            onChange={handleChange}
          />
          <input
            type="text"
            name="twitterLink"
            placeholder="Twitter Link"
            value={formData.twitterLink}
            onChange={handleChange}
          />
        </div>

        <textarea
          rows="6"
          name="bio"
          placeholder="Write your bio"
          value={formData.bio}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

export default ManageProfile;
