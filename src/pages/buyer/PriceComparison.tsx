// src/pages/buyer/PriceComparison.tsx
import  { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface Seller {
    id: number;
    name: string;
    city: string;
    brand: string;
    price: number;
    oldPrice?: number;
    score: number;
    stock: number;
}

const PriceComparison = () => {
    const [productName, setProductName] = useState('');
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [filterCity, setFilterCity] = useState('');
    const [filterBrand, setFilterBrand] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [watchlist, setWatchlist] = useState<number[]>([]);

    useEffect(() => {
        // داده نمونه اولیه
        setSellers([
            { id: 1, name: 'فروشنده A', city: 'دماوند', brand: 'کیفیت عالی', price: 12000, oldPrice: 15000, score: 4.8, stock: 50 },
            { id: 2, name: 'فروشنده B', city: 'گیلان', brand: 'برند ملی', price: 12500, oldPrice: 13000, score: 4.6, stock: 20 },
            { id: 3, name: 'فروشنده C', city: 'خراسان', brand: 'برترین کیفیت', price: 11900, score: 5.0, stock: 5 },
            { id: 4, name: 'فروشنده D', city: 'قم', brand: 'محلی', price: 12100, oldPrice: 12500, score: 4.4, stock: 15 },
        ]);
    }, []);

    // Toggle Watchlist
    const toggleWatchlist = (id: number) => {
        setWatchlist(prev => {
            const newList = prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id];
            return newList;
        });
    };

    // شبیه‌سازی بررسی کاهش قیمت و نوتیفیکیشن
    useEffect(() => {
        watchlist.forEach(id => {
            const seller = sellers.find(s => s.id === id);
            if (seller?.oldPrice && seller.price < seller.oldPrice) {
                toast.success(`💚 قیمت ${seller.name} کاهش یافت! جدید: ${seller.price.toLocaleString()} تومان`);
            }
        });
    }, [sellers, watchlist]);

    // فیلتر و مرتب‌سازی
    const filteredSellers = sellers.filter(seller =>
        (filterCity ? seller.city === filterCity : true) &&
        (filterBrand ? seller.brand === filterBrand : true)
    );
    const sortedSellers = [...filteredSellers].sort((a, b) => {
        switch (sortOption) {
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            case 'score-desc': return b.score - a.score;
            case 'score-asc': return a.score - b.score;
            default: return 0;
        }
    });
    const maxPrice = Math.max(...sortedSellers.map(s => s.price), 0);

    // بهترین فروشنده با AI
    const getBestSeller = (sellers: Seller[]) => {
        if (sellers.length === 0) return null;
        return sellers.reduce((best, seller) => {
            const bestScore = (1000 / best.price) * 0.5 + best.score * 0.3 + Math.min(best.stock, 50) * 0.2;
            const sellerScore = (1000 / seller.price) * 0.5 + seller.score * 0.3 + Math.min(seller.stock, 50) * 0.2;
            return sellerScore > bestScore ? seller : best;
        });
    };
    const bestSeller = getBestSeller(sortedSellers);

    return (
        <div className="min-h-screen flex bg-gray-100">
            <Toaster position="top-right" />
            {/* سایدبار */}
            <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
                <h2 className="text-xl font-bold mb-6">پنل خریدار</h2>
                <nav className="flex flex-col space-y-3">
                    {['Overview', 'MarketPlace', 'PriceComparison', 'BuyRequests', 'Watchlist', 'MyOrders', 'Analytics', 'Suppliers', 'Messages', 'Settings'].map((item) => (
                        <a key={item} href="#" className={`px-4 py-2 rounded hover:bg-green-100 transition ${item === 'PriceComparison' ? 'bg-green-100 font-semibold' : ''}`}>
                            {item}
                        </a>
                    ))}
                </nav>
            </aside>

            {/* محتوای اصلی */}
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">مقایسه قیمت: {productName || 'انتخاب محصول'}</h1>

                {/* انتخاب محصول و فیلترها */}
                <div className="mb-4 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
                    <input
                        type="text"
                        placeholder="نام محصول را وارد کنید..."
                        className="border rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-400"
                        value={productName}
                        onChange={e => setProductName(e.target.value)}
                    />
                    <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" value={filterCity} onChange={e => setFilterCity(e.target.value)}>
                        <option value="">همه شهرها</option>
                        {Array.from(new Set(sellers.map(s => s.city))).map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                    <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" value={filterBrand} onChange={e => setFilterBrand(e.target.value)}>
                        <option value="">همه برندها</option>
                        {Array.from(new Set(sellers.map(s => s.brand))).map(brand => <option key={brand} value={brand}>{brand}</option>)}
                    </select>
                    <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" value={sortOption} onChange={e => setSortOption(e.target.value)}>
                        <option value="">مرتب‌سازی</option>
                        <option value="price-asc">قیمت صعودی</option>
                        <option value="price-desc">قیمت نزولی</option>
                        <option value="score-desc">امتیاز ⭐ نزولی</option>
                        <option value="score-asc">امتیاز ⭐ صعودی</option>
                    </select>
                </div>

                {/* جدول فروشندگان */}
                <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
                    <table className="min-w-full text-right">
                        <thead>
                            <tr className="border-b">
                                <th className="px-4 py-2 text-gray-700">فروشنده</th>
                                <th className="px-4 py-2 text-gray-700">شهر</th>
                                <th className="px-4 py-2 text-gray-700">برند</th>
                                <th className="px-4 py-2 text-gray-700">قیمت</th>
                                <th className="px-4 py-2 text-gray-700">امتیاز</th>
                                <th className="px-4 py-2 text-gray-700">موجودی</th>
                                <th className="px-4 py-2 text-gray-700">Watchlist</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedSellers.map(seller => (
                                <tr key={seller.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="px-4 py-2">{seller.name}</td>
                                    <td className="px-4 py-2">{seller.city}</td>
                                    <td className="px-4 py-2">{seller.brand}</td>
                                    <td className={`px-4 py-2 ${bestSeller?.id === seller.id ? 'bg-green-100 font-bold' : ''}`}>
                                        <span className={seller.oldPrice && seller.price < seller.oldPrice ? 'text-green-600' : ''}>
                                            {seller.price.toLocaleString()} تومان
                                        </span>
                                        {seller.oldPrice && <span className="line-through text-gray-400 ml-2">{seller.oldPrice.toLocaleString()}</span>}
                                        {seller.oldPrice && seller.price < seller.oldPrice && <span className="ml-1 text-green-500">↓</span>}
                                    </td>
                                    <td className="px-4 py-2">⭐ {seller.score}</td>
                                    <td className="px-4 py-2">{seller.stock}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            className={`px-3 py-1 rounded transition ${watchlist.includes(seller.id) ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
                                            onClick={() => toggleWatchlist(seller.id)}
                                        >
                                            {watchlist.includes(seller.id) ? '✅ اضافه شده' : 'اضافه'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* نمودار مقایسه قیمت */}
                <div className="mt-6 bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">نمودار مقایسه قیمت</h2>
                    <div className="flex items-end h-48 space-x-2">
                        {sortedSellers.map(seller => (
                            <div key={seller.id} className="flex-1 flex flex-col justify-end items-center">
                                <div className={`w-8 rounded-t ${bestSeller?.id === seller.id ? 'bg-green-500' : 'bg-blue-500'}`} style={{ height: `${(seller.price / maxPrice) * 100}%` }} />
                                <span className="mt-1 text-sm">{seller.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PriceComparison;
