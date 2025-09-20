import { useLocation, useNavigate } from "react-router-dom";
import { Home, MapPin, Users, Bell, User, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: MapPin, label: "Trip", path: "/trip-planning" },
    { icon: Users, label: "Friends", path: "/friends" },
    { icon: Bell, label: "Alerts", path: "/alerts" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={cn(
              "flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200",
              isActive(path)
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
        
        {/* Emergency button - always visible */}
        <button
          onClick={() => navigate("/emergency")}
          className="flex flex-col items-center space-y-1 py-2 px-3 rounded-lg bg-destructive text-destructive-foreground shadow-emergency hover:shadow-lg transition-all duration-200"
        >
          <AlertTriangle className="w-5 h-5" />
          <span className="text-xs font-bold">SOS</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;