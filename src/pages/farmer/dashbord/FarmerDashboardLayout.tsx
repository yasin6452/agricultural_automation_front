import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { FarmerHeader } from "../../../components/dashboard/farmer/header/FarmerHeader";
import { FarmerSidebar } from "../../../components/dashboard/farmer/sidebar/FarmerSidebar";
import "../../../styles/farmer/dashbord/FarmerDashboard.css";

const { Content } = Layout;

export const FarmerDashboardLayout = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <FarmerSidebar />
            <Layout>
                <FarmerHeader />
                <Content
                    style={{
                        margin: "24px",
                        padding: "24px",
                        background: "#F7FAF9",
                        borderRadius: 12,
                        minHeight: "calc(100vh - 80px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
