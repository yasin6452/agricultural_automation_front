import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
    ShoppingCart,
    TrendingDown,
    Star,
    CheckCircle,
    Clock,
    Package,
    Users,
    Zap,
    MessageCircle,
    Phone,
    MapPin,
    Calendar,
    BarChart3,
    Sparkles,
    Crown,
    BadgeCheck,
    Lightbulb,
    TrendingUp
} from 'lucide-react';
import { Badge, Progress, Tooltip, Rate, Avatar } from 'antd';

interface Offer {
    id: number;
    seller: string;
    sellerImage: string;
    price: number;
    oldPrice?: number;
    score: number;
    stock: number;
    deliveryTime: string;
    sellerScore: number;
    accepted?: boolean;
    aiSuggested?: boolean;
    organic?: boolean;
    verified?: boolean;
    discount?: number;
    sellerLevel: 'beginner' | 'intermediate' | 'expert';
    responseTime: string;
    successRate: number;
    productImage: string;
}

interface Request {
    id: number;
    product: string;
    productImage: string;
    quantity: number;
    unit: string;
    description: string;
    status: 'Pending' | 'Accepted' | 'Completed' | 'Expired';
    offers: Offer[];
    createdAt: string;
    budget: number;
    urgency: 'low' | 'medium' | 'high';
    category: string;
    expiryDate: string;
    views: number;
    offersCount: number;
}

const BuyRequestsAI = () => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [unit, setUnit] = useState('کیلوگرم');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState(0);
    const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('medium');
    const [category, setCategory] = useState('میوه');
    const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'accepted' | 'completed'>('all');

    useEffect(() => {
        setRequests([
            {
                id: 1,
                product: 'سیب قرمز تازه',
                productImage: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop',
                quantity: 100,
                unit: 'کیلوگرم',
                description: 'برای بازار تره بار - نیاز به کیفیت درجه یک و تازه‌رنگی بالا',
                status: 'Pending',
                budget: 1200000,
                urgency: 'high',
                category: 'میوه',
                createdAt: '1402/10/15',
                expiryDate: '1402/10/18',
                views: 24,
                offersCount: 3,
                offers: [
                    {
                        id: 1,
                        seller: 'مزرعه سبز',
                        sellerImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=100&h=100&fit=crop&crop=face',
                        price: 11500,
                        oldPrice: 13000,
                        score: 4.8,
                        stock: 50,
                        deliveryTime: '1-2 روز',
                        sellerScore: 4.9,
                        organic: true,
                        verified: true,
                        discount: 12,
                        sellerLevel: 'expert',
                        responseTime: 'کمتر از 1 ساعت',
                        successRate: 98,
                        productImage: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=200&h=150&fit=crop'
                    },
                    {
                        id: 2,
                        seller: 'کشاورز نمونه',
                        sellerImage: 'https://images.unsplash.com/photo-1625246335526-044a2fcac73c?w=100&h=100&fit=crop&crop=face',
                        price: 11800,
                        oldPrice: 12000,
                        score: 4.6,
                        stock: 30,
                        deliveryTime: '2-3 روز',
                        sellerScore: 4.7,
                        organic: false,
                        verified: true,
                        discount: 2,
                        sellerLevel: 'intermediate',
                        responseTime: '2 ساعت',
                        successRate: 92,
                        productImage: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&h=150&fit=crop'
                    },
                    {
                        id: 3,
                        seller: 'پیشنهاد هوشمند AI',
                        sellerImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=face',
                        price: 11200,
                        oldPrice: 12500,
                        score: 4.9,
                        stock: 75,
                        deliveryTime: '1 روز',
                        sellerScore: 4.8,
                        organic: true,
                        verified: true,
                        discount: 10,
                        sellerLevel: 'expert',
                        aiSuggested: true,
                        responseTime: 'فوری',
                        successRate: 95,
                        productImage: 'https://images.unsplash.com/photo-1570913149827-1310398174c5?w=200&h=150&fit=crop'
                    },
                ]
            },
            {
                id: 2,
                product: 'برنج محلی شمال',
                productImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
                quantity: 50,
                unit: 'کیلوگرم',
                description: 'برای رستوران - برنج مرغوب شمال با عطر و طعم عالی',
                status: 'Accepted',
                budget: 1250000,
                urgency: 'medium',
                category: 'غلات',
                createdAt: '1402/10/14',
                expiryDate: '1402/10/17',
                views: 18,
                offersCount: 2,
                offers: [
                    {
                        id: 4,
                        seller: 'شالیزار شمال',
                        sellerImage: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop&crop=face',
                        price: 24500,
                        oldPrice: 27000,
                        score: 4.9,
                        stock: 100,
                        deliveryTime: '3-4 روز',
                        sellerScore: 4.8,
                        organic: true,
                        verified: true,
                        accepted: true,
                        discount: 9,
                        sellerLevel: 'expert',
                        responseTime: '1 ساعت',
                        successRate: 96,
                        productImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=150&fit=crop'
                    },
                ]
            },
            {
                id: 3,
                product: 'گوجه فرنگی تازه',
                productImage: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop',
                quantity: 200,
                unit: 'کیلوگرم',
                description: 'برای کارخانه رب - گوجه فرنگی تازه و سالم',
                status: 'Completed',
                budget: 800000,
                urgency: 'low',
                category: 'سبزیجات',
                createdAt: '1402/10/10',
                expiryDate: '1402/10/13',
                views: 32,
                offersCount: 4,
                offers: [
                    {
                        id: 5,
                        seller: 'مزرعه طلایی',
                        sellerImage: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=100&h=100&fit=crop&crop=face',
                        price: 7500,
                        oldPrice: 8500,
                        score: 4.7,
                        stock: 150,
                        deliveryTime: '2 روز',
                        sellerScore: 4.6,
                        organic: true,
                        verified: true,
                        accepted: true,
                        discount: 12,
                        sellerLevel: 'intermediate',
                        responseTime: '3 ساعت',
                        successRate: 89,
                        productImage: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&h=150&fit=crop'
                    },
                ]
            }
        ]);
    }, []);

    const addRequest = () => {
        if (!product || quantity <= 0 || budget <= 0) {
            return toast.error('لطفا همه فیلدهای ضروری را پر کنید');
        }

        const newReq: Request = {
            id: Date.now(),
            product,
            productImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
            quantity,
            unit,
            description,
            status: 'Pending',
            budget,
            urgency,
            category,
            createdAt: new Date().toLocaleDateString('fa-IR'),
            expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('fa-IR'),
            views: 0,
            offersCount: 0,
            offers: []
        };

        // شبیه‌سازی پیشنهادات هوشمند AI
        const aiOffers: Offer[] = [
            {
                id: Date.now() + 1,
                seller: 'پیشنهاد طلایی AI',
                sellerImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=face',
                price: Math.floor(Math.random() * 2000) + 11000,
                score: 4.7,
                stock: 40,
                deliveryTime: '1-2 روز',
                sellerScore: 4.8,
                aiSuggested: true,
                organic: true,
                discount: 15,
                sellerLevel: 'expert',
                responseTime: 'فوری',
                successRate: 97,
                productImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=150&fit=crop'
            },
        ];
        newReq.offers = aiOffers;
        newReq.offersCount = aiOffers.length;

        setRequests(prev => [newReq, ...prev]);
        setProduct('');
        setQuantity(0);
        setUnit('کیلوگرم');
        setDescription('');
        setBudget(0);
        setUrgency('medium');

        toast.success('🎯 درخواست خرید با موفقیت ثبت شد! پیشنهادات هوشمند در حال بررسی هستند...');
    };

    const acceptOffer = (reqId: number, offerId: number) => {
        setRequests(prev => prev.map(req => {
            if (req.id !== reqId) return req;
            return {
                ...req,
                status: 'Accepted',
                offers: req.offers.map(o => ({ ...o, accepted: o.id === offerId }))
            };
        }));
        toast.success('✅ پیشنهاد با موفقیت پذیرفته شد! آماده سازی سفارش آغاز شد.');
    };

    const completeRequest = (reqId: number) => {
        setRequests(prev => prev.map(req =>
            req.id === reqId ? { ...req, status: 'Completed' } : req
        ));
        toast.success('🎉 سفارش با موفقیت تکمیل شد! امتیاز خود را به فروشنده دهید.');
    };

    const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
            case 'high': return 'bg-red-100 text-red-700 border-red-300';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'low': return 'bg-green-100 text-green-700 border-green-300';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'Accepted': return 'bg-blue-100 text-blue-700 border-blue-300';
            case 'Completed': return 'bg-green-100 text-green-700 border-green-300';
            case 'Expired': return 'bg-gray-100 text-gray-700 border-gray-300';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getSellerLevelColor = (level: string) => {
        switch (level) {
            case 'expert': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
            case 'intermediate': return 'bg-gradient-to-r from-blue-400 to-purple-500';
            case 'beginner': return 'bg-gradient-to-r from-green-400 to-emerald-500';
            default: return 'bg-gray-400';
        }
    };

    const filteredRequests = requests.filter(request => {
        if (activeTab === 'all') return true;
        return request.status.toLowerCase() === activeTab;
    });

    const stats = {
        total: requests.length,
        pending: requests.filter(r => r.status === 'Pending').length,
        accepted: requests.filter(r => r.status === 'Accepted').length,
        completed: requests.filter(r => r.status === 'Completed').length,
        totalOffers: requests.reduce((acc, req) => acc + req.offersCount, 0),
        totalViews: requests.reduce((acc, req) => acc + req.views, 0),
    };

    const getAISuggestion = (offer: Offer, request: Request) => {
        if (offer.price < request.budget / request.quantity * 0.9) {
            return '💎 پیشنهاد استثنایی! قیمت بسیار مناسب';
        }
        if (offer.sellerLevel === 'expert' && offer.successRate > 95) {
            return '🏆 فروشنده برتر با سابقه درخشان';
        }
        if (offer.discount && offer.discount > 10) {
            return '🔥 تخفیف ویژه! فرصت را از دست ندهید';
        }
        return '✨ پیشنهاد مناسب با توجه به معیارهای شما';
    };

    return (
        <div className="min-h-screen  from-blue-50 via-white to-cyan-50 p-6 font-[IRANSans]">
            <Toaster position="top-right" />

            {/* هدر اصلی */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Crown className="text-white" size={24} />
                            </div>
                            سیستم مناقصه معکوس هوشمند
                        </h1>
                        <p className="text-gray-600 mt-2">ثبت درخواست خرید و دریافت بهترین پیشنهادات از کشاورزان معتبر</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100">
                            <div className="text-xs text-gray-500">کل درخواست‌ها</div>
                            <div className="text-xl font-bold text-gray-800">{stats.total}</div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100">
                            <div className="text-xs text-gray-500">پیشنهادات</div>
                            <div className="text-xl font-bold text-blue-600">{stats.totalOffers}</div>
                        </div>
                    </div>
                </div>

                {/* آمار پیشرفته */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-500">کل درخواست‌ها</div>
                                <div className="text-lg font-bold text-gray-800">{stats.total}</div>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                <ShoppingCart className="text-blue-600" size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-500">در حال بررسی</div>
                                <div className="text-lg font-bold text-yellow-600">{stats.pending}</div>
                            </div>
                            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <Clock className="text-yellow-600" size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-500">پذیرفته شده</div>
                                <div className="text-lg font-bold text-green-600">{stats.accepted}</div>
                            </div>
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                <CheckCircle className="text-green-600" size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-500">تکمیل شده</div>
                                <div className="text-lg font-bold text-purple-600">{stats.completed}</div>
                            </div>
                            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Package className="text-purple-600" size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-500">بازدید کل</div>
                                <div className="text-lg font-bold text-orange-600">{stats.totalViews}</div>
                            </div>
                            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                                <BarChart3 className="text-orange-600" size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-500">میانگین پیشنهاد</div>
                                <div className="text-lg font-bold text-cyan-600">{Math.round(stats.totalOffers / stats.total)}</div>
                            </div>
                            <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                                <TrendingUp className="text-cyan-600" size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* سایدبار فرم */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 sticky top-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Sparkles className="text-blue-500" size={20} />
                            درخواست جدید
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">نام محصول</label>
                                <input
                                    type="text"
                                    placeholder="مثلاً: سیب قرمز"
                                    value={product}
                                    onChange={e => setProduct(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">مقدار</label>
                                    <input
                                        type="number"
                                        placeholder="100"
                                        value={quantity}
                                        onChange={e => setQuantity(Number(e.target.value))}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">واحد</label>
                                    <select
                                        value={unit}
                                        onChange={e => setUnit(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
                                    >
                                        <option>کیلوگرم</option>
                                        <option>تن</option>
                                        <option>عدد</option>
                                        <option>جعبه</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">دسته‌بندی</label>
                                <select
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
                                >
                                    <option>میوه</option>
                                    <option>سبزیجات</option>
                                    <option>غلات</option>
                                    <option>ادویه</option>
                                    <option>خشکبار</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">بودجه (تومان)</label>
                                <input
                                    type="number"
                                    placeholder="1000000"
                                    value={budget}
                                    onChange={e => setBudget(Number(e.target.value))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">اولویت</label>
                                <select
                                    value={urgency}
                                    onChange={e => setUrgency(e.target.value as any)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
                                >
                                    <option value="low">کم</option>
                                    <option value="medium">متوسط</option>
                                    <option value="high">زیاد</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">توضیحات</label>
                                <textarea
                                    placeholder="توضیحات اضافی درباره درخواست..."
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all resize-none"
                                />
                            </div>

                            <button
                                onClick={addRequest}
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 font-bold"
                            >
                                <Zap size={20} />
                                ثبت درخواست هوشمند
                            </button>
                        </div>
                    </div>
                </div>

                {/* محتوای اصلی */}
                <div className="lg:col-span-3">
                    {/* تب‌های فیلتر */}
                    <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100 mb-6">
                        <div className="flex flex-wrap gap-2">
                            {[
                                { key: 'all', label: 'همه', count: stats.total },
                                { key: 'pending', label: 'در انتظار', count: stats.pending },
                                { key: 'accepted', label: 'پذیرفته شده', count: stats.accepted },
                                { key: 'completed', label: 'تکمیل شده', count: stats.completed }
                            ].map(tab => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key as any)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${activeTab === tab.key
                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    <span>{tab.label}</span>
                                    <Badge count={tab.count} className={activeTab === tab.key ? 'bg-white text-blue-600' : 'bg-blue-500'} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* لیست درخواست‌ها */}
                    <div className="space-y-6">
                        {filteredRequests.map(request => (
                            <div key={request.id} className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
                                {/* هدر درخواست */}
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-start gap-4 mb-4">
                                        <img
                                            src={request.productImage}
                                            alt={request.product}
                                            className="w-20 h-20 rounded-2xl object-cover shadow-md"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-gray-800">{request.product}</h3>
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        count={request.urgency === 'high' ? 'فوری' : request.urgency === 'medium' ? 'متوسط' : 'عادی'}
                                                        className={getUrgencyColor(request.urgency)}
                                                    />
                                                    <Badge
                                                        count={request.status === 'Pending' ? 'در انتظار' : request.status === 'Accepted' ? 'پذیرفته شده' : 'تکمیل شده'}
                                                        className={getStatusColor(request.status)}
                                                    />
                                                    <Badge count={request.category} className="bg-purple-100 text-purple-700 border-purple-300" />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6 text-sm text-gray-600 mb-2">
                                                <div className="flex items-center gap-1">
                                                    <Package size={16} />
                                                    <span>{request.quantity} {request.unit}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <TrendingDown size={16} />
                                                    <span>بودجه: {request.budget.toLocaleString()} تومان</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={16} />
                                                    <span>تاریخ: {request.createdAt}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <BarChart3 size={16} />
                                                    <span>{request.views} بازدید</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 bg-gray-50 p-3 rounded-xl">{request.description}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* پیشنهادات */}
                                <div className="p-6">
                                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <Users size={20} />
                                        پیشنهادات ({request.offersCount})
                                        {request.offers.some(o => o.aiSuggested) && (
                                            <Badge count="هوشمند" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0" />
                                        )}
                                    </h4>

                                    <div className="space-y-4">
                                        {request.offers.map(offer => (
                                            <div
                                                key={offer.id}
                                                className={`border-2 rounded-2xl p-4 transition-all ${offer.accepted
                                                    ? 'border-green-300 bg-green-50'
                                                    : offer.aiSuggested
                                                        ? 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50'
                                                        : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative">
                                                            <Avatar
                                                                src={offer.sellerImage}
                                                                size={48}
                                                                className="border-2 border-white shadow-md"
                                                            />
                                                            {offer.verified && (
                                                                <BadgeCheck className="absolute -bottom-1 -right-1 text-blue-500 bg-white rounded-full" size={16} />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h5 className="font-bold text-gray-800 flex items-center gap-2">
                                                                {offer.seller}
                                                                {offer.aiSuggested && (
                                                                    <Sparkles className="text-yellow-500" size={16} />
                                                                )}
                                                            </h5>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <div className={`w-3 h-3 rounded-full ${getSellerLevelColor(offer.sellerLevel)}`}></div>
                                                                <span className="text-xs text-gray-500 capitalize">{offer.sellerLevel}</span>
                                                                <Rate
                                                                    disabled
                                                                    defaultValue={offer.score}
                                                                    className="text-yellow-500 text-sm"
                                                                    character={<Star size={14} />}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        {offer.discount && (
                                                            <div className="bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                                                                {offer.discount}% تخفیف
                                                            </div>
                                                        )}
                                                        <div className="text-right">
                                                            <div className="text-2xl font-bold text-green-600">
                                                                {offer.price.toLocaleString()}
                                                            </div>
                                                            <div className="text-sm text-gray-500">تومان</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* اطلاعات پیشرفته */}
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                                    <div className="text-center">
                                                        <div className="text-sm text-gray-500">موجودی</div>
                                                        <div className="text-lg font-bold text-gray-800">{offer.stock} {request.unit}</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-sm text-gray-500">زمان تحویل</div>
                                                        <div className="text-lg font-bold text-blue-600 flex items-center justify-center gap-1">
                                                            <Clock size={16} />
                                                            {offer.deliveryTime}
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-sm text-gray-500">پاسخگویی</div>
                                                        <div className="text-lg font-bold text-purple-600">{offer.responseTime}</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-sm text-gray-500">میزان موفقیت</div>
                                                        <Progress
                                                            percent={offer.successRate}
                                                            size="small"
                                                            strokeColor={
                                                                offer.successRate > 95 ? '#10b981' :
                                                                    offer.successRate > 85 ? '#3b82f6' : '#f59e0b'
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                {/* پیشنهاد AI */}
                                                {offer.aiSuggested && (
                                                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-3 mb-3">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Lightbulb className="text-yellow-500" size={16} />
                                                            <span className="font-bold text-yellow-700">تحلیل هوشمند:</span>
                                                        </div>
                                                        <p className="text-yellow-700 text-sm">{getAISuggestion(offer, request)}</p>
                                                    </div>
                                                )}

                                                {/* دکمه‌های اقدام */}
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-3">
                                                        <Tooltip title="ارسال پیام">
                                                            <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                                                <MessageCircle size={18} />
                                                            </button>
                                                        </Tooltip>
                                                        <Tooltip title="تماس تلفنی">
                                                            <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                                                                <Phone size={18} />
                                                            </button>
                                                        </Tooltip>
                                                        <Tooltip title="مشاهده موقعیت">
                                                            <button className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
                                                                <MapPin size={18} />
                                                            </button>
                                                        </Tooltip>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        {request.status === 'Pending' && !offer.accepted && (
                                                            <button
                                                                onClick={() => acceptOffer(request.id, offer.id)}
                                                                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all font-bold"
                                                            >
                                                                <CheckCircle size={18} />
                                                                پذیرش پیشنهاد
                                                            </button>
                                                        )}
                                                        {offer.accepted && (
                                                            <div className="flex items-center gap-2 text-green-600 font-bold">
                                                                <CheckCircle size={20} />
                                                                پیشنهاد پذیرفته شد
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* دکمه‌های اقدام پایانی */}
                                    {request.status === 'Accepted' && (
                                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                                            <button
                                                onClick={() => completeRequest(request.id)}
                                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all"
                                            >
                                                <Package size={18} />
                                                تکمیل سفارش
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyRequestsAI;