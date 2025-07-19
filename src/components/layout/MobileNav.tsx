import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Menu, X, Home, Building2, BookText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const MobileNavLink = ({
  to,
  children,
  onClick,
}: {
  to: string
  children: React.ReactNode
  onClick: () => void
}) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-4 rounded-lg p-3 text-lg font-semibold transition-colors",
        "hover:bg-white/20 hover:text-white hover:backdrop-blur-sm",
        isActive
          ? "bg-white/30 text-white"
          : "text-white/80"
      )
    }
  >
    {children}
  </NavLink>
)

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden relative z-50">
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle mobile nav"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Glassy Drawer */}
      {isOpen && (
        <div
          className={cn(
            "absolute top-12 left-0 w-72 rounded-xl border border-white/10 p-6 shadow-xl",
            "bg-black/70 backdrop-blur-md text-white",
            "flex flex-col gap-4 animate-in slide-in-from-left duration-300"
          )}
        >
          <MobileNavLink to="/" onClick={() => setIsOpen(false)}>
            <Home className="h-5 w-5" />
            <span>Home</span>
          </MobileNavLink>
          <MobileNavLink to="/companies" onClick={() => setIsOpen(false)}>
            <Building2 className="h-5 w-5" />
            <span>Companies</span>
          </MobileNavLink>
          <MobileNavLink to="/experience" onClick={() => setIsOpen(false)}>
            <BookText className="h-5 w-5" />
            <span>Experiences</span>
          </MobileNavLink>
        </div>
      )}
    </div>
  )
}
