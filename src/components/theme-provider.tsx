import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ThemeContext, type ThemeProviderState, type Theme } from "@/contexts/ThemeContext";

function GlobalBackground({ theme }: { theme: Theme }) {
  // Resolve system theme on the client
  let resolvedTheme = theme;
  if (theme === "system") {
    resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  if (resolvedTheme === "dark") {
    return (
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(244, 114, 182, 0.25), transparent 70%), #000000",
        }}
        aria-hidden
      />
    );
  }
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        backgroundImage: `
      radial-gradient(circle at 20% 80%, rgba(255, 182, 153, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 244, 214, 0.5) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255, 182, 153, 0.1) 0%, transparent 50%)
    `,
        backgroundColor: "#fff8f0",
      }}
      aria-hidden
    />
  );
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null;
    return stored ?? defaultTheme;
  });

  function applyTheme(target: Theme) {
    const root = document.documentElement;
    root.classList.remove("light", "dark", "dark-pattern");
    const resolved =
      target === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : target;
    root.classList.add(resolved);
    if (resolved === "dark") root.classList.add("dark-pattern");
  }

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        setThemeState(e.newValue as Theme);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [storageKey]);

  // useEffect(() => {
  //   if (theme !== "system") return;
  //   const mq = window.matchMedia("(prefers-color-scheme: dark)");
  //   const cb = () => applyTheme("system");
  //   mq.addEventListener("change", cb);
  //   return () => mq.removeEventListener("change", cb);
  // }, [theme]);

  const value: ThemeProviderState = {
    theme,
    setTheme: (newTheme: Theme) => setThemeState(newTheme),
  };

  return (
    <ThemeContext.Provider value={value}>
      <GlobalBackground theme={theme} />
      {children}
    </ThemeContext.Provider>
  );
}