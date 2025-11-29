import { useState } from "react";
import { Heart, Trash2, Eye, Phone, MessageCircle, Star, Clock, Shield, BadgeCheck, TrendingDown, Scale, Send, Sparkles, Crown, Zap, Users, BarChart3 } from "lucide-react";
import { Badge, Dropdown, Menu, Tooltip, Avatar, Modal, Input, message, Progress, Rate } from "antd";

interface SavedProduct {
    id: number;
    title: string;
    city: string;
    pricePerKg: number;
    img: string;
    score: number;
    seller: string;
    sellerPhone: string;
    sellerAvatar: string;
    category: string;
    savedDate: string;
    organic: boolean;
    verified: boolean;
    availableStock: number;
    minOrder: number;
    harvestDate: string;
    priceHistory?: number[];
    sellerLevel: 'beginner' | 'intermediate' | 'expert';
    responseTime: string;
    successRate: number;
    deliveryTime: string;
}

export default function SavedProducts() {
    const [saved, setSaved] = useState<SavedProduct[]>([
        {
            id: 1,
            title: "سیب قرمز درجه یک",
            city: "دماوند",
            pricePerKg: 35000,
            img: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop",
            score: 4.8,
            seller: "مزرعه سبز احمدی",
            sellerPhone: "09123456789",
            sellerAvatar: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=100&h=100&fit=crop&crop=face",
            category: "میوه",
            savedDate: "2 روز پیش",
            organic: true,
            verified: true,
            availableStock: 5000,
            minOrder: 100,
            harvestDate: "هفته گذشته",
            priceHistory: [38000, 36000, 35000],
            sellerLevel: 'expert',
            responseTime: 'کمتر از 1 ساعت',
            successRate: 98,
            deliveryTime: '1-2 روز'
        },
        {
            id: 2,
            title: "گوجه فرنگی گلخانه‌ای",
            city: "یزد",
            pricePerKg: 18000,
            img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop",
            score: 4.2,
            seller: "کشت و صنعت خورشید",
            sellerPhone: "09131234567",
            sellerAvatar: "https://images.unsplash.com/photo-1625246335526-044a2fcac73c?w=100&h=100&fit=crop&crop=face",
            category: "سبزیجات",
            savedDate: "5 روز پیش",
            organic: false,
            verified: true,
            availableStock: 3000,
            minOrder: 200,
            harvestDate: "دیروز",
            priceHistory: [20000, 19000, 18000],
            sellerLevel: 'intermediate',
            responseTime: '2 ساعت',
            successRate: 92,
            deliveryTime: '2-3 روز'
        },
        {
            id: 3,
            title: "خیار بوته‌ای تازه",
            city: "اصفهان",
            pricePerKg: 12000,
            img: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=300&fit=crop",
            score: 4.6,
            seller: "باغ سبز کاشان",
            sellerPhone: "09133456789",
            sellerAvatar: "https://images.unsplash.com/photo-1574323347407-5e1ad6d020b?w=100&h=100&fit=crop&crop=face",
            category: "سبزیجات",
            savedDate: "1 هفته پیش",
            organic: true,
            verified: true,
            availableStock: 2000,
            minOrder: 150,
            harvestDate: "امروز",
            priceHistory: [13000, 12500, 12000],
            sellerLevel: 'expert',
            responseTime: '1 ساعت',
            successRate: 96,
            deliveryTime: '1 روز'
        },
        {
            id: 4,
            title: "برنج هاشمی محلی",
            city: "گیلان",
            pricePerKg: 85000,
            img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
            score: 4.9,
            seller: "شالیزار شمال",
            sellerPhone: "09111234567",
            sellerAvatar: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=100&h=100&fit=crop&crop=face",
            category: "غلات",
            savedDate: "3 روز پیش",
            organic: true,
            verified: false,
            availableStock: 8000,
            minOrder: 50,
            harvestDate: "ماه گذشته",
            priceHistory: [90000, 87000, 85000],
            sellerLevel: 'beginner',
            responseTime: '4 ساعت',
            successRate: 85,
            deliveryTime: '3-4 روز'
        },
    ]);

    // ابتدا توابع کمکی را تعریف می‌کنیم
    const getPriceChange = (product: SavedProduct) => {
        if (!product.priceHistory || product.priceHistory.length === 0) return null;
        const oldPrice = product.priceHistory[0];
        const change = ((product.pricePerKg - oldPrice) / oldPrice * 100).toFixed(1);
        return { change: parseFloat(change), oldPrice };
    };

    const getSellerLevelColor = (level: string) => {
        switch (level) {
            case 'expert': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
            case 'intermediate': return 'bg-gradient-to-r from-blue-400 to-purple-500';
            case 'beginner': return 'bg-gradient-to-r from-green-400 to-emerald-500';
            default: return 'bg-gray-400';
        }
    };

    const getSellerLevelText = (level: string) => {
        switch (level) {
            case 'expert': return 'حرفه‌ای';
            case 'intermediate': return 'متوسط';
            case 'beginner': return 'تازه‌کار';
            default: return level;
        }
    };

    // حالا states و بقیه توابع
    const [sortBy, setSortBy] = useState<'date' | 'price' | 'score'>('date');
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [isPriceRequestModalOpen, setIsPriceRequestModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<SavedProduct | null>(null);
    const [requestQuantity, setRequestQuantity] = useState<number>(0);
    const [requestMessage, setRequestMessage] = useState<string>("");
    const [activeFilter, setActiveFilter] = useState<'all' | 'organic' | 'verified' | 'priceDown'>('all');

    // محاسبه آمار
    const stats = {
        total: saved.length,
        organic: saved.filter(p => p.organic).length,
        priceDown: saved.filter(p => {
            const change = getPriceChange(p);
            return change && change.change < 0;
        }).length,
        verified: saved.filter(p => p.verified).length,
        avgScore: saved.length > 0 ? (saved.reduce((sum, p) => sum + p.score, 0) / saved.length).toFixed(1) : "0.0"
    };

    const removeProduct = (id: number) => {
        setSaved(saved.filter((item) => item.id !== id));
        message.success("محصول از لیست حذف شد");
    };

    const toggleSelectProduct = (id: number) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(p => p !== id));
        } else {
            setSelectedProducts([...selectedProducts, id]);
        }
    };

    const filteredAndSortedProducts = saved.filter(product => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'organic') return product.organic;
        if (activeFilter === 'verified') return product.verified;
        if (activeFilter === 'priceDown') {
            const priceChange = getPriceChange(product);
            return priceChange && priceChange.change < 0;
        }
        return true;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'price':
                return a.pricePerKg - b.pricePerKg;
            case 'score':
                return b.score - a.score;
            case 'date':
            default:
                return 0;
        }
    });

    const handlePriceRequest = (product: SavedProduct) => {
        setCurrentProduct(product);
        setRequestQuantity(product.minOrder);
        setRequestMessage(`سلام، لطفاً قیمت نهایی برای ${product.title} را اعلام کنید.`);
        setIsPriceRequestModalOpen(true);
    };

    const sendPriceRequest = () => {
        if (!currentProduct || requestQuantity < currentProduct.minOrder) {
            message.error(`حداقل سفارش ${currentProduct?.minOrder} کیلوگرم است`);
            return;
        }
        message.success(`درخواست قیمت برای ${requestQuantity} کیلوگرم به ${currentProduct.seller} ارسال شد`);
        setIsPriceRequestModalOpen(false);
        setCurrentProduct(null);
        setRequestQuantity(0);
        setRequestMessage("");
    };

    const handleCall = (phone: string, seller: string) => {
        message.info(`در حال برقراری تماس با ${seller}: ${phone}`);
    };

    const handleMessage = (seller: string) => {
        message.info(`پیام به ${seller} ارسال شد`);
    };

    const compareProducts = () => {
        if (selectedProducts.length < 2) {
            message.warning("حداقل 2 محصول را برای مقایسه انتخاب کنید");
            return;
        }
        message.info(`${selectedProducts.length} محصول در حال مقایسه...`);
    };

    // تعریف منو با استفاده از items به جای overlay
    const getProductMenu = (product: SavedProduct) => ({
        items: [
            {
                key: '1',
                label: 'تماس تلفنی',
                icon: <Phone size={16} />,
                onClick: () => handleCall(product.sellerPhone, product.seller)
            },
            {
                key: '2',
                label: 'ارسال پیام',
                icon: <MessageCircle size={16} />,
                onClick: () => handleMessage(product.seller)
            },
            {
                key: '3',
                label: 'درخواست قیمت',
                icon: <Send size={16} />,
                onClick: () => handlePriceRequest(product)
            },
            {
                key: '4',
                label: selectedProducts.includes(product.id) ? 'حذف از مقایسه' : 'افزودن به مقایسه',
                icon: <Scale size={16} />,
                onClick: () => toggleSelectProduct(product.id)
            },
            {
                type: 'divider' as const,
                key: 'divider'
            },
            {
                key: '5',
                label: 'حذف از ذخیره‌ها',
                icon: <Trash2 size={16} />,
                danger: true,
                onClick: () => removeProduct(product.id)
            },
        ]
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 font-[IRANSans]">
            <div className="max-w-7xl mx-auto">
                {/* هدر */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Heart className="text-white" size={24} />
                                </div>
                                محصولات ذخیره‌شده
                            </h1>
                            <p className="text-gray-600 mt-2">محصولات مورد علاقه برای بررسی و خرید آینده</p>
                        </div>

                        <div className="flex items-center gap-4">
                            {selectedProducts.length > 0 && (
                                <button
                                    onClick={compareProducts}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all shadow-md"
                                >
                                    <Scale size={20} />
                                    مقایسه ({selectedProducts.length})
                                </button>
                            )}
                            <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-blue-100">
                                <div className="text-xs text-gray-500">کل محصولات</div>
                                <div className="text-xl font-bold text-gray-800">{stats.total}</div>
                            </div>
                        </div>
                    </div>

                    {/* آمار */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-all">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">کل محصولات</div>
                                    <div className="text-lg font-bold text-gray-800">{stats.total}</div>
                                </div>
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <Heart className="text-blue-600" size={20} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-all">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">ارگانیک</div>
                                    <div className="text-lg font-bold text-green-600">{stats.organic}</div>
                                </div>
                                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                    <Shield className="text-emerald-600" size={20} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-all">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">کاهش قیمت</div>
                                    <div className="text-lg font-bold text-red-500">{stats.priceDown}</div>
                                </div>
                                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                    <TrendingDown className="text-red-500" size={20} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-all">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">تایید شده</div>
                                    <div className="text-lg font-bold text-blue-600">{stats.verified}</div>
                                </div>
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <BadgeCheck className="text-blue-600" size={20} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-all">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">میانگین امتیاز</div>
                                    <div className="text-lg font-bold text-yellow-600">{stats.avgScore}</div>
                                </div>
                                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                                    <Star className="text-yellow-600" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* فیلتر و مرتب‌سازی */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 mb-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { key: 'all', label: 'همه', count: stats.total },
                                    { key: 'organic', label: 'ارگانیک', count: stats.organic },
                                    { key: 'verified', label: 'تایید شده', count: stats.verified },
                                    { key: 'priceDown', label: 'کاهش قیمت', count: stats.priceDown }
                                ].map(filter => (
                                    <button
                                        key={filter.key}
                                        onClick={() => setActiveFilter(filter.key as any)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${activeFilter === filter.key
                                            ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        <span>{filter.label}</span>
                                        <Badge count={filter.count} className={activeFilter === filter.key ? 'bg-white text-blue-600' : 'bg-blue-500'} />
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700">مرتب‌سازی:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
                                >
                                    <option value="date">تاریخ ذخیره</option>
                                    <option value="price">قیمت (کم به زیاد)</option>
                                    <option value="score">امتیاز (زیاد به کم)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* محتوای اصلی */}
                {filteredAndSortedProducts.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-16 text-center">
                        <Heart className="mx-auto text-gray-300 mb-4" size={64} />
                        <h3 className="text-xl font-bold text-gray-500 mb-2">محصولی یافت نشد</h3>
                        <p className="text-gray-400 mb-6">هیچ محصولی با فیلترهای انتخاب شده مطابقت ندارد</p>
                        <button
                            onClick={() => setActiveFilter('all')}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all shadow-md"
                        >
                            مشاهده همه محصولات
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredAndSortedProducts.map((product) => {
                            const priceChange = getPriceChange(product);
                            const isSelected = selectedProducts.includes(product.id);

                            return (
                                <div
                                    key={product.id}
                                    className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 group relative ${isSelected ? 'border-purple-400 ring-2 ring-purple-200' : 'border-blue-100'
                                        }`}
                                >
                                    {/* نشانگر انتخاب */}
                                    {isSelected && (
                                        <div className="absolute top-3 left-3 z-10">
                                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                                <Scale className="text-white" size={12} />
                                            </div>
                                        </div>
                                    )}

                                    {/* تصویر */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={product.img}
                                            alt={product.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />

                                        {/* گرادینت روی تصویر */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                                        {/* Badges */}
                                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                                            {product.organic && (
                                                <Badge count="ارگانیک" className="bg-green-500 border-0 shadow-lg" />
                                            )}
                                            {priceChange && priceChange.change < 0 && (
                                                <Badge count={`${Math.abs(priceChange.change)}% کاهش`} className="bg-red-500 border-0 shadow-lg" />
                                            )}
                                            {product.sellerLevel === 'expert' && (
                                                <Badge count="فروشنده برتر" className="bg-gradient-to-r from-yellow-400 to-orange-500 border-0 shadow-lg" />
                                            )}
                                        </div>

                                        {/* دکمه‌های بالای تصویر */}
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            <Tooltip title={isSelected ? "حذف از مقایسه" : "افزودن به مقایسه"}>
                                                <button
                                                    onClick={() => toggleSelectProduct(product.id)}
                                                    className={`p-2 rounded-xl transition-all shadow-lg backdrop-blur-sm ${isSelected
                                                        ? 'bg-purple-500 text-white hover:bg-purple-600'
                                                        : 'bg-white/90 text-purple-500 hover:bg-white hover:text-purple-600'
                                                        }`}
                                                >
                                                    <Scale size={18} />
                                                </button>
                                            </Tooltip>
                                            <Tooltip title="حذف از ذخیره‌ها">
                                                <button
                                                    onClick={() => removeProduct(product.id)}
                                                    className="p-2 bg-white/90 rounded-xl text-red-500 hover:text-red-700 hover:bg-white transition-all shadow-lg backdrop-blur-sm"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </Tooltip>
                                        </div>

                                        {/* اطلاعات سریع در پایین تصویر */}
                                        <div className="absolute bottom-3 left-3 right-3">
                                            <div className="flex justify-between items-center text-white">
                                                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                                                    <Clock size={12} />
                                                    <span className="text-xs">{product.deliveryTime}</span>
                                                </div>
                                                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                                                    <Users size={12} />
                                                    <span className="text-xs">{getSellerLevelText(product.sellerLevel)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* محتوا */}
                                    <div className="p-5 space-y-4">
                                        {/* عنوان و دسته‌بندی */}
                                        <div className="flex items-start justify-between">
                                            <h2 className="text-lg font-bold text-gray-800 leading-tight flex-1">
                                                {product.title}
                                            </h2>
                                            <Badge count={product.category} className="bg-purple-100 text-purple-700 border-0 text-xs" />
                                        </div>

                                        {/* فروشنده */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <Avatar src={product.sellerAvatar} size={40} className="border-2 border-white shadow-md" />
                                                    {product.verified && (
                                                        <BadgeCheck className="absolute -bottom-1 -right-1 text-blue-500 bg-white rounded-full" size={16} />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-medium text-gray-700">{product.seller}</span>
                                                        <div className={`w-2 h-2 rounded-full ${getSellerLevelColor(product.sellerLevel)}`}></div>
                                                    </div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-2">
                                                        <span>{product.city}</span>
                                                        <span>•</span>
                                                        <span>{product.responseTime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* امتیاز و موفقیت */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Rate
                                                    disabled
                                                    defaultValue={product.score}
                                                    className="text-yellow-500 text-sm"
                                                    character={<Star size={14} />}
                                                />
                                                <span className="text-sm font-bold text-gray-700">{product.score}</span>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                <div>میزان موفقیت:</div>
                                                <Progress
                                                    percent={product.successRate}
                                                    size="small"
                                                    strokeColor={
                                                        product.successRate > 95 ? '#10b981' :
                                                            product.successRate > 85 ? '#3b82f6' : '#f59e0b'
                                                    }
                                                    showInfo={false}
                                                />
                                            </div>
                                        </div>

                                        {/* قیمت */}
                                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-2xl font-bold text-blue-600">
                                                        {product.pricePerKg.toLocaleString()}
                                                    </div>
                                                    <div className="text-xs text-gray-500">تومان / کیلوگرم</div>
                                                </div>
                                                {priceChange && (
                                                    <div className={`text-sm font-bold ${priceChange.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                                        {priceChange.change > 0 ? '+' : ''}{priceChange.change}%
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* اطلاعات اضافی */}
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-2 rounded-lg">
                                                <BarChart3 size={14} />
                                                <span>موجودی: {product.availableStock} کیلو</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-2 rounded-lg">
                                                <Zap size={14} />
                                                <span>حداقل: {product.minOrder} کیلو</span>
                                            </div>
                                        </div>

                                        {/* دکمه‌های اقدام */}
                                        <div className="flex gap-2 pt-2">
                                            <button
                                                onClick={() => handlePriceRequest(product)}
                                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-xl hover:shadow-lg transition-all text-sm font-medium shadow-md"
                                            >
                                                <Send size={16} />
                                                درخواست قیمت
                                            </button>
                                            <Tooltip title="تماس تلفنی">
                                                <button
                                                    onClick={() => handleCall(product.sellerPhone, product.seller)}
                                                    className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-all shadow-sm"
                                                >
                                                    <Phone size={16} />
                                                </button>
                                            </Tooltip>
                                            <Dropdown
                                                menu={getProductMenu(product)}
                                                placement="bottomRight"
                                                trigger={['click']}
                                            >
                                                <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all shadow-sm">
                                                    <Eye size={16} />
                                                </button>
                                            </Dropdown>
                                        </div>

                                        {/* تاریخ ذخیره */}
                                        <div className="text-xs text-gray-400 text-center pt-3 border-t border-gray-100">
                                            <Clock size={12} className="inline ml-1" />
                                            ذخیره شده {product.savedDate}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Modal درخواست قیمت */}
                <Modal
                    title={
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                                <Send className="text-white" size={20} />
                            </div>
                            <div>
                                <div className="font-bold text-gray-800">درخواست قیمت</div>
                                <div className="text-sm text-gray-500 font-normal">{currentProduct?.title}</div>
                            </div>
                        </div>
                    }
                    open={isPriceRequestModalOpen}
                    onCancel={() => setIsPriceRequestModalOpen(false)}
                    onOk={sendPriceRequest}
                    okText="ارسال درخواست"
                    cancelText="انصراف"
                    okButtonProps={{
                        className: "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 border-0"
                    }}
                    width={500}
                    className="font-[IRANSans]"
                >
                    {currentProduct && (
                        <div className="space-y-4 mt-4">
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <Avatar src={currentProduct.sellerAvatar} size={48} className="border-2 border-white shadow-md" />
                                    <div className="flex-1">
                                        <div className="font-bold text-gray-800 flex items-center gap-2">
                                            {currentProduct.seller}
                                            {currentProduct.verified && (
                                                <BadgeCheck className="text-blue-500" size={16} />
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500">{currentProduct.city}</div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className={`w-2 h-2 rounded-full ${getSellerLevelColor(currentProduct.sellerLevel)}`}></div>
                                            <span className="text-xs text-gray-500">{getSellerLevelText(currentProduct.sellerLevel)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600">
                                    قیمت فعلی: <span className="font-bold text-blue-600">{currentProduct.pricePerKg.toLocaleString()}</span> تومان/کیلو
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    مقدار مورد نیاز (کیلوگرم)
                                </label>
                                <Input
                                    type="number"
                                    value={requestQuantity}
                                    onChange={(e) => setRequestQuantity(Number(e.target.value))}
                                    min={currentProduct.minOrder}
                                    max={currentProduct.availableStock}
                                    size="large"
                                    suffix="کیلوگرم"
                                    className="rounded-xl"
                                />
                                <div className="text-xs text-gray-500 mt-1">
                                    حداقل سفارش: {currentProduct.minOrder} کیلو | موجودی: {currentProduct.availableStock} کیلو
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    پیام شما (اختیاری)
                                </label>
                                <Input.TextArea
                                    value={requestMessage}
                                    onChange={(e) => setRequestMessage(e.target.value)}
                                    rows={4}
                                    placeholder="توضیحات بیشتر در مورد سفارش خود..."
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                                <div className="flex items-start gap-2">
                                    <Sparkles className="text-blue-500 mt-0.5 flex-shrink-0" size={16} />
                                    <div className="text-sm text-blue-800">
                                        درخواست شما مستقیماً برای فروشنده ارسال می‌شود و پس از بررسی، قیمت نهایی به شما اطلاع داده خواهد شد.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
}