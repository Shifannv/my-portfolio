import { useCallback, useEffect, useState, type ReactNode } from "react";

import { ThemeCtx, type Theme } from "./theme-context";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [durationMs, setDurationMs] = useState<number>(400);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.style.setProperty("--theme-ms", `${durationMs}ms`);
  }, [theme, durationMs]);

  const setTheme = useCallback((t: Theme, x = 50, y = 50) => {
    const root = document.documentElement;
    root.style.setProperty("--wave-x", `${x}%`);
    root.style.setProperty("--wave-y", `${y}%`);
    setThemeState(t);
  }, []);

  const toggle = useCallback(
    (x = 50, y = 50) => setTheme(theme === "dark" ? "light" : "dark", x, y),
    [theme, setTheme],
  );

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, toggle, durationMs, setDurationMs }}>
      {children}
    </ThemeCtx.Provider>
  );
}
