import { useState } from "react";
import { ShoppingCart, Heart, Bell, BarChart3, TrendingUp, Package, Users, Target, Clock, MapPin, Star, Eye, MessageCircle } from "lucide-react";
import { Badge, Progress, Card, Avatar } from "antd";

interface Order {
    id: number;
    product: string;
    seller: string;
    status: 'pending' | 'shipped' | 'delivered';
    amount: number;
    date: string;
    progress: number;
}

interface Activity {
    id: number;
    type: 'order' | 'save' | 'view' | 'message';
    title: string;
    description: string;
    time: string;
    icon: any;
    color: string;
}

export default function BuyerOverview() {
    const [stats] = useState({
        activeOrders: 3,
        savedAds: 12,
        alerts: 4,
        aiReports: 2,
        totalSpent: 12500000,
        completedOrders: 45,
        successRate: 96,
        favoriteSuppliers: 8
    });

    const [recentOrders] = useState<Order[]>([
        {
            id: 1,
            product: "سیب قرمز ممتاز",
            seller: "مزرعه سبز",
            status: 'shipped',
            amount: 2400000,
            date: "1402/10/15",
            progress: 75
        },
        {
            id: 2,
            product: "برنج طارم هاشمی",
            seller: "شالیزار شمال",
            status: 'pending',
            amount: 4500000,
            date: "1402/10/14",
            progress: 25
        },
        {
            id: 3,
            product: "گوجه فرنگی گلخانه‌ای",
            seller: "کشاورز نمونه",
            status: 'delivered',
            amount: 1200000,
            date: "1402/10/13",
            progress: 100
        }
    ]);

    const [activities] = useState<Activity[]>([
        {
            id: 1,
            type: 'order',
            title: "سفارش جدید",
            description: "خرید ۲۰ کیلو سیب از «مزرعه سبز»",
            time: "2 ساعت پیش",
            icon: ShoppingCart,
            color: "text-green-500"
        },
        {
            id: 2,
            type: 'save',
            title: "ذخیره آگهی",
            description: "ذخیره آگهی «گوجه فرنگی ارگانیک»",
            time: "4 ساعت پیش",
            icon: Heart,
            color: "text-red-500"
        },
        {
            id: 3,
            type: 'view',
            title: "تحلیل هوشمند",
            description: "مشاهده گزارش AI: «تحلیل قیمت سیب»",
            time: "1 روز پیش",
            icon: BarChart3,
            color: "text-blue-500"
        },
        {
            id: 4,
            type: 'message',
            title: "پیام جدید",
            description: "ارسال پیام به فروشنده «باغ البرز»",
            time: "1 روز پیش",
            icon: MessageCircle,
            color: "text-purple-500"
        }
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'shipped': return 'bg-blue-100 text-blue-700';
            case 'delivered': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending': return 'در انتظار';
            case 'shipped': return 'ارسال شده';
            case 'delivered': return 'تحویل شده';
            default: return 'نامشخص';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6 font-[IRANSans]">
            <div className="max-w-7xl mx-auto">
                {/* هدر */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Target className="text-white" size={24} />
                                </div>
                                نمای کلی خریدار
                            </h1>
                            <p className="text-gray-600 mt-2">خلاصه فعالیت‌ها و آمار عملکرد شما</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100">
                                <div className="text-xs text-gray-500">سفارشات تکمیل شده</div>
                                <div className="text-xl font-bold text-gray-800">{stats.completedOrders}</div>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100">
                                <div className="text-xs text-gray-500">میزان موفقیت</div>
                                <div className="text-xl font-bold text-green-600">{stats.successRate}%</div>
                            </div>
                        </div>
                    </div>

                    {/* کارت‌های آماری */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">سفارشات فعال</div>
                                    <div className="text-lg font-bold text-gray-800">{stats.activeOrders}</div>
                                    <div className="text-xs text-green-500 flex items-center gap-1 mt-1">
                                        <TrendingUp size={12} />
                                        +2 از ماه گذشته
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <ShoppingCart className="text-green-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">آگهی‌های ذخیره‌شده</div>
                                    <div className="text-lg font-bold text-gray-800">{stats.savedAds}</div>
                                    <div className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <Heart size={12} />
                                        مورد علاقه
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                    <Heart className="text-red-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">اعلان‌ها</div>
                                    <div className="text-lg font-bold text-gray-800">{stats.alerts}</div>
                                    <div className="text-xs text-yellow-500 flex items-center gap-1 mt-1">
                                        <Bell size={12} />
                                        نیاز به توجه
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                    <Bell className="text-yellow-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">تحلیل‌های هوشمند</div>
                                    <div className="text-lg font-bold text-gray-800">{stats.aiReports}</div>
                                    <div className="text-xs text-blue-500 flex items-center gap-1 mt-1">
                                        <BarChart3 size={12} />
                                        جدید
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <BarChart3 className="text-blue-600" size={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* سفارشات اخیر */}
                    <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <Package className="text-green-500" />
                                سفارشات اخیر
                            </h2>
                        </div>

                        <div className="p-6 space-y-4">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-green-300 transition-all">
                                    <div className="flex items-center gap-3">
                                        <Avatar
                                            size="large"
                                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold"
                                        >
                                            {order.product.charAt(0)}
                                        </Avatar>
                                        <div>
                                            <div className="font-semibold text-gray-800">{order.product}</div>
                                            <div className="text-sm text-gray-500 flex items-center gap-2">
                                                <span>{order.seller}</span>
                                                <span>•</span>
                                                <span>{order.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="font-bold text-green-600">{order.amount.toLocaleString()} تومان</div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge
                                                className={getStatusColor(order.status)}
                                                count={getStatusText(order.status)}
                                            />
                                            <Progress
                                                percent={order.progress}
                                                size="small"
                                                strokeColor={
                                                    order.progress === 100 ? '#10b981' :
                                                        order.progress > 50 ? '#3b82f6' : '#f59e0b'
                                                }
                                                style={{ width: '60px' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-green-600 hover:border-green-300 transition-all">
                                <Eye size={16} />
                                مشاهده همه سفارشات
                            </button>
                        </div>
                    </div>

                    {/* فعالیت‌های اخیر */}
                    <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <Clock className="text-blue-500" />
                                فعالیت‌های اخیر
                            </h2>
                        </div>

                        <div className="p-6 space-y-4">
                            {activities.map((activity) => (
                                <div key={activity.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl hover:border-green-300 transition-all">
                                    <div className={`p-2 rounded-lg ${activity.color.replace('text', 'bg')} bg-opacity-10`}>
                                        <activity.icon size={16} className={activity.color} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-gray-800">{activity.title}</div>
                                        <div className="text-sm text-gray-600">{activity.description}</div>
                                        <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                            <Clock size={12} />
                                            {activity.time}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-green-600 hover:border-green-300 transition-all">
                                <BarChart3 size={16} />
                                مشاهده گزارش کامل
                            </button>
                        </div>
                    </div>
                </div>

                {/* آمار پایین */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <div className="text-sm text-gray-500">کل هزینه‌ها</div>
                                <div className="text-2xl font-bold text-green-600">{(stats.totalSpent / 1000000).toFixed(1)}M</div>
                            </div>
                            <TrendingUp className="text-green-500" size={24} />
                        </div>
                        <Progress
                            percent={75}
                            strokeColor="#10b981"
                            showInfo={false}
                        />
                        <div className="text-xs text-gray-500 mt-2">+15% نسبت به ماه گذشته</div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <div className="text-sm text-gray-500">تأمین‌کنندگان مورد علاقه</div>
                                <div className="text-2xl font-bold text-purple-600">{stats.favoriteSuppliers}</div>
                            </div>
                            <Users className="text-purple-500" size={24} />
                        </div>
                        <Progress
                            percent={60}
                            strokeColor="#8b5cf6"
                            showInfo={false}
                        />
                        <div className="text-xs text-gray-500 mt-2">+5 مورد جدید</div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <div className="text-sm text-gray-500">میانگین امتیاز</div>
                                <div className="text-2xl font-bold text-yellow-600">4.8</div>
                            </div>
                            <Star className="text-yellow-500 fill-current" size={24} />
                        </div>
                        <Progress
                            percent={96}
                            strokeColor="#f59e0b"
                            showInfo={false}
                        />
                        <div className="text-xs text-gray-500 mt-2">از ۵.۰ امتیاز</div>
                    </div>
                </div>
            </div>
        </div>
    );
}