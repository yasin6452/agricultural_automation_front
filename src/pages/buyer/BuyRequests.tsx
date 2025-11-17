// src/pages/buyer/BuyRequests.tsx
import  { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface Offer {
    id: number;
    seller: string;
    price: number;
    oldPrice?: number;
    score: number;
    stock: number;
    accepted?: boolean;
    aiSuggested?: boolean; // پیشنهاد AI
}

interface Request {
    id: number;
    product: string;
    quantity: number;
    unit: string;
    description: string;
    status: 'Pending' | 'Accepted' | 'Completed';
    offers: Offer[];
}

const BuyRequestsAI = () => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [unit, setUnit] = useState('کیلوگرم');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setRequests([
            {
                id: 1,
                product: 'سیب',
                quantity: 100,
                unit: 'کیلوگرم',
                description: 'برای بازار تره بار',
                status: 'Pending',
                offers: [
                    { id: 1, seller: 'کشاورز A', price: 12000, oldPrice: 13000, score: 4.8, stock: 50 },
                    { id: 2, seller: 'کشاورز B', price: 11800, oldPrice: 12000, score: 4.6, stock: 30 },
                ]
            }
        ]);
    }, []);

    const addRequest = () => {
        if (!product || quantity <= 0) return toast.error('لطفا همه فیلدها را پر کنید');
        const newReq: Request = {
            id: Date.now(),
            product,
            quantity,
            unit,
            description,
            status: 'Pending',
            offers: []
        };

        // شبیه‌سازی پیشنهاد AI
        const aiOffers: Offer[] = [
            { id: Date.now() + 1, seller: 'کشاورز AI1', price: Math.floor(Math.random() * 2000) + 11000, score: 4.7, stock: 40, aiSuggested: true },
            { id: Date.now() + 2, seller: 'کشاورز AI2', price: Math.floor(Math.random() * 2000) + 11500, score: 4.8, stock: 60, aiSuggested: true },
        ];
        newReq.offers = aiOffers;

        setRequests(prev => [newReq, ...prev]);
        setProduct(''); setQuantity(0); setUnit('کیلوگرم'); setDescription('');
        toast.success('درخواست خرید ثبت شد و پیشنهادات AI ارائه شد!');
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
        toast.success('پیشنهاد پذیرفته شد!');
    };

    // شبیه‌سازی هشدار کاهش قیمت (AI یا کشاورز)
    useEffect(() => {
        requests.forEach(req => {
            req.offers.forEach(offer => {
                if (offer.oldPrice && offer.price < offer.oldPrice) {
                    toast.success(`💚 قیمت ${offer.seller} کاهش یافت! جدید: ${offer.price.toLocaleString()} تومان`);
                }
            });
        });
    }, [requests]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Toaster position="top-right" />
            <h1 className="text-2xl font-bold mb-4">سیستم مناقصه معکوس هوشمند (AI)</h1>

            {/* فرم ثبت درخواست */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-2">ثبت درخواست خرید جدید</h2>
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                    <input type="text" placeholder="نام محصول" value={product} onChange={e => setProduct(e.target.value)} className="border px-3 py-2 rounded w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-green-400" />
                    <input type="number" placeholder="مقدار" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="border px-3 py-2 rounded w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-green-400" />
                    <select value={unit} onChange={e => setUnit(e.target.value)} className="border px-3 py-2 rounded w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-green-400">
                        <option>کیلوگرم</option>
                        <option>تن</option>
                        <option>عدد</option>
                    </select>
                    <input type="text" placeholder="توضیحات" value={description} onChange={e => setDescription(e.target.value)} className="border px-3 py-2 rounded w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
                <button onClick={addRequest} className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">ثبت درخواست</button>
            </div>

            {/* لیست درخواست‌ها */}
            {requests.map(req => (
                <div key={req.id} className="bg-white p-4 rounded-lg shadow mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold">{req.product} - {req.quantity} {req.unit}</h2>
                        <span className={`px-2 py-1 rounded ${req.status === 'Pending' ? 'bg-yellow-200' : req.status === 'Accepted' ? 'bg-green-200' : 'bg-gray-300'}`}>
                            {req.status}
                        </span>
                    </div>
                    <p className="text-gray-600 mb-2">{req.description}</p>

                    {/* لیست پیشنهادها */}
                    {req.offers.length > 0 ? (
                        <table className="min-w-full text-right border-t">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-2">کشاورز</th>
                                    <th className="px-4 py-2">قیمت</th>
                                    <th className="px-4 py-2">امتیاز</th>
                                    <th className="px-4 py-2">موجودی</th>
                                    <th className="px-4 py-2">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {req.offers.map(offer => (
                                    <tr key={offer.id} className="border-b hover:bg-gray-50 transition">
                                        <td className="px-4 py-2">{offer.seller} {offer.aiSuggested && <span className="text-green-600 font-bold">(AI)</span>}</td>
                                        <td className="px-4 py-2">
                                            <span className={offer.oldPrice && offer.price < offer.oldPrice ? 'text-green-600' : ''}>
                                                {offer.price.toLocaleString()}
                                            </span>
                                            {offer.oldPrice && <span className="line-through text-gray-400 ml-2">{offer.oldPrice.toLocaleString()}</span>}
                                            {offer.oldPrice && offer.price < offer.oldPrice && <span className="ml-1 text-green-500">↓</span>}
                                        </td>
                                        <td className="px-4 py-2">⭐ {offer.score}</td>
                                        <td className="px-4 py-2">{offer.stock}</td>
                                        <td className="px-4 py-2">
                                            {req.status === 'Pending' && (
                                                <button onClick={() => acceptOffer(req.id, offer.id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
                                                    انتخاب
                                                </button>
                                            )}
                                            {offer.accepted && <span className="text-green-600 font-bold">پذیرفته شد</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">هنوز پیشنهادی دریافت نشده</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default BuyRequestsAI;
