// src/pages/buyer/dashboard/BuyerDashboardLayout.tsx
import { Outlet } from "react-router-dom";
import { BuyerSidebar } from "../../components/buyer/sidebar/BuyerSidebar";
import { BuyerHeader } from "../../components/buyer/header/BuyerHeader";

export const BuyerDashboardLayout = () => {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <BuyerSidebar />

            <div style={{ flex: 1, padding: "24px", background: "#f5f7f8" }}>
                <BuyerHeader />
                <Outlet />
            </div>
        </div>
    );
};
