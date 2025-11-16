import { useState } from "react";
import { Card, Form, Input, Button, Switch, message, Tabs, Avatar, Upload, Select, Alert, Divider, Modal } from "antd";
import {
    UserOutlined,
    LockOutlined,
    BellOutlined,
    SafetyOutlined,
    UploadOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    LogoutOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Settings as SettingsIcon, User, Bell, Shield, Trash2 } from "lucide-react";

const { Option } = Select;

export const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [profileForm] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const [notificationForm] = Form.useForm();

    // تنظیمات فعلی کاربر (mock data)
    const currentUser = {
        firstName: "علی",
        lastName: "احمدی",
        email: "ali.ahmadi@example.com",
        phone: "09123456789",
        avatar: "https://i.pravatar.cc/150?img=12",
        province: "tehran",
        city: "تهران",
        address: "خیابان آزادی",
        notifications: {
            email: true,
            sms: true,
            push: false,
        },
    };

    // ذخیره تغییرات پروفایل
    const handleProfileUpdate = async (values: any) => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Profile Updated:", values);
            message.success("اطلاعات پروفایل با موفقیت بروزرسانی شد!");
        } catch (error) {
            message.error("خطا در بروزرسانی اطلاعات");
        } finally {
            setLoading(false);
        }
    };

    // تغییر رمز عبور
    const handlePasswordChange = async (values: any) => {
        if (values.newPassword !== values.confirmPassword) {
            message.error("رمز عبور جدید و تکرار آن یکسان نیستند");
            return;
        }

        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Password Changed");
            message.success("رمز عبور با موفقیت تغییر کرد!");
            passwordForm.resetFields();
        } catch (error) {
            message.error("خطا در تغییر رمز عبور");
        } finally {
            setLoading(false);
        }
    };

    // ذخیره تنظیمات اعلان‌ها
    const handleNotificationUpdate = async (values: any) => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 800));
            console.log("Notifications Updated:", values);
            message.success("تنظیمات اعلان‌ها ذخیره شد!");
        } catch (error) {
            message.error("خطا در ذخیره تنظیمات");
        } finally {
            setLoading(false);
        }
    };

    // خروج از حساب
    const handleLogout = () => {
        Modal.confirm({
            title: "خروج از حساب کاربری",
            icon: <ExclamationCircleOutlined />,
            content: "آیا مطمئن هستید که می‌خواهید خارج شوید؟",
            okText: "بله، خروج",
            cancelText: "انصراف",
            onOk: () => {
                message.success("با موفقیت خارج شدید");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 500);
            },
        });
    };

    // حذف حساب
    const handleDeleteAccount = () => {
        Modal.confirm({
            title: "حذف حساب کاربری",
            icon: <ExclamationCircleOutlined style={{ color: "#ef4444" }} />,
            content: (
                <div>
                    <p className="text-red-600 font-semibold mb-2">⚠️ هشدار: این عمل غیرقابل بازگشت است!</p>
                    <p className="text-sm text-gray-600">
                        با حذف حساب، تمام اطلاعات، زمین‌ها، محصولات و داده‌های شما به طور دائم حذف خواهند شد.
                    </p>
                </div>
            ),
            okText: "بله، حذف کن",
            okType: "danger",
            cancelText: "انصراف",
            onOk: () => {
                message.error("حساب کاربری حذف شد");
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            },
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {/* Header */}
            <div className="mb-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center shadow-lg">
                        <SettingsIcon className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">تنظیمات</h1>
                        <p className="text-gray-500">مدیریت حساب و تنظیمات کاربری</p>
                    </div>
                </div>
            </div>

            <Card className="shadow-lg rounded-2xl">
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={[
                        {
                            key: "profile",
                            label: (
                                <span className="flex items-center gap-2">
                                    <User size={18} />
                                    پروفایل
                                </span>
                            ),
                            children: (
                                <div className="animate-slideIn">
                                    {/* آواتار */}
                                    <div className="text-center mb-6">
                                        <Avatar
                                            size={100}
                                            src={currentUser.avatar}
                                            icon={<UserOutlined />}
                                            className="mb-4"
                                        />
                                        <Upload showUploadList={false}>
                                            <Button icon={<UploadOutlined />} type="dashed">
                                                تغییر عکس پروفایل
                                            </Button>
                                        </Upload>
                                    </div>

                                    <Divider />

                                    <Form
                                        form={profileForm}
                                        layout="vertical"
                                        onFinish={handleProfileUpdate}
                                        initialValues={currentUser}
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Form.Item
                                                label="نام"
                                                name="firstName"
                                                rules={[{ required: true, message: "نام الزامی است" }]}
                                            >
                                                <Input prefix={<UserOutlined />} size="large" />
                                            </Form.Item>

                                            <Form.Item
                                                label="نام خانوادگی"
                                                name="lastName"
                                                rules={[{ required: true, message: "نام خانوادگی الزامی است" }]}
                                            >
                                                <Input prefix={<UserOutlined />} size="large" />
                                            </Form.Item>
                                        </div>

                                        <Form.Item
                                            label="ایمیل"
                                            name="email"
                                            rules={[
                                                { required: true, message: "ایمیل الزامی است" },
                                                { type: "email", message: "ایمیل معتبر نیست" },
                                            ]}
                                        >
                                            <Input prefix={<MailOutlined />} size="large" dir="ltr" />
                                        </Form.Item>

                                        <Form.Item label="شماره موبایل" name="phone">
                                            <Input
                                                prefix={<PhoneOutlined />}
                                                size="large"
                                                disabled
                                                dir="ltr"
                                            />
                                        </Form.Item>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Form.Item label="استان" name="province">
                                                <Select size="large">
                                                    <Option value="tehran">تهران</Option>
                                                    <Option value="mazandaran">مازندران</Option>
                                                    <Option value="gilan">گیلان</Option>
                                                    <Option value="isfahan">اصفهان</Option>
                                                </Select>
                                            </Form.Item>

                                            <Form.Item label="شهر" name="city">
                                                <Input prefix={<EnvironmentOutlined />} size="large" />
                                            </Form.Item>
                                        </div>

                                        <Form.Item label="آدرس" name="address">
                                            <Input.TextArea rows={2} />
                                        </Form.Item>

                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={loading}
                                            size="large"
                                            block
                                            className="bg-gradient-to-r from-green-500 to-green-600"
                                        >
                                            ذخیره تغییرات
                                        </Button>
                                    </Form>
                                </div>
                            ),
                        },
                        {
                            key: "security",
                            label: (
                                <span className="flex items-center gap-2">
                                    <Shield size={18} />
                                    امنیت
                                </span>
                            ),
                            children: (
                                <div className="animate-slideIn">
                                    <Alert
                                        message="امنیت حساب"
                                        description="برای حفظ امنیت حساب خود، رمز عبور قوی انتخاب کنید و آن را به‌صورت دوره‌ای تغییر دهید."
                                        type="info"
                                        showIcon
                                        className="mb-6"
                                    />

                                    <Form
                                        form={passwordForm}
                                        layout="vertical"
                                        onFinish={handlePasswordChange}
                                    >
                                        <Form.Item
                                            label="رمز عبور فعلی"
                                            name="currentPassword"
                                            rules={[{ required: true, message: "رمز عبور فعلی الزامی است" }]}
                                        >
                                            <Input.Password
                                                prefix={<LockOutlined />}
                                                size="large"
                                                placeholder="رمز عبور فعلی"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="رمز عبور جدید"
                                            name="newPassword"
                                            rules={[
                                                { required: true, message: "رمز عبور جدید الزامی است" },
                                                { min: 8, message: "رمز عبور باید حداقل 8 کاراکتر باشد" },
                                            ]}
                                        >
                                            <Input.Password
                                                prefix={<LockOutlined />}
                                                size="large"
                                                placeholder="رمز عبور جدید"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="تکرار رمز عبور جدید"
                                            name="confirmPassword"
                                            rules={[{ required: true, message: "تکرار رمز عبور الزامی است" }]}
                                        >
                                            <Input.Password
                                                prefix={<LockOutlined />}
                                                size="large"
                                                placeholder="تکرار رمز عبور جدید"
                                            />
                                        </Form.Item>

                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={loading}
                                            size="large"
                                            block
                                            className="bg-gradient-to-r from-blue-500 to-blue-600"
                                            icon={<SafetyOutlined />}
                                        >
                                            تغییر رمز عبور
                                        </Button>
                                    </Form>

                                    <Divider />

                                    <div className="space-y-4">
                                        <h3 className="font-bold text-gray-800 mb-3">احراز هویت دو مرحله‌ای</h3>
                                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                            <div>
                                                <p className="font-semibold text-gray-800">احراز هویت دو مرحله‌ای</p>
                                                <p className="text-sm text-gray-600">افزایش امنیت با کد یکبار مصرف</p>
                                            </div>
                                            <Switch defaultChecked={false} />
                                        </div>
                                    </div>
                                </div>
                            ),
                        },
                        {
                            key: "notifications",
                            label: (
                                <span className="flex items-center gap-2">
                                    <Bell size={18} />
                                    اعلان‌ها
                                </span>
                            ),
                            children: (
                                <div className="animate-slideIn">
                                    <Alert
                                        message="مدیریت اعلان‌ها"
                                        description="انتخاب کنید از چه طریقی می‌خواهید اعلان‌ها را دریافت کنید."
                                        type="info"
                                        showIcon
                                        className="mb-6"
                                    />

                                    <Form
                                        form={notificationForm}
                                        layout="vertical"
                                        onFinish={handleNotificationUpdate}
                                        initialValues={currentUser.notifications}
                                    >
                                        <div className="space-y-4">
                                            <Card className="bg-gray-50">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-semibold text-gray-800 mb-1">اعلان‌های ایمیل</p>
                                                        <p className="text-sm text-gray-600">دریافت اعلان‌ها از طریق ایمیل</p>
                                                    </div>
                                                    <Form.Item name="email" valuePropName="checked" noStyle>
                                                        <Switch />
                                                    </Form.Item>
                                                </div>
                                            </Card>

                                            <Card className="bg-gray-50">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-semibold text-gray-800 mb-1">اعلان‌های پیامکی</p>
                                                        <p className="text-sm text-gray-600">دریافت اعلان‌ها از طریق SMS</p>
                                                    </div>
                                                    <Form.Item name="sms" valuePropName="checked" noStyle>
                                                        <Switch />
                                                    </Form.Item>
                                                </div>
                                            </Card>

                                            <Card className="bg-gray-50">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-semibold text-gray-800 mb-1">اعلان‌های Push</p>
                                                        <p className="text-sm text-gray-600">دریافت نوتیفیکیشن در مرورگر</p>
                                                    </div>
                                                    <Form.Item name="push" valuePropName="checked" noStyle>
                                                        <Switch />
                                                    </Form.Item>
                                                </div>
                                            </Card>
                                        </div>

                                        <Divider />

                                        <h3 className="font-bold text-gray-800 mb-3">انواع اعلان‌ها</h3>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-700">فروش محصول</span>
                                                <Switch defaultChecked />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-700">نتایج آزمایش</span>
                                                <Switch defaultChecked />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-700">پیام‌های جدید</span>
                                                <Switch defaultChecked />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-700">درخواست‌های خرید</span>
                                                <Switch defaultChecked />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-700">به‌روزرسانی‌های سیستم</span>
                                                <Switch defaultChecked={false} />
                                            </div>
                                        </div>

                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={loading}
                                            size="large"
                                            block
                                            className="bg-gradient-to-r from-purple-500 to-purple-600 mt-6"
                                            icon={<BellOutlined />}
                                        >
                                            ذخیره تنظیمات
                                        </Button>
                                    </Form>
                                </div>
                            ),
                        },
                        {
                            key: "danger",
                            label: (
                                <span className="flex items-center gap-2">
                                    <Trash2 size={18} />
                                    منطقه خطر
                                </span>
                            ),
                            children: (
                                <div className="animate-slideIn">
                                    <Alert
                                        message="⚠️ منطقه خطرناک"
                                        description="عملیات‌های این بخش غیرقابل بازگشت هستند. لطفاً با دقت عمل کنید."
                                        type="error"
                                        showIcon
                                        className="mb-6"
                                    />

                                    <Card className="border-2 border-red-200 mb-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-bold text-gray-800 mb-1">خروج از حساب</h3>
                                                <p className="text-sm text-gray-600">خروج از تمام دستگاه‌ها</p>
                                            </div>
                                            <Button
                                                danger
                                                icon={<LogoutOutlined />}
                                                onClick={handleLogout}
                                            >
                                                خروج
                                            </Button>
                                        </div>
                                    </Card>

                                    <Card className="border-2 border-red-300">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-bold text-red-600 mb-1">حذف حساب کاربری</h3>
                                                <p className="text-sm text-gray-600">
                                                    حذف دائمی حساب و تمام اطلاعات
                                                </p>
                                            </div>
                                            <Button
                                                danger
                                                type="primary"
                                                icon={<DeleteOutlined />}
                                                onClick={handleDeleteAccount}
                                            >
                                                حذف حساب
                                            </Button>
                                        </div>
                                    </Card>
                                </div>
                            ),
                        },
                    ]}
                />
            </Card>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
                .animate-slideIn {
                    animation: slideIn 0.4s ease-out;
                }
            `}</style>
        </div>
    );
};