import React, { useEffect, useState } from "react";
import { Star, TrendingUp, TrendingDown, DollarSign, ShoppingCart,  Users, BarChart3, Target, PieChart, Download, Sparkles, Award, Crown, Lightbulb, Clock } from "lucide-react";
import { Card, Badge, Progress, Select, DatePicker, Avatar, Rate, Row, Col } from "antd";
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
} from 'chart.js';

// ثبت کامپوننت‌های Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    ChartTooltip,
    Legend
);

const { RangePicker } = DatePicker;
const { Option } = Select;

interface AnalyticsData {
    cost: number;
    revenue: number;
    profit: number;
    month: string;
    orders: number;
    customers: number;
    products: number;
    growth: number;
}

interface ProductPerformance {
    name: string;
    sales: number;
    revenue: number;
    growth: number;
    image: string;
}

interface SupplierAnalytics {
    name: string;
    rating: number;
    orders: number;
    totalSpent: number;
    deliveryScore: number;
}

const Analytics: React.FC = () => {
    const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
    const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
    const [ setSelectedPeriod] = useState<any>(null);
    const [topProducts, setTopProducts] = useState<ProductPerformance[]>([]);
    const [supplierAnalytics, setSupplierAnalytics] = useState<SupplierAnalytics[]>([]);

    // داده‌های نمونه پیشرفته
    const sampleData: AnalyticsData[] = [
        { month: "فروردین", cost: 5000000, revenue: 8000000, profit: 3000000, orders: 45, customers: 32, products: 12, growth: 15 },
        { month: "اردیبهشت", cost: 6000000, revenue: 9000000, profit: 3000000, orders: 52, customers: 38, products: 15, growth: 12 },
        { month: "خرداد", cost: 5500000, revenue: 9500000, profit: 4000000, orders: 48, customers: 35, products: 14, growth: 18 },
        { month: "تیر", cost: 7000000, revenue: 12000000, profit: 5000000, orders: 65, customers: 45, products: 18, growth: 25 },
        { month: "مرداد", cost: 7500000, revenue: 13000000, profit: 5500000, orders: 72, customers: 50, products: 20, growth: 22 },
        { month: "شهریور", cost: 8000000, revenue: 14000000, profit: 6000000, orders: 78, customers: 55, products: 22, growth: 20 },
    ];

    const sampleProducts: ProductPerformance[] = [
        { name: "سیب قرمز", sales: 450, revenue: 5400000, growth: 25, image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=100&h=100&fit=crop" },
        { name: "برنج محلی", sales: 320, revenue: 8000000, growth: 18, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop" },
        { name: "گوجه فرنگی", sales: 580, revenue: 2900000, growth: 32, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100&h=100&fit=crop" },
        { name: "هویج تازه", sales: 390, revenue: 1950000, growth: 15, image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=100&h=100&fit=crop" },
        { name: "پرتقال شمال", sales: 420, revenue: 4620000, growth: 28, image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=100&h=100&fit=crop" },
    ];

    const sampleSuppliers: SupplierAnalytics[] = [
        { name: "مزرعه سبز", rating: 4.8, orders: 45, totalSpent: 5400000, deliveryScore: 95 },
        { name: "کشاورز نمونه", rating: 4.6, orders: 38, totalSpent: 4560000, deliveryScore: 88 },
        { name: "باغ مرکبات", rating: 4.9, orders: 52, totalSpent: 6240000, deliveryScore: 92 },
        { name: "شالیزار شمال", rating: 4.7, orders: 41, totalSpent: 4920000, deliveryScore: 90 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // شبیه‌سازی دریافت داده از API
                setTimeout(() => {
                    setAnalytics(sampleData);
                    setTopProducts(sampleProducts);
                    setSupplierAnalytics(sampleSuppliers);
                }, 1000);
            } catch (err) {
                console.error("Error fetching analytics data:", err);
            }
        };

        fetchData();
    }, []);

    // داده‌های نمودارها
    const lineChartData = {
        labels: analytics.map(item => item.month),
        datasets: [
            {
                label: 'هزینه (میلیون تومان)',
                data: analytics.map(item => item.cost / 1000000),
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'درآمد (میلیون تومان)',
                data: analytics.map(item => item.revenue / 1000000),
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'سود (میلیون تومان)',
                data: analytics.map(item => item.profit / 1000000),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const barChartData = {
        labels: analytics.map(item => item.month),
        datasets: [
            {
                label: 'تعداد سفارشات',
                data: analytics.map(item => item.orders),
                backgroundColor: 'rgba(139, 92, 246, 0.8)',
                borderRadius: 8,
            },
            {
                label: 'تعداد مشتریان',
                data: analytics.map(item => item.customers),
                backgroundColor: 'rgba(14, 165, 233, 0.8)',
                borderRadius: 8,
            },
        ],
    };

    const pieChartData = {
        labels: topProducts.map(product => product.name),
        datasets: [
            {
                data: topProducts.map(product => product.revenue),
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(249, 115, 22, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                ],
                borderWidth: 2,
                borderColor: '#fff',
            },
        ],
    };

    const totalRevenue = analytics.reduce((sum, item) => sum + item.revenue, 0);
    const totalCost = analytics.reduce((sum, item) => sum + item.cost, 0);
    const totalProfit = analytics.reduce((sum, item) => sum + item.profit, 0);
    const totalOrders = analytics.reduce((sum, item) => sum + item.orders, 0);
    const avgGrowth = analytics.length > 0 ? analytics.reduce((sum, item) => sum + item.growth, 0) / analytics.length : 0;

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                rtl: true,
                labels: {
                    font: {
                        family: 'IRANSans',
                    },
                    usePointStyle: true,
                },
            },
            title: {
                display: true,
                text: 'تحلیل مالی دوره‌ای',
                font: {
                    family: 'IRANSans',
                    size: 16,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        family: 'IRANSans',
                    },
                },
            },
            y: {
                ticks: {
                    font: {
                        family: 'IRANSans',
                    },
                },
            },
        },
    };

    const handleDateChange = (dates: any, dateStrings: [string, string]) => {
        setSelectedPeriod(dates);
    };

    const handleExport = () => {
        // شبیه‌سازی خروجی گرفتن از داده‌ها
        console.log("Exporting data...", { analytics, topProducts, supplierAnalytics });
        // در اینجا می‌توانید منطق واقعی برای خروجی گرفتن پیاده‌سازی کنید
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6 font-[IRANSans]">
            {/* هدر */}
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <BarChart3 className="text-white" size={20} />
                            </div>
                            داشبورد هوشمند تحلیل‌ها
                        </h1>
                        <p className="text-gray-600 mt-2 text-sm lg:text-base">تحلیل جامع عملکرد مالی و فروش با هوش مصنوعی</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
                        <Select
                            value={timeRange}
                            onChange={setTimeRange}
                            className="w-full sm:w-32"
                            size="middle"
                        >
                            <Option value="week">هفتگی</Option>
                            <Option value="month">ماهانه</Option>
                            <Option value="quarter">فصلی</Option>
                            <Option value="year">سالانه</Option>
                        </Select>
                        <RangePicker
                            onChange={handleDateChange}
                            className="w-full sm:w-auto"
                        />
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-green-300 rounded-xl hover:shadow-lg transition-all w-full sm:w-auto justify-center"
                        >
                            <Download size={18} />
                            خروجی
                        </button>
                    </div>
                </div>

                {/* کارت‌های آماری */}
                <Row gutter={[16, 16]} className="mb-6">
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="shadow-lg border-0 h-full">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">کل درآمد</div>
                                    <div className="text-xl font-bold text-green-600">{(totalRevenue / 1000000).toFixed(1)}M</div>
                                    <div className="text-xs text-green-500 flex items-center gap-1 mt-1">
                                        <TrendingUp size={12} />
                                        {avgGrowth.toFixed(1)}% رشد
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <DollarSign className="text-green-600" size={24} />
                                </div>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={6}>
                        <Card className="shadow-lg border-0 h-full">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">کل سود</div>
                                    <div className="text-xl font-bold text-blue-600">{(totalProfit / 1000000).toFixed(1)}M</div>
                                    <div className="text-xs text-blue-500 flex items-center gap-1 mt-1">
                                        <TrendingUp size={12} />
                                        {(totalProfit / totalRevenue * 100).toFixed(1)}% حاشیه
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <Target className="text-blue-600" size={24} />
                                </div>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={6}>
                        <Card className="shadow-lg border-0 h-full">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">سفارشات</div>
                                    <div className="text-xl font-bold text-purple-600">{totalOrders}</div>
                                    <div className="text-xs text-purple-500 flex items-center gap-1 mt-1">
                                        <Users size={12} />
                                        {analytics[analytics.length - 1]?.customers || 0} مشتری فعال
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <ShoppingCart className="text-purple-600" size={24} />
                                </div>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} lg={6}>
                        <Card className="shadow-lg border-0 h-full">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">کارایی</div>
                                    <div className="text-xl font-bold text-orange-600">
                                        {(totalProfit / totalCost * 100).toFixed(1)}%
                                    </div>
                                    <Progress
                                        percent={Math.round(totalProfit / totalCost * 100)}
                                        size="small"
                                        strokeColor="#f59e0b"
                                        showInfo={false}
                                    />
                                </div>
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                    <Award className="text-orange-600" size={24} />
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* نمودارها */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <div className="flex items-center gap-2">
                                <TrendingUp className="text-green-500" size={20} />
                                <span>روند مالی</span>
                            </div>
                        }
                        extra={<Badge count="زنده" style={{ backgroundColor: '#52c41a' }} />}
                        className="shadow-lg border-0 h-full"
                    >
                        <div className="h-64">
                            <Line data={lineChartData} options={chartOptions} />
                        </div>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <div className="flex items-center gap-2">
                                <Users className="text-blue-500" size={20} />
                                <span>آمار سفارشات و مشتریان</span>
                            </div>
                        }
                        className="shadow-lg border-0 h-full"
                    >
                        <div className="h-64">
                            <Bar data={barChartData} options={chartOptions} />
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* ردیف دوم */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} lg={8}>
                    <Card
                        title={
                            <div className="flex items-center gap-2">
                                <PieChart className="text-purple-500" size={20} />
                                <span>توزیع درآمد محصولات</span>
                            </div>
                        }
                        className="shadow-lg border-0 h-full"
                    >
                        <div className="h-64">
                            <Pie data={pieChartData} options={chartOptions} />
                        </div>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card
                        title={
                            <div className="flex items-center gap-2">
                                <Crown className="text-yellow-500" size={20} />
                                <span>محصولات برتر</span>
                            </div>
                        }
                        className="shadow-lg border-0 h-full"
                    >
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {topProducts.map((product, index) => (
                                <div key={product.name} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-green-50 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-10 h-10 rounded-lg object-cover"
                                            />
                                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 text-white rounded-full text-xs flex items-center justify-center">
                                                {index + 1}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-800 text-sm">{product.name}</div>
                                            <div className="text-xs text-gray-500">{product.sales} فروش</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-green-600 text-sm">{(product.revenue / 1000000).toFixed(1)}M</div>
                                        <div className={`text-xs flex items-center gap-1 ${product.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {product.growth > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                            {product.growth}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card
                        title={
                            <div className="flex items-center gap-2">
                                <Sparkles className="text-blue-500" size={20} />
                                <span>تأمین‌کنندگان برتر</span>
                            </div>
                        }
                        className="shadow-lg border-0 h-full"
                    >
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {supplierAnalytics.map((supplier, index) => (
                                <div key={supplier.name} className="p-3 border border-gray-100 rounded-xl hover:bg-blue-50 transition-all">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Avatar
                                                size="small"
                                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold"
                                            >
                                                {supplier.name.charAt(0)}
                                            </Avatar>
                                            <div>
                                                <div className="font-semibold text-gray-800 text-sm">{supplier.name}</div>
                                                <Rate
                                                    disabled
                                                    defaultValue={supplier.rating}
                                                    className="text-yellow-500 text-xs"
                                                    character={<Star size={10} />}
                                                />
                                            </div>
                                        </div>
                                        <Badge count={index + 1} style={{ backgroundColor: '#faad14' }} />
                                    </div>
                                    <Row gutter={8} className="text-center">
                                        <Col span={8}>
                                            <div className="text-xs text-gray-500">سفارشات</div>
                                            <div className="font-bold text-purple-600 text-sm">{supplier.orders}</div>
                                        </Col>
                                        <Col span={8}>
                                            <div className="text-xs text-gray-500">هزینه</div>
                                            <div className="font-bold text-green-600 text-sm">{(supplier.totalSpent / 1000000).toFixed(1)}M</div>
                                        </Col>
                                        <Col span={8}>
                                            <div className="text-xs text-gray-500">تحویل</div>
                                            <Progress
                                                percent={supplier.deliveryScore}
                                                size="small"
                                                strokeColor={
                                                    supplier.deliveryScore > 90 ? '#52c41a' :
                                                        supplier.deliveryScore > 80 ? '#1890ff' : '#faad14'
                                                }
                                                format={percent => `${percent}%`}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* پیشنهادات هوشمند */}
            <Card
                title={
                    <div className="flex items-center gap-2">
                        <Lightbulb className="text-yellow-500" size={20} />
                        <span>پیشنهادات هوشمند</span>
                    </div>
                }
                className="shadow-lg border-0"
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl border border-green-200 h-full">
                            <div className="flex items-center gap-3 mb-2">
                                <Target className="text-green-600" size={20} />
                                <span className="font-semibold text-green-800">بهینه‌سازی هزینه</span>
                            </div>
                            <p className="text-sm text-green-700">
                                کاهش ۱۵٪ هزینه‌های خرید از تأمین‌کنندگان با امتیاز پایین
                            </p>
                        </div>
                    </Col>
                    <Col xs={24} md={8}>
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-100 rounded-xl border border-blue-200 h-full">
                            <div className="flex items-center gap-3 mb-2">
                                <TrendingUp className="text-blue-600" size={20} />
                                <span className="font-semibold text-blue-800">افزایش فروش</span>
                            </div>
                            <p className="text-sm text-blue-700">
                                تمرکز بر محصولات پرفروش برای افزایش ۲۵٪ درآمد
                            </p>
                        </div>
                    </Col>
                    <Col xs={24} md={8}>
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-100 rounded-xl border border-purple-200 h-full">
                            <div className="flex items-center gap-3 mb-2">
                                <Clock className="text-purple-600" size={20} />
                                <span className="font-semibold text-purple-800">مدیریت زمان</span>
                            </div>
                            <p className="text-sm text-purple-700">
                                بهبود زنجیره تأمین برای کاهش ۳۰٪ زمان تحویل
                            </p>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default Analytics;