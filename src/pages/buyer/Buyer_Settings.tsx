import { useState } from "react";
import { User, Bell, Lock, Globe, Save, Shield, CreditCard, Palette, Eye, EyeOff, Download, Trash2, Mail, Smartphone, Database } from "lucide-react";
import { Switch, Select, Avatar, Badge, Tabs, Input } from "antd";

const { Option } = Select;
const { TabPane } = Tabs;

// تعریف interface ها
interface Notifications {
    sms: boolean;
    email: boolean;
    app: boolean;
    priceAlerts: boolean;
    orderUpdates: boolean;
    promotions: boolean;
    newProducts: boolean;
}

interface Security {
    twoFactor: boolean;
    loginAlerts: boolean;
    deviceManagement: boolean;
}

interface Privacy {
    profileVisible: boolean;
    activityStatus: boolean;
    dataSharing: boolean;
}

interface Preferences {
    language: string;
    theme: string;
    currency: string;
    timezone: string;
}

interface Profile {
    name: string;
    phone: string;
    email: string;
    city: string;
    bio: string;
    avatar: string;
}

export default function Settings() {
    const [activeTab, setActiveTab] = useState("profile");
    const [profile, setProfile] = useState<Profile>({
        name: "علی احمدی",
        phone: "09123456789",
        email: "ali.ahmadi@example.com",
        city: "تهران",
        bio: "خریدار محصولات کشاورزی با سابقه ۳ ساله",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    });

    const [notifications, setNotifications] = useState<Notifications>({
        sms: true,
        email: false,
        app: true,
        priceAlerts: true,
        orderUpdates: true,
        promotions: false,
        newProducts: true,
    });

    const [security, setSecurity] = useState<Security>({
        twoFactor: false,
        loginAlerts: true,
        deviceManagement: true
    });

    const [privacy, setPrivacy] = useState<Privacy>({
        profileVisible: true,
        activityStatus: true,
        dataSharing: false
    });

    const [preferences, setPreferences] = useState<Preferences>({
        language: "fa",
        theme: "light",
        currency: "toman",
        timezone: "Asia/Tehran"
    });

    const handleSave = () => {
        console.log("تنظیمات ذخیره شد:", {
            profile,
            notifications,
            security,
            privacy,
            preferences
        });
        alert("✅ تنظیمات با موفقیت ذخیره شد");
    };

    const stats = {
        joinedDate: "1402/05/15",
        totalOrders: 47,
        completedOrders: 45,
        successRate: 96,
        savedItems: 12
    };

    const menuItems = [
        { key: "profile", label: "پروفایل", icon: User, color: "text-green-500" },
        { key: "notifications", label: "اعلان‌ها", icon: Bell, color: "text-yellow-500" },
        { key: "security", label: "امنیت", icon: Shield, color: "text-blue-500" },
        { key: "privacy", label: "حریم خصوصی", icon: Lock, color: "text-purple-500" },
        { key: "preferences", label: "ترجیحات", icon: Palette, color: "text-orange-500" },
        { key: "billing", label: "حسابداری", icon: CreditCard, color: "text-red-500" },
    ];

    // تابع helper برای مدیریت notifications
    const handleNotificationChange = (key: keyof Notifications, checked: boolean) => {
        setNotifications(prev => ({
            ...prev,
            [key]: checked
        }));
    };

    // تابع helper برای مدیریت privacy
    const handlePrivacyChange = (key: keyof Privacy, checked: boolean) => {
        setPrivacy(prev => ({
            ...prev,
            [key]: checked
        }));
    };

    // تابع helper برای مدیریت preferences
    const handlePreferenceChange = (key: keyof Preferences, value: string) => {
        setPreferences(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6 font-[IRANSans]">
            <div className="max-w-6xl mx-auto">
                {/* هدر */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <User className="text-white" size={20} />
                                </div>
                                تنظیمات حساب کاربری
                            </h1>
                            <p className="text-gray-600 mt-2">مدیریت اطلاعات شخصی و تنظیمات برنامه</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100">
                                <div className="text-xs text-gray-500">تعداد سفارشات</div>
                                <div className="text-xl font-bold text-gray-800">{stats.totalOrders}</div>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100">
                                <div className="text-xs text-gray-500">میزان موفقیت</div>
                                <div className="text-xl font-bold text-green-600">{stats.successRate}%</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* سایدبار */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 sticky top-6">
                            {/* پروفایل کاربر */}
                            <div className="text-center mb-6">
                                <Avatar
                                    src={profile.avatar}
                                    size={80}
                                    className="border-4 border-green-100 mx-auto mb-3"
                                />
                                <h3 className="font-bold text-gray-800 text-lg">{profile.name}</h3>
                                <p className="text-gray-500 text-sm">{profile.bio}</p>
                                <div className="mt-2 text-xs text-gray-400">
                                    عضو since {stats.joinedDate}
                                </div>
                            </div>

                            {/* منوی تنظیمات */}
                            <nav className="space-y-2">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.key}
                                        onClick={() => setActiveTab(item.key)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.key
                                                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                                                : "text-gray-600 hover:bg-green-50"
                                            }`}
                                    >
                                        <item.icon size={16} className={item.color} />
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* محتوای اصلی */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">

                            {/* پروفایل */}
                            {activeTab === "profile" && (
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                        <User className="text-green-500" />
                                        اطلاعات کاربری
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">نام کامل</label>
                                                <Input
                                                    size="large"
                                                    className="rounded-xl"
                                                    value={profile.name}
                                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                                    placeholder="نام کامل"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس</label>
                                                <Input
                                                    size="large"
                                                    className="rounded-xl"
                                                    value={profile.phone}
                                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                                    placeholder="شماره تماس"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                                                <Input
                                                    size="large"
                                                    type="email"
                                                    className="rounded-xl"
                                                    value={profile.email}
                                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                                    placeholder="آدرس ایمیل"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">شهر</label>
                                                <Select
                                                    className="w-full"
                                                    size="large"
                                                    value={profile.city}
                                                    onChange={(value) => setProfile({ ...profile, city: value })}
                                                >
                                                    <Option value="تهران">تهران</Option>
                                                    <Option value="مشهد">مشهد</Option>
                                                    <Option value="اصفهان">اصفهان</Option>
                                                    <Option value="شیراز">شیراز</Option>
                                                    <Option value="تبریز">تبریز</Option>
                                                </Select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">درباره من</label>
                                                <Input.TextArea
                                                    className="rounded-xl"
                                                    rows={4}
                                                    value={profile.bio}
                                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                                    placeholder="توضیحاتی درباره خودتان..."
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">تصویر پروفایل</label>
                                                <div className="flex items-center gap-4">
                                                    <Avatar src={profile.avatar} size={60} />
                                                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition">
                                                        تغییر تصویر
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* اعلان‌ها */}
                            {activeTab === "notifications" && (
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                        <Bell className="text-yellow-500" />
                                        تنظیمات اعلان‌ها
                                    </h2>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                                    <Smartphone className="text-blue-500" size={16} />
                                                    کانال‌های اطلاع‌رسانی
                                                </h3>
                                                {([
                                                    { key: 'sms' as keyof Notifications, label: 'پیامک', icon: Smartphone },
                                                    { key: 'email' as keyof Notifications, label: 'ایمیل', icon: Mail },
                                                    { key: 'app' as keyof Notifications, label: 'نوتیفیکیشن برنامه', icon: Bell },
                                                ] as const).map((item) => (
                                                    <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                                        <span className="flex items-center gap-2">
                                                            <item.icon size={16} className="text-gray-500" />
                                                            {item.label}
                                                        </span>
                                                        <Switch
                                                            checked={notifications[item.key]}
                                                            onChange={(checked) => handleNotificationChange(item.key, checked)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="space-y-4">
                                                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                                    <Database className="text-green-500" size={16} />
                                                    انواع اعلان‌ها
                                                </h3>
                                                {([
                                                    { key: 'priceAlerts' as keyof Notifications, label: 'هشدارهای قیمت' },
                                                    { key: 'orderUpdates' as keyof Notifications, label: 'به‌روزرسانی سفارشات' },
                                                    { key: 'promotions' as keyof Notifications, label: 'تخفیف‌ها و پیشنهادات' },
                                                    { key: 'newProducts' as keyof Notifications, label: 'محصولات جدید' },
                                                ] as const).map((item) => (
                                                    <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                                        <span>{item.label}</span>
                                                        <Switch
                                                            checked={notifications[item.key]}
                                                            onChange={(checked) => handleNotificationChange(item.key, checked)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* امنیت */}
                            {activeTab === "security" && (
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                        <Shield className="text-blue-500" />
                                        امنیت حساب کاربری
                                    </h2>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div className="p-4 border border-gray-200 rounded-xl">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-semibold">تغییر رمز عبور</span>
                                                        <Badge count="توصیه می‌شود" className="bg-green-500" />
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-3">رمز عبور خود را به صورت دوره‌ای تغییر دهید</p>
                                                    <button className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">
                                                        تغییر رمز عبور
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                                    <div>
                                                        <div className="font-semibold">احراز هویت دو مرحله‌ای</div>
                                                        <p className="text-sm text-gray-600">افزایش امنیت حساب کاربری</p>
                                                    </div>
                                                    <Switch
                                                        checked={security.twoFactor}
                                                        onChange={(checked) => setSecurity(prev => ({ ...prev, twoFactor: checked }))}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                                    <div>
                                                        <div className="font-semibold">هشدارهای ورود</div>
                                                        <p className="text-sm text-gray-600">اطلاع از ورودهای جدید</p>
                                                    </div>
                                                    <Switch
                                                        checked={security.loginAlerts}
                                                        onChange={(checked) => setSecurity(prev => ({ ...prev, loginAlerts: checked }))}
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                                    <div>
                                                        <div className="font-semibold">مدیریت دستگاه‌ها</div>
                                                        <p className="text-sm text-gray-600">مدیریت دستگاه‌های متصل</p>
                                                    </div>
                                                    <Switch
                                                        checked={security.deviceManagement}
                                                        onChange={(checked) => setSecurity(prev => ({ ...prev, deviceManagement: checked }))}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* حریم خصوصی */}
                            {activeTab === "privacy" && (
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                        <Lock className="text-purple-500" />
                                        تنظیمات حریم خصوصی
                                    </h2>

                                    <div className="space-y-4">
                                        {([
                                            { key: 'profileVisible' as keyof Privacy, label: 'پروفایل عمومی', desc: 'قابل مشاهده برای دیگر کاربران' },
                                            { key: 'activityStatus' as keyof Privacy, label: 'وضعیت فعالیت', desc: 'نمایش وضعیت آنلاین بودن' },
                                            { key: 'dataSharing' as keyof Privacy, label: 'اشتراک‌گذاری داده‌ها', desc: 'برای بهبود سرویس‌ها' },
                                        ] as const).map((item) => (
                                            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                                <div>
                                                    <div className="font-semibold">{item.label}</div>
                                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                                </div>
                                                <Switch
                                                    checked={privacy[item.key]}
                                                    onChange={(checked) => handlePrivacyChange(item.key, checked)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ترجیحات */}
                            {activeTab === "preferences" && (
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                        <Palette className="text-orange-500" />
                                        ترجیحات شخصی
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {([
                                            {
                                                key: 'language' as keyof Preferences, label: 'زبان', icon: Globe, options: [
                                                    { value: 'fa', label: 'فارسی' },
                                                    { value: 'en', label: 'English' },
                                                    { value: 'ar', label: 'العربیة' }
                                                ]
                                            },
                                            {
                                                key: 'theme' as keyof Preferences, label: 'تم', icon: Palette, options: [
                                                    { value: 'light', label: 'روشن' },
                                                    { value: 'dark', label: 'تیره' },
                                                    { value: 'auto', label: 'خودکار' }
                                                ]
                                            },
                                            {
                                                key: 'currency' as keyof Preferences, label: 'واحد پول', icon: CreditCard, options: [
                                                    { value: 'toman', label: 'تومان' },
                                                    { value: 'rial', label: 'ریال' },
                                                    { value: 'usd', label: 'دلار' }
                                                ]
                                            },
                                            {
                                                key: 'timezone' as keyof Preferences, label: 'منطقه زمانی', icon: Globe, options: [
                                                    { value: 'Asia/Tehran', label: 'تهران' },
                                                    { value: 'UTC', label: 'UTC' },
                                                    { value: 'Europe/London', label: 'لندن' }
                                                ]
                                            },
                                        ] as const).map((item) => (
                                            <div key={item.key}>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                                    <item.icon size={16} className="text-gray-500" />
                                                    {item.label}
                                                </label>
                                                <Select
                                                    className="w-full"
                                                    size="large"
                                                    value={preferences[item.key]}
                                                    onChange={(value) => handlePreferenceChange(item.key, value)}
                                                >
                                                    {item.options.map(option => (
                                                        <Option key={option.value} value={option.value}>{option.label}</Option>
                                                    ))}
                                                </Select>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* دکمه ذخیره */}
                            <div className="p-6 border-t border-gray-200 bg-gray-50">
                                <div className="flex justify-between items-center">
                                    <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition">
                                        <Trash2 size={16} />
                                        حذف حساب کاربری
                                    </button>

                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-bold"
                                    >
                                        <Save size={16} />
                                        ذخیره تغییرات
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}