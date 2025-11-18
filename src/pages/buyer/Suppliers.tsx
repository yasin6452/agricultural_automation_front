import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Toaster, toast } from 'react-hot-toast';
import { Truck, MapPin, Clock, DollarSign, Star, Navigation, Phone, MessageCircle } from 'lucide-react';
import { Badge } from 'antd';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Supplier {
    id: number;
    name: string;
    latLng: [number, number];
    deliveryCost: number;
    rating: number;
    products: string[];
    deliveryTime: string;
    contact: string;
    image: string;
    organic: boolean;
    verified: boolean;
}

// موقعیت خریدار
const BuyersLatLng: [number, number] = [35.700, 51.400];

const Suppliers: React.FC = () => {
    const [suppliers] = useState<Supplier[]>([
        {
            id: 1,
            name: 'مزرعه سبز',
            latLng: [35.701, 51.338],
            deliveryCost: 15000,
            rating: 4.8,
            products: ['سیب', 'گوجه', 'هویج'],
            deliveryTime: '1-2 روز',
            contact: '09123456789',
            image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&h=200&fit=crop',
            organic: true,
            verified: true
        },
        {
            id: 2,
            name: 'کشاورز نمونه',
            latLng: [35.710, 51.420],
            deliveryCost: 25000,
            rating: 4.6,
            products: ['برنج', 'گردو', 'انار'],
            deliveryTime: '2-3 روز',
            contact: '09129876543',
            image: 'https://images.unsplash.com/photo-1625246335526-044a2fcac73c?w=300&h=200&fit=crop',
            organic: false,
            verified: true
        },
        {
            id: 3,
            name: 'باغ مرکبات',
            latLng: [35.720, 51.390],
            deliveryCost: 18000,
            rating: 4.9,
            products: ['پرتقال', 'نارنگی', 'لیمو'],
            deliveryTime: '1 روز',
            contact: '09127654321',
            image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
            organic: true,
            verified: true
        },
        {
            id: 4,
            name: 'مزرعه ارگانیک',
            latLng: [35.690, 51.380],
            deliveryCost: 22000,
            rating: 4.7,
            products: ['سبزیجات', 'صیفی‌جات', 'ادویه'],
            deliveryTime: '2 روز',
            contact: '09128765432',
            image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=300&h=200&fit=crop',
            organic: true,
            verified: false
        },
    ]);

    const [routes, setRoutes] = useState<{ [key: number]: [number, number][] }>({});
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

    // محاسبه فاصله تقریبی با Haversine
    const calculateDistance = (from: [number, number], to: [number, number]) => {
        const [lat1, lon1] = from;
        const [lat2, lon2] = to;
        const R = 6371; // km
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const calculateDeliveryTime = (distance: number) => {
        const speed = 40; // km/h
        const hours = distance / speed;
        return `${Math.floor(hours)} ساعت و ${Math.round((hours % 1) * 60)} دقیقه`;
    };

    const calculateSmartDeliveryCost = (distance: number, baseCost: number) => {
        return baseCost + distance * 2000; // 2000 تومان به ازای هر km
    };

    const generateRoute = (supplier: Supplier) => {
        const coords: [number, number][] = [supplier.latLng, BuyersLatLng];
        setRoutes((prev) => ({ ...prev, [supplier.id]: coords }));
        toast.success(`مسیر ${supplier.name} آماده شد!`);
    };

    const stats = {
        total: suppliers.length,
        organic: suppliers.filter(s => s.organic).length,
        verified: suppliers.filter(s => s.verified).length,
        highRating: suppliers.filter(s => s.rating >= 4.5).length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6 font-[IRANSans]">
            <Toaster position="top-right" />

            {/* هدر */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <MapPin className="text-white" size={24} />
                            </div>
                            نقشه تأمین‌کنندگان
                        </h1>
                        <p className="text-gray-600 mt-2">مشاهده موقعیت کشاورزان و محاسبه هوشمند هزینه حمل</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100">
                            <div className="text-xs text-gray-500">تأمین‌کنندگان</div>
                            <div className="text-xl font-bold text-gray-800">{stats.total}</div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100">
                            <div className="text-xs text-gray-500">ارگانیک</div>
                            <div className="text-xl font-bold text-green-600">{stats.organic}</div>
                        </div>
                    </div>
                </div>

                {/* آمار */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-500">تأمین‌کنندگان</div>
                                <div className="text-lg font-bold text-gray-800">{stats.total}</div>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Truck className="text-blue-600" size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-500">ارگانیک</div>
                                <div className="text-lg font-bold text-green-600">{stats.organic}</div>
                            </div>
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                <Star className="text-green-600" size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-500">تأیید شده</div>
                                <div className="text-lg font-bold text-purple-600">{stats.verified}</div>
                            </div>
                            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Badge.Ribbon text="تأیید" color="green" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-500">امتیاز بالا</div>
                                <div className="text-lg font-bold text-yellow-600">{stats.highRating}</div>
                            </div>
                            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <Star className="text-yellow-600" size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* لیست تأمین‌کنندگان */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100">
                        <h3 className="font-bold text-lg text-gray-800 mb-4">تأمین‌کنندگان فعال</h3>
                        <div className="space-y-3">
                            {suppliers.map((supplier) => {
                                const distance = calculateDistance(supplier.latLng, BuyersLatLng);
                                const deliveryTime = calculateDeliveryTime(distance);
                                const smartCost = calculateSmartDeliveryCost(distance, supplier.deliveryCost);

                                return (
                                    <div
                                        key={supplier.id}
                                        className="border border-gray-200 rounded-xl p-4 hover:border-green-300 hover:shadow-md transition-all cursor-pointer"
                                        onClick={() => setSelectedSupplier(supplier)}
                                    >
                                        <div className="flex items-start gap-3">
                                            <img
                                                src={supplier.image}
                                                alt={supplier.name}
                                                className="w-16 h-16 rounded-xl object-cover"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-bold text-gray-800">{supplier.name}</h4>
                                                    <div className="flex items-center gap-1">
                                                        <Star size={14} className="text-yellow-500 fill-current" />
                                                        <span className="text-sm font-bold">{supplier.rating}</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-1 mb-2">
                                                    {supplier.organic && (
                                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                                            ارگانیک
                                                        </span>
                                                    )}
                                                    {supplier.verified && (
                                                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                                                            تأیید شده
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <Clock size={12} />
                                                        <span>{deliveryTime}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <DollarSign size={12} />
                                                        <span>{smartCost.toLocaleString()} تومان</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* نقشه */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
                        <MapContainer
                            center={BuyersLatLng}
                            zoom={12}
                            style={{ height: '600px', width: '100%' }}
                            className="rounded-2xl"
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; OpenStreetMap contributors"
                            />

                            {/* مارکر خریدار */}
                            <Marker position={BuyersLatLng}>
                                <Popup>
                                    <div className="text-right">
                                        <h3 className="font-bold text-green-600">📍 موقعیت شما</h3>
                                        <p className="text-sm text-gray-600">خریدار</p>
                                    </div>
                                </Popup>
                            </Marker>

                            {/* مارکر تأمین‌کنندگان */}
                            {suppliers.map((supplier) => {
                                const distance = calculateDistance(supplier.latLng, BuyersLatLng);
                                const deliveryTime = calculateDeliveryTime(distance);
                                const smartCost = calculateSmartDeliveryCost(distance, supplier.deliveryCost);

                                return (
                                    <Marker key={supplier.id} position={supplier.latLng}>
                                        <Popup>
                                            <div className="text-right min-w-[250px]">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <img
                                                        src={supplier.image}
                                                        alt={supplier.name}
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-gray-800">{supplier.name}</h3>
                                                        <div className="flex items-center gap-2">
                                                            <Star size={14} className="text-yellow-500 fill-current" />
                                                            <span className="text-sm">{supplier.rating}</span>
                                                            {supplier.organic && (
                                                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                                                                    ارگانیک
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">فاصله:</span>
                                                        <span className="font-bold">{distance.toFixed(1)} کیلومتر</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">زمان تحویل:</span>
                                                        <span className="font-bold">{deliveryTime}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">هزینه حمل:</span>
                                                        <span className="font-bold text-green-600">{smartCost.toLocaleString()} تومان</span>
                                                    </div>
                                                </div>

                                                <div className="mt-3">
                                                    <p className="text-gray-600 text-sm mb-2">محصولات:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {supplier.products.map((product, idx) => (
                                                            <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                                                                {product}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex gap-2 mt-4">
                                                    <button
                                                        onClick={() => generateRoute(supplier)}
                                                        className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition text-sm"
                                                    >
                                                        <Navigation size={14} />
                                                        نمایش مسیر
                                                    </button>
                                                    <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                                        <Phone size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
                                );
                            })}

                            {/* رسم مسیرها */}
                            {Object.values(routes).map((coords, idx) => (
                                <Polyline key={idx} positions={coords} color="#10b981" weight={4} opacity={0.7} />
                            ))}
                        </MapContainer>
                    </div>
                </div>
            </div>

            {/* مودال جزئیات تأمین‌کننده */}
            {selectedSupplier && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedSupplier(null)} />
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 relative z-10">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={selectedSupplier.image}
                                    alt={selectedSupplier.name}
                                    className="w-20 h-20 rounded-2xl object-cover"
                                />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{selectedSupplier.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex items-center gap-1">
                                            <Star size={16} className="text-yellow-500 fill-current" />
                                            <span className="font-bold">{selectedSupplier.rating}</span>
                                        </div>
                                        {selectedSupplier.organic && (
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                                ارگانیک
                                            </span>
                                        )}
                                        {selectedSupplier.verified && (
                                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                                                تأیید شده
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedSupplier(null)}
                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-green-50 p-4 rounded-2xl">
                                <div className="text-sm text-gray-500 mb-1">زمان تحویل</div>
                                <div className="text-lg font-bold text-green-600">{selectedSupplier.deliveryTime}</div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-2xl">
                                <div className="text-sm text-gray-500 mb-1">تماس</div>
                                <div className="text-lg font-bold text-blue-600">{selectedSupplier.contact}</div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-bold text-gray-800 mb-3">محصولات</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedSupplier.products.map((product, idx) => (
                                    <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-xl text-sm">
                                        {product}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-3 rounded-xl hover:bg-green-600 transition font-bold">
                                <MessageCircle size={18} />
                                ارسال پیام
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-xl hover:bg-blue-600 transition font-bold">
                                <Phone size={18} />
                                تماس تلفنی
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Suppliers;