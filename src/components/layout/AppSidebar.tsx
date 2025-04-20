import {
  Calendar,
  Clock,
  Home,
  Menu,
  FileText,
  User,
  LogOut,
  Settings,
  Users
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

import { Link } from "@/pages-router/navigation";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "./Logo";

export function AppSidebar() {
  const { user } = useAuth();
  
  const isSupervisor = user?.role === "supervisor" || user?.role === "admin";
  
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

  // If user is a supervisor, add the supervisor dashboard link
  if (isSupervisor) {
    mainNavItems.push({
      title: "Supervisor Dashboard",
      icon: Users,
      url: "/supervisor-dashboard",
    });
  }

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
        <Logo />
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
                    <Link href={item.url} className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
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
                    <Link href={item.url} className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
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
