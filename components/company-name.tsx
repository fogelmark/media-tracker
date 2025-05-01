"use client";

import * as React from "react";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { bricolage } from "@/lib/fonts";
import { Library } from "lucide-react";
import Link from "next/link";

export function CompanyName() {

  return (
    <Link href="/">
      <SidebarMenuButton
      variant="default"
        size="lg"
        className="p-0 gap-0 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Library className="size-4" />
        </div>
        <div className="grid flex-1 text-left leading-tight">
          <span className={cn("truncate font-semibold", bricolage.className)}>
            Mediary
          </span>
        </div>
      </SidebarMenuButton>
    </Link>
  );
}
