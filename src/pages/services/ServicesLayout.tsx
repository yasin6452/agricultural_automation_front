// src/pages/services/ServicesSidebar.tsx
import { Link } from "react-router-dom";
import { Home, Clipboard, MessageSquare, BarChart, Settings } from "lucide-react";

export default function ServicesSidebar() {
    return (
        <div className="w-64 bg-orange-500 h-screen text-white p-4">
            <h1 className="text-xl font-bold mb-6">پنل خدمات</h1>
            <nav className="flex flex-col gap-3">
                <Link to="/services/dashboard" className="flex items-center gap-2 hover:bg-orange-600 p-2 rounded">
                    <Home size={20} /> داشبورد
                </Link>
                <Link to="/services/manage" className="flex items-center gap-2 hover:bg-orange-600 p-2 rounded">
                    <Clipboard size={20} /> مدیریت خدمات
                </Link>
                <Link to="/services/requests" className="flex items-center gap-2 hover:bg-orange-600 p-2 rounded">
                    <Clipboard size={20} /> درخواست‌ها
                </Link>
                <Link to="/services/messages" className="flex items-center gap-2 hover:bg-orange-600 p-2 rounded">
                    <MessageSquare size={20} /> پیام‌ها
                </Link>
                <Link to="/services/analytics" className="flex items-center gap-2 hover:bg-orange-600 p-2 rounded">
                    <BarChart size={20} /> آنالیز
                </Link>
                <Link to="/services/settings" className="flex items-center gap-2 hover:bg-orange-600 p-2 rounded">
                    <Settings size={20} /> تنظیمات
                </Link>
            </nav>
        </div>
    );
}
