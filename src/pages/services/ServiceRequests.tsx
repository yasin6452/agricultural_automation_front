// src/pages/services/ServiceRequests.tsx
import { useState } from "react";

interface ServiceRequest {
    id: number;
    serviceName: string;
    customer: string;
    date: string;
    status: string;
}

export default function ServiceRequests() {
    const [requests, setRequests] = useState<ServiceRequest[]>([
        { id: 1, serviceName: "سم‌پاشی", customer: "علی رضایی", date: "2025-11-25", status: "در حال بررسی" },
        { id: 2, serviceName: "آبیاری هوشمند", customer: "زهرا احمدی", date: "2025-11-24", status: "تکمیل شده" },
    ]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-orange-600 mb-6">درخواست‌های خدمات</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded shadow">
                    <thead className="bg-orange-500 text-white">
                        <tr>
                            <th className="py-2 px-4 text-left">ID</th>
                            <th className="py-2 px-4 text-left">نام خدمت</th>
                            <th className="py-2 px-4 text-left">مشتری</th>
                            <th className="py-2 px-4 text-left">تاریخ</th>
                            <th className="py-2 px-4 text-left">وضعیت</th>
                            <th className="py-2 px-4 text-left">عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req.id} className="border-b">
                                <td className="py-2 px-4">{req.id}</td>
                                <td className="py-2 px-4">{req.serviceName}</td>
                                <td className="py-2 px-4">{req.customer}</td>
                                <td className="py-2 px-4">{req.date}</td>
                                <td className="py-2 px-4">{req.status}</td>
                                <td className="py-2 px-4">
                                    <button className="text-blue-500 hover:underline mr-2">مشاهده</button>
                                    <button className="text-green-500 hover:underline">تغییر وضعیت</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
