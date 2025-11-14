import { Layout, Avatar, Dropdown, Menu, Badge } from "antd";
import {
    Sprout,
    BarChart3,
    MessageSquare,
    FlaskConical,
    User,
    Settings,
    LogOut,
    MapPin,
    MessageCircle,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Moon,
    Sun,
    Package,
    TrendingUp,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const { Sider, Content, Header } = Layout;

const menuItems = [
    {
        key: "/farmer/dashboard",
        label: "نمای کلی",
        icon: <BarChart3 size={20} />,
        color: "#10b981"
    },
    {
        key: "products-group",
        label: "محصولات",
        icon: <Sprout size={20} />,
        color: "#22c55e",
        children: [
            { key: "/farmer/dashboard/products", label: "محصولات من", icon: <Package size={18} /> },
            { key: "/farmer/dashboard/rates", label: "نرخ‌های بازار", icon: <TrendingUp size={18} /> },
        ]
    },
    {
        key: "/farmer/dashboard/lands",
        label: "زمین‌های من",
        icon: <MapPin size={20} />,
        color: "#8b5cf6"
    },
    {
        key: "/farmer/dashboard/consultation",
        label: "مشاوره",
        icon: <MessageCircle size={20} />,
        color: "#3b82f6",
        badge: 3
    },
    {
        key: "/farmer/dashboard/lab-tests",
        label: "آزمایشگاه",
        icon: <FlaskConical size={20} />,
        color: "#f59e0b"
    },
    {
        key: "/farmer/dashboard/messages",
        label: "پیام‌ها",
        icon: <MessageSquare size={20} />,
        color: "#ec4899",
        badge: 5
    },
    {
        key: "/farmer/dashboard/settings",
        label: "تنظیمات",
        icon: <Settings size={20} />,
        color: "#6b7280"
    },
];

export const FarmerDashboardLayout = () => {
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

    const bgColor = darkMode ? "#1a1f2e" : "#ffffff";
    const textColor = darkMode ? "#e5e7eb" : "#1f2937";
    const hoverBg = darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(50, 142, 110, 0.08)";
    const activeBg = darkMode ? "rgba(50, 142, 110, 0.2)" : "#328E6E";
    const activeText = darkMode ? "#10b981" : "#ffffff";

    return (
        <Layout className="min-h-screen bg-[#F7FAF9] font-[IRANSans]">
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
                                    ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                                    : "linear-gradient(135deg, #34d399 0%, #10b981 100%)"
                            }}
                        >
                            <Sprout size={28} className={!collapsed ? "ml-2" : ""} style={{ color: "#fff" }} />
                        </div>
                        {!collapsed && (
                            <span
                                className="mr-3 text-xl font-bold"
                                style={{ color: textColor }}
                            >
                                آگرو تک
                            </span>
                        )}
                    </div>

                    {/* دکمه Collapse */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="absolute left-[-16px] top-[50%] translate-y-[-50%] rounded-full p-2 shadow-xl transition-all duration-300 hover:scale-110 z-50"
                        style={{
                            background: darkMode ? "#1f2937" : "#ffffff",
                            color: "#328E6E",
                            border: `2px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
                        }}
                    >
                        {collapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                    </button>
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
                            <svg width="18" height="18" fill="none" stroke={darkMode ? "#9ca3af" : "#6b7280"} strokeWidth="2">
                                <circle cx="8" cy="8" r="6" />
                                <path d="M12.5 12.5L16 16" />
                            </svg>
                            <input
                                type="text"
                                placeholder="جستجو..."
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
                                    <p className="text-sm font-medium" style={{ color: textColor }}>علی احمدی</p>
                                    <p className="text-xs" style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>کشاورز</p>
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
                <Header className="bg-white shadow-sm px-6 flex justify-between items-center sticky top-0 z-10">
                    <h1 className="text-xl font-semibold text-[#328E6E] flex items-center gap-2">
                        <div className="w-1 h-6 bg-[#328E6E] rounded-full"></div>
                        داشبورد کشاورز
                    </h1>
                    <Dropdown overlay={userMenu} placement="bottomLeft">
                        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-4 py-2 rounded-xl transition-all duration-300">
                            <Avatar
                                src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
                                size={40}
                                className="border-2 border-[#328E6E]"
                            />
                            <span className="text-sm font-medium text-gray-700">سلام، علی!</span>
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