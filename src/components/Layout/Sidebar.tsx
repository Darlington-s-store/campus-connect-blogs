
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Home,
  FileText,
  PenSquare,
  User,
  LayoutDashboard,
  Users,
  BarChart3
} from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    { name: "My Posts", path: "/my-posts", icon: <FileText className="h-4 w-4 mr-2" /> },
    { name: "Create Post", path: "/create-post", icon: <PenSquare className="h-4 w-4 mr-2" /> },
    { name: "Profile", path: "/profile", icon: <User className="h-4 w-4 mr-2" /> },
  ];

  // Admin and educator specific items
  const adminItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
    { name: "Manage Users", path: "/manage-users", icon: <Users className="h-4 w-4 mr-2" /> },
    { name: "Reports", path: "/reports", icon: <BarChart3 className="h-4 w-4 mr-2" /> },
  ];

  return (
    <aside className="fixed top-16 bottom-0 left-0 z-40 w-64 bg-sidebar shadow-md transform transition-transform duration-300 ease-in-out md:translate-x-0 -translate-x-full md:relative md:top-0">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="mb-6 p-4">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-3">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <div className="font-medium text-sidebar-foreground">{user?.name}</div>
              <div className="text-xs text-sidebar-foreground/70 capitalize">{user?.role}</div>
            </div>
          </div>
        </div>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                      isActive(item.path) && "bg-sidebar-accent text-sidebar-accent-foreground"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            </li>
          ))}
          
          {/* Conditional rendering for admin/educator items */}
          {(user?.role === "admin" || user?.role === "educator") && (
            <>
              <li className="pt-4">
                <div className="px-4 text-xs font-semibold text-sidebar-foreground/70 uppercase">
                  Administration
                </div>
              </li>
              {adminItems.map((item) => (
                <li key={item.path}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                          isActive(item.path) && "bg-sidebar-accent text-sidebar-accent-foreground"
                        )}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
