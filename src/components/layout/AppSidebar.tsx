// src/components/layout/AppSidebar.tsx
import {
  Home,
  Calendar,
  Settings,
  User,
  Users,
  FileText,
  LogOut,
} from "lucide-react";
import { Link } from "@/pages-router/navigation";
import { useAuth } from "@/context/AuthContext";

interface AppSidebarProps {
  isCollapsed: boolean;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ isCollapsed }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Check if user is admin or HR to determine sidebar title
  const isAdminOrHR = user?.role === 'admin' || 
                     user?.role === 'ROLE_ADMIN' || 
                     user?.role === 'hr' || 
                     user?.role === 'ROLE_HR';

  // For debugging
  console.log("Current user role:", user?.role);
  console.log("isAdminOrHR:", isAdminOrHR);

  return (
    <div
      className={`flex flex-col h-full bg-gray-100 border-r border-gray-200 ${
        isCollapsed ? "w-20" : "w-60"
      } transition-all duration-200`}
    >
      <div className="flex items-center justify-center h-16 border-b border-gray-200 shrink-0">
        <span className={`font-bold text-xl ${isCollapsed ? "hidden" : ""}`}>
          {isAdminOrHR ? 'Admin Panel' : 'Employee Portal'}
        </span>
        {isCollapsed && <Home className="w-6 h-6" />}
      </div>
      <nav className="flex-1 py-4">
        <ul>
          <li>
            <Link
              href="/dashboard"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                  isActive ? "bg-gray-200 font-medium" : ""
                }`
              }
            >
              <Home className="w-5 h-5 mr-2" />
              <span className={`${isCollapsed ? "hidden" : ""}`}>
                Dashboard
              </span>
            </Link>
          </li>
          {/* Only show leave request links for regular employees */}
          {!isAdminOrHR && (
            <>
              <li>
                <Link
                  href="/leave-request"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                      isActive ? "bg-gray-200 font-medium" : ""
                    }`
                  }
                >
                  <FileText className="w-5 h-5 mr-2" />
                  <span className={`${isCollapsed ? "hidden" : ""}`}>
                    Request Leave
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/my-leaves"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                      isActive ? "bg-gray-200 font-medium" : ""
                    }`
                  }
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className={`${isCollapsed ? "hidden" : ""}`}>
                    My Leaves
                  </span>
                </Link>
              </li>
            </>
          )}
          {/* Show admin/HR specific menu options */}
          {isAdminOrHR && (
            <li>
              <Link
                href="/admin-dashboard"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                    isActive ? "bg-gray-200 font-medium" : ""
                  }`
                }
              >
                <Users className="w-5 h-5 mr-2" />
                <span className={`${isCollapsed ? "hidden" : ""}`}>
                  Manage Leaves
                </span>
              </Link>
            </li>
          )}
          {/* Keep supervisor specific menu */}
          {user?.role === "supervisor" && (
            <li>
              <Link
                href="/supervisor-dashboard"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                    isActive ? "bg-gray-200 font-medium" : ""
                  }`
                }
              >
                <Users className="w-5 h-5 mr-2" />
                <span className={`${isCollapsed ? "hidden" : ""}`}>
                  Supervisor Dashboard
                </span>
              </Link>
            </li>
          )}
          <li>
            <Link
              href="/profile"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                  isActive ? "bg-gray-200 font-medium" : ""
                }`
              }
            >
              <User className="w-5 h-5 mr-2" />
              <span className={`${isCollapsed ? "hidden" : ""}`}>
                Profile
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                  isActive ? "bg-gray-200 font-medium" : ""
                }`
              }
            >
              <Settings className="w-5 h-5 mr-2" />
              <span className={`${isCollapsed ? "hidden" : ""}`}>
                Settings
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-700 hover:bg-gray-200 px-4 py-2 w-full justify-start"
        >
          <LogOut className="w-5 h-5 mr-2" />
          <span className={`${isCollapsed ? "hidden" : ""}`}>Logout</span>
        </button>
      </div>
    </div>
  );
};
