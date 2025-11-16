import { Card, Row, Col, Statistic, Tag, List, Timeline } from "antd";
import {
    ShoppingCartOutlined,
    EnvironmentOutlined,
    ExperimentOutlined,
    UserOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Sprout, Package, AlertCircle, Calendar } from "lucide-react";

export const Overview = () => {
    // داده‌های نمونه
    const stats = {
        totalProducts: 24,
        totalLands: 5,
        totalTests: 12,
        totalConsultations: 8,
        revenue: 45000000,
        revenueChange: 12.5,
        pendingOrders: 3,
        activeSeasons: 2,
    };

    // داده‌های نمودار فروش
    const salesData = [
        { month: "فروردین", amount: 8000000 },
        { month: "اردیبهشت", amount: 12000000 },
        { month: "خرداد", amount: 15000000 },
        { month: "تیر", amount: 18000000 },
        { month: "مرداد", amount: 22000000 },
        { month: "شهریور", amount: 25000000 },
    ];

    // داده‌های نمودار محصولات
    const productsData = [
        { name: "گندم", value: 40, color: "#22c55e" },
        { name: "برنج", value: 25, color: "#3b82f6" },
        { name: "ذرت", value: 20, color: "#f59e0b" },
        { name: "سایر", value: 15, color: "#8b5cf6" },
    ];

    // داده‌های وضعیت زمین‌ها
    const landsStatusData = [
        { status: "در حال کشت", count: 3 },
        { status: "آماده برداشت", count: 1 },
        { status: "آیش", count: 1 },
    ];

    // فعالیت‌های اخیر
    const recentActivities = [
        { id: 1, type: "success", title: "فروش محصول", description: "10 تن گندم فروخته شد", time: "2 ساعت پیش", icon: <ShoppingCartOutlined /> },
        { id: 2, type: "info", title: "آزمایش خاک", description: "نتایج آزمایش زمین شمالی آماده شد", time: "5 ساعت پیش", icon: <ExperimentOutlined /> },
        { id: 3, type: "warning", title: "یادآوری", description: "زمان آبیاری زمین جنوبی فرا رسیده", time: "دیروز", icon: <AlertCircle size={16} /> },
        { id: 4, type: "success", title: "مشاوره", description: "جلسه مشاوره با دکتر رضایی", time: "2 روز پیش", icon: <UserOutlined /> },
    ];

    // برنامه‌های آتی
    const upcomingTasks = [
        { id: 1, title: "برداشت گندم - زمین شمالی", date: "1403/08/25", priority: "high" },
        { id: 2, title: "آبیاری زمین جنوبی", date: "1403/08/20", priority: "medium" },
        { id: 3, title: "کودپاشی زمین شرقی", date: "1403/08/22", priority: "medium" },
        { id: 4, title: "آزمایش خاک زمین غربی", date: "1403/08/28", priority: "low" },
    ];

    const getPriorityColor = (priority: string) => {
        const colors = {
            high: "red",
            medium: "orange",
            low: "blue",
        };
        return colors[priority as keyof typeof colors];
    };

    const getActivityColor = (type: string) => {
        const colors = {
            success: "#22c55e",
            info: "#3b82f6",
            warning: "#f59e0b",
            error: "#ef4444",
        };
        return colors[type as keyof typeof colors];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {/* Header */}
            <div className="mb-6 animate-fadeIn">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    خوش آمدید، علی احمدی 👋
                </h1>
                <p className="text-gray-600">خلاصه‌ای از فعالیت‌های شما</p>
            </div>

            {/* کارت‌های آمار */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-green-500 animate-slideUp">
                        <Statistic
                            title="کل محصولات"
                            value={stats.totalProducts}
                            prefix={<Package className="text-green-600" size={20} />}
                            valueStyle={{ color: "#22c55e", fontSize: "28px" }}
                        />
                        <div className="mt-2 text-xs text-gray-500">
                            <ArrowUpOutlined className="text-green-600" /> 12% نسبت به ماه قبل
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-blue-500 animate-slideUp" style={{ animationDelay: "0.1s" }}>
                        <Statistic
                            title="زمین‌های فعال"
                            value={stats.totalLands}
                            prefix={<EnvironmentOutlined style={{ color: "#3b82f6" }} />}
                            valueStyle={{ color: "#3b82f6", fontSize: "28px" }}
                        />
                        <div className="mt-2 text-xs text-gray-500">
                            {stats.activeSeasons} فصل در حال کشت
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-purple-500 animate-slideUp" style={{ animationDelay: "0.2s" }}>
                        <Statistic
                            title="آزمایش‌های انجام شده"
                            value={stats.totalTests}
                            prefix={<ExperimentOutlined style={{ color: "#8b5cf6" }} />}
                            valueStyle={{ color: "#8b5cf6", fontSize: "28px" }}
                        />
                        <div className="mt-2 text-xs text-gray-500">
                            {stats.pendingOrders} در انتظار نتیجه
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-orange-500 animate-slideUp" style={{ animationDelay: "0.3s" }}>
                        <Statistic
                            title="مشاوره‌ها"
                            value={stats.totalConsultations}
                            prefix={<UserOutlined style={{ color: "#f59e0b" }} />}
                            valueStyle={{ color: "#f59e0b", fontSize: "28px" }}
                        />
                        <div className="mt-2 text-xs text-gray-500">
                            2 جلسه این هفته
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* کارت درآمد */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24}>
                    <Card className="shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">درآمد کل</h3>
                                <p className="text-3xl font-bold text-green-600 mt-2">
                                    {stats.revenue.toLocaleString()} تومان
                                </p>
                                <Tag color="green" className="mt-2">
                                    <ArrowUpOutlined /> {stats.revenueChange}% رشد
                                </Tag>
                            </div>
                            <div className="text-right">
                                <TrendingUp size={48} className="text-green-500 opacity-20" />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* نمودارها */}
            <Row gutter={[16, 16]} className="mb-6">
                {/* نمودار فروش */}
                <Col xs={24} lg={16}>
                    <Card className="shadow-lg" title={<span className="font-bold">📈 روند فروش (6 ماه اخیر)</span>}>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={salesData}>
                                <defs>
                                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="month" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                                    formatter={(value: any) => `${value.toLocaleString()} تومان`}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#22c55e"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorAmount)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>

                {/* نمودار دایره‌ای محصولات */}
                <Col xs={24} lg={8}>
                    <Card className="shadow-lg" title={<span className="font-bold">🌾 ترکیب محصولات</span>}>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={productsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={(entry) => `${entry.name}: ${entry.value}%`}
                                >
                                    {productsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>

            {/* وضعیت زمین‌ها و نمودار میله‌ای */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} lg={12}>
                    <Card className="shadow-lg" title={<span className="font-bold">🗺️ وضعیت زمین‌ها</span>}>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={landsStatusData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="status" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                                />
                                <Bar dataKey="count" fill="#22c55e" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>

                {/* فعالیت‌های اخیر */}
                <Col xs={24} lg={12}>
                    <Card className="shadow-lg" title={<span className="font-bold">📋 فعالیت‌های اخیر</span>}>
                        <List
                            itemLayout="horizontal"
                            dataSource={recentActivities}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                                style={{ background: `${getActivityColor(item.type)}20`, color: getActivityColor(item.type) }}
                                            >
                                                {item.icon}
                                            </div>
                                        }
                                        title={<span className="font-semibold">{item.title}</span>}
                                        description={
                                            <div>
                                                <p className="text-sm text-gray-600">{item.description}</p>
                                                <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>

            {/* برنامه‌های آتی */}
            <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <Card className="shadow-lg" title={<span className="font-bold">📅 برنامه‌های آتی</span>}>
                        <Timeline
                            items={upcomingTasks.map((task) => ({
                                color: getPriorityColor(task.priority),
                                children: (
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-gray-800">{task.title}</p>
                                            <p className="text-sm text-gray-500">{task.date}</p>
                                        </div>
                                        <Tag color={getPriorityColor(task.priority)}>
                                            {task.priority === "high" ? "فوری" : task.priority === "medium" ? "متوسط" : "کم"}
                                        </Tag>
                                    </div>
                                ),
                            }))}
                        />
                    </Card>
                </Col>
            </Row>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.6s ease-out;
                }
            `}</style>
        </div>
    );
};