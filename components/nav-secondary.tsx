import React, { useState } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import { LogOut, Settings, LogIn } from "lucide-react";

export default function NavSecondary({ ...props }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const filteredItems = isLoggedIn
    ? [
        {
          title: "Logout",
          url: "#",
          icon: LogOut,
        },
      ]
    : [
        {
          title: "Login",
          url: "#",
          icon: LogIn,
        },
      ];

  const alwaysRenderedItems = [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {[...filteredItems, ...alwaysRenderedItems].map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
