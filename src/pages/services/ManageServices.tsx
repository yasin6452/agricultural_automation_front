// src/pages/services/ManageServices.tsx
import { useState } from "react";

interface Service {
    id: number;
    name: string;
    category: string;
    price: number;
    status: string;
}

export default function ManageServices() {
    // داده نمونه (بعداً از API می‌گیریم)
    const [services, setServices] = useState<Service[]>([
        { id: 1, name: "سم‌پاشی", category: "کشاورزی", price: 150000, status: "فعال" },
        { id: 2, name: "آبیاری هوشمند", category: "آبیاری", price: 250000, status: "غیرفعال" },
    ]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-orange-600 mb-6">مدیریت خدمات</h1>

            <button className="bg-orange-500 text-white px-4 py-2 rounded mb-4 hover:bg-orange-600">
                ثبت خدمت جدید
            </button>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded shadow">
                    <thead className="bg-orange-500 text-white">
                        <tr>
                            <th className="py-2 px-4 text-left">ID</th>
                            <th className="py-2 px-4 text-left">نام خدمت</th>
                            <th className="py-2 px-4 text-left">دسته‌بندی</th>
                            <th className="py-2 px-4 text-left">قیمت</th>
                            <th className="py-2 px-4 text-left">وضعیت</th>
                            <th className="py-2 px-4 text-left">عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service.id} className="border-b">
                                <td className="py-2 px-4">{service.id}</td>
                                <td className="py-2 px-4">{service.name}</td>
                                <td className="py-2 px-4">{service.category}</td>
                                <td className="py-2 px-4">{service.price.toLocaleString()} تومان</td>
                                <td className="py-2 px-4">{service.status}</td>
                                <td className="py-2 px-4">
                                    <button className="text-blue-500 hover:underline mr-2">ویرایش</button>
                                    <button className="text-red-500 hover:underline">حذف</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
