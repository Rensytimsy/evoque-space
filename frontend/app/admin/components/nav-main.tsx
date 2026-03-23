"use client"

import { type Icon } from "@tabler/icons-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from 'next/link'
import { usePathname } from "next/navigation"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const currentPath = usePathname()
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem className="text-white text-md font-semibold" key={item.title}>
              <Link href={item.url} passHref legacyBehavior>
                <SidebarMenuButton tooltip={item.title} className="hover:bg-black/20 hove:text-black" asChild>
                  <a className={`flex items-center gap-2 ${currentPath.startsWith(item.url) ? "bg-[var(--teal-light)] hover:text-white" : "hover:bg-gray-100 text-black"}`}>
                    {item.icon && <item.icon className={`${currentPath.startsWith(item.url) ? "hover:text-white" : "hover:text-black"} min-h-20`}/>}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}