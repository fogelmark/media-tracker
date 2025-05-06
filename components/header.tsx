"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
  const pathname = usePathname();

  const paths = pathname.split("/").filter(Boolean);
  console.log(paths);

  const lastIndex = paths.length - 1;

  const { open } = useSidebar();

  return (
    <header
      className={cn(
        "flex h-16 w-full shrink-0 items-center gap-2 transition-[width,height] ease-linear",
        { "h-16": !open }
      )}
    >
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {paths.map((path, index) => (
              <div key={index} className="flex items-center gap-2 capitalize">
                <BreadcrumbItem>
                  {index === lastIndex ? (
                    <BreadcrumbPage>{path}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={`/${path}`}>{path}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < lastIndex && <BreadcrumbSeparator />}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
