export const THEME_OPTIONS = [
  {
    value: "dark-professional",
    label: "Dark Professional",
    description: "Modern dark look for developers and designers",
  },
  {
    value: "light-minimal",
    label: "Light Minimal",
    description: "Clean white layout with elegant typography",
  },
  {
    value: "blue-gradient",
    label: "Blue Gradient",
    description: "Creative modern style with premium feel",
  },
];

export const DEFAULT_PORTFOLIO_THEME = THEME_OPTIONS[0].value;

export function normalizePortfolioTheme(theme) {
  const normalizedTheme = `${theme || ""}`.trim().toLowerCase();
  const matchedTheme = THEME_OPTIONS.find(
    ({ value, label }) =>
      normalizedTheme === value || normalizedTheme === label.toLowerCase()
  );

  return matchedTheme ? matchedTheme.value : DEFAULT_PORTFOLIO_THEME;
}
