// src/pages/buyer/Overview.tsx
import { useState, useEffect } from 'react';

interface Product {
    id: number;
    name: string;
    city: string;
    brand: string;
    score: number;
    price: number;
    oldPrice?: number;
    trend: number[];
    stock: number;
    expirationDays?: number;
}

const Overview = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [watchlist, setWatchlist] = useState<number[]>([]);

    useEffect(() => {
        setProducts([
            {
                id: 1,
                name: 'سیب',
                city: 'دماوند',
                brand: 'کیفیت عالی',
                score: 4.8,
                price: 12000,
                oldPrice: 15000,
                trend: [14000, 13800, 13500, 13200, 13000, 12800, 12500, 12300, 12000, 12000],
                stock: 50,
                expirationDays: 5
            },
            {
                id: 2,
                name: 'برنج',
                city: 'گیلان',
                brand: 'برند ملی',
                score: 4.9,
                price: 25000,
                oldPrice: 27000,
                trend: [27000, 26800, 26500, 26000, 25500, 25300, 25000],
                stock: 10
            },
            {
                id: 3,
                name: 'زعفران',
                city: 'خراسان',
                brand: 'برترین کیفیت',
                score: 5.0,
                price: 120000,
                trend: [130000, 128000, 125000, 123000, 120000],
                stock: 2,
                expirationDays: 2
            }
        ]);
    }, []);

    const toggleWatchlist = (id: number) => {
        setWatchlist(prev =>
            prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
        );
    };

    const isPriceDrop = (product: Product) => product.oldPrice && product.price < product.oldPrice;

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* محتوای اصلی */}
            <main className="flex-1 p-6">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Overview</h1>
                    <input
                        type="text"
                        placeholder="جستجوی محصول..."
                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="relative bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                            {isPriceDrop(product) && (
                                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    🔻 کاهش قیمت
                                </span>
                            )}
                            {product.expirationDays && product.expirationDays <= 3 && (
                                <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full">
                                    ⚠️ نزدیک به انقضا
                                </span>
                            )}
                            <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
                            <p className="text-gray-500 mb-1">{product.city} - {product.brand}</p>
                            <p className="text-yellow-500 font-bold mb-2">⭐ {product.score}</p>
                            <div className="mb-2">
                                <span className="text-green-600 font-bold">{product.price.toLocaleString()} تومان</span>
                                {product.oldPrice && (
                                    <span className="line-through text-gray-400 ml-2">{product.oldPrice.toLocaleString()}</span>
                                )}
                            </div>
                            <div className="flex space-x-1 mt-2">
                                {product.trend.map((price, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-blue-400 w-2"
                                        style={{ height: `${(price / Math.max(...product.trend)) * 20}px` }}
                                    />
                                ))}
                            </div>
                            {product.stock <= 5 && (
                                <p className="text-red-500 mt-2 text-sm font-semibold">⚠️ موجودی کم: {product.stock} عدد</p>
                            )}
                            <div className="mt-4 flex justify-between">
                                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                                    خرید سریع
                                </button>
                                <button
                                    className={`px-4 py-2 rounded transition ${watchlist.includes(product.id)
                                            ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                        }`}
                                    onClick={() => toggleWatchlist(product.id)}
                                >
                                    {watchlist.includes(product.id) ? '✅ در Watchlist' : 'Watchlist'}
                                </button>
                            </div>
                            <div className="mt-3 bg-gray-50 p-2 rounded text-sm text-gray-700">
                                پیشنهاد AI: خرید {product.name} الان مناسب است.
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default Overview;
