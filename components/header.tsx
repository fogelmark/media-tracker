"use client";

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from './ui/breadcrumb'
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';
import { SidebarTrigger, useSidebar } from './ui/sidebar'
import React from 'react'

export default function Header() {

  const {
    open,
  } = useSidebar()

  return (
    <header className={cn("flex h-16 w-full shrink-0 items-center gap-2 transition-[width,height] ease-linear", { "h-12": !open })}>
    <div className="flex items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">
              Building Your Application
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>
  )
}
