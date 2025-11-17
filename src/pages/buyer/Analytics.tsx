// src/pages/buyer/Analytics.tsx
import React, { useEffect, useState } from "react";

interface AnalyticsData {
    cost: number;
    revenue: number;
    profit: number;
    month: string;
}

const Analytics: React.FC = () => {
    // داده اولیه (fallback)
    const sampleData: AnalyticsData[] = [
        { month: "فروردین", cost: 50000, revenue: 80000, profit: 30000 },
        { month: "اردیبهشت", cost: 60000, revenue: 90000, profit: 30000 },
        { month: "خرداد", cost: 55000, revenue: 95000, profit: 40000 },
    ];

    // State اصلی
    const [analytics, setAnalytics] = useState<AnalyticsData[]>(sampleData);

    // شبیه‌سازی دریافت داده از API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // فرض API call
                // const response = await fetch("/api/analytics");
                // const data: AnalyticsData[] = await response.json();
                // if (data && data.length > 0) setAnalytics(data);

                // فعلاً از داده نمونه استفاده می‌کنیم
                setAnalytics(sampleData);
            } catch (err) {
                console.error("Error fetching analytics data:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">داشبورد هوشمند تحلیل هزینه‌ها</h1>

            {analytics.length === 0 ? (
                <p>هیچ داده‌ای برای نمایش وجود ندارد.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {analytics.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-4 border rounded-lg shadow hover:shadow-lg transition"
                        >
                            <h2 className="font-semibold mb-2">{item.month}</h2>
                            <p>هزینه: {item?.cost ?? 0} تومان</p>
                            <p>درآمد: {item?.revenue ?? 0} تومان</p>
                            <p>سود: {item?.profit ?? 0} تومان</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Analytics;
