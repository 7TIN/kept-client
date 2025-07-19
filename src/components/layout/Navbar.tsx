import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { MobileNav } from "./MobileNav";

export function ThemeSwitchButton() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const icon = isDark ? "🌙" : "☀️";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-center w-8 h-8 rounded-xl backdrop-blur-sm transition shadow"
      title={label}
      aria-label={label}
      style={{ backgroundClip: "padding-box" }}
    >
      <span className="text-1xl">{icon}</span>
    </button>
  );
}

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("token")));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    // navigate("/auth/login");
  };

  return (
    <nav className="w-full flex justify-center mt-4 pointer-events-none">
      <header
        className={cn(
          "w-full max-w-4xl mx-auto rounded-xl border border-white/10 dark:border-white/10 " +
            "bg-white/30 dark:bg-black/10 backdrop-blur-lg shadow-lg " +
            "flex items-center justify-between h-16 px-6 pointer-events-auto"
        )}
      >
        
        <MobileNav />

        {/* Logo / App Name */}


        <Link to="/" className="text-lg font-bold tracking-tight">
          Kept
        </Link>
        

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link to="/companies" className="hover:text-foreground transition-colors">Companies</Link>
          <Link to="/experience" className="hover:text-foreground transition-colors">Experiences</Link>
        </nav>

        {/* Right Side - Auth buttons & Theme */}
        <div className="flex items-center gap-4">
          <ThemeSwitchButton />

          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          ) : (
            <Button size="sm" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </header>
    </nav>
  );
}
