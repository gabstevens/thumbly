import { CSSProperties } from "react";

export interface ThumblyTheme {
  root: CSSProperties;
  option: CSSProperties;
  successMessage: CSSProperties;
}

const base: ThumblyTheme = {
  root: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  option: {
    cursor: "pointer",
    padding: "8px 16px",
    border: "1px solid transparent",
    background: "none",
  },
  successMessage: {
    padding: "8px",
    textAlign: "center",
  },
};

const minimal: ThumblyTheme = {
  ...base,
  option: {
    ...base.option,
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    background: "#ffffff",
    color: "#1e293b",
    fontSize: "14px",
  },
  successMessage: {
    ...base.successMessage,
    color: "#10b981",
    fontWeight: 500,
  },
};

const modern: ThumblyTheme = {
  ...base,
  option: {
    ...base.option,
    background: "#f8fafc",
    borderRadius: "8px",
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    transition: "all 0.2s",
    fontSize: "24px", // Bigger for emojis
    padding: "12px",
  },
  successMessage: {
    ...base.successMessage,
    background: "#f0fdf4",
    color: "#15803d",
    borderRadius: "8px",
    border: "1px solid #bbf7d0",
  },
};

export const themes = {
  base,
  minimal,
  modern,
};

export type ThemeName = keyof typeof themes;

export const getTheme = (name: ThemeName = "base"): ThumblyTheme => {
  return themes[name] || themes.base;
};
