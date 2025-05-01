import React from 'react'
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from './ui/sidebar'
import { Home, Library, SquarePen } from 'lucide-react';
import Link from 'next/link';

export default function NavMain() {
  return (
    <SidebarGroup>
    <SidebarGroupLabel>Application</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon />
                <span className='group-hover/menu-button:translate-x-1 transition duration-150'>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
  )
}

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Library",
    url: "/library",
    icon: Library,
  },
  {
    title: "Calendar",
    url: "/forms",
    icon: SquarePen,
  },
];
