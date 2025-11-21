import { useState } from "react";
import { User, Bell, Lock, Globe, Save, Shield, CreditCard, Palette, Trash2, Mail, Smartphone, Database } from "lucide-react";
import { Switch, Select, Avatar, Badge, Input, Card, Row, Col, Modal, Button, Form, message } from "antd";

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

    const renderProfileTab = () => (
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <User className="text-green-500" />
                اطلاعات کاربری
            </h2>

            <Row gutter={[24, 16]}>
                <Col xs={24} md={12}>
                    <Form layout="vertical">
                        <Form.Item label="نام کامل">
                            <Input
                                size="large"
                                className="rounded-xl"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                placeholder="نام کامل"
                            />
                        </Form.Item>

                        <Form.Item label="شماره تماس">
                            <Input
                                size="large"
                                className="rounded-xl"
                                value={profile.phone}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                placeholder="شماره تماس"
                            />
                        </Form.Item>

                        <Form.Item label="ایمیل">
                            <Input
                                size="large"
                                type="email"
                                className="rounded-xl"
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
                        </Form.Item>

                        <Form.Item label="درباره من">
                            <Input.TextArea
                                className="rounded-xl"
                                rows={4}
                                value={profile.bio}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                placeholder="توضیحاتی درباره خودتان..."
                            />
                        </Form.Item>

                        <Form.Item label="تصویر پروفایل">
                            <div className="flex items-center gap-4">
                                <Avatar src={profile.avatar} size={60} />
                                <Button className="rounded-xl">
                                    تغییر تصویر
                                </Button>
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
                            <Smartphone className="text-blue-500" size={16} />
                            کانال‌های اطلاع‌رسانی
                        </div>
                    } className="border-0 shadow-sm">
                        {([
                            { key: 'sms' as keyof Notifications, label: 'پیامک', icon: Smartphone },
                            { key: 'email' as keyof Notifications, label: 'ایمیل', icon: Mail },
                            { key: 'app' as keyof Notifications, label: 'نوتیفیکیشن برنامه', icon: Bell },
                        ] as const).map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0">
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
                    </Card>
                </Col>

                <Col xs={24} md={12}>
                    <Card title={
                        <div className="flex items-center gap-2">
                            <Database className="text-green-500" size={16} />
                            انواع اعلان‌ها
                        </div>
                    } className="border-0 shadow-sm">
                        {([
                            { key: 'priceAlerts' as keyof Notifications, label: 'هشدارهای قیمت' },
                            { key: 'orderUpdates' as keyof Notifications, label: 'به‌روزرسانی سفارشات' },
                            { key: 'promotions' as keyof Notifications, label: 'تخفیف‌ها و پیشنهادات' },
                            { key: 'newProducts' as keyof Notifications, label: 'محصولات جدید' },
                        ] as const).map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0">
                                <span>{item.label}</span>
                                <Switch
                                    checked={notifications[item.key]}
                                    onChange={(checked) => handleNotificationChange(item.key, checked)}
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
                <Shield className="text-blue-500" />
                امنیت حساب کاربری
            </h2>

            <Row gutter={[24, 16]}>
                <Col xs={24} md={12}>
                    <Card className="border-0 shadow-sm">
                        <div className="space-y-4">
                            <div className="p-4 border border-blue-200 rounded-xl bg-blue-50">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold">تغییر رمز عبور</span>
                                    <Badge count="توصیه می‌شود" style={{ backgroundColor: '#52c41a' }} />
                                </div>
                                <p className="text-sm text-gray-600 mb-3">رمز عبور خود را به صورت دوره‌ای تغییر دهید</p>
                                <Button
                                    type="primary"
                                    className="w-full rounded-xl"
                                    onClick={handleChangePassword}
                                >
                                    تغییر رمز عبور
                                </Button>
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
                    </Card>
                </Col>

                <Col xs={24} md={12}>
                    <Card className="border-0 shadow-sm">
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

            <Card className="border-0 shadow-sm">
                <div className="space-y-4">
                    {([
                        { key: 'profileVisible' as keyof Privacy, label: 'پروفایل عمومی', desc: 'قابل مشاهده برای دیگر کاربران' },
                        { key: 'activityStatus' as keyof Privacy, label: 'وضعیت فعالیت', desc: 'نمایش وضعیت آنلاین بودن' },
                        { key: 'dataSharing' as keyof Privacy, label: 'اشتراک‌گذاری داده‌ها', desc: 'برای بهبود سرویس‌ها' },
                    ] as const).map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
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
                        <Form.Item label={
                            <div className="flex items-center gap-2">
                                <item.icon size={16} className="text-gray-500" />
                                {item.label}
                            </div>
                        }>
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
                        </Form.Item>
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
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6 font-[IRANSans]">
            <div className="max-w-7xl mx-auto">
                {/* هدر */}
                <div className="mb-8">
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col xs={24} lg={12}>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <User className="text-white" size={20} />
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
                                <Col>
                                    <Card className="text-center border-0 shadow-sm min-w-[100px]">
                                        <div className="text-xs text-gray-500">سفارشات</div>
                                        <div className="text-lg font-bold text-gray-800">{stats.totalOrders}</div>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card className="text-center border-0 shadow-sm min-w-[100px]">
                                        <div className="text-xs text-gray-500">موفقیت</div>
                                        <div className="text-lg font-bold text-green-600">{stats.successRate}%</div>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>

                <Row gutter={[24, 24]}>
                    {/* سایدبار */}
                    <Col xs={24} lg={6}>
                        <Card className="shadow-lg border-0 sticky top-6">
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
                                    <Button
                                        key={item.key}
                                        type={activeTab === item.key ? "primary" : "text"}
                                        onClick={() => setActiveTab(item.key)}
                                        className={`w-full flex items-center gap-3 justify-start h-12 ${activeTab === item.key
                                            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                                            : "text-gray-600 hover:bg-green-50"
                                            }`}
                                    >
                                        <item.icon size={16} className={activeTab === item.key ? "text-white" : item.color} />
                                        <span className="font-medium">{item.label}</span>
                                    </Button>
                                ))}
                            </nav>
                        </Card>
                    </Col>

                    {/* محتوای اصلی */}
                    <Col xs={24} lg={18}>
                        <Card className="shadow-lg border-0 min-h-[600px]">
                            {renderContent()}

                            {/* دکمه ذخیره */}
                            <div className="p-6 border-t border-gray-200 bg-gray-50 mt-8">
                                <Row justify="space-between" align="middle">
                                    <Col>
                                        <Button
                                            type="text"
                                            danger
                                            icon={<Trash2 size={16} />}
                                            onClick={handleDeleteAccount}
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
                                            className="bg-gradient-to-r from-green-500 to-emerald-600 border-0 font-bold h-12 px-8 rounded-xl"
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