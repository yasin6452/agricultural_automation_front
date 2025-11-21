import { useState, useEffect } from "react";
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    ShoppingCart,
    Package,
    Users,
    BarChart3,
    Target,
    Calendar,
    Star,
    MapPin,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle
} from "lucide-react";
import { Card, Statistic, Progress, Tag, Table, Badge, Row, Col, List, Avatar } from "antd";

interface Order {
    id: string;
    product: string;
    supplier: string;
    amount: number;
    status: 'pending' | 'completed' | 'cancelled';
    date: string;
}

interface Product {
    name: string;
    sales: number;
    growth: number;
    image: string;
}

interface StatCard {
    title: string;
    value: string | number;
    change: number;
    icon: React.ReactNode;
    color: string;
}

export default function Overview() {
    const [isDark, setIsDark] = useState(false);

    // داده‌های نمونه
    const orders: Order[] = [
        { id: 'ORD-001', product: 'سیب قرمز', supplier: 'مزرعه سبز', amount: 2500000, status: 'completed', date: '1402/09/15' },
        { id: 'ORD-002', product: 'برنج محلی', supplier: 'شالیزار شمال', amount: 4800000, status: 'pending', date: '1402/09/16' },
        { id: 'ORD-003', product: 'گوجه فرنگی', supplier: 'کشاورز نمونه', amount: 1200000, status: 'completed', date: '1402/09/14' },
        { id: 'ORD-004', product: 'هویج تازه', supplier: 'باغ مرکبات', amount: 850000, status: 'cancelled', date: '1402/09/13' },
        { id: 'ORD-005', product: 'پرتقال شمال', supplier: 'مزرعه سبز', amount: 3200000, status: 'pending', date: '1402/09/17' },
    ];

    const topProducts: Product[] = [
        { name: 'سیب قرمز', sales: 45, growth: 12, image: '🍎' },
        { name: 'برنج محلی', sales: 38, growth: 8, image: '🍚' },
        { name: 'گوجه فرنگی', sales: 52, growth: 25, image: '🍅' },
        { name: 'هویج تازه', sales: 29, growth: -5, image: '🥕' },
        { name: 'پرتقال شمال', sales: 41, growth: 18, image: '🍊' },
    ];

    const stats: StatCard[] = [
        {
            title: 'کل خریدها',
            value: '۱۲,۴۵۰,۰۰۰',
            change: 15,
            icon: <ShoppingCart className="text-blue-500" size={24} />,
            color: 'blue'
        },
        {
            title: 'سفارشات فعال',
            value: 8,
            change: 5,
            icon: <Package className="text-green-500" size={24} />,
            color: 'green'
        },
        {
            title: 'تأمین‌کنندگان',
            value: 12,
            change: 2,
            icon: <Users className="text-purple-500" size={24} />,
            color: 'purple'
        },
        {
            title: 'میانگین امتیاز',
            value: '۴.۸',
            change: 0.2,
            icon: <Star className="text-yellow-500" size={24} />,
            color: 'yellow'
        },
    ];

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'completed': return 'success';
            case 'pending': return 'processing';
            case 'cancelled': return 'error';
            default: return 'default';
        }
    };

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'completed': return <CheckCircle className="text-green-500" size={16} />;
            case 'pending': return <Clock className="text-orange-500" size={16} />;
            case 'cancelled': return <XCircle className="text-red-500" size={16} />;
            default: return <AlertCircle size={16} />;
        }
    };

    const columns = [
        {
            title: 'شماره سفارش',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'محصول',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'تأمین‌کننده',
            dataIndex: 'supplier',
            key: 'supplier',
        },
        {
            title: 'مبلغ (تومان)',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => amount.toLocaleString('fa-IR'),
        },
        {
            title: 'وضعیت',
            dataIndex: 'status',
            key: 'status',
            render: (status: Order['status']) => (
                <Badge
                    status={getStatusColor(status)}
                    text={
                        <span className="flex items-center gap-1">
                            {getStatusIcon(status)}
                            {status === 'completed' && 'تکمیل شده'}
                            {status === 'pending' && 'در انتظار'}
                            {status === 'cancelled' && 'لغو شده'}
                        </span>
                    }
                />
            ),
        },
        {
            title: 'تاریخ',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    const totalSpent = orders.reduce((sum, order) => sum + order.amount, 0);
    const completedOrders = orders.filter(order => order.status === 'completed').length;
    const successRate = (completedOrders / orders.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 font-[IRANSans]">
            {/* هدر */}
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <BarChart3 className="text-white" size={20} />
                            </div>
                            نمای کلی خریدار
                        </h1>
                        <p className="text-gray-600 mt-2">خلاصه فعالیت‌ها و آمار خریدهای شما</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
                            <div className="text-xs text-gray-500">موجودی</div>
                            <div className="text-lg font-bold text-green-600">۵,۲۴۰,۰۰۰ تومان</div>
                        </div>
                    </div>
                </div>

                {/* کارت‌های آماری */}
                <Row gutter={[16, 16]}>
                    {stats.map((stat, index) => (
                        <Col key={index} xs={24} sm={12} lg={6}>
                            <Card className="shadow-lg border-0 h-full hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-500 mb-2">{stat.title}</div>
                                        <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                                        <div className={`text-xs flex items-center gap-1 ${stat.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {stat.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                            {Math.abs(stat.change)}%
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                        {stat.icon}
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* محتوای اصلی */}
            <Row gutter={[24, 24]}>
                {/* سفارشات اخیر */}
                <Col xs={24} lg={16}>
                    <Card
                        title={
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="text-blue-500" size={20} />
                                <span>سفارشات اخیر</span>
                            </div>
                        }
                        className="shadow-lg border-0"
                        extra={
                            <Tag color="blue" className="text-sm">
                                {orders.length} سفارش
                            </Tag>
                        }
                    >
                        <Table
                            dataSource={orders}
                            columns={columns}
                            pagination={false}
                            size="middle"
                            className="overflow-x-auto"
                        />
                    </Card>
                </Col>

                {/* سایدبار */}
                <Col xs={24} lg={8}>
                    <div className="space-y-6">
                        {/* محصولات پرفروش */}
                        <Card
                            title={
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="text-green-500" size={20} />
                                    <span>محصولات پرفروش</span>
                                </div>
                            }
                            className="shadow-lg border-0"
                        >
                            <List
                                dataSource={topProducts}
                                renderItem={(product, index) => (
                                    <List.Item className="border-0 px-0 py-3">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">{product.image}</div>
                                                <div>
                                                    <div className="font-semibold text-gray-800">{product.name}</div>
                                                    <div className="text-sm text-gray-500">{product.sales} فروش</div>
                                                </div>
                                            </div>
                                            <div className={`text-sm font-bold ${product.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                {product.growth >= 0 ? '+' : ''}{product.growth}%
                                            </div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Card>

                        {/* آمار کلی */}
                        <Card
                            title={
                                <div className="flex items-center gap-2">
                                    <Target className="text-purple-500" size={20} />
                                    <span>آمار عملکرد</span>
                                </div>
                            }
                            className="shadow-lg border-0"
                        >
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>کل هزینه‌ها</span>
                                        <span className="font-bold">{(totalSpent / 1000000).toFixed(1)} میلیون تومان</span>
                                    </div>
                                    <Progress percent={75} strokeColor="#10b981" />
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>نرخ موفقیت سفارشات</span>
                                        <span className="font-bold">{successRate.toFixed(0)}%</span>
                                    </div>
                                    <Progress percent={successRate} strokeColor="#3b82f6" />
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>رضایت از تأمین‌کنندگان</span>
                                        <span className="font-bold">۹۴%</span>
                                    </div>
                                    <Progress percent={94} strokeColor="#f59e0b" />
                                </div>
                            </div>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    );
}