import React, { useEffect, useState } from "react";
import { getMyProfile, saveProfile } from "../../api/profileApi";
import "../../styles/admin/ManageTheme.css";
import {
  DEFAULT_PORTFOLIO_THEME,
  normalizePortfolioTheme,
  THEME_OPTIONS,
} from "../../utils/theme";

function ManageTheme() {
  const [selectedTheme, setSelectedTheme] = useState(DEFAULT_PORTFOLIO_THEME);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(true);
  const [savingTheme, setSavingTheme] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getMyProfile();
        setSelectedTheme(normalizePortfolioTheme(profile?.portfolioTheme));
      } catch (error) {
        if (error?.response?.status !== 404) {
          setStatus({
            type: "error",
            message: "Unable to load your current theme right now.",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleApplyTheme = async (themeValue) => {
    setSavingTheme(themeValue);
    setStatus({ type: "", message: "" });

    try {
      const profile = await getMyProfile().catch((error) => {
        if (error?.response?.status === 404) {
          return {};
        }

        throw error;
      });

      await saveProfile({
        ...profile,
        portfolioTheme: themeValue,
      });

      setSelectedTheme(themeValue);
      setStatus({
        type: "success",
        message: "Theme saved successfully. Your portfolio will use this style.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to save the theme. Please try again.",
      });
    } finally {
      setSavingTheme("");
    }
  };

  return (
    <div className="panel-page">
      <h2>Manage Theme</h2>

      {status.message ? (
        <div className={`panel-status panel-status--${status.type}`}>
          {status.message}
        </div>
      ) : null}

      <div className="theme-grid">
        {THEME_OPTIONS.map((theme) => {
          const isActive = theme.value === selectedTheme;
          const isSaving = savingTheme === theme.value;

          return (
            <div
              key={theme.value}
              className={`theme-card ${isActive ? "active-theme" : ""}`}
            >
              <div
                className={`theme-card__preview theme-card__preview--${theme.value}`}
              />
              <h3>{theme.label}</h3>
              <p>{theme.description}</p>
              <button
                type="button"
                onClick={() => handleApplyTheme(theme.value)}
                disabled={loading || isSaving || isActive}
              >
                {loading
                  ? "Loading..."
                  : isSaving
                    ? "Saving..."
                    : isActive
                      ? "Selected"
                      : "Apply Theme"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManageTheme;
