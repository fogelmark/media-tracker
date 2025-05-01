"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { CompanyName } from "./company-name";
import NavMain from "./nav-main";
import NavSecondary from "./nav-secondary";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="dark:bg-ash-surface">
      <SidebarHeader className="h-16">
        <CompanyName />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
