import { Layout, Avatar, Dropdown, Menu } from "antd";
import {
    Sprout,
    BarChart3,
    ShoppingBag,
    MessageSquare,
    LineChart,
    FlaskConical,
    User,
    Settings,
    LogOut,
    MapPin,
    MessageCircle,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const { Sider, Content, Header } = Layout;

// ✅ مسیرها را با App.tsx هماهنگ کردیم
const menuItems = [
    { key: "/farmer/dashboard", label: "نمای کلی", icon: <BarChart3 size={18} /> },
    { key: "/farmer/dashboard/products", label: "محصولات من", icon: <Sprout size={18} /> },
    { key: "/farmer/dashboard/rates", label: "نرخ‌های بازار", icon: <LineChart size={18} /> },
    { key: "/farmer/dashboard/lands", label: "زمین‌های من", icon: <MapPin size={18} /> },
    { key: "/farmer/dashboard/consultation", label: "مشاوره", icon: <MessageCircle size={18} /> },
    { key: "/farmer/dashboard/lab-tests", label: "آزمایشگاه خاک و گیاه", icon: <FlaskConical size={18} /> },
    { key: "/farmer/dashboard/messages", label: "پیام‌ها", icon: <MessageSquare size={18} /> },
    { key: "/farmer/dashboard/settings", label: "تنظیمات", icon: <Settings size={18} /> },
];

export const FarmerDashboardLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // ✅ منوی کاربر با عملکرد خروج
    const handleMenuClick = ({ key }: { key: string }) => {
        if (key === "logout") {
            // اضافه کردن لوژیک خروج
            localStorage.removeItem("token");
            navigate("/login");
        } else if (key === "profile") {
            navigate("/farmer/dashboard/settings");
        }
    };

    const userMenu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                { key: "profile", label: "پروفایل من", icon: <User size={16} /> },
                { key: "logout", label: "خروج", icon: <LogOut size={16} />, danger: true },
            ]}
        />
    );

    return (
        <Layout className="min-h-screen bg-[#F7FAF9] font-[IRANSans]">
            {/* Sidebar */}
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                width={230}
                className="bg-[#328E6E] text-white shadow-lg"
                style={{ position: "fixed", height: "100vh", right: 0 }}
            >
                <div className="flex items-center justify-center py-5 text-xl font-bold text-white border-b border-white/20">
                    <Sprout size={24} className="ml-2" />
                    {!collapsed && "پنل کشاورز"}
                </div>

                <div className="mt-4 flex flex-col overflow-y-auto h-[calc(100vh-80px)]">
                    {menuItems.map((item) => {
                        // ✅ برای صفحه اصلی، هم مسیر دقیق و هم prefix را چک می‌کنیم
                        const isActive =
                            location.pathname === item.key ||
                            (item.key === "/farmer/dashboard" && location.pathname === "/farmer/dashboard");

                        return (
                            <Link
                                key={item.key}
                                to={item.key}
                                className={`flex items-center gap-3 px-5 py-3 text-white/90 hover:bg-white/20 transition rounded-lg m-1 ${isActive ? "bg-white/30 text-white font-semibold" : ""
                                    }`}
                            >
                                {item.icon}
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </div>
            </Sider>

            {/* Main layout */}
            <Layout style={{ marginRight: collapsed ? 80 : 230, transition: "margin 0.2s" }}>
                {/* Header */}
                <Header className="bg-white shadow-sm px-6 flex justify-between items-center sticky top-0 z-10">
                    <h1 className="text-lg font-semibold text-[#328E6E]">داشبورد کشاورز</h1>
                    <Dropdown overlay={userMenu} placement="bottomLeft">
                        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition">
                            <Avatar src="https://avatars.githubusercontent.com/u/9919?s=200&v=4" />
                            <span className="text-sm text-gray-600">سلام، علی!</span>
                        </div>
                    </Dropdown>
                </Header>

                {/* Main content */}
                <Content className="m-6 p-6 bg-white rounded-2xl shadow-md min-h-[calc(100vh-120px)]">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default FarmerDashboardLayout;