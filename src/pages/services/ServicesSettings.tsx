// src/pages/services/ServicesSettings.tsx
export default function ServicesSettings() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-orange-600">تنظیمات پنل خدمات</h1>

            {/* بخش اطلاعات پروفایل */}
            <div className="bg-white p-6 rounded shadow max-w-xl">
                <h2 className="text-xl font-semibold mb-4">اطلاعات پروفایل</h2>
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="نام کاربری"
                        className="border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                        type="email"
                        placeholder="ایمیل"
                        className="border border-gray-300 rounded px-3 py-2"
                    />
                    <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                        ذخیره تغییرات
                    </button>
                </div>
            </div>

            {/* بخش تغییر رمز عبور */}
            <div className="bg-white p-6 rounded shadow max-w-xl">
                <h2 className="text-xl font-semibold mb-4">تغییر رمز عبور</h2>
                <div className="flex flex-col gap-4">
                    <input
                        type="password"
                        placeholder="رمز عبور فعلی"
                        className="border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                        type="password"
                        placeholder="رمز عبور جدید"
                        className="border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                        type="password"
                        placeholder="تکرار رمز عبور جدید"
                        className="border border-gray-300 rounded px-3 py-2"
                    />
                    <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                        تغییر رمز عبور
                    </button>
                </div>
            </div>
        </div>
    );
}
