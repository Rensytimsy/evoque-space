import  React, { FC , ReactNode} from "react";
import { AppSidebar } from "./components/app-sidebar";


export const AdminDashboardPage:FC<{ children: ReactNode}> = ({ children }) => {
    return (
        <>
            <AppSidebar>{children}</AppSidebar>
        </>
    )
}

export default AdminDashboardPage;