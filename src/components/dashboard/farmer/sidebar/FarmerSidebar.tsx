import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
    HomeOutlined,
    AppstoreOutlined,
    ShopOutlined,
    CompassOutlined,
    UserOutlined,
    MessageOutlined,
    SettingOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

export const FarmerSidebar = () => {
    const location = useLocation();

    const items = [
        { key: "/farmer/dashboard", icon: <HomeOutlined />, label: <Link to="/farmer/dashboard">نمای کلی</Link> },
        { key: "/farmer/products", icon: <ShopOutlined />, label: <Link to="/farmer/products">محصولات من</Link> },
        { key: "/farmer/market-rates", icon: <AppstoreOutlined />, label: <Link to="/farmer/market-rates">نرخ‌نامه</Link> },
        { key: "/farmer/lands", icon: <CompassOutlined />, label: <Link to="/farmer/lands">زمین‌ها</Link> },
        { key: "/farmer/consultation", icon: <UserOutlined />, label: <Link to="/farmer/consultation">ارتباط با کارشناسان</Link> },
        { key: "/farmer/lab-tests", icon: <MessageOutlined />, label: <Link to="/farmer/lab-tests">آزمایشگاه</Link> },
        { key: "/farmer/messages", icon: <MessageOutlined />, label: <Link to="/farmer/messages">پیام‌ها</Link> },
        { key: "/farmer/settings", icon: <SettingOutlined />, label: <Link to="/farmer/settings">تنظیمات</Link> },
    ];

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            style={{
                background: "#328E6E",
                color: "#fff",
            }}
        >
            <div
                className="logo"
                style={{
                    height: 64,
                    margin: 16,
                    background: "#fff",
                    borderRadius: 12,
                    textAlign: "center",
                    fontWeight: "bold",
                    lineHeight: "64px",
                    color: "#328E6E",
                    fontSize: 20,
                }}
            >
                کشاورز من
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                items={items}
                style={{
                    background: "transparent",
                    borderRight: 0,
                }}
            />
        </Sider>
    );
};
