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
    border: "1px solid var(--thumbly-border-color, #e2e8f0)",
    borderRadius: "var(--thumbly-radius, 4px)",
    background: "var(--thumbly-option-bg, #ffffff)",
    color: "var(--thumbly-option-color, #1e293b)",
    fontSize: "14px",
  },
  successMessage: {
    ...base.successMessage,
    color: "var(--thumbly-success-color, #10b981)",
    fontWeight: 500,
  },
};

const modern: ThumblyTheme = {
  ...base,
  option: {
    ...base.option,
    background: "var(--thumbly-option-bg, #f8fafc)",
    borderRadius: "var(--thumbly-radius, 8px)",
    boxShadow: "var(--thumbly-shadow, 0 1px 2px 0 rgb(0 0 0 / 0.05))",
    transition: "all 0.2s",
    fontSize: "24px", // Bigger for emojis
    padding: "12px",
  },
  successMessage: {
    ...base.successMessage,
    background: "var(--thumbly-success-bg, #f0fdf4)",
    color: "var(--thumbly-success-color, #15803d)",
    borderRadius: "var(--thumbly-radius, 8px)",
    border: "1px solid var(--thumbly-success-border, #bbf7d0)",
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
