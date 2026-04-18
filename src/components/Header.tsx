import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X, Plus, LogOut } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/mentors", label: "Find Mentors" },
  ];

  if (user) {
    navLinks.push({ to: "/bookings", label: "Bookings" });
    navLinks.push({ to: "/chats", label: "Messages" });
  }

  if (user?.role === "mentor") {
    navLinks.push({ to: "/create-ad", label: "Create Ad" });
  }

  return (
    <header className="sticky top-0 z-50 border-b surface-glass">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded-lg hero-gradient flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-gradient">Talimger</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:bg-muted ${
                location.pathname === link.to ? "text-primary bg-primary/5" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <>
              <span className="text-sm text-muted-foreground px-2">
                {user.name} <span className="text-xs px-1.5 py-0.5 rounded-md bg-accent/10 text-accent">{user.role}</span>
              </span>
              {user.role === "mentor" && (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/create-ad"><Plus className="h-3 w-3" /> New Ad</Link>
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={async () => { await logout(); navigate("/"); }}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button size="sm" variant="hero" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button className="p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-card p-4 animate-fade-in">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors hover:bg-muted ${
                  location.pathname === link.to ? "text-primary bg-primary/5" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-3 mt-2 border-t">
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground py-2">{user.name} ({user.role})</span>
                  <Button variant="ghost" size="sm" onClick={async () => { await logout(); setMobileOpen(false); navigate("/"); }}>
                    <LogOut className="h-4 w-4" /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild className="flex-1">
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button size="sm" variant="hero" asChild className="flex-1">
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
