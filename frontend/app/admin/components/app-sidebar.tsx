"use client"

import * as React from "react"
import {FC, ReactNode} from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconTax,
  IconBrandXbox,
  IconBrandDropbox,
  IconDeviceGamepad3
} from "@tabler/icons-react"

import { NavDocuments } from "../components/nav-documents"
import { NavMain } from "../components/nav-main"
import { NavSecondary } from "../components/nav-secondary"
import { NavUser } from "../components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: IconDashboard,
    },
    {
      title: "Products",
      url: "/admin/dashboard/products",
      icon: IconBrandDropbox,
    },
    {
      title: "Services",
      url: "/admin/dashboard/services",
      icon: IconDeviceGamepad3,
    },
    {
      title: "Payments",
      url: "#",
      icon: IconTax,
    }
  ]
}

export const AppSidebar: FC<{ children: ReactNode }> = ({ children }) => {

    const [isOpen, setIsOpened] = React.useState<boolean>(true)

    return (
        <div className="relative">
            <SidebarProvider>
                <Sidebar collapsible="icon">
                    <SidebarHeader className="bg-gray-100 text-black font-bold">
                        <div className="flex space-x-3">
                          <img src={"/esl-logo.png"} className={isOpen ? "h-10" : "h-10"} />
                          <p className={isOpen ? "mt-1 text-md text-[var(--teal-dark-dark)]" : "hidden"}>Admin Dashboard</p>
                        </div>
                    </SidebarHeader>
                    <SidebarContent className="bg-gray-100 text-[var(--teal-dark-dark)] font-bold">
                        <NavMain items={data.navMain} />
                    </SidebarContent>
                    <SidebarFooter className="bg-white text-[var(--teal-dark-dark)] font-bold">
                        <NavUser user={data.user} />
                    </SidebarFooter>
                </Sidebar>
                <SidebarTrigger
                    className={`
                        absolute top-0 z-10 transition-all duration-300 ease-in-out
                    ${isOpen
                            ? 'left-4 lg:left-[16rem] md:left-[16rem]'
                            : 'left-4 lg:left-12 md:left-12'
                        }
    `}
                    onClick={
                        () => setIsOpened(!isOpen)
                    }
                >
                </SidebarTrigger>
                <SidebarInset>
                    <div>
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}