import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { useRef } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle, durationMs } = useTheme();
  const ref = useRef<HTMLButtonElement>(null);
  const isDark = theme === "dark";

  return (
    <button
      ref={ref}
      onClick={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) {
          const x = ((r.left + r.width / 2) / window.innerWidth) * 100;
          const y = ((r.top + r.height / 2) / window.innerHeight) * 100;
          toggle(x, y);
        } else toggle();
        void e;
      }}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={!isDark}
      className={`group relative inline-flex h-10 w-[72px] items-center rounded-full border border-border bg-surface px-1 transition-colors hover:bg-surface-2 ${className}`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 380, damping: 28, duration: durationMs / 1000 }}
        className={`relative grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground ${
          isDark ? "" : "translate-x-8"
        }`}
        style={{ transitionDuration: `${durationMs}ms` }}
      >
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: durationMs / 1000, ease: [0.2, 0.7, 0.2, 1] }}
          className="absolute inset-0 grid place-items-center"
        >
          {isDark ? (
            <Moon className="h-4 w-4" strokeWidth={2.2} />
          ) : (
            <Sun className="h-4 w-4" strokeWidth={2.2} />
          )}
        </motion.span>
      </motion.span>
    </button>
  );
}
