import { Layout, Avatar, Dropdown, Menu, Badge } from "antd";
import {
    BarChart3,
    MessageSquare,
    User,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Moon,
    Sun,
    Wrench,
    ClipboardList,
    Bell,
    Search,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { ReactNode } from "react";

const { Sider, Content, Header } = Layout;

// تعریف interface برای menu items
interface MenuItem {
    key: string;
    label: string;
    icon: ReactNode;
    color: string;
    badge?: number;
    children?: MenuItem[];
}

const menuItems: MenuItem[] = [
    {
        key: "/services/dashboard",
        label: "نمای کلی",
        icon: <BarChart3 size={20} />,
        color: "#10b981"
    },
    {
        key: "/services/manage",
        label: "مدیریت سرویس‌ها",
        icon: <Wrench size={20} />,
        color: "#3b82f6"
    },
    {
        key: "/services/requests",
        label: "درخواست‌های سرویس",
        icon: <ClipboardList size={20} />,
        color: "#f59e0b"
    },
    {
        key: "/services/messages",
        label: "پیام‌ها",
        icon: <MessageSquare size={20} />,
        color: "#06b6d4",
        badge: 3
    },
    {
        key: "/services/analytics",
        label: "تحلیل‌ها",
        icon: <BarChart3 size={20} />,
        color: "#84cc16"
    },
    {
        key: "/services/settings",
        label: "تنظیمات",
        icon: <Settings size={20} />,
        color: "#6b7280"
    },
];

export const ServicesLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSubmenu = (key: string) => {
        setExpandedMenus(prev =>
            prev.includes(key)
                ? prev.filter(k => k !== key)
                : [...prev, key]
        );
    };

    const handleMenuClick = ({ key }: { key: string }) => {
        if (key === "logout") {
            localStorage.removeItem("token");
            navigate("/login");
        } else if (key === "profile") {
            navigate("/services/settings");
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

    const bgColor = darkMode ? "#1a1f2e" : "#ffffff";
    const textColor = darkMode ? "#e5e7eb" : "#1f2937";
    const hoverBg = darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(59, 130, 246, 0.08)";
    const activeBg = darkMode ? "rgba(59, 130, 246, 0.2)" : "#3b82f6";
    const activeText = darkMode ? "#60a5fa" : "#ffffff";

    return (
        <Layout className="min-h-screen bg-[#F7FAFC] font-[IRANSans]">
            {/* Sidebar مدرن */}
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                width={280}
                collapsedWidth={80}
                trigger={null}
                className="shadow-2xl transition-all duration-300"
                style={{
                    position: "fixed",
                    height: "100vh",
                    right: 0,
                    background: bgColor,
                    borderLeft: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)",
                }}
            >
                {/* Header سایدبار */}
                <div className="relative border-b" style={{ borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }}>
                    <div className="flex items-center justify-center py-6">
                        <div
                            className="p-3 rounded-2xl transition-all duration-300"
                            style={{
                                background: darkMode
                                    ? "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
                                    : "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)"
                            }}
                        >
                            <Wrench size={28} className={!collapsed ? "ml-2" : ""} style={{ color: "#fff" }} />
                        </div>
                        {!collapsed && (
                            <span
                                className="mr-3 text-xl font-bold"
                                style={{ color: textColor }}
                            >
                                پنل سرویس‌دهی
                            </span>
                        )}
                    </div>
                </div>

                {/* Search Bar */}
                {!collapsed && (
                    <div className="px-4 py-4">
                        <div
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all"
                            style={{
                                background: darkMode ? "rgba(255,255,255,0.05)" : "#f3f4f6",
                                border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "transparent"}`
                            }}
                        >
                            <Search size={18} color={darkMode ? "#9ca3af" : "#6b7280"} />
                            <input
                                type="text"
                                placeholder="جستجو در سرویس‌ها..."
                                className="bg-transparent outline-none text-sm flex-1"
                                style={{ color: textColor }}
                            />
                        </div>
                    </div>
                )}

                {/* منوی اصلی */}
                <div className="flex flex-col overflow-y-auto h-[calc(100vh-240px)] px-3 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.key;
                        const hasChildren = item.children && item.children.length > 0;
                        const isExpanded = expandedMenus.includes(item.key);

                        return (
                            <div key={item.key}>
                                {/* منوی اصلی */}
                                <div
                                    onClick={() => {
                                        if (hasChildren) {
                                            toggleSubmenu(item.key);
                                        } else {
                                            navigate(item.key);
                                        }
                                    }}
                                    className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-300"
                                    style={{
                                        background: isActive ? activeBg : "transparent",
                                        color: isActive ? activeText : textColor,
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = hoverBg;
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = "transparent";
                                        }
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="flex items-center justify-center w-9 h-9 rounded-lg transition-all"
                                            style={{
                                                background: isActive
                                                    ? "rgba(255,255,255,0.2)"
                                                    : darkMode ? "rgba(255,255,255,0.05)" : "transparent",
                                                color: isActive ? activeText : item.color
                                            }}
                                        >
                                            {item.icon}
                                        </div>
                                        {!collapsed && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-[15px] font-medium">{item.label}</span>
                                                {item.badge && (
                                                    <Badge
                                                        count={item.badge}
                                                        style={{
                                                            background: "#ef4444",
                                                            fontSize: "10px",
                                                            minWidth: "18px",
                                                            height: "18px",
                                                            lineHeight: "18px"
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {!collapsed && hasChildren && (
                                        <div style={{ color: isActive ? activeText : textColor }}>
                                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </div>
                                    )}
                                </div>

                                {/* زیر منو */}
                                {hasChildren && isExpanded && !collapsed && (
                                    <div className="mr-6 mt-1 space-y-1">
                                        {item.children?.map((child) => {
                                            const isChildActive = location.pathname === child.key;
                                            return (
                                                <Link
                                                    key={child.key}
                                                    to={child.key}
                                                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300"
                                                    style={{
                                                        background: isChildActive ? activeBg : "transparent",
                                                        color: isChildActive ? activeText : textColor,
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (!isChildActive) {
                                                            e.currentTarget.style.background = hoverBg;
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (!isChildActive) {
                                                            e.currentTarget.style.background = "transparent";
                                                        }
                                                    }}
                                                >
                                                    <div style={{ color: isChildActive ? activeText : "#94a3b8" }}>
                                                        {child.icon}
                                                    </div>
                                                    <span className="text-sm">{child.label}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* دکمه Collapse */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute left-[-16px] top-[50%] translate-y-[-50%] rounded-full p-2 shadow-xl transition-all duration-300 hover:scale-110 z-50"
                    style={{
                        background: darkMode ? "#1f2937" : "#ffffff",
                        color: "#8b5cf6",
                        border: `2px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
                    }}
                >
                    {collapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>

                {/* Footer سایدبار */}
                <div
                    className="absolute bottom-0 right-0 left-0 p-4 border-t"
                    style={{
                        background: bgColor,
                        borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
                    }}
                >
                    {!collapsed ? (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar
                                    src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
                                    size={36}
                                />
                                <div>
                                    <p className="text-sm font-medium" style={{ color: textColor }}>سارا محمدی</p>
                                    <p className="text-xs" style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>ارائه‌دهنده سرویس</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="p-2 rounded-lg transition-all hover:scale-110"
                                style={{ background: hoverBg }}
                            >
                                {darkMode ? <Sun size={18} color="#fbbf24" /> : <Moon size={18} color="#6b7280" />}
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-3">
                            <Avatar
                                src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
                                size={36}
                            />
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="p-2 rounded-lg transition-all hover:scale-110"
                                style={{ background: hoverBg }}
                            >
                                {darkMode ? <Sun size={18} color="#fbbf24" /> : <Moon size={18} color="#6b7280" />}
                            </button>
                        </div>
                    )}
                </div>
            </Sider>

            {/* Main layout */}
            <Layout style={{ marginRight: collapsed ? 80 : 280, transition: "margin 0.3s ease-in-out" }}>
                {/* Header */}
                <Header
                    className="bg-white shadow-md px-4 flex justify-between items-center sticky top-0 z-10 border-b border-gray-100"
                    style={{ height: "64px" }}
                >
                    <div className="flex items-center gap-4">
                        {/* عنوان */}
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-6 bg-gradient-to-b from-[#8b5cf6] to-[#a78bfa] rounded-full"></div>
                            <h1 className="text-lg font-bold text-gray-800">داشبورد سرویس‌ها</h1>
                        </div>
                    </div>

                    {/* بخش راست */}
                    <div className="flex items-center gap-3">
                        {/* نوتیفیکیشن */}
                        <button className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-all">
                            <Bell size={20} className="text-gray-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        </button>

                        {/* پروفایل */}
                        <Dropdown overlay={userMenu} placement="bottomLeft" trigger={['click']}>
                            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-all duration-300 border border-transparent hover:border-gray-200">
                                <Avatar
                                    src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
                                    size={36}
                                    className="border-2 border-[#8b5cf6]"
                                />
                                <div className="hidden md:block text-right">
                                    <p className="text-sm font-semibold text-gray-800">سارا محمدی</p>
                                    <p className="text-xs text-gray-500">ارائه‌دهنده سرویس</p>
                                </div>
                                <ChevronDown size={16} className="text-gray-400 hidden md:block" />
                            </div>
                        </Dropdown>
                    </div>
                </Header>

                {/* Main content */}
                <Content className="m-6 p-6 bg-white rounded-2xl shadow-md min-h-[calc(100vh-120px)]">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default ServicesLayout;