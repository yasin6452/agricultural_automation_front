// src/pages/services/ServicesAnalytics.tsx
import { useState } from "react";
import {
    BarChart3,
    TrendingUp,
    Users,
    DollarSign,
    Clock,
    Star,
    MapPin,
    Calendar,
    Filter,
    Download,
    Eye,
    PieChart,
    Activity,
    Target
} from "lucide-react";
import { Card, Select, DatePicker, Button, Badge, Progress, Row, Col, Table, Tag } from "antd";
import type { MenuProps } from "antd";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    AreaChart,
    Area
} from 'recharts';

const { Option } = Select;
const { RangePicker } = DatePicker;

// انواع داده‌ها برای نمودارها
interface RevenueData {
    month: string;
    income: number;
    projects: number;
    growth: number;
}

interface ServicePerformance {
    name: string;
    requests: number;
    completed: number;
    revenue: number;
    satisfaction: number;
    color: string;
}

interface RegionalData {
    region: string;
    requests: number;
    revenue: number;
    growth: number;
}

interface TimeAnalysis {
    period: string;
    planning: number;
    execution: number;
    completion: number;
    revenue: number;
}

export default function ServicesAnalytics() {
    const [dateRange, setDateRange] = useState<any>(null);
    const [serviceFilter, setServiceFilter] = useState<string>('all');
    const [regionFilter, setRegionFilter] = useState<string>('all');
    const [activeTab, setActiveTab] = useState<string>('overview');

    // داده‌های درآمد ماهانه
    const revenueData: RevenueData[] = [
        { month: 'فروردین', income: 45000000, projects: 12, growth: 15 },
        { month: 'اردیبهشت', income: 52000000, projects: 15, growth: 18 },
        { month: 'خرداد', income: 48000000, projects: 14, growth: 8 },
        { month: 'تیر', income: 61000000, projects: 18, growth: 25 },
        { month: 'مرداد', income: 58000000, projects: 16, growth: 12 },
        { month: 'شهریور', income: 55000000, projects: 15, growth: 10 },
    ];

    // عملکرد خدمات
    const servicePerformance: ServicePerformance[] = [
        { name: 'سم‌پاشی', requests: 45, completed: 38, revenue: 185000000, satisfaction: 4.7, color: '#f97316' },
        { name: 'نصب آبیاری', requests: 28, completed: 22, revenue: 132000000, satisfaction: 4.8, color: '#3b82f6' },
        { name: 'هرس درختان', requests: 35, completed: 32, revenue: 96000000, satisfaction: 4.6, color: '#10b981' },
        { name: 'آنالیز خاک', requests: 18, completed: 15, revenue: 54000000, satisfaction: 4.9, color: '#8b5cf6' },
        { name: 'کوددهی', requests: 22, completed: 18, revenue: 72000000, satisfaction: 4.5, color: '#ef4444' },
    ];

    // داده‌های منطقه‌ای
    const regionalData: RegionalData[] = [
        { region: 'تهران', requests: 58, revenue: 285000000, growth: 22 },
        { region: 'البرز', requests: 42, revenue: 198000000, growth: 18 },
        { region: 'قم', requests: 28, revenue: 134000000, growth: 15 },
        { region: 'اصفهان', requests: 35, revenue: 168000000, growth: 20 },
        { region: 'شمال', requests: 24, revenue: 115000000, growth: 12 },
    ];

    // تحلیل زمانی
    const timeAnalysis: TimeAnalysis[] = [
        { period: 'صبح (8-12)', planning: 15, execution: 25, completion: 12, revenue: 68000000 },
        { period: 'ظهر (12-16)', planning: 8, execution: 18, completion: 10, revenue: 52000000 },
        { period: 'عصر (16-20)', planning: 12, execution: 22, completion: 15, revenue: 75000000 },
    ];

    // تبدیل داده‌ها برای نمودار دایره‌ای
    const pieData = servicePerformance.map(service => ({
        name: service.name,
        value: service.revenue,
        color: service.color
    }));

    // آمار کلی
    const overallStats = [
        {
            title: "کل درآمد",
            value: "۶۴۲ میلیون",
            change: "+۱۸.۵٪",
            trend: "up",
            icon: DollarSign,
            color: "bg-green-500",
            description: "رشد مثبت نسبت به ماه گذشته"
        },
        {
            title: "پروژه‌های تکمیل شده",
            value: "۱۲۵",
            change: "+۱۲٪",
            trend: "up",
            icon: Target,
            color: "bg-blue-500",
            description: "افزایش رضایت مشتریان"
        },
        {
            title: "میانگین رضایت",
            value: "۴.۷/۵",
            change: "+۰.۲",
            trend: "up",
            icon: Star,
            color: "bg-yellow-500",
            description: " بهبود کیفیت خدمات"
        },
        {
            title: "مدت زمان متوسط",
            value: "۳.۲ روز",
            change: "-۰.۵",
            trend: "down",
            icon: Clock,
            color: "bg-purple-500",
            description: "بهبود سرعت اجرا"
        }
    ];

    const cardClass = "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg";
    const textClass = "text-gray-600 dark:text-gray-300";
    const titleClass = "text-gray-800 dark:text-white";

    // محاسبات پیشرفته
    const totalRevenue = servicePerformance.reduce((sum, service) => sum + service.revenue, 0);
    const completionRate = (servicePerformance.reduce((sum, service) => sum + service.completed, 0) /
        servicePerformance.reduce((sum, service) => sum + service.requests, 0)) * 100;
    const avgSatisfaction = servicePerformance.reduce((sum, service) => sum + service.satisfaction, 0) / servicePerformance.length;

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                    <p className="font-bold text-gray-800 dark:text-white">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{ color: entry.color }} className="text-sm">
                            {entry.name}: {entry.value.toLocaleString()}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    // تابع custom label برای نمودار دایره‌ای
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
        if (!percent) return null;

        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize={12}
                fontWeight="bold"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 font-[IRANSans] transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* هدر */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                                    <BarChart3 className="text-white" size={24} />
                                </div>
                                تحلیل و آمار خدمات
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                تجزیه و تحلیل عملکرد کسب‌وکار و شناسایی فرصت‌های رشد
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <RangePicker
                                onChange={setDateRange}
                                placeholder={['تاریخ شروع', 'تاریخ پایان']}
                                size="large"
                            />
                            <Button
                                icon={<Download size={16} />}
                                size="large"
                            >
                                خروجی گزارش
                            </Button>
                        </div>
                    </div>

                    {/* آمار کلی */}
                    <Row gutter={[16, 16]} className="mb-6">
                        {overallStats.map((stat, idx) => (
                            <Col xs={24} sm={12} lg={6} key={idx}>
                                <Card className={`rounded-2xl border-0 shadow-lg ${cardClass}`} bodyStyle={{ padding: '20px' }}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className={`text-sm ${textClass}`}>{stat.title}</div>
                                            <div className={`text-2xl font-bold ${titleClass} mt-1`}>{stat.value}</div>
                                            <div className={`flex items-center gap-1 text-sm mt-2 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                                                }`}>
                                                <TrendingUp size={14} className={stat.trend === 'down' ? 'rotate-180' : ''} />
                                                {stat.change}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {stat.description}
                                            </div>
                                        </div>
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} bg-opacity-10`}>
                                            <stat.icon className={stat.color.replace('bg-', 'text-')} size={24} />
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>

                {/* فیلترها */}
                <div className={`p-6 mb-6 ${cardClass}`}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Select
                            value={serviceFilter}
                            onChange={setServiceFilter}
                            className="w-full"
                            size="large"
                            suffixIcon={<Filter size={16} />}
                            placeholder="فیلتر خدمات"
                        >
                            <Option value="all">همه خدمات</Option>
                            <Option value="سم‌پاشی">سم‌پاشی</Option>
                            <Option value="آبیاری">آبیاری</Option>
                            <Option value="هرس">هرس</Option>
                            <Option value="آنالیز خاک">آنالیز خاک</Option>
                        </Select>
                        <Select
                            value={regionFilter}
                            onChange={setRegionFilter}
                            className="w-full"
                            size="large"
                            suffixIcon={<Filter size={16} />}
                            placeholder="فیلتر منطقه"
                        >
                            <Option value="all">همه مناطق</Option>
                            <Option value="تهران">تهران</Option>
                            <Option value="البرز">البرز</Option>
                            <Option value="قم">قم</Option>
                            <Option value="اصفهان">اصفهان</Option>
                        </Select>
                        <Select
                            value={activeTab}
                            onChange={setActiveTab}
                            className="w-full"
                            size="large"
                            placeholder="نوع تحلیل"
                        >
                            <Option value="overview">نمای کلی</Option>
                            <Option value="financial">مالی</Option>
                            <Option value="operational">عملیاتی</Option>
                            <Option value="regional">منطقه‌ای</Option>
                        </Select>
                        <Button
                            type="primary"
                            className="bg-orange-500 hover:bg-orange-600 border-orange-500 h-12"
                            size="large"
                            icon={<Eye size={16} />}
                        >
                            مشاهده جزئیات
                        </Button>
                    </div>
                </div>

                {/* نمودارها و تحلیل‌ها */}
                <div className="space-y-6">
                    {/* ردیف اول: درآمد و عملکرد خدمات */}
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={12}>
                            <Card
                                title={
                                    <div className="flex items-center gap-2">
                                        <TrendingUp size={18} className="text-green-500" />
                                        <span className={titleClass}>درآمد ماهانه</span>
                                    </div>
                                }
                                className={`rounded-2xl border-0 shadow-lg ${cardClass}`}
                            >
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={revenueData}>
                                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend />
                                        <Bar dataKey="income" name="درآمد (تومان)" fill="#f97316" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="projects" name="تعداد پروژه" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card
                                title={
                                    <div className="flex items-center gap-2">
                                        <PieChart size={18} className="text-blue-500" />
                                        <span className={titleClass}>توزیع درآمد بر اساس خدمات</span>
                                    </div>
                                }
                                className={`rounded-2xl border-0 shadow-lg ${cardClass}`}
                            >
                                <ResponsiveContainer width="100%" height={300}>
                                    <RechartsPieChart>
                                        <Pie
                                            data={pieData as any}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => [value.toLocaleString() + ' تومان', 'درآمد']} />
                                        <Legend />
                                    </RechartsPieChart>
                                </ResponsiveContainer>
                            </Card>
                        </Col>
                    </Row>

                    {/* ردیف دوم: عملکرد خدمات و تحلیل منطقه‌ای */}
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={12}>
                            <Card
                                title={
                                    <div className="flex items-center gap-2">
                                        <Activity size={18} className="text-purple-500" />
                                        <span className={titleClass}>عملکرد خدمات</span>
                                    </div>
                                }
                                className={`rounded-2xl border-0 shadow-lg ${cardClass}`}
                            >
                                <div className="space-y-4">
                                    {servicePerformance.map((service, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: service.color }}
                                                ></div>
                                                <span className="font-medium text-gray-800 dark:text-white">
                                                    {service.name}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm">
                                                <div className="text-center">
                                                    <div className="text-gray-500">درخواست</div>
                                                    <div className="font-bold">{service.requests}</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-gray-500">تکمیل شده</div>
                                                    <div className="font-bold text-green-500">{service.completed}</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-gray-500">رضایت</div>
                                                    <div className="font-bold text-yellow-500">{service.satisfaction}</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-gray-500">درآمد</div>
                                                    <div className="font-bold text-blue-500">
                                                        {(service.revenue / 1000000).toFixed(0)}M
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card
                                title={
                                    <div className="flex items-center gap-2">
                                        <MapPin size={18} className="text-red-500" />
                                        <span className={titleClass}>تحلیل منطقه‌ای</span>
                                    </div>
                                }
                                className={`rounded-2xl border-0 shadow-lg ${cardClass}`}
                            >
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={regionalData}>
                                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                        <XAxis dataKey="region" />
                                        <YAxis />
                                        <Tooltip formatter={(value: number) => [value.toLocaleString(), '']} />
                                        <Area
                                            type="monotone"
                                            dataKey="revenue"
                                            name="درآمد (تومان)"
                                            stroke="#ef4444"
                                            fill="#ef4444"
                                            fillOpacity={0.3}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="requests"
                                            name="درخواست‌ها"
                                            stroke="#3b82f6"
                                            fill="#3b82f6"
                                            fillOpacity={0.3}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </Card>
                        </Col>
                    </Row>

                    {/* ردیف سوم: تحلیل زمانی و KPI ها */}
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={12}>
                            <Card
                                title={
                                    <div className="flex items-center gap-2">
                                        <Clock size={18} className="text-indigo-500" />
                                        <span className={titleClass}>تحلیل زمانی فعالیت‌ها</span>
                                    </div>
                                }
                                className={`rounded-2xl border-0 shadow-lg ${cardClass}`}
                            >
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={timeAnalysis}>
                                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                        <XAxis dataKey="period" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="planning"
                                            name="برنامه‌ریزی"
                                            stroke="#f59e0b"
                                            strokeWidth={2}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="execution"
                                            name="اجرا"
                                            stroke="#10b981"
                                            strokeWidth={2}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="completion"
                                            name="تکمیل"
                                            stroke="#3b82f6"
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card
                                title={
                                    <div className="flex items-center gap-2">
                                        <Target size={18} className="text-green-500" />
                                        <span className={titleClass}>شاخص‌های کلیدی عملکرد</span>
                                    </div>
                                }
                                className={`rounded-2xl border-0 shadow-lg ${cardClass}`}
                            >
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className={textClass}>نرخ تکمیل پروژه‌ها</span>
                                            <span className="font-bold text-green-500">{completionRate.toFixed(1)}%</span>
                                        </div>
                                        <Progress
                                            percent={completionRate}
                                            strokeColor="#10b981"
                                            showInfo={false}
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className={textClass}>میانگین رضایت مشتریان</span>
                                            <span className="font-bold text-yellow-500">{avgSatisfaction.toFixed(1)}/5</span>
                                        </div>
                                        <Progress
                                            percent={avgSatisfaction * 20}
                                            strokeColor="#f59e0b"
                                            showInfo={false}
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className={textClass}>رشد درآمد季度ی</span>
                                            <span className="font-bold text-blue-500">+۱۸.۵%</span>
                                        </div>
                                        <Progress
                                            percent={18.5}
                                            strokeColor="#3b82f6"
                                            showInfo={false}
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className={textClass}>بازگشت مشتریان</span>
                                            <span className="font-bold text-purple-500">۴۲%</span>
                                        </div>
                                        <Progress
                                            percent={42}
                                            strokeColor="#8b5cf6"
                                            showInfo={false}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    {/* خلاصه و توصیه‌ها */}
                    <Card
                        title={
                            <div className="flex items-center gap-2">
                                <Star size={18} className="text-orange-500" />
                                <span className={titleClass}>توصیه‌های استراتژیک</span>
                            </div>
                        }
                        className={`rounded-2xl border-0 shadow-lg ${cardClass}`}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp size={16} className="text-orange-500" />
                                    <span className="font-bold text-orange-700 dark:text-orange-300">توسعه خدمات</span>
                                </div>
                                <p className="text-sm text-orange-600 dark:text-orange-400">
                                    خدمات سم‌پاشی و آبیاری بیشترین درآمد را دارند. سرمایه‌گذاری بیشتر در این حوزه توصیه می‌شود.
                                </p>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin size={16} className="text-blue-500" />
                                    <span className="font-bold text-blue-700 dark:text-blue-300">توسعه منطقه‌ای</span>
                                </div>
                                <p className="text-sm text-blue-600 dark:text-blue-400">
                                    مناطق تهران و البرز پتانسیل رشد بالایی دارند. تمرکز بازاریابی در این مناطق افزایش یابد.
                                </p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock size={16} className="text-green-500" />
                                    <span className="font-bold text-green-700 dark:text-green-300">بهینه‌سازی زمان</span>
                                </div>
                                <p className="text-sm text-green-600 dark:text-green-400">
                                    ساعات عصر بیشترین بازدهی را دارد. برنامه‌ریزی پروژه‌ها در این بازه زمانی افزایش یابد.
                                </p>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <Users size={16} className="text-purple-500" />
                                    <span className="font-bold text-purple-700 dark:text-purple-300">رضایت مشتری</span>
                                </div>
                                <p className="text-sm text-purple-600 dark:text-purple-400">
                                    رضایت مشتریان در سطح بالایی قرار دارد. از این مزیت برای جذب مشتریان جدید استفاده شود.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}