import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const v = localStorage.getItem("skyfeed_dark");
    return v === "true";
  });

  useEffect(() => {
    localStorage.setItem("skyfeed_dark", String(darkMode));
  }, [darkMode]);

  const toggle = () => setDarkMode((v) => !v);

  const value = useMemo(() => ({ darkMode, toggle }), [darkMode]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};


