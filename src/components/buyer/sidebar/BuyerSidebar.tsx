// src/components/buyer/sidebar/BuyerSidebar.tsx
import { Link, useLocation } from "react-router-dom";

export const BuyerSidebar = () => {
    const location = useLocation();

    const linkStyle = (path: string) => ({
        display: "block",
        padding: "12px 16px",
        borderRadius: "8px",
        marginBottom: "6px",
        color: location.pathname.endsWith(path) ? "#fff" : "#e3f7ef",
        background: location.pathname.endsWith(path) ? "#287a5a" : "transparent",
        fontWeight: location.pathname.endsWith(path) ? "bold" : "normal",
        transition: "0.25s",
    });

    return (
        <div style={{ width: 240, background: "#328E6E", color: "#fff", padding: 16 }}>
            <h3 style={{ marginBottom: 20, fontSize: 20 }}>پنل خریدار</h3>

            <Link to="/buyer/dashboard" style={linkStyle("/buyer/dashboard")}>
                نمای کلی
            </Link>

            <Link to="orders" style={linkStyle("orders")}>
                سفارش‌های من
            </Link>

            <Link to="saved" style={linkStyle("saved")}>
                آگهی‌های ذخیره‌شده
            </Link>

            <Link to="rates" style={linkStyle("rates")}>
                نرخ بازار
            </Link>

            <Link to="messages" style={linkStyle("messages")}>
                پیام‌ها
            </Link>

            <Link to="settings" style={linkStyle("settings")}>
                تنظیمات
            </Link>
        </div>
    );
};
