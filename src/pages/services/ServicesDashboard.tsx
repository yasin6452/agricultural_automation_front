// src/pages/services/ServicesDashboard.tsx
import { useState } from "react";

interface StatCard {
    title: string;
    value: number;
    color: string;
}

export default function ServicesDashboard() {
    // داده نمونه کارت‌ها
    const stats: StatCard[] = [
        { title: "کل خدمات", value: 12, color: "text-orange-500" },
        { title: "درخواست‌های جدید", value: 5, color: "text-orange-500" },
        { title: "پیام‌های خوانده نشده", value: 3, color: "text-orange-500" },
    ];

    // داده نمونه درخواست‌ها
    const [requests] = useState([
        { id: 1, service: "سم‌پاشی", customer: "علی رضایی", date: "25/11/2025", status: "در حال بررسی" },
        { id: 2, service: "آبیاری هوشمند", customer: "زهرا احمدی", date: "24/11/2025", status: "تکمیل شده" },
    ]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-orange-600">داشبورد خدمات</h1>

            {/* کارت‌های آماری */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-4 rounded shadow">
                        <h2 className="text-xl font-semibold">{stat.title}</h2>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* آخرین درخواست‌ها */}
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">آخرین درخواست‌ها</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-orange-500 text-white">
                            <tr>
                                <th className="py-2 px-4 text-left">ID</th>
                                <th className="py-2 px-4 text-left">خدمت</th>
                                <th className="py-2 px-4 text-left">مشتری</th>
                                <th className="py-2 px-4 text-left">تاریخ</th>
                                <th className="py-2 px-4 text-left">وضعیت</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.id} className="border-b">
                                    <td className="py-2 px-4">{req.id}</td>
                                    <td className="py-2 px-4">{req.service}</td>
                                    <td className="py-2 px-4">{req.customer}</td>
                                    <td className="py-2 px-4">{req.date}</td>
                                    <td className="py-2 px-4">{req.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* نمودار درخواست‌ها (Placeholder) */}
            <div className="bg-white p-4 rounded shadow mt-6">
                <h2 className="text-xl font-semibold mb-4">نمودار درخواست‌ها</h2>
                <div className="h-64 flex items-center justify-center text-gray-400">
                    اینجا نمودار قرار می‌گیرد
                </div>
            </div>
        </div>
    );
}
