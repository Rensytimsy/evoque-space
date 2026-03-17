"use client"
import {FC, ReactNode} from "react"
import { AppSidebar } from "./admin/components/app-sidebar"
import { usePathname } from "next/navigation"

export const DashboardProvider:FC<{children: ReactNode}> = ({children}) => {
    const pathname = usePathname()

    const EXCLUDED_PATHNAMES = ["/pages/auth/signin", "/pages/auth/signup", "/pages", "/home","/page"]
    const should_display = !EXCLUDED_PATHNAMES.some(path => pathname.startsWith(path))

    if (should_display) {
        return <AppSidebar>{children}</AppSidebar>
    }

    return <>{children}</>
}