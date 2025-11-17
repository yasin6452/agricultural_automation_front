// src/pages/buyer/Suppliers.tsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Toaster, toast } from 'react-hot-toast';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Supplier {
    id: number;
    name: string;
    latLng: [number, number]; // اصلاح شده به Tuple
    deliveryCost: number;
}

// موقعیت خریدار
const BuyersLatLng: [number, number] = [35.700, 51.400];

const Suppliers: React.FC = () => {
    const [suppliers] = useState<Supplier[]>([
        { id: 1, name: 'کشاورز A', latLng: [35.701, 51.338], deliveryCost: 15000 },
        { id: 2, name: 'کشاورز B', latLng: [35.710, 51.420], deliveryCost: 25000 },
        { id: 3, name: 'کشاورز C', latLng: [35.720, 51.390], deliveryCost: 18000 },
    ]);

    const [routes, setRoutes] = useState<{ [key: number]: [number, number][] }>({});

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

    // شبیه‌سازی مسیر واقعی (می‌تونیم بعداً API واقعی وصل کنیم)
    const generateRoute = (supplier: Supplier) => {
        const coords: [number, number][] = [supplier.latLng, BuyersLatLng];
        setRoutes((prev) => ({ ...prev, [supplier.id]: coords }));
        toast.success(`مسیر ${supplier.name} آماده شد!`);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Toaster position="top-right" />
            <h1 className="text-2xl font-bold mb-4">تأمین‌کنندگان هوشمند</h1>

            <MapContainer center={BuyersLatLng} zoom={12} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                <Marker position={BuyersLatLng}>
                    <Popup>موقعیت خریدار</Popup>
                </Marker>

                {suppliers.map((s) => {
                    const distance = calculateDistance(s.latLng, BuyersLatLng);
                    const deliveryTime = calculateDeliveryTime(distance);
                    const smartCost = calculateSmartDeliveryCost(distance, s.deliveryCost);

                    return (
                        <Marker key={s.id} position={s.latLng}>
                            <Popup>
                                <div className="text-right">
                                    <h2 className="font-semibold">{s.name}</h2>
                                    <p>فاصله تقریبی: {distance.toFixed(1)} کیلومتر</p>
                                    <p>زمان تحویل: {deliveryTime}</p>
                                    <p>هزینه حمل هوشمند: {smartCost.toLocaleString()} تومان</p>
                                    <button
                                        onClick={() => generateRoute(s)}
                                        className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                                    >
                                        نمایش مسیر واقعی
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                {/* رسم مسیرها */}
                {Object.values(routes).map((coords, idx) => (
                    <Polyline key={idx} positions={coords} color="blue" weight={4} />
                ))}
            </MapContainer>
        </div>
    );
};

export default Suppliers;
