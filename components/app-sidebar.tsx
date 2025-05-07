"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { CompanyName } from "./company-name";
import { NavUser } from "./nav-user";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import NavMain from "./nav-main";
import NavSecondary from "./nav-secondary";

export function AppSidebar() {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();
  return (
    <Sidebar collapsible="icon" className="dark:bg-ash-surface">
      <SidebarHeader className="h-16">
        <CompanyName />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavSecondary
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
          name={user?.given_name}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
