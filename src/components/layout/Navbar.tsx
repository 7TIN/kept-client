import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

function ThemeSwitchButton() {
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
      className="px-2 py-1 rounded border bg-gray-100 dark:bg-gray-900"
      title="Switch Theme"
      aria-label="Switch Theme"
      style={{ minWidth: 40 }}
    >
      {theme === "dark" && "🌙"}
      {theme === "light" && "☀️"}
      {theme === "system" && "💻"}
    </button>
  );
}

export function Navbar() {
  return (
    <header className={cn("border-b sticky top-0 z-50 bg-background")}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo / App Name */}
        <Link to="/" className="text-lg font-bold tracking-tight">
          Kept
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/companies" className="hover:text-foreground transition-colors">
            Companies
          </Link>
          <Link to="/experience" className="hover:text-foreground transition-colors">
            Experiences
          </Link>
        </nav>

        {/* Right Side - Theme Switch Button */}
        <div className="flex items-center gap-4">
          <ThemeSwitchButton />
          {/* <Link to="/share">
            <Button size="sm">Share Experience</Button>
          </Link> */}
        </div>
      </div>
    </header>
  );
}