import { createContext, useContext } from "react";

export type Theme = "dark" | "light";

export type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme, originX?: number, originY?: number) => void;
  toggle: (originX?: number, originY?: number) => void;
  durationMs: number;
  setDurationMs: (durationMs: number) => void;
};

export const ThemeCtx = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) {
    throw new Error("useTheme outside ThemeProvider");
  }
  return ctx;
}
