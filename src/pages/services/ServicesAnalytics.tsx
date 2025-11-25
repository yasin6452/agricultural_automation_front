// src/pages/services/ServicesAnalytics.tsx
export default function ServicesAnalytics() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-orange-600">آنالیز خدمات</h1>

            {/* کارت‌های آماری */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">کل خدمات</h2>
                    <p className="text-2xl font-bold text-orange-500">10</p>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">درخواست‌های جدید</h2>
                    <p className="text-2xl font-bold text-orange-500">5</p>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">پیام‌های خوانده نشده</h2>
                    <p className="text-2xl font-bold text-orange-500">3</p>
                </div>
            </div>

            {/* بخش نمودارها (Placeholder) */}
            <div className="bg-white p-4 rounded shadow mt-6">
                <h2 className="text-xl font-semibold mb-4">نمودار درخواست‌ها</h2>
                <div className="h-64 flex items-center justify-center text-gray-400">
                    اینجا نمودار قرار می‌گیرد
                </div>
            </div>
        </div>
    );
}
