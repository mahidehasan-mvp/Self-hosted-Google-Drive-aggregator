"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "orange" | "cyberpunk" | "emerald";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "orange",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("orange");

  useEffect(() => {
    const stored = localStorage.getItem("dp_theme") as Theme | null;
    const initial = stored && ["orange", "cyberpunk", "emerald"].includes(stored) ? stored : "orange";
    setThemeState(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function setTheme(next: Theme) {
    setThemeState(next);
    localStorage.setItem("dp_theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
