// src/pages/buyer/MarketPlace.tsx
import  { useState, useEffect } from 'react';

interface Product {
    id: number;
    name: string;
    city: string;
    brand: string;
    score: number;
    price: number;
    oldPrice?: number;
    stock: number;
    expirationDays?: number;
    trend: number[]; // قیمت روزانه یا هفتگی
}

const MarketPlace = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState('');
    const [filterCity, setFilterCity] = useState('');
    const [filterBrand, setFilterBrand] = useState('');
    const [filterStock, setFilterStock] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [watchlist, setWatchlist] = useState<number[]>([]);

    const itemsPerPage = 6;

    useEffect(() => {
        setProducts([
            { id: 1, name: 'سیب', city: 'دماوند', brand: 'کیفیت عالی', score: 4.8, price: 12000, oldPrice: 15000, stock: 50, expirationDays: 5, trend: [14000, 13800, 13500, 13200, 13000, 12800, 12500, 12300, 12000, 12000] },
            { id: 2, name: 'برنج', city: 'گیلان', brand: 'برند ملی', score: 4.9, price: 25000, oldPrice: 27000, stock: 10, trend: [27000, 26800, 26500, 26000, 25500, 25300, 25000] },
            { id: 3, name: 'زعفران', city: 'خراسان', brand: 'برترین کیفیت', score: 5.0, price: 120000, stock: 2, expirationDays: 2, trend: [130000, 128000, 125000, 123000, 120000] },
            { id: 4, name: 'هویج', city: 'قم', brand: 'محلی', score: 4.5, price: 8000, stock: 20, trend: [9000, 8800, 8600, 8400, 8200, 8000] },
        ]);
    }, []);

    const toggleWatchlist = (id: number) => {
        setWatchlist(prev => prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]);
    };

    // فیلتر پیشرفته
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (filterCity ? product.city === filterCity : true) &&
        (filterBrand ? product.brand === filterBrand : true) &&
        (filterStock === 'low' ? product.stock <= 5 : filterStock === 'medium' ? product.stock > 5 && product.stock <= 20 : filterStock === 'high' ? product.stock > 20 : true)
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

    // تابع تولید پیشنهاد AI ساده بر اساس روند قیمت
    const getAISuggestion = (product: Product) => {
        const trend = product.trend;
        if (trend.length < 2) return 'پیشنهاد AI: اطلاعات کافی نیست';
        const diff = trend[trend.length - 1] - trend[trend.length - 2];
        if (diff < 0) return '💡 قیمت کاهش یافته، اکنون بهترین زمان خرید است!';
        if (diff > 0) return '⚠️ قیمت در حال افزایش است، خرید زودتر توصیه می‌شود';
        return '🔹 قیمت پایدار است';
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* سایدبار */}
            <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
                <h2 className="text-xl font-bold mb-6">پنل خریدار</h2>
                <nav className="flex flex-col space-y-3">
                    {['Overview', 'MarketPlace', 'PriceComparison', 'BuyRequests', 'Watchlist', 'MyOrders', 'Analytics', 'Suppliers', 'Messages', 'Settings'].map((item) => (
                        <a key={item} href="#" className={`px-4 py-2 rounded hover:bg-green-100 transition ${item === 'MarketPlace' ? 'bg-green-100 font-semibold' : ''}`}>
                            {item}
                        </a>
                    ))}
                </nav>
            </aside>

            {/* محتوای اصلی */}
            <main className="flex-1 p-6">
                {/* جستجو و فیلتر */}
                <header className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                    <input
                        type="text"
                        placeholder="جستجوی محصول..."
                        className="border rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-400"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <div className="flex flex-wrap gap-2">
                        <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" value={filterCity} onChange={e => setFilterCity(e.target.value)}>
                            <option value="">همه شهرها</option>
                            {Array.from(new Set(products.map(p => p.city))).map(city => <option key={city} value={city}>{city}</option>)}
                        </select>
                        <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" value={filterBrand} onChange={e => setFilterBrand(e.target.value)}>
                            <option value="">همه برندها</option>
                            {Array.from(new Set(products.map(p => p.brand))).map(brand => <option key={brand} value={brand}>{brand}</option>)}
                        </select>
                        <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" value={filterStock} onChange={e => setFilterStock(e.target.value)}>
                            <option value="">همه موجودی‌ها</option>
                            <option value="low">کم (≤5)</option>
                            <option value="medium">متوسط (6-20)</option>
                            <option value="high">زیاد (20)</option>
                        </select>
                        <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" value={sortOption} onChange={e => setSortOption(e.target.value)}>
                            <option value="">مرتب‌سازی</option>
                            <option value="price-asc">قیمت صعودی</option>
                            <option value="price-desc">قیمت نزولی</option>
                            <option value="score-desc">امتیاز ⭐ نزولی</option>
                            <option value="score-asc">امتیاز ⭐ صعودی</option>
                        </select>
                    </div>
                </header>

                {/* کارت محصولات */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedProducts.map(product => (
                        <div key={product.id} className="relative bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                            {product.stock <= 5 && <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">⚠️ موجودی کم</span>}
                            {product.expirationDays && product.expirationDays <= 3 && <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full">⚠️ نزدیک به انقضا</span>}

                            <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
                            <p className="text-gray-500 mb-1">{product.city} - {product.brand}</p>
                            <p className="text-yellow-500 font-bold mb-2">⭐ {product.score}</p>
                            <div className="mb-2">
                                <span className="text-green-600 font-bold">{product.price.toLocaleString()} تومان</span>
                                {product.oldPrice && <span className="line-through text-gray-400 ml-2">{product.oldPrice.toLocaleString()}</span>}
                            </div>

                            {/* نمودار روند قیمت ساده */}
                            <div className="flex space-x-1 mt-2 mb-2 h-10 items-end">
                                {product.trend.map((price, idx) => (
                                    <div key={idx} className="bg-blue-400 w-2 rounded" style={{ height: `${(price / Math.max(...product.trend)) * 40}px` }} />
                                ))}
                            </div>

                            <div className="mt-4 flex justify-between">
                                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">خرید سریع</button>
                                <button
                                    className={`px-4 py-2 rounded transition ${watchlist.includes(product.id) ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
                                    onClick={() => toggleWatchlist(product.id)}
                                >
                                    {watchlist.includes(product.id) ? '✅ در Watchlist' : 'Watchlist'}
                                </button>
                            </div>

                            {/* پیشنهاد AI پیشرفته */}
                            <div className="mt-3 bg-gray-50 p-2 rounded text-sm text-gray-700">
                                {getAISuggestion(product)}
                            </div>
                        </div>
                    ))}
                </section>

                {/* Pagination */}
                <div className="mt-6 flex justify-center space-x-2">
                    <button className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>قبلی</button>
                    {[...Array(totalPages)].map((_, idx) => (
                        <button key={idx} className={`px-3 py-1 rounded ${currentPage === idx + 1 ? 'bg-green-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`} onClick={() => setCurrentPage(idx + 1)}>{idx + 1}</button>
                    ))}
                    <button className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>بعدی</button>
                </div>
            </main>
        </div>
    );
};

export default MarketPlace;
