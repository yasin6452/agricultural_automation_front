// src/pages/services/ServicesSettings.tsx
import { useState } from "react";
import { Switch, Input, Button, Select, Card, Divider, message, Form } from "antd";
import {
    Save,
    Building,
    Mail,
    Phone,
    MapPin,
    User,
    Shield,
    Bell,
    CreditCard,
    Globe
} from "lucide-react";

const { Option } = Select;
const { TextArea } = Input;

export default function ServicesSettings() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({
        isActive: true,
        serviceName: "",
        email: "",
        phone: "",
        address: "",
        contactPerson: "",
        serviceType: "",
        description: "",
        notifications: true,
        autoConfirm: false,
        paymentGateway: "zarinpal",
        language: "fa"
    });

    const handleSave = async (values: any) => {
        setLoading(true);
        try {
            // شبیه‌سازی API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSettings(prev => ({ ...prev, ...values }));
            message.success("تنظیمات با موفقیت ذخیره شد");
        } catch (error) {
            message.error("خطا در ذخیره تنظیمات");
        } finally {
            setLoading(false);
        }
    };

    const serviceTypes = [
        { label: "خدمات ماشین‌آلات کشاورزی", value: "machinery" },
        { label: "بسته‌بندی محصولات", value: "packaging" },
        { label: "سیستم‌های آبیاری", value: "irrigation" },
        { label: "تأمین نهاده‌ها", value: "supplies" },
        { label: "مشاوره تخصصی", value: "consultation" },
        { label: "انبارداری و سردخانه", value: "storage" }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            {/* هدر صفحه */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    تنظیمات پنل خدمات
                </h1>
                <p className="text-gray-600 text-lg">
                    مدیریت کامل تنظیمات و پیکربندی سرویس‌های کشاورزی
                </p>
            </div>

            <Form
                form={form}
                layout="vertical"
                initialValues={settings}
                onFinish={handleSave}
                className="space-y-6"
            >
                {/* کارت وضعیت سرویس */}
                <Card
                    className="rounded-2xl shadow-lg border-0"
                    bodyStyle={{ padding: '24px' }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Shield className="text-orange-600" size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">وضعیت سرویس</h3>
                            <p className="text-gray-500 text-sm">فعال یا غیرفعال کردن پنل خدمات</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <div>
                            <span className="text-gray-700 font-medium block">وضعیت پنل خدمات</span>
                            <span className="text-gray-500 text-sm">
                                {settings.isActive ? "سرویس فعال است" : "سرویس غیرفعال است"}
                            </span>
                        </div>
                        <Form.Item name="isActive" valuePropName="checked" className="mb-0">
                            <Switch
                                checkedChildren="فعال"
                                unCheckedChildren="غیرفعال"
                                checked={settings.isActive}
                                onChange={(checked) => form.setFieldValue('isActive', checked)}
                                style={{
                                    backgroundColor: settings.isActive ? "#ff8c00" : "#d1d1d1",
                                }}
                                size="default"
                            />
                        </Form.Item>
                    </div>
                </Card>

                {/* کارت اطلاعات پایه */}
                <Card
                    className="rounded-2xl shadow-lg border-0"
                    bodyStyle={{ padding: '24px' }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Building className="text-blue-600" size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">اطلاعات پایه</h3>
                            <p className="text-gray-500 text-sm">مشخصات مرکز خدمات و اطلاعات تماس</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                            name="serviceName"
                            label="نام مرکز خدمات"
                            rules={[{ required: true, message: "نام مرکز خدمات الزامی است" }]}
                        >
                            <Input
                                prefix={<Building className="text-gray-400" size={16} />}
                                placeholder="مثال: مرکز خدمات گیاه‌پزشکی البرز"
                                size="large"
                                className="rounded-xl"
                            />
                        </Form.Item>

                        <Form.Item
                            name="serviceType"
                            label="نوع خدمات"
                            rules={[{ required: true, message: "نوع خدمات الزامی است" }]}
                        >
                            <Select
                                placeholder="انتخاب نوع خدمات"
                                size="large"
                                className="rounded-xl"
                            >
                                {serviceTypes.map(type => (
                                    <Option key={type.value} value={type.value}>
                                        {type.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="contactPerson"
                            label="مسئول ارتباط"
                            rules={[{ required: true, message: "نام مسئول ارتباط الزامی است" }]}
                        >
                            <Input
                                prefix={<User className="text-gray-400" size={16} />}
                                placeholder="نام و نام خانوادگی مسئول"
                                size="large"
                                className="rounded-xl"
                            />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="تلفن تماس"
                            rules={[{ required: true, message: "شماره تماس الزامی است" }]}
                        >
                            <Input
                                prefix={<Phone className="text-gray-400" size={16} />}
                                placeholder="09123456789"
                                size="large"
                                className="rounded-xl"
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="ایمیل ارتباطی"
                            rules={[
                                { required: true, message: "ایمیل الزامی است" },
                                { type: 'email', message: 'ایمیل معتبر نیست' }
                            ]}
                        >
                            <Input
                                prefix={<Mail className="text-gray-400" size={16} />}
                                placeholder="info@example.com"
                                size="large"
                                className="rounded-xl"
                            />
                        </Form.Item>

                        <Form.Item
                            name="address"
                            label="آدرس"
                        >
                            <Input
                                prefix={<MapPin className="text-gray-400" size={16} />}
                                placeholder="آدرس کامل مرکز خدمات"
                                size="large"
                                className="rounded-xl"
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="description"
                        label="توضیحات خدمات"
                    >
                        <TextArea
                            rows={4}
                            placeholder="توضیحات کامل درباره خدمات ارائه شده..."
                            className="rounded-xl"
                        />
                    </Form.Item>
                </Card>

                {/* کارت تنظیمات پیشرفته */}
                <Card
                    className="rounded-2xl shadow-lg border-0"
                    bodyStyle={{ padding: '24px' }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Bell className="text-green-600" size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">تنظیمات پیشرفته</h3>
                            <p className="text-gray-500 text-sm">تنظیمات سیستمی و اعلان‌ها</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                            <div>
                                <span className="text-gray-700 font-medium block">اعلان‌های ایمیلی</span>
                                <span className="text-gray-500 text-sm">دریافت اطلاعیه‌ها از طریق ایمیل</span>
                            </div>
                            <Form.Item name="notifications" valuePropName="checked" className="mb-0">
                                <Switch
                                    checkedChildren="فعال"
                                    unCheckedChildren="غیرفعال"
                                    style={{ backgroundColor: settings.notifications ? "#10b981" : "#d1d1d1" }}
                                />
                            </Form.Item>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                            <div>
                                <span className="text-gray-700 font-medium block">تأیید خودکار درخواست‌ها</span>
                                <span className="text-gray-500 text-sm">درخواست‌ها به صورت خودکار تأیید شوند</span>
                            </div>
                            <Form.Item name="autoConfirm" valuePropName="checked" className="mb-0">
                                <Switch
                                    checkedChildren="فعال"
                                    unCheckedChildren="غیرفعال"
                                    style={{ backgroundColor: settings.autoConfirm ? "#10b981" : "#d1d1d1" }}
                                />
                            </Form.Item>
                        </div>

                        <Divider />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item
                                name="paymentGateway"
                                label="درگاه پرداخت"
                            >
                                <Select
                                    placeholder="انتخاب درگاه پرداخت"
                                    size="large"
                                    className="rounded-xl"
                                    suffixIcon={<CreditCard size={16} />}
                                >
                                    <Option value="zarinpal">زرین‌پال</Option>
                                    <Option value="mellat">ملت</Option>
                                    <Option value="saman">سامان</Option>
                                    <Option value="parsian">پارسیان</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="language"
                                label="زبان سیستم"
                            >
                                <Select
                                    placeholder="انتخاب زبان"
                                    size="large"
                                    className="rounded-xl"
                                    suffixIcon={<Globe size={16} />}
                                >
                                    <Option value="fa">فارسی</Option>
                                    <Option value="en">English</Option>
                                    <Option value="ar">العربیة</Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                </Card>

                {/* دکمه‌های اقدام */}
                <div className="flex justify-end gap-3 pt-6 border-t">
                    <Button
                        size="large"
                        className="rounded-xl px-8 border-gray-300"
                        onClick={() => form.resetFields()}
                    >
                        بازنشانی
                    </Button>
                    <Form.Item className="mb-0">
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={loading}
                            icon={<Save size={16} />}
                            className="rounded-xl px-8 bg-orange-500 hover:bg-orange-600 border-orange-500"
                        >
                            ذخیره تنظیمات
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
}