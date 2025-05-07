import React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import { LogOut, Settings, LogIn, Sidebar } from "lucide-react";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

interface NavProps {
  isAuthenticated: boolean | null;
  className?: string;
  isLoading?: boolean | null;
}

export default function NavSecondary({
  isAuthenticated,
  isLoading,
  ...props
}: NavProps) {
  const LinkComponent = isAuthenticated ? LogoutLink : LoginLink;
  const LinkIcon = isAuthenticated ? LogOut : LogIn;
  const linkLabel = isAuthenticated ? "Logout" : "Login";

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <LinkComponent>
                <LinkIcon />
                <span className="group-hover/menu-button:translate-x-1 transition duration-150">
                  {linkLabel}
                </span>
              </LinkComponent>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings />
                <span className="group-hover/menu-button:translate-x-1 transition duration-150">
                  Settings
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
