import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

type Theme = "dark" | "light";
type Ctx = {
  theme: Theme;
  setTheme: (t: Theme, originX?: number, originY?: number) => void;
  toggle: (originX?: number, originY?: number) => void;
  durationMs: number;
  setDurationMs: (n: number) => void;
};

const ThemeCtx = createContext<Ctx | null>(null);

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

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme outside ThemeProvider");
  return ctx;
}
