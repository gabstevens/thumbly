"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="btn secondary"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        padding: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "2.5rem",
      }}
      aria-label="Toggle Theme"
      suppressHydrationWarning
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}
