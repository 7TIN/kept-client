import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

export function ThemeSwitchButton() {
  const { theme, setTheme } = useTheme();

  // const [systemTheme, setSystemTheme] = useState<"dark" | "light">(
  //   window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  // );

  // useEffect(() => {
  //   if (theme !== "system") return;
  //   const mq = window.matchMedia("(prefers-color-scheme: dark)");
  //   const update = () =>
  //     setSystemTheme(mq.matches ? "dark" : "light");
  //   mq.addEventListener("change", update);
  //   return () => mq.removeEventListener("change", update);
  // }, [theme]);

  function nextTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  const isDark = theme === "dark";
  const icon = isDark ? "🌙" : "☀️";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      onClick={nextTheme}
      // className={`
      //   flex items-center justify-center
      //   w-14 h-14 rounded-xl
      //   border border-black/10 dark:border-white/10
      //   bg-white/40 dark:bg-black/30
      //   backdrop-blur-sm
      //   transition
      //   shadow
      //   focus:outline-none focus:ring-2 focus:ring-primary
      // `}
      className={`
        flex items-center justify-center w-8 h-8
        rounded-xl
        backdrop-blur-sm
        transition
        shadow
      `}
      title={label}
      aria-label={label}
      style={{
        // Remove any default background for full transparency effect
        backgroundClip: "padding-box",
      }}
    >
      <span className="text-1xl">{icon}</span>
    </button>
  );
}

export function Navbar() {
  return (
    <nav className="w-full flex justify-center mt-4 pointer-events-none">
      <header
        className={cn(
          "w-full max-w-4xl mx-auto rounded-xl border border-white/10 dark:border-white/10 " +
          "bg-white/30 dark:bg-black/10 backdrop-blur-lg shadow-lg " +
          "flex items-center justify-between h-16 px-6 pointer-events-auto"
        )}
      >
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
      </header>
    </nav>
  );
}