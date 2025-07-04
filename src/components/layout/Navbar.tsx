import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
          <Link to="/experiences" className="hover:text-foreground transition-colors">
            Experiences
          </Link>
        </nav>

        {/* Right Side - Action Button */}
        {/* <div className="flex items-center gap-4">
          <Link to="/share">
            <Button size="sm">Share Experience</Button>
          </Link>
        </div> */}
      </div>
    </header>
  );
}
