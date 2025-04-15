
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  Home,
  Menu,
  FileText,
  User,
  LogOut,
  Settings
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const navigate = useNavigate();
  
  // Navigation items for the sidebar
  const mainNavItems = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/",
    },
    {
      title: "Request Leave",
      icon: FileText,
      url: "/request",
    },
    {
      title: "My Leaves",
      icon: Clock,
      url: "/my-leaves",
    },
    {
      title: "Calendar",
      icon: Calendar,
      url: "/calendar",
    },
  ];

  const userNavItems = [
    {
      title: "My Profile",
      icon: User,
      url: "/profile",
    },
    {
      title: "Settings",
      icon: Settings,
      url: "/settings",
    },
    {
      title: "Logout",
      icon: LogOut,
      url: "/logout",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-lg text-sidebar-foreground">RwandaLeaveCompass</span>
        </div>
        <SidebarTrigger className="ml-auto">
          <Menu className="h-4 w-4" />
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.url);
                      }}
                      className="flex items-center"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>User</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.url);
                      }}
                      className="flex items-center"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-2">
        <div className="text-xs text-sidebar-foreground opacity-50">
          Rwanda Leave Management System
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
