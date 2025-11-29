import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Toaster, toast } from 'react-hot-toast';
import { Truck, MapPin, Clock, DollarSign, Star, Navigation, Phone, MessageCircle, Users, Shield, BadgeCheck, Sparkles, Crown } from 'lucide-react';
import { Badge, Tooltip, Avatar, Rate } from 'antd';

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
    sellerLevel: 'beginner' | 'intermediate' | 'expert';
    successRate: number;
    responseTime: string;
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
            verified: true,
            sellerLevel: 'expert',
            successRate: 98,
            responseTime: 'کمتر از 1 ساعت'
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
            verified: true,
            sellerLevel: 'intermediate',
            successRate: 92,
            responseTime: '2 ساعت'
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
            verified: true,
            sellerLevel: 'expert',
            successRate: 96,
            responseTime: '1 ساعت'
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
            verified: false,
            sellerLevel: 'beginner',
            successRate: 85,
            responseTime: '4 ساعت'
        },
    ]);

    const [routes, setRoutes] = useState<{ [key: number]: [number, number][] }>({});
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
    const [activeFilter, setActiveFilter] = useState<'all' | 'organic' | 'verified' | 'expert'>('all');

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

    const filteredSuppliers = suppliers.filter(supplier => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'organic') return supplier.organic;
        if (activeFilter === 'verified') return supplier.verified;
        if (activeFilter === 'expert') return supplier.sellerLevel === 'expert';
        return true;
    });

    const stats = {
        total: suppliers.length,
        organic: suppliers.filter(s => s.organic).length,
        verified: suppliers.filter(s => s.verified).length,
        highRating: suppliers.filter(s => s.rating >= 4.5).length,
        expert: suppliers.filter(s => s.sellerLevel === 'expert').length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 font-[IRANSans]">
            <Toaster position="top-right" />

            {/* هدر */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <MapPin className="text-white" size={24} />
                            </div>
                            نقشه تأمین‌کنندگان
                        </h1>
                        <p className="text-gray-600 mt-2">مشاهده موقعیت کشاورزان و محاسبه هوشمند هزینه حمل</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100">
                            <div className="text-xs text-gray-500">تأمین‌کنندگان</div>
                            <div className="text-xl font-bold text-gray-800">{stats.total}</div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100">
                            <div className="text-xs text-gray-500">ارگانیک</div>
                            <div className="text-xl font-bold text-green-600">{stats.organic}</div>
                        </div>
                    </div>
                </div>

                {/* آمار */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-all">
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
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-all">
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
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-500">تأیید شده</div>
                                <div className="text-lg font-bold text-purple-600">{stats.verified}</div>
                            </div>
                            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                <BadgeCheck className="text-purple-600" size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-all">
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
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-500">حرفه‌ای</div>
                                <div className="text-lg font-bold text-orange-600">{stats.expert}</div>
                            </div>
                            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Crown className="text-orange-600" size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* فیلترها */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 mb-6">
                    <div className="flex flex-wrap gap-2">
                        {[
                            { key: 'all', label: 'همه', count: stats.total },
                            { key: 'organic', label: 'ارگانیک', count: stats.organic },
                            { key: 'verified', label: 'تأیید شده', count: stats.verified },
                            { key: 'expert', label: 'حرفه‌ای', count: stats.expert }
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
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* لیست تأمین‌کنندگان */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                            <Users size={20} />
                            تأمین‌کنندگان فعال ({filteredSuppliers.length})
                        </h3>
                        <div className="space-y-4">
                            {filteredSuppliers.map((supplier) => {
                                const distance = calculateDistance(supplier.latLng, BuyersLatLng);
                                const deliveryTime = calculateDeliveryTime(distance);
                                const smartCost = calculateSmartDeliveryCost(distance, supplier.deliveryCost);

                                return (
                                    <div
                                        key={supplier.id}
                                        className={`border-2 rounded-2xl p-4 hover:shadow-lg transition-all cursor-pointer group ${selectedSupplier?.id === supplier.id ? 'border-blue-400 ring-2 ring-blue-100' : 'border-blue-100'
                                            }`}
                                        onClick={() => setSelectedSupplier(supplier)}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="relative">
                                                <img
                                                    src={supplier.image}
                                                    alt={supplier.name}
                                                    className="w-16 h-16 rounded-xl object-cover shadow-md"
                                                />
                                                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getSellerLevelColor(supplier.sellerLevel)}`}></div>
                                            </div>
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
                                                        <Badge count="ارگانیک" className="bg-green-500 border-0 text-xs" />
                                                    )}
                                                    {supplier.verified && (
                                                        <Badge count="تأیید شده" className="bg-blue-500 border-0 text-xs" />
                                                    )}
                                                    {supplier.sellerLevel === 'expert' && (
                                                        <Badge count="حرفه‌ای" className="bg-gradient-to-r from-yellow-400 to-orange-500 border-0 text-xs" />
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
                                                    <div className="flex items-center gap-1">
                                                        <Clock size={12} />
                                                        <span>{deliveryTime}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <DollarSign size={12} />
                                                        <span>{smartCost.toLocaleString()} تومان</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between text-xs text-gray-500">
                                                    <span>{supplier.responseTime}</span>
                                                    <span>{getSellerLevelText(supplier.sellerLevel)}</span>
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
                    <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
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
                                        <h3 className="font-bold text-blue-600 flex items-center gap-2">
                                            <MapPin size={16} />
                                            موقعیت شما
                                        </h3>
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
                                            <div className="text-right min-w-[280px]">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <Avatar
                                                        src={supplier.image}
                                                        size={48}
                                                        className="border-2 border-white shadow-md"
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-gray-800">{supplier.name}</h3>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Rate
                                                                disabled
                                                                defaultValue={supplier.rating}
                                                                className="text-yellow-500 text-sm"
                                                                character={<Star size={12} />}
                                                            />
                                                            <span className="text-sm">{supplier.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-1 mb-3">
                                                    {supplier.organic && (
                                                        <Badge count="ارگانیک" className="bg-green-500 border-0" />
                                                    )}
                                                    {supplier.verified && (
                                                        <Badge count="تأیید شده" className="bg-blue-500 border-0" />
                                                    )}
                                                    <div className={`w-2 h-2 rounded-full ${getSellerLevelColor(supplier.sellerLevel)}`}></div>
                                                    <span className="text-xs text-gray-500">{getSellerLevelText(supplier.sellerLevel)}</span>
                                                </div>

                                                <div className="space-y-2 text-sm mb-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-500">فاصله:</span>
                                                        <span className="font-bold">{distance.toFixed(1)} کیلومتر</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-500">زمان تحویل:</span>
                                                        <span className="font-bold">{deliveryTime}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-500">هزینه حمل:</span>
                                                        <span className="font-bold text-blue-600">{smartCost.toLocaleString()} تومان</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-500">پاسخگویی:</span>
                                                        <span className="font-bold text-green-600">{supplier.responseTime}</span>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <p className="text-gray-600 text-sm mb-2">محصولات:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {supplier.products.map((product, idx) => (
                                                            <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs">
                                                                {product}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => generateRoute(supplier)}
                                                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-3 py-2 rounded-lg hover:shadow-lg transition text-sm font-medium"
                                                    >
                                                        <Navigation size={14} />
                                                        نمایش مسیر
                                                    </button>
                                                    <Tooltip title="تماس تلفنی">
                                                        <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                                                            <Phone size={14} />
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
                                );
                            })}

                            {/* رسم مسیرها */}
                            {Object.values(routes).map((coords, idx) => (
                                <Polyline key={idx} positions={coords} color="#3b82f6" weight={4} opacity={0.7} />
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
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Avatar
                                        src={selectedSupplier.image}
                                        size={80}
                                        className="border-4 border-white shadow-lg"
                                    />
                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getSellerLevelColor(selectedSupplier.sellerLevel)} border-2 border-white`}></div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">{selectedSupplier.name}</h3>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center gap-1">
                                            <Rate
                                                disabled
                                                defaultValue={selectedSupplier.rating}
                                                className="text-yellow-500"
                                                character={<Star size={16} />}
                                            />
                                            <span className="font-bold text-gray-700">{selectedSupplier.rating}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {selectedSupplier.organic && (
                                                <Badge count="ارگانیک" className="bg-green-500 border-0" />
                                            )}
                                            {selectedSupplier.verified && (
                                                <Badge count="تأیید شده" className="bg-blue-500 border-0" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedSupplier(null)}
                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition hover:bg-gray-200"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-2xl border border-blue-200">
                                <div className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                    <Clock size={16} />
                                    زمان تحویل
                                </div>
                                <div className="text-lg font-bold text-blue-600">{selectedSupplier.deliveryTime}</div>
                            </div>
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200">
                                <div className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                    <Phone size={16} />
                                    تماس
                                </div>
                                <div className="text-lg font-bold text-green-600">{selectedSupplier.contact}</div>
                            </div>
                            <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-2xl border border-purple-200">
                                <div className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                    <Users size={16} />
                                    سطح فروشنده
                                </div>
                                <div className="text-lg font-bold text-purple-600">{getSellerLevelText(selectedSupplier.sellerLevel)}</div>
                            </div>
                            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-2xl border border-orange-200">
                                <div className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                    <Sparkles size={16} />
                                    میزان موفقیت
                                </div>
                                <div className="text-lg font-bold text-orange-600">{selectedSupplier.successRate}%</div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-bold text-gray-800 mb-3 text-lg">محصولات</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedSupplier.products.map((product, idx) => (
                                    <span key={idx} className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium">
                                        {product}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-4 rounded-xl hover:shadow-lg transition font-bold text-lg">
                                <MessageCircle size={20} />
                                ارسال پیام
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-4 rounded-xl hover:shadow-lg transition font-bold text-lg">
                                <Phone size={20} />
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