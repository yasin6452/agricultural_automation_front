// src/pages/services/ServicesOverview.tsx
import { Card, Progress, Tag } from "antd";
import {
    Package,
    Clock,
    BarChart2,
    MessageSquare,
    CheckCircle,
    TrendingUp,
    Users,
    ArrowUp,
    ArrowDown
} from "lucide-react";

export default function ServicesOverview() {
    const stats = [
        {
            title: "خدمات فعال",
            value: "12",
            icon: Package,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
            trend: "5%",
            trendUp: true,
            description: "از ماه گذشته"
        },
        {
            title: "درخواست‌های در انتظار",
            value: "7",
            icon: Clock,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            trend: "2%",
            trendUp: false,
            description: "نیاز به پیگیری"
        },
        {
            title: "پیام‌های جدید",
            value: "3",
            icon: MessageSquare,
            color: "text-green-600",
            bgColor: "bg-green-100",
            trend: "12%",
            trendUp: true,
            description: "بدون پاسخ"
        },
        {
            title: "رضایت مشتری",
            value: "92%",
            icon: BarChart2,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
            trend: "3%",
            trendUp: true,
            description: "از هدف 95%"
        }
    ];

    const activities = [
        {
            id: 1,
            type: "success",
            icon: CheckCircle,
            title: "خدمت 'سم‌پاشی ویژه' تأیید شد",
            time: "۲ ساعت پیش",
            description: "برای مزرعه گندم احمدی",
            status: "تکمیل شده",
            statusColor: "green"
        },
        {
            id: 2,
            type: "message",
            icon: MessageSquare,
            title: "پیام جدید از مشتری دریافت شد",
            time: "۵ ساعت پیش",
            description: "سوال در مورد خدمات آبیاری",
            status: "جدید",
            statusColor: "blue"
        },
        {
            id: 3,
            type: "pending",
            icon: Clock,
            title: "درخواست خدمت جدید ثبت شد",
            time: "۱ روز پیش",
            description: "خدمات بسته‌بندی محصولات",
            status: "در انتظار",
            statusColor: "orange"
        }
    ];

    return (
        <div className="space-y-8 p-6 bg-gray-50 min-h-screen">

            {/* هدر صفحه */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        نمای کلی پنل خدمات
                    </h1>
                    <p className="text-gray-600 text-lg">
                        مدیریت و نظارت بر تمام خدمات کشاورزی در یک نگاه
                    </p>
                </div>

                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border">
                    <TrendingUp className="text-orange-500" size={20} />
                    <span className="text-sm font-medium text-gray-700">
                        عملکرد این ماه: <span className="text-green-500">+8%</span>
                    </span>
                </div>
            </div>

            {/* کارت‌های آمار */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card
                        key={index}
                        className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        bodyStyle={{ padding: '24px' }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                                <stat.icon className={stat.color} size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-medium ${stat.trendUp ? 'text-green-500' : 'text-red-500'
                                }`}>
                                {stat.trendUp ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                                {stat.trend}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                            <p className="text-xs text-gray-400">{stat.description}</p>
                        </div>

                        {stat.title === "رضایت مشتری" && (
                            <div className="mt-4">
                                <Progress
                                    percent={92}
                                    strokeColor={{
                                        '0%': '#f97316',
                                        '100%': '#ea580c',
                                    }}
                                    showInfo={false}
                                    size="small"
                                />
                            </div>
                        )}
                    </Card>
                ))}
            </div>

            {/* بخش فعالیت‌های اخیر و آمار سریع */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* فعالیت‌های اخیر */}
                <Card
                    className="rounded-2xl shadow-lg border-0 lg:col-span-2"
                    bodyStyle={{ padding: '24px' }}
                    title={
                        <div className="flex items-center gap-2">
                            <Clock className="text-orange-500" size={20} />
                            <span className="text-lg font-bold text-gray-800">فعالیت‌های اخیر</span>
                        </div>
                    }
                    extra={
                        <button className="text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors">
                            مشاهده همه
                        </button>
                    }
                >
                    <div className="space-y-4">
                        {activities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-200"
                            >
                                <div className={`p-2 rounded-lg ${activity.type === 'success' ? 'bg-green-50 text-green-600' :
                                        activity.type === 'message' ? 'bg-blue-50 text-blue-600' :
                                            'bg-orange-50 text-orange-600'
                                    }`}>
                                    <activity.icon size={18} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-1">
                                        <h3 className="font-semibold text-gray-800 text-sm">
                                            {activity.title}
                                        </h3>
                                        <Tag color={activity.statusColor} className="text-xs">
                                            {activity.status}
                                        </Tag>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-2">
                                        {activity.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-400">
                                            {activity.time}
                                        </span>
                                        <button className="text-orange-500 hover:text-orange-600 text-xs font-medium transition-colors">
                                            جزئیات
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* آمار سریع */}
                <Card
                    className="rounded-2xl shadow-lg border-0"
                    bodyStyle={{ padding: '24px' }}
                    title={
                        <div className="flex items-center gap-2">
                            <TrendingUp className="text-orange-500" size={20} />
                            <span className="text-lg font-bold text-gray-800">آمار سریع</span>
                        </div>
                    }
                >
                    <div className="space-y-6">
                        <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                            <Users className="mx-auto text-orange-500 mb-2" size={24} />
                            <p className="text-gray-600 text-sm mb-1">مشتریان فعال</p>
                            <p className="text-2xl font-bold text-gray-800">۴۷</p>
                            <div className="flex items-center justify-center gap-1 mt-1">
                                <ArrowUp className="text-green-500" size={14} />
                                <span className="text-green-500 text-xs">۱۲% افزایش</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm">خدمات پرطرفدار</span>
                                <span className="text-gray-800 font-medium text-sm">سم‌پاشی</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm">میانگین پاسخ‌دهی</span>
                                <span className="text-gray-800 font-medium text-sm">۲.۴ ساعت</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm">تکمیل موفق</span>
                                <span className="text-gray-800 font-medium text-sm">۸۹%</span>
                            </div>
                        </div>

                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium transition-colors duration-200 shadow-md hover:shadow-lg">
                            گزارش کامل عملکرد
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
}