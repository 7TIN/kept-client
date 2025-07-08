// src/components/ThemeSwitchButton.tsx
import { useTheme } from "./theme-provider";

export function ThemeSwitchButton() {
  const { theme, setTheme } = useTheme();

  // Cycles: dark -> light -> system -> dark ...
  function nextTheme() {
    setTheme(
      theme === "dark" ? "light" : theme === "light" ? "system" : "dark"
    );
  }

  return (
    <button
      onClick={nextTheme}
      className="px-3 py-2 rounded border bg-gray-200 dark:bg-gray-800"
      title="Switch Theme"
    >
      {theme === "dark" && "🌙 Dark"}
      {theme === "light" && "☀️ Light"}
      {theme === "system" && "💻 System"}
    </button>
  );
}