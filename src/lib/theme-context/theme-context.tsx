import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === "system") {
    return getSystemTheme();
  }
  return theme;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "local-components-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage on mount (client-side only)
  useEffect(() => {
    setMounted(true);

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && (stored === "light" || stored === "dark" || stored === "system")) {
        setThemeState(stored as Theme);
      } else {
        // Check system preference
        const systemTheme = getSystemTheme();
        setThemeState(systemTheme === "dark" ? "system" : "light");
      }
    } catch {
      // localStorage not available (SSR or disabled)
      setThemeState(defaultTheme);
    }
  }, [storageKey, defaultTheme]);

  // Apply dark class to HTML element whenever resolved theme changes
  useEffect(() => {
    if (!mounted) return;

    const resolved = resolveTheme(theme);
    const root = document.documentElement;

    if (resolved === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme, mounted]);

  // Listen for system preference changes (only if theme is 'system')
  useEffect(() => {
    if (!mounted || theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const root = document.documentElement;
      if (e.matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted]);

  // Persist theme to localStorage
  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);

      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {
        // localStorage not available
      }
    },
    [storageKey],
  );

  // Toggle between light and dark (ignoring 'system')
  const toggleTheme = useCallback(() => {
    const currentResolved = resolveTheme(theme);
    const newTheme: Theme = currentResolved === "light" ? "dark" : "light";
    setTheme(newTheme);
  }, [theme, setTheme]);

  const resolvedTheme = resolveTheme(theme);

  const value: ThemeContextValue = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
