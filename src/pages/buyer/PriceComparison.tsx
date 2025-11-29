import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Star, MapPin, Eye, Heart, ShoppingCart } from "lucide-react";

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

const PriceComparison: React.FC = () => {
    const [productName, setProductName] = useState("");
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [filterCity, setFilterCity] = useState("");
    const [filterBrand, setFilterBrand] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [watchlist, setWatchlist] = useState<number[]>([]);
    const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);

    useEffect(() => {
        setSellers([
            { id: 1, name: "فروشنده A", city: "دماوند", brand: "کیفیت عالی", price: 12000, oldPrice: 15000, score: 4.8, stock: 50 },
            { id: 2, name: "فروشنده B", city: "گیلان", brand: "برند ملی", price: 12500, oldPrice: 13000, score: 4.6, stock: 20 },
            { id: 3, name: "فروشنده C", city: "خراسان", brand: "برترین کیفیت", price: 11900, score: 5.0, stock: 5 },
            { id: 4, name: "فروشنده D", city: "قم", brand: "محلی", price: 12100, oldPrice: 12500, score: 4.4, stock: 15 },
        ]);
    }, []);

    // Toggle Watchlist
    const toggleWatchlist = (id: number) => {
        setWatchlist((prev) => {
            const newList = prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id];
            return newList;
        });
    };

    useEffect(() => {
        watchlist.forEach((id) => {
            const seller = sellers.find((s) => s.id === id);
            if (seller?.oldPrice && seller.price < seller.oldPrice) {
                toast.success(`💚 قیمت ${seller.name} کاهش یافت! جدید: ${seller.price.toLocaleString()} تومان`);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sellers, watchlist]);

    // filter & sort
    const filteredSellers = sellers.filter(
        (seller) => (filterCity ? seller.city === filterCity : true) && (filterBrand ? seller.brand === filterBrand : true)
    );

    const sortedSellers = [...filteredSellers].sort((a, b) => {
        switch (sortOption) {
            case "price-asc":
                return a.price - b.price;
            case "price-desc":
                return b.price - a.price;
            case "score-desc":
                return b.score - a.score;
            case "score-asc":
                return a.score - b.score;
            default:
                return 0;
        }
    });

    const maxPrice = Math.max(...sortedSellers.map((s) => s.price), 0);

    // simple AI ranking
    const getBestSeller = (list: Seller[]) => {
        if (list.length === 0) return null;
        return list.reduce((best, seller) => {
            const bestScore = (1000 / best.price) * 0.5 + best.score * 0.3 + Math.min(best.stock, 50) * 0.2;
            const sellerScore = (1000 / seller.price) * 0.5 + seller.score * 0.3 + Math.min(seller.stock, 50) * 0.2;
            return sellerScore > bestScore ? seller : best;
        });
    };

    const bestSeller = getBestSeller(sortedSellers);

    // stats
    const stats = {
        total: sellers.length,
        cheapest: sellers.length ? Math.min(...sellers.map((s) => s.price)) : 0,
        avgScore: sellers.length ? +(sellers.reduce((a, b) => a + b.score, 0) / sellers.length).toFixed(1) : 0,
    };

    return (
        <div className="min-h-screen  from-gray-50 to-gray-100 p-6">
            <Toaster position="top-right" />

            {/* header */}
            <header className="mb-6 animate-fadeIn">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                <ShoppingCart className="text-white" size={20} />
                            </div>
                            مقایسه قیمت
                        </h1>
                        <p className="text-gray-500 mt-1">به‌سرعت بهترین پیشنهاد را بین فروشندگان پیدا کنید</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-white p-3 rounded-xl shadow-sm">
                            <div className="text-xs text-gray-500">فروشنده‌ها</div>
                            <div className="text-lg font-bold text-gray-800">{stats.total}</div>
                        </div>
                        <div className="bg-white p-3 rounded-xl shadow-sm">
                            <div className="text-xs text-gray-500">کمترین قیمت</div>
                            <div className="text-lg font-bold text-gray-800">{stats.cheapest.toLocaleString()} تومان</div>
                        </div>
                        <div className="bg-white p-3 rounded-xl shadow-sm">
                            <div className="text-xs text-gray-500">میانگین امتیاز</div>
                            <div className="text-lg font-bold text-gray-800">{stats.avgScore} ⭐</div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* sidebar */}
                <aside className="lg:col-span-1 bg-white rounded-2xl p-5 shadow-md">
                    <h2 className="text-lg font-semibold mb-4">فیلترها</h2>

                    <div className="space-y-3">
                        <label className="block">
                            <div className="text-sm text-gray-600 mb-1">جستجوی محصول</div>
                            <input
                                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-300"
                                placeholder="مثلاً سیب"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </label>

                        <label className="block">
                            <div className="text-sm text-gray-600 mb-1">شهر</div>
                            <select
                                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-300"
                                value={filterCity}
                                onChange={(e) => setFilterCity(e.target.value)}
                            >
                                <option value="">همه شهرها</option>
                                {Array.from(new Set(sellers.map((s) => s.city))).map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="block">
                            <div className="text-sm text-gray-600 mb-1">برند</div>
                            <select
                                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-300"
                                value={filterBrand}
                                onChange={(e) => setFilterBrand(e.target.value)}
                            >
                                <option value="">همه برندها</option>
                                {Array.from(new Set(sellers.map((s) => s.brand))).map((brand) => (
                                    <option key={brand} value={brand}>
                                        {brand}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="block">
                            <div className="text-sm text-gray-600 mb-1">مرتب‌سازی</div>
                            <select
                                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-300"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="">بدون</option>
                                <option value="price-asc">قیمت صعودی</option>
                                <option value="price-desc">قیمت نزولی</option>
                                <option value="score-desc">امتیاز ⭐ نزولی</option>
                                <option value="score-asc">امتیاز ⭐ صعودی</option>
                            </select>
                        </label>

                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => {
                                    setFilterCity("");
                                    setFilterBrand("");
                                    setSortOption("");
                                }}
                                className="flex-1 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                            >
                                پاکسازی
                            </button>
                            <button
                                onClick={() => toast.success("فیلترها اعمال شد")}
                                className="flex-1 px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow"
                            >
                                اعمال
                            </button>
                        </div>
                    </div>
                </aside>

                {/* content */}
                <section className="lg:col-span-3">
                    {/* grid sellers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {sortedSellers.map((seller, idx) => {
                            const isBest = bestSeller?.id === seller.id;

                            return (
                                <article
                                    key={seller.id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group animate-scaleIn"
                                    style={{ animationDelay: `${idx * 0.06}s` }}
                                >
                                    <div className="p-4 border-b">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-800">{seller.name}</h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                                    <MapPin size={14} />
                                                    <span>{seller.city}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-2">
                                                {isBest && (
                                                    <div className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-semibold">پیشنهاد بهترین</div>
                                                )}

                                                <div className="text-sm text-gray-500">امتیاز</div>
                                                <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                                                    <Star size={14} className="text-yellow-500" /> {seller.score}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className={`text-2xl font-bold ${isBest ? "text-green-600" : "text-gray-800"}`}> {seller.price.toLocaleString()} تومان</div>
                                                {seller.oldPrice && (
                                                    <div className="text-sm text-gray-400 line-through mt-1">{seller.oldPrice.toLocaleString()} تومان</div>
                                                )}
                                            </div>

                                            <div className="text-sm text-gray-500 text-right">
                                                <div>موجودی: <span className="font-semibold text-gray-800">{seller.stock}</span></div>
                                                <div className="mt-2"><span className="text-gray-500">برند: </span><span className="font-medium">{seller.brand}</span></div>
                                            </div>
                                        </div>

                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`${isBest ? "bg-green-500" : "bg-blue-500"} h-2 rounded-full transition-all`}
                                                style={{ width: `${(seller.price / (maxPrice || 1)) * 100}%` }}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => toggleWatchlist(seller.id)}
                                                    className={`px-3 py-1 rounded-md text-sm font-medium transition ${watchlist.includes(seller.id) ? "bg-yellow-400 text-black" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                                                >
                                                    <Heart size={14} className="inline-block" /> {watchlist.includes(seller.id) ? "اضافه شده" : "اضافه"}
                                                </button>

                                                <button
                                                    onClick={() => setSelectedSeller(seller)}
                                                    className="px-3 py-1 rounded-md bg-white border text-gray-700 hover:bg-gray-50 transition text-sm"
                                                >
                                                    <Eye size={14} className="inline-block" /> جزئیات
                                                </button>
                                            </div>

                                            <button className="px-3 py-1 rounded-md bg-gradient-to-r from-green-500 to-green-600 text-white shadow text-sm flex items-center gap-2">
                                                <ShoppingCart size={14} /> خرید
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {/* price chart (mini) */}
                    <div className="mt-6 bg-white p-4 rounded-2xl shadow-md">
                        <h3 className="text-lg font-semibold mb-3">نمودار مقایسه قیمت</h3>
                        <div className="flex items-end h-48 gap-4">
                            {sortedSellers.map((s) => (
                                <div key={s.id} className="flex-1 flex flex-col items-center">
                                    <div
                                        className={`w-12 rounded-t ${bestSeller?.id === s.id ? "bg-green-500" : "bg-blue-500"}`}
                                        style={{ height: `${(s.price / (maxPrice || 1)) * 100}%` }}
                                    />
                                    <div className="mt-2 text-sm text-gray-700">{s.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* seller modal */}
            {selectedSeller && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedSeller(null)} />
                    <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 relative z-10">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">{selectedSeller.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1"><MapPin size={14} /> {selectedSeller.city}</div>
                            </div>
                            <button onClick={() => setSelectedSeller(null)} className="text-gray-400 hover:text-gray-600">بستن</button>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-xs text-gray-500">قیمت</div>
                                <div className="text-lg font-bold">{selectedSeller.price.toLocaleString()} تومان</div>
                                {selectedSeller.oldPrice && <div className="text-sm text-gray-400 line-through">{selectedSeller.oldPrice.toLocaleString()} تومان</div>}
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-xs text-gray-500">موجودی</div>
                                <div className="text-lg font-bold">{selectedSeller.stock}</div>
                                <div className="text-sm text-gray-500 mt-2">امتیاز: {selectedSeller.score} ⭐</div>
                            </div>
                        </div>

                        <div className="mt-4 text-gray-600">
                            <p>برند: <strong>{selectedSeller.brand}</strong></p>
                            <p className="mt-2">توضیحات بیشتر درباره فروشنده و شرایط ارسال، تخفیف‌ها و زمان تحویل در اینجا نمایش داده می‌شود.</p>
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <button onClick={() => setSelectedSeller(null)} className="px-4 py-2 rounded-md bg-gray-100">انصراف</button>
                            <button onClick={() => toast.success('به سبد اضافه شد')} className="px-4 py-2 rounded-md bg-gradient-to-r from-green-500 to-green-600 text-white">افزودن به سبد</button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(.98) } to { opacity: 1; transform: scale(1) } }
        .animate-fadeIn { animation: fadeIn 0.45s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.36s ease-out; }
      `}</style>
        </div>
    );
};

export default PriceComparison;