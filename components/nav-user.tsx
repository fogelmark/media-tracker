"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { User } from "lucide-react";
import avatar from "@/public/images/avatar.jpg";

interface NavUserProps {
  name?: string | null;
  isLoading?: boolean | null;
  isAuthenticated?: boolean | null;
}

export function NavUser({ name, isLoading, isAuthenticated }: NavUserProps) {
  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent cursor-default data-[state=open]:text-sidebar-accent-foreground"
    >
      {isAuthenticated ? (
        <Avatar className="size-8 rounded-full">
          <AvatarImage src={avatar.src} alt="Avatar" />
          <AvatarFallback className="rounded-full">CN</AvatarFallback>
        </Avatar>
      ) : (
        <div className="rounded-full p-1 size-8 dark:bg-neutral-500">
          <User className="stroke-ash-surface" />
        </div>
      )}

      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{name}</span>
      </div>
    </SidebarMenuButton>
  );
}
