import { ArrowUpRight, ShoppingBag, ClipboardList, MessageSquare } from "lucide-react";

export default function BuyerOverview() {
    const stats = [
        {
            title: "سفارش‌های فعال",
            value: 3,
            icon: <ShoppingBag className="w-8 h-8 text-[#328E6E]" />,
        },
        {
            title: "نیازمندی‌های ثبت‌شده",
            value: 5,
            icon: <ClipboardList className="w-8 h-8 text-[#328E6E]" />,
        },
        {
            title: "پیام‌های خوانده‌نشده",
            value: 2,
            icon: <MessageSquare className="w-8 h-8 text-[#328E6E]" />,
        },
    ];

    return (
        <div className="p-6">
            {/* عنوان */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6">داشبورد خریدار</h1>

            {/* کارت‌های آماری */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-5 rounded-xl shadow-card hover:shadow-lg transition-all duration-200 border border-gray-100"
                    >
                        <div className="flex items-center justify-between">
                            {item.icon}
                            <ArrowUpRight className="w-6 h-6 text-gray-400" />
                        </div>

                        <h3 className="mt-4 text-gray-700 text-sm">{item.title}</h3>
                        <p className="text-2xl font-bold mt-1 text-gray-900">{item.value}</p>
                    </div>
                ))}
            </div>

            {/* بخش پیشنهاد محصولات */}
            <div className="mt-8 bg-white p-6 rounded-xl shadow-card border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">محصولات پیشنهادی برای خرید</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="p-4 border rounded-xl bg-gray-50 hover:bg-gray-100 transition-all"
                        >
                            <h3 className="font-semibold text-gray-800">گوجه فرنگی ممتاز</h3>
                            <p className="text-sm text-gray-500 mt-1">قیمت: ۱۸,۰۰۰ تومان</p>
                            <button className="mt-3 bg-[#328E6E] text-white px-4 py-2 rounded-lg w-full hover:bg-[#2a755b] transition">
                                مشاهده
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
