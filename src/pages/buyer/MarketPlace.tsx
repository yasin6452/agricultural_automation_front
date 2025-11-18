import { useState, useEffect } from 'react';
import { Star, MapPin, Heart, ShoppingCart, TrendingUp, Filter, Search, Eye, Clock, Shield, Truck } from "lucide-react";
import { Badge, Dropdown, Menu, Progress } from "antd";

interface Product {
    id: number;
    name: string;
    seller: string;
    city: string;
    brand: string;
    score: number;
    price: number;
    oldPrice?: number;
    stock: number;
    expirationDays?: number;
    trend: number[];
    image: string;
    category: string;
    sellerScore: number;
    deliveryTime: string;
    organic: boolean;
    discount?: number;
}

const MarketPlace = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState('');
    const [filterCity, setFilterCity] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterStock, setFilterStock] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [watchlist, setWatchlist] = useState<number[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<number[]>([]);

    const itemsPerPage = 8;

    useEffect(() => {
        setProducts([
            {
                id: 1,
                name: 'سیب قرمز تازه',
                seller: 'مزرعه سبز',
                city: 'دماوند',
                brand: 'کیفیت عالی',
                score: 4.8,
                price: 12000,
                oldPrice: 15000,
                stock: 50,
                expirationDays: 5,
                trend: [14000, 13800, 13500, 13200, 13000, 12800, 12500, 12300, 12000, 12000],
                image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop',
                category: 'میوه',
                sellerScore: 4.9,
                deliveryTime: '1-2 روز',
                organic: true,
                discount: 20
            },
            {
                id: 2,
                name: 'برنج محلی شمال',
                seller: 'کشاورز نمونه',
                city: 'گیلان',
                brand: 'برند ملی',
                score: 4.9,
                price: 25000,
                oldPrice: 27000,
                stock: 10,
                trend: [27000, 26800, 26500, 26000, 25500, 25300, 25000],
                image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
                category: 'غلات',
                sellerScore: 4.8,
                deliveryTime: '2-3 روز',
                organic: true
            },
            {
                id: 3,
                name: 'زعفران درجه یک',
                seller: 'مزرعه طلایی',
                city: 'خراسان',
                brand: 'برترین کیفیت',
                score: 5.0,
                price: 120000,
                stock: 2,
                expirationDays: 2,
                trend: [130000, 128000, 125000, 123000, 120000],
                image: 'https://images.unsplash.com/photo-1596040033221-a1b4d1f4ef13?w=400&h=300&fit=crop',
                category: 'ادویه',
                sellerScore: 4.7,
                deliveryTime: '3-4 روز',
                organic: false
            },
            {
                id: 4,
                name: 'هویج تازه مزرعه',
                seller: 'باغ مرکبات',
                city: 'قم',
                brand: 'محلی',
                score: 4.5,
                price: 8000,
                stock: 20,
                trend: [9000, 8800, 8600, 8400, 8200, 8000],
                image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=300&fit=crop',
                category: 'سبزیجات',
                sellerScore: 4.6,
                deliveryTime: '1 روز',
                organic: true,
                discount: 15
            },
            {
                id: 5,
                name: 'پرتقال تازه شمال',
                seller: 'باغ مرکبات',
                city: 'شمال',
                brand: 'ارگانیک',
                score: 4.7,
                price: 11000,
                oldPrice: 13000,
                stock: 15,
                trend: [13000, 12500, 12000, 11500, 11000],
                image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop',
                category: 'میوه',
                sellerScore: 4.9,
                deliveryTime: '1-2 روز',
                organic: true
            },
            {
                id: 6,
                name: 'گوجه فرنگی تازه',
                seller: 'مزرعه سبز',
                city: 'دماوند',
                brand: 'تازه',
                score: 4.6,
                price: 8500,
                oldPrice: 9000,
                stock: 30,
                trend: [9000, 8800, 8700, 8600, 8500],
                image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop',
                category: 'سبزیجات',
                sellerScore: 4.8,
                deliveryTime: '1 روز',
                organic: true
            },
            {
                id: 7,
                name: 'انار شیرین',
                seller: 'باغ انار',
                city: 'یزد',
                brand: 'درجه یک',
                score: 4.8,
                price: 18000,
                oldPrice: 20000,
                stock: 8,
                trend: [20000, 19500, 19000, 18500, 18000],
                image: 'https://images.unsplash.com/photo-1570194065650-2f4c1f306bcc?w=400&h=300&fit=crop',
                category: 'میوه',
                sellerScore: 4.7,
                deliveryTime: '2-3 روز',
                organic: false,
                discount: 10
            },
            {
                id: 8,
                name: 'گردوی تازه',
                seller: 'مزرعه کوهستان',
                city: 'همدان',
                brand: 'مرغوب',
                score: 4.9,
                price: 45000,
                stock: 12,
                trend: [47000, 46500, 46000, 45500, 45000],
                image: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=400&h=300&fit=crop',
                category: 'خشکبار',
                sellerScore: 4.8,
                deliveryTime: '3-4 روز',
                organic: true
            },
        ]);
    }, []);

    const toggleWatchlist = (id: number) => {
        setWatchlist(prev => prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]);
    };

    const addToCart = (id: number) => {
        setCart(prev => [...prev, id]);
    };

    // فیلتر پیشرفته
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (filterCity ? product.city === filterCity : true) &&
        (filterCategory ? product.category === filterCategory : true) &&
        (filterStock === 'low' ? product.stock <= 5 :
            filterStock === 'medium' ? product.stock > 5 && product.stock <= 20 :
                filterStock === 'high' ? product.stock > 20 : true)
    );

    // مرتب‌سازی
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            case 'score-desc': return b.score - a.score;
            case 'score-asc': return a.score - b.score;
            default: return 0;
        }
    });

    // Pagination
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const displayedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // تابع تولید پیشنهاد AI
    const getAISuggestion = (product: Product) => {
        const trend = product.trend;
        if (trend.length < 2) return 'پیشنهاد AI: اطلاعات کافی نیست';
        const diff = trend[trend.length - 1] - trend[trend.length - 2];
        if (diff < 0) return '💡 قیمت کاهش یافته، اکنون بهترین زمان خرید است!';
        if (diff > 0) return '⚠️ قیمت در حال افزایش است، خرید زودتر توصیه می‌شود';
        return '🔹 قیمت پایدار است';
    };

    const maxPrice = Math.max(...sortedProducts.map(p => p.price), 0);

    const stats = {
        total: products.length,
        organic: products.filter(p => p.organic).length,
        discount: products.filter(p => p.discount).length,
        highScore: products.filter(p => p.score >= 4.8).length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6 font-[IRANSans]">
            {/* هدر */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <ShoppingCart className="text-white" size={24} />
                            </div>
                            بازار محصولات کشاورزی
                        </h1>
                        <p className="text-gray-600 mt-2">محصولات تازه و ارگانیک از مزارع مستقیم</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100">
                            <div className="text-xs text-gray-500">کل محصولات</div>
                            <div className="text-xl font-bold text-gray-800">{stats.total}</div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100">
                            <div className="text-xs text-gray-500">سبد خرید</div>
                            <div className="text-xl font-bold text-gray-800">{cart.length} عدد</div>
                        </div>
                    </div>
                </div>

                {/* آمار */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-500">ارگانیک</div>
                                <div className="text-lg font-bold text-green-600">{stats.organic}</div>
                            </div>
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                <Shield className="text-green-600" size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-500">تخفیف دار</div>
                                <div className="text-lg font-bold text-red-500">{stats.discount}</div>
                            </div>
                            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                <TrendingUp className="text-red-500" size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-500">امتیاز بالا</div>
                                <div className="text-lg font-bold text-yellow-600">{stats.highScore}</div>
                            </div>
                            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <Star className="text-yellow-600" size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-500">تحویل سریع</div>
                                <div className="text-lg font-bold text-blue-600">{products.filter(p => p.deliveryTime === '1 روز').length}</div>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Truck className="text-blue-600" size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* جستجو و فیلتر */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="relative">
                            <Search className="absolute right-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="جستجوی محصول..."
                                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300 transition-all"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>

                        <select
                            className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300 transition-all"
                            value={filterCity}
                            onChange={e => setFilterCity(e.target.value)}
                        >
                            <option value="">همه شهرها</option>
                            {Array.from(new Set(products.map(p => p.city))).map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>

                        <select
                            className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300 transition-all"
                            value={filterCategory}
                            onChange={e => setFilterCategory(e.target.value)}
                        >
                            <option value="">همه دسته‌ها</option>
                            {Array.from(new Set(products.map(p => p.category))).map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>

                        <select
                            className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300 transition-all"
                            value={sortOption}
                            onChange={e => setSortOption(e.target.value)}
                        >
                            <option value="">مرتب‌سازی</option>
                            <option value="price-asc">قیمت صعودی</option>
                            <option value="price-desc">قیمت نزولی</option>
                            <option value="score-desc">امتیاز نزولی</option>
                        </select>

                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            <Filter size={20} />
                            اعمال فیلتر
                        </button>
                    </div>
                </div>
            </div>

            {/* کارت محصولات */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                {displayedProducts.map((product, idx) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-green-100"
                    >
                        {/* تصویر محصول */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />

                            {/* Badge ها */}
                            <div className="absolute top-3 right-3 flex flex-col gap-2">
                                {product.discount && (
                                    <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                        {product.discount}% تخفیف
                                    </div>
                                )}
                                {product.organic && (
                                    <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                        ارگانیک
                                    </div>
                                )}
                            </div>

                            <div className="absolute top-3 left-3">
                                {product.stock <= 5 && (
                                    <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                        موجودی کم
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* محتوای کارت */}
                        <div className="p-4">
                            {/* عنوان و امتیاز */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">{product.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <MapPin size={14} />
                                        <span>{product.seller}</span>
                                        <span className="text-green-600">•</span>
                                        <span>{product.city}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                                    <Star size={14} className="text-yellow-500 fill-current" />
                                    <span className="text-sm font-bold text-gray-700">{product.score}</span>
                                </div>
                            </div>

                            {/* قیمت */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-2xl font-bold text-green-600">
                                    {product.price.toLocaleString()}
                                </span>
                                <span className="text-lg">تومان</span>
                                {product.oldPrice && (
                                    <span className="text-sm text-gray-400 line-through">
                                        {product.oldPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>

                            {/* اطلاعات اضافی */}
                            <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                                <div className="flex items-center gap-1 text-gray-600">
                                    <Clock size={12} />
                                    <span>تحویل: {product.deliveryTime}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600">
                                    <Star size={12} />
                                    <span>فروشنده: {product.sellerScore}</span>
                                </div>
                            </div>

                            {/* پیشنهاد AI */}
                            <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4">
                                <div className="text-xs text-green-700 leading-relaxed">
                                    {getAISuggestion(product)}
                                </div>
                            </div>

                            {/* دکمه‌های اقدام */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => addToCart(product.id)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow hover:shadow-lg transition-all hover:scale-105"
                                >
                                    <ShoppingCart size={16} />
                                    <span className="font-medium">افزودن به سبد</span>
                                </button>

                                <button
                                    onClick={() => toggleWatchlist(product.id)}
                                    className={`p-3 rounded-xl border transition-all hover:scale-110 ${watchlist.includes(product.id)
                                            ? "bg-yellow-100 border-yellow-300 text-yellow-600"
                                            : "bg-white border-gray-200 text-gray-400 hover:border-yellow-300 hover:text-yellow-500"
                                        }`}
                                >
                                    <Heart
                                        size={18}
                                        className={watchlist.includes(product.id) ? "fill-current" : ""}
                                    />
                                </button>

                                <button
                                    onClick={() => setSelectedProduct(product)}
                                    className="p-3 rounded-xl bg-white border border-gray-200 text-gray-400 hover:border-green-300 hover:text-green-500 transition-all hover:scale-110"
                                >
                                    <Eye size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                    <button
                        className="px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    >
                        قبلی
                    </button>

                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            className={`px-4 py-3 rounded-xl transition-all font-medium ${currentPage === idx + 1
                                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                                    : "bg-white border border-gray-300 hover:bg-gray-50 shadow-sm"
                                }`}
                            onClick={() => setCurrentPage(idx + 1)}
                        >
                            {idx + 1}
                        </button>
                    ))}

                    <button
                        className="px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    >
                        بعدی
                    </button>
                </div>
            )}

            {/* مودال جزئیات محصول */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedProduct(null)} />
                    <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative z-10">
                        <div className="relative">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full h-64 object-cover"
                            />
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-4 left-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all hover:scale-110"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h2>
                                    <div className="flex items-center gap-4 text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} />
                                            <span>{selectedProduct.seller} - {selectedProduct.city}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star size={16} className="text-yellow-500 fill-current" />
                                            <span className="font-bold">{selectedProduct.score}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-green-600">
                                        {selectedProduct.price.toLocaleString()}
                                    </div>
                                    <div className="text-lg text-gray-500">تومان</div>
                                    {selectedProduct.oldPrice && (
                                        <div className="text-sm text-gray-400 line-through">
                                            {selectedProduct.oldPrice.toLocaleString()} تومان
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-green-50 p-4 rounded-2xl text-center">
                                    <div className="text-sm text-gray-500 mb-1">موجودی</div>
                                    <div className="text-xl font-bold text-green-600">{selectedProduct.stock}</div>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-2xl text-center">
                                    <div className="text-sm text-gray-500 mb-1">تحویل</div>
                                    <div className="text-xl font-bold text-blue-600">{selectedProduct.deliveryTime}</div>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-2xl text-center">
                                    <div className="text-sm text-gray-500 mb-1">امتیاز فروشنده</div>
                                    <div className="text-xl font-bold text-yellow-600">{selectedProduct.sellerScore}</div>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-2xl text-center">
                                    <div className="text-sm text-gray-500 mb-1">دسته‌بندی</div>
                                    <div className="text-xl font-bold text-purple-600">{selectedProduct.category}</div>
                                </div>
                            </div>

                            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
                                <h4 className="font-bold text-green-800 mb-2">💡 پیشنهاد هوش مصنوعی</h4>
                                <p className="text-green-700">{getAISuggestion(selectedProduct)}</p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        addToCart(selectedProduct.id);
                                        setSelectedProduct(null);
                                    }}
                                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                >
                                    <ShoppingCart size={20} />
                                    <span className="font-bold text-lg">افزودن به سبد خرید</span>
                                </button>
                                <button
                                    onClick={() => toggleWatchlist(selectedProduct.id)}
                                    className={`px-6 py-4 rounded-2xl border transition-all ${watchlist.includes(selectedProduct.id)
                                            ? "bg-yellow-100 border-yellow-300 text-yellow-600"
                                            : "bg-white border-gray-200 text-gray-400 hover:border-yellow-300"
                                        }`}
                                >
                                    <Heart
                                        size={20}
                                        className={watchlist.includes(selectedProduct.id) ? "fill-current" : ""}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarketPlace;