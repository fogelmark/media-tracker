import {
  ChevronRight,
  Home,
  LayoutDashboard,
  Library,
  Plus,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "./ui/sidebar";
import Link from "next/link";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

export default function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Application</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <React.Fragment key={item.title}>
              {item.subItems ? (
                <Collapsible className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <item.icon />
                        <span className="group-hover/menu-button:translate-x-1 transition duration-150">
                          {item.title}
                        </span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems.map((sub) => (
                          <SidebarMenuSubItem
                            key={sub.title}
                            className="h-7 flex items-center"
                          >
                            <SidebarMenuSubButton asChild>
                              <Link href={sub.url}>
                                <span className="group-hover/menu-button:translate-x-1 transition duration-150">
                                  {sub.title}
                                </span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="group-hover/menu-button:translate-x-1 transition duration-150">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </React.Fragment>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Media",
    url: "/media",
    icon: Library,
  },
  {
    title: "Log",
    url: "/log",
    icon: Plus,
    subItems: [
      {
        title: "Books",
        url: "/log/books",
      },
      {
        title: "Movies",
        url: "/log/movies",
      },
      {
        title: "Series",
        url: "/log/series",
      },
    ],
  },
];
