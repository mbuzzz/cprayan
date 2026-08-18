"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full border border-border/40 bg-card"></div>;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? t.theme.toggleLight : t.theme.toggleDark}
      className="w-8 h-8 rounded-full border border-border/50 bg-card flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-all duration-300 cursor-pointer shadow-sm"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-primary transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-primary transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}

export default ThemeToggle;