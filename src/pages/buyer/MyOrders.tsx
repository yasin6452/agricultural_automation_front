import { useState } from "react";
import { Heart, MapPin, Trash2, Eye, ShoppingCart, Star, Share2, Clock, Shield, BadgeCheck } from "lucide-react";
import { Badge, Dropdown, Menu, Tooltip, Avatar } from "antd";

interface SavedAd {
    id: number;
    title: string;
    city: string;
    price: number;
    oldPrice?: number;
    img: string;
    score: number;
    seller: string;
    sellerAvatar: string;
    category: string;
    date: string;
    discount?: number;
    organic: boolean;
    verified: boolean;
    stock: number;
    deliveryTime: string;
}

export default function SavedAds() {
    const [saved, setSaved] = useState<SavedAd[]>([
        {
            id: 1,
            title: "سیب قرمز ممتاز شمال",
            city: "دماوند",
            price: 250000,
            oldPrice: 300000,
            img: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop",
            score: 4.8,
            seller: "مزرعه سبز",
            sellerAvatar: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=100&h=100&fit=crop&crop=face",
            category: "میوه",
            date: "2 ساعت پیش",
            discount: 17,
            organic: true,
            verified: true,
            stock: 45,
            deliveryTime: "1-2 روز"
        },
        {
            id: 2,
            title: "گوجه فرنگی گلخانه‌ای درجه یک",
            city: "یزد",
            price: 180000,
            img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop",
            score: 4.2,
            seller: "کشاورز نمونه",
            sellerAvatar: "https://images.unsplash.com/photo-1625246335526-044a2fcac73c?w=100&h=100&fit=crop&crop=face",
            category: "سبزیجات",
            date: "1 روز پیش",
            organic: false,
            verified: true,
            stock: 20,
            deliveryTime: "2-3 روز"
        },
        {
            id: 3,
            title: "خیار بوته‌ای تازه برداشت",
            city: "اصفهان",
            price: 120000,
            oldPrice: 150000,
            img: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=300&fit=crop",
            score: 4.6,
            seller: "باغ مرکبات",
            sellerAvatar: "https://images.unsplash.com/photo-1574323347407-5e1ad6d020b?w=100&h=100&fit=crop&crop=face",
            category: "سبزیجات",
            date: "3 ساعت پیش",
            discount: 20,
            organic: true,
            verified: true,
            stock: 30,
            deliveryTime: "1 روز"
        },
        {
            id: 4,
            title: "برنج محلی شمال",
            city: "گیلان",
            price: 450000,
            img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
            score: 4.9,
            seller: "شالیزار شمال",
            sellerAvatar: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=100&h=100&fit=crop&crop=face",
            category: "غلات",
            date: "5 ساعت پیش",
            organic: true,
            verified: false,
            stock: 15,
            deliveryTime: "3-4 روز"
        },
    ]);

    const [sortBy, setSortBy] = useState<'date' | 'price' | 'score'>('date');

    const removeAd = (id: number) => {
        setSaved(saved.filter((item) => item.id !== id));
    };

    const sortedAds = [...saved].sort((a, b) => {
        switch (sortBy) {
            case 'price':
                return b.price - a.price;
            case 'score':
                return b.score - a.score;
            case 'date':
            default:
                return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
    });

    const stats = {
        total: saved.length,
        organic: saved.filter(ad => ad.organic).length,
        discounted: saved.filter(ad => ad.discount).length,
        totalValue: saved.reduce((sum, ad) => sum + ad.price, 0)
    };

    const menu = (ad: SavedAd) => (
        <Menu
            items={[
                { key: '1', label: 'اشتراک‌گذاری', icon: <Share2 size={16} /> },
                { key: '2', label: 'مقایسه قیمت', icon: <ShoppingCart size={16} /> },
                { key: '3', label: 'ذخیره در لیست دیگر', icon: <Heart size={16} /> },
                { key: '4', label: 'حذف', icon: <Trash2 size={16} />, danger: true, onClick: () => removeAd(ad.id) },
            ]}
        />
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6 font-[IRANSans]">
            <div className="max-w-7xl mx-auto">
                {/* هدر */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Heart className="text-white" size={24} />
                                </div>
                                آگهی‌های ذخیره‌شده
                            </h1>
                            <p className="text-gray-600 mt-2">محصولات و پیشنهاداتی که برای بعد ذخیره کرده‌اید</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100">
                                <div className="text-xs text-gray-500">کل آیتم‌ها</div>
                                <div className="text-xl font-bold text-gray-800">{stats.total}</div>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100">
                                <div className="text-xs text-gray-500">ارزش کل</div>
                                <div className="text-xl font-bold text-green-600">{(stats.totalValue / 1000000).toFixed(1)}M</div>
                            </div>
                        </div>
                    </div>

                    {/* آمار */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">کل آیتم‌ها</div>
                                    <div className="text-lg font-bold text-gray-800">{stats.total}</div>
                                </div>
                                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                    <Heart className="text-green-600" size={20} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
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
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">تخفیف دار</div>
                                    <div className="text-lg font-bold text-red-500">{stats.discounted}</div>
                                </div>
                                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                    <ShoppingCart className="text-red-500" size={20} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500">میانگین امتیاز</div>
                                    <div className="text-lg font-bold text-yellow-600">
                                        {(saved.reduce((sum, ad) => sum + ad.score, 0) / saved.length).toFixed(1)}
                                    </div>
                                </div>
                                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                                    <Star className="text-yellow-600" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* فیلتر و مرتب‌سازی */}
                    <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700">مرتب‌سازی بر اساس:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                                >
                                    <option value="date">تاریخ</option>
                                    <option value="price">قیمت</option>
                                    <option value="score">امتیاز</option>
                                </select>
                            </div>
                            <div className="text-sm text-gray-500">
                                {sortedAds.length} آیتم یافت شد
                            </div>
                        </div>
                    </div>
                </div>

                {/* محتوای اصلی */}
                {sortedAds.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-16 text-center">
                        <Heart className="mx-auto text-gray-300 mb-4" size={64} />
                        <h3 className="text-xl font-bold text-gray-500 mb-2">هنوز هیچ آگهی ذخیره نکرده‌اید</h3>
                        <p className="text-gray-400 mb-6">محصولات مورد علاقه خود را برای دسترسی سریع‌تر ذخیره کنید</p>
                        <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all">
                            جستجو در بازار
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {sortedAds.map((ad) => (
                            <div
                                key={ad.id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-green-100 group"
                            >
                                {/* تصویر */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={ad.img}
                                        alt={ad.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />

                                    {/* Badge ها */}
                                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                                        {ad.discount && (
                                            <Badge count={`${ad.discount}% تخفیف`} className="bg-red-500 border-0" />
                                        )}
                                        {ad.organic && (
                                            <Badge count="ارگانیک" className="bg-green-500 border-0" />
                                        )}
                                    </div>

                                    {/* دکمه حذف */}
                                    <div className="absolute top-3 left-3">
                                        <Tooltip title="حذف از ذخیره‌ها">
                                            <button
                                                onClick={() => removeAd(ad.id)}
                                                className="p-2 bg-white/90 rounded-xl text-red-500 hover:text-red-700 hover:bg-white transition-all shadow-lg"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>

                                {/* محتوا */}
                                <div className="p-4 space-y-4">
                                    {/* عنوان و فروشنده */}
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
                                            {ad.title}
                                        </h2>
                                        <div className="flex items-center gap-2">
                                            <Avatar src={ad.sellerAvatar} size={24} />
                                            <span className="text-sm text-gray-600">{ad.seller}</span>
                                            {ad.verified && (
                                                <BadgeCheck className="text-blue-500" size={16} />
                                            )}
                                        </div>
                                    </div>

                                    {/* اطلاعات محصول */}
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <MapPin size={14} />
                                                <span>{ad.city}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} />
                                                <span>{ad.deliveryTime}</span>
                                            </div>
                                        </div>
                                        <Badge count={ad.category} className="bg-purple-100 text-purple-700 border-0" />
                                    </div>

                                    {/* قیمت */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-2xl font-bold text-green-600">
                                                {ad.price.toLocaleString()}
                                            </div>
                                            {ad.oldPrice && (
                                                <div className="text-sm text-gray-400 line-through">
                                                    {ad.oldPrice.toLocaleString()} تومان
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                                            <Star size={16} className="text-yellow-500 fill-current" />
                                            <span className="font-bold text-gray-700">{ad.score}</span>
                                        </div>
                                    </div>

                                    {/* موجودی */}
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">موجودی: {ad.stock} عدد</span>
                                        <span className="text-gray-400">{ad.date}</span>
                                    </div>

                                    {/* دکمه‌های اقدام */}
                                    <div className="flex gap-2">
                                        <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl hover:shadow-lg transition-all text-sm font-medium">
                                            <ShoppingCart size={16} />
                                            افزودن به سبد
                                        </button>
                                        <Dropdown overlay={menu(ad)} placement="bottomRight">
                                            <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all">
                                                <Share2 size={16} />
                                            </button>
                                        </Dropdown>
                                        <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all">
                                            <Eye size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}