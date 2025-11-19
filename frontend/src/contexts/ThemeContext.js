// ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem("decloud_theme");
      if (saved !== null) return saved === "dark";
    } catch (e) {}
    // default: follow prefers-color-scheme if available
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    try {
      localStorage.setItem("decloud_theme", isDark ? "dark" : "light");
    } catch (e) {}
    // Add or remove a class on root so CSS can react
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (isDark) root.classList.add("dark");
      else root.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((v) => !v);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // If someone uses useTheme outside provider, give fallback
    return {
      isDark: false,
      toggleTheme: () => {
        if (typeof document !== "undefined") document.documentElement.classList.toggle("dark");
      },
    };
  }
  return ctx;
}
