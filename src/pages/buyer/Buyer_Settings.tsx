import { useState } from "react";
import { User, Bell, Lock, Globe, Save, Shield, CreditCard, Palette, Trash2, Mail, Smartphone, Database, Settings as SettingsIcon, Eye, EyeOff, Key, LogOut, Camera } from "lucide-react";
import { Switch, Select, Avatar, Badge, Input, Card, Row, Col, Modal, Button, Form, message, Progress, Tooltip } from "antd";

const { Option } = Select;
const { confirm } = Modal;

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

    const [isLoading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            // شبیه‌سازی API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log("تنظیمات ذخیره شد:", {
                profile,
                notifications,
                security,
                privacy,
                preferences
            });

            message.success("✅ تنظیمات با موفقیت ذخیره شد");
        } catch (error) {
            message.error("❌ خطا در ذخیره تنظیمات");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAccount = () => {
        confirm({
            title: 'حذف حساب کاربری',
            content: 'آیا از حذف دائمی حساب کاربری خود اطمینان دارید؟ این عمل غیرقابل بازگشت است.',
            okText: 'بله، حذف شود',
            okType: 'danger',
            cancelText: 'انصراف',
            onOk() {
                message.info('درخواست حذف حساب کاربری ثبت شد');
            },
        });
    };

    const handleChangePassword = () => {
        Modal.confirm({
            title: 'تغییر رمز عبور',
            content: 'لینک تغییر رمز عبور به ایمیل شما ارسال خواهد شد.',
            okText: 'ارسال لینک',
            cancelText: 'انصراف',
            onOk() {
                message.success('لینک تغییر رمز عبور به ایمیل شما ارسال شد');
            },
        });
    };

    const handleLogout = () => {
        confirm({
            title: 'خروج از حساب کاربری',
            content: 'آیا می‌خواهید از حساب کاربری خود خارج شوید؟',
            okText: 'خروج',
            cancelText: 'انصراف',
            onOk() {
                message.success('با موفقیت از حساب کاربری خارج شدید');
            },
        });
    };

    const stats = {
        joinedDate: "1402/05/15",
        totalOrders: 47,
        completedOrders: 45,
        successRate: 96,
        savedItems: 12,
        profileCompletion: 85
    };

    const menuItems = [
        { key: "profile", label: "پروفایل", icon: User, color: "text-blue-500" },
        { key: "notifications", label: "اعلان‌ها", icon: Bell, color: "text-yellow-500" },
        { key: "security", label: "امنیت", icon: Shield, color: "text-green-500" },
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

    const renderProfileTab = () => (
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <User className="text-blue-500" />
                اطلاعات کاربری
            </h2>

            {/* پیشرفت تکمیل پروفایل */}
            <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-blue-800">تکمیل پروفایل</span>
                    <span className="text-blue-600 font-bold">{stats.profileCompletion}%</span>
                </div>
                <Progress
                    percent={stats.profileCompletion}
                    strokeColor={{
                        '0%': '#3b82f6',
                        '100%': '#06b6d4',
                    }}
                    showInfo={false}
                />
                <p className="text-sm text-blue-600 mt-2">پروفایل شما تقریباً کامل است!</p>
            </div>

            <Row gutter={[24, 16]}>
                <Col xs={24} md={12}>
                    <Form layout="vertical">
                        <Form.Item label="نام کامل">
                            <Input
                                size="large"
                                className="rounded-xl border-blue-200 focus:border-blue-500"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                placeholder="نام کامل"
                            />
                        </Form.Item>

                        <Form.Item label="شماره تماس">
                            <Input
                                size="large"
                                className="rounded-xl border-blue-200 focus:border-blue-500"
                                value={profile.phone}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                placeholder="شماره تماس"
                            />
                        </Form.Item>

                        <Form.Item label="ایمیل">
                            <Input
                                size="large"
                                type="email"
                                className="rounded-xl border-blue-200 focus:border-blue-500"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                placeholder="آدرس ایمیل"
                            />
                        </Form.Item>
                    </Form>
                </Col>

                <Col xs={24} md={12}>
                    <Form layout="vertical">
                        <Form.Item label="شهر">
                            <Select
                                className="w-full rounded-xl"
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
                        </Form.Item>

                        <Form.Item label="درباره من">
                            <Input.TextArea
                                className="rounded-xl border-blue-200 focus:border-blue-500"
                                rows={4}
                                value={profile.bio}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                placeholder="توضیحاتی درباره خودتان..."
                            />
                        </Form.Item>

                        <Form.Item label="تصویر پروفایل">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Avatar src={profile.avatar} size={80} className="border-4 border-blue-100 shadow-md" />
                                    <Tooltip title="تغییر تصویر">
                                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all">
                                            <Camera size={14} />
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">تصویر پروفایل خود را آپلود کنید</p>
                                    <Button className="rounded-xl border-blue-300 text-blue-600 hover:bg-blue-50">
                                        انتخاب تصویر
                                    </Button>
                                </div>
                            </div>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );

    const renderNotificationsTab = () => (
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Bell className="text-yellow-500" />
                تنظیمات اعلان‌ها
            </h2>

            <Row gutter={[24, 16]}>
                <Col xs={24} md={12}>
                    <Card title={
                        <div className="flex items-center gap-2">
                            <Smartphone className="text-blue-500" size={18} />
                            <span className="font-bold">کانال‌های اطلاع‌رسانی</span>
                        </div>
                    } className="border-0 shadow-lg border-l-4 border-l-blue-500">
                        {([
                            { key: 'sms' as keyof Notifications, label: 'پیامک', icon: Smartphone, desc: 'ارسال نوتیفیکیشن از طریق SMS' },
                            { key: 'email' as keyof Notifications, label: 'ایمیل', icon: Mail, desc: 'ارسال اطلاعیه به ایمیل شما' },
                            { key: 'app' as keyof Notifications, label: 'نوتیفیکیشن برنامه', icon: Bell, desc: 'اعلان درون برنامه‌ای' },
                        ] as const).map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 rounded-lg transition-all">
                                <div className="flex items-center gap-3">
                                    <item.icon size={18} className="text-blue-500" />
                                    <div>
                                        <div className="font-semibold text-gray-800">{item.label}</div>
                                        <div className="text-xs text-gray-500">{item.desc}</div>
                                    </div>
                                </div>
                                <Switch
                                    checked={notifications[item.key]}
                                    onChange={(checked) => handleNotificationChange(item.key, checked)}
                                    className="bg-gray-300"
                                />
                            </div>
                        ))}
                    </Card>
                </Col>

                <Col xs={24} md={12}>
                    <Card title={
                        <div className="flex items-center gap-2">
                            <Database className="text-green-500" size={18} />
                            <span className="font-bold">انواع اعلان‌ها</span>
                        </div>
                    } className="border-0 shadow-lg border-l-4 border-l-green-500">
                        {([
                            { key: 'priceAlerts' as keyof Notifications, label: 'هشدارهای قیمت', desc: 'تغییرات قیمت محصولات مورد علاقه' },
                            { key: 'orderUpdates' as keyof Notifications, label: 'به‌روزرسانی سفارشات', desc: 'وضعیت سفارشات شما' },
                            { key: 'promotions' as keyof Notifications, label: 'تخفیف‌ها و پیشنهادات', desc: 'پیشنهادات ویژه و تخفیف‌ها' },
                            { key: 'newProducts' as keyof Notifications, label: 'محصولات جدید', desc: 'محصولات جدید اضافه شده' },
                        ] as const).map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-green-50 rounded-lg transition-all">
                                <div>
                                    <div className="font-semibold text-gray-800">{item.label}</div>
                                    <div className="text-xs text-gray-500">{item.desc}</div>
                                </div>
                                <Switch
                                    checked={notifications[item.key]}
                                    onChange={(checked) => handleNotificationChange(item.key, checked)}
                                    className="bg-gray-300"
                                />
                            </div>
                        ))}
                    </Card>
                </Col>
            </Row>
        </div>
    );

    const renderSecurityTab = () => (
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Shield className="text-green-500" />
                امنیت حساب کاربری
            </h2>

            <Row gutter={[24, 16]}>
                <Col xs={24} md={12}>
                    <Card className="border-0 shadow-lg">
                        <div className="space-y-4">
                            <div className="p-4 border border-blue-200 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-blue-800 flex items-center gap-2">
                                        <Key className="text-blue-600" size={18} />
                                        تغییر رمز عبور
                                    </span>
                                    <Badge count="توصیه می‌شود" style={{ backgroundColor: '#52c41a' }} />
                                </div>
                                <p className="text-sm text-blue-700 mb-3">رمز عبور خود را به صورت دوره‌ای تغییر دهید</p>
                                <Button
                                    type="primary"
                                    className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 border-0 h-10 font-bold"
                                    onClick={handleChangePassword}
                                >
                                    تغییر رمز عبور
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-blue-50 transition-all">
                                <div className="flex items-center gap-3">
                                    <Shield className="text-green-500" size={18} />
                                    <div>
                                        <div className="font-semibold">احراز هویت دو مرحله‌ای</div>
                                        <p className="text-sm text-gray-600">افزایش امنیت حساب کاربری</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={security.twoFactor}
                                    onChange={(checked) => setSecurity(prev => ({ ...prev, twoFactor: checked }))}
                                    className="bg-gray-300"
                                />
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} md={12}>
                    <Card className="border-0 shadow-lg">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-green-50 transition-all">
                                <div className="flex items-center gap-3">
                                    <Bell className="text-yellow-500" size={18} />
                                    <div>
                                        <div className="font-semibold">هشدارهای ورود</div>
                                        <p className="text-sm text-gray-600">اطلاع از ورودهای جدید</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={security.loginAlerts}
                                    onChange={(checked) => setSecurity(prev => ({ ...prev, loginAlerts: checked }))}
                                    className="bg-gray-300"
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-purple-50 transition-all">
                                <div className="flex items-center gap-3">
                                    <Smartphone className="text-purple-500" size={18} />
                                    <div>
                                        <div className="font-semibold">مدیریت دستگاه‌ها</div>
                                        <p className="text-sm text-gray-600">مدیریت دستگاه‌های متصل</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={security.deviceManagement}
                                    onChange={(checked) => setSecurity(prev => ({ ...prev, deviceManagement: checked }))}
                                    className="bg-gray-300"
                                />
                            </div>

                            <div className="p-4 border border-gray-200 rounded-xl hover:bg-red-50 transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-red-600 flex items-center gap-2">
                                        <LogOut className="text-red-600" size={18} />
                                        خروج از همه دستگاه‌ها
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">از تمام دستگاه‌های متصل خارج شوید</p>
                                <Button
                                    danger
                                    className="w-full rounded-xl h-10 font-bold"
                                    onClick={handleLogout}
                                >
                                    خروج از همه دستگاه‌ها
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );

    const renderPrivacyTab = () => (
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Lock className="text-purple-500" />
                تنظیمات حریم خصوصی
            </h2>

            <Card className="border-0 shadow-lg">
                <div className="space-y-4">
                    {([
                        {
                            key: 'profileVisible' as keyof Privacy,
                            label: 'پروفایل عمومی',
                            desc: 'قابل مشاهده برای دیگر کاربران',
                            icon: Eye,
                            onIcon: EyeOff
                        },
                        {
                            key: 'activityStatus' as keyof Privacy,
                            label: 'وضعیت فعالیت',
                            desc: 'نمایش وضعیت آنلاین بودن',
                            icon: User
                        },
                        {
                            key: 'dataSharing' as keyof Privacy,
                            label: 'اشتراک‌گذاری داده‌ها',
                            desc: 'برای بهبود سرویس‌ها',
                            icon: Database
                        },
                    ] as const).map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-purple-50 rounded-lg transition-all">
                            <div className="flex items-center gap-3">
                                {privacy[item.key] ? (
                                    <item.icon size={18} className="text-purple-500" />
                                ) : (
                                    item.onIcon && <item.onIcon size={18} className="text-gray-400" />
                                )}
                                <div>
                                    <div className="font-semibold text-gray-800">{item.label}</div>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                            </div>
                            <Switch
                                checked={privacy[item.key]}
                                onChange={(checked) => handlePrivacyChange(item.key, checked)}
                                className="bg-gray-300"
                            />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );

    const renderPreferencesTab = () => (
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Palette className="text-orange-500" />
                ترجیحات شخصی
            </h2>

            <Row gutter={[24, 16]}>
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
                    <Col key={item.key} xs={24} md={12}>
                        <div className="p-4 border border-gray-200 rounded-xl hover:bg-orange-50 transition-all">
                            <Form.Item label={
                                <div className="flex items-center gap-2 font-semibold">
                                    <item.icon size={18} className="text-orange-500" />
                                    {item.label}
                                </div>
                            }>
                                <Select
                                    className="w-full rounded-xl"
                                    size="large"
                                    value={preferences[item.key]}
                                    onChange={(value) => handlePreferenceChange(item.key, value)}
                                >
                                    {item.options.map(option => (
                                        <Option key={option.value} value={option.value}>{option.label}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return renderProfileTab();
            case "notifications":
                return renderNotificationsTab();
            case "security":
                return renderSecurityTab();
            case "privacy":
                return renderPrivacyTab();
            case "preferences":
                return renderPreferencesTab();
            default:
                return renderProfileTab();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 font-[IRANSans]">
            <div className="max-w-7xl mx-auto">
                {/* هدر */}
                <div className="mb-8">
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col xs={24} lg={12}>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <SettingsIcon className="text-white" size={20} />
                                </div>
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                                        تنظیمات حساب کاربری
                                    </h1>
                                    <p className="text-gray-600 mt-1 text-sm lg:text-base">
                                        مدیریت اطلاعات شخصی و تنظیمات برنامه
                                    </p>
                                </div>
                            </div>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Row gutter={[8, 8]} justify="end">
                                {[
                                    { label: "سفارشات", value: stats.totalOrders, color: "text-blue-600" },
                                    { label: "موفقیت", value: `${stats.successRate}%`, color: "text-green-600" },
                                    { label: "ذخیره‌ها", value: stats.savedItems, color: "text-purple-600" },
                                ].map((stat, index) => (
                                    <Col key={index}>
                                        <Card className="text-center border-0 shadow-lg min-w-[100px] hover:shadow-xl transition-all bg-white">
                                            <div className="text-xs text-gray-500">{stat.label}</div>
                                            <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </div>

                <Row gutter={[24, 24]}>
                    {/* سایدبار */}
                    <Col xs={24} lg={6}>
                        <Card className="shadow-lg border-0 sticky top-6 bg-white">
                            {/* پروفایل کاربر */}
                            <div className="text-center mb-6">
                                <div className="relative inline-block">
                                    <Avatar
                                        src={profile.avatar}
                                        size={90}
                                        className="border-4 border-blue-100 mx-auto mb-3 shadow-lg"
                                    />
                                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <h3 className="font-bold text-gray-800 text-lg">{profile.name}</h3>
                                <p className="text-gray-500 text-sm mt-1">{profile.bio}</p>
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
                                        className={`w-full flex items-center gap-3 justify-start p-3 rounded-xl transition-all font-medium ${activeTab === item.key
                                            ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg"
                                            : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                            }`}
                                    >
                                        <item.icon size={18} className={activeTab === item.key ? "text-white" : item.color} />
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </Card>
                    </Col>

                    {/* محتوای اصلی */}
                    <Col xs={24} lg={18}>
                        <Card className="shadow-lg border-0 min-h-[600px] bg-white">
                            {renderContent()}

                            {/* دکمه ذخیره */}
                            <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 mt-8 rounded-b-2xl">
                                <Row justify="space-between" align="middle">
                                    <Col>
                                        <Button
                                            type="text"
                                            danger
                                            icon={<Trash2 size={16} />}
                                            onClick={handleDeleteAccount}
                                            className="hover:bg-red-50 rounded-xl font-medium"
                                        >
                                            حذف حساب کاربری
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            type="primary"
                                            icon={<Save size={16} />}
                                            onClick={handleSave}
                                            loading={isLoading}
                                            className="bg-gradient-to-r from-blue-500 to-cyan-600 border-0 font-bold h-12 px-8 rounded-xl hover:shadow-lg transition-all"
                                        >
                                            ذخیره تغییرات
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}