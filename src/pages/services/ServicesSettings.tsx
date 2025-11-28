import { useState } from "react";
import { Card, Form, Input, Button, Switch, message, Tabs, Upload, Select, Alert, Divider, Modal, Rate, InputNumber, Space } from "antd";
import {
    SettingOutlined,
    DollarOutlined,
    ClockCircleOutlined,
    UploadOutlined,
    InfoCircleOutlined,
    SafetyOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    StarOutlined,
    TagOutlined,
    AppstoreOutlined
} from "@ant-design/icons";
import { Settings as SettingsIcon, Package, DollarSign, Shield, Trash2, Clock, Star } from "lucide-react";

const { Option } = Select;
const { TextArea } = Input;

export const ServiceSettings = () => {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("general");
    const [generalForm] = Form.useForm();
    const [pricingForm] = Form.useForm();
    const [availabilityForm] = Form.useForm();

    // تنظیمات فعلی خدمات (mock data)
    const currentSettings = {
        serviceName: "خدمات کشاورزی پیشرفته",
        description: "ارائه خدمات تخصصی در زمینه کشاورزی مدرن و پایدار",
        category: "agriculture",
        tags: ["کشاورزی", "خدمات تخصصی", "مشاوره"],
        hourlyRate: 250000,
        minDuration: 2,
        maxDuration: 8,
        availability: {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: false,
            saturday: true,
            sunday: true,
        },
        workHours: {
            start: "08:00",
            end: "18:00",
        },
        instantBooking: true,
        advanceBooking: 7,
        qualityRating: 4.5,
    };

    // ذخیره تغییرات عمومی
    const handleGeneralUpdate = async (values: any) => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("General Settings Updated:", values);
            message.success("تنظیمات عمومی با موفقیت بروزرسانی شد!");
        } catch (error) {
            message.error("خطا در بروزرسانی تنظیمات");
        } finally {
            setLoading(false);
        }
    };

    // ذخیره تغییرات قیمت‌گذاری
    const handlePricingUpdate = async (values: any) => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Pricing Updated:", values);
            message.success("تنظیمات قیمت‌گذاری ذخیره شد!");
        } catch (error) {
            message.error("خطا در ذخیره تنظیمات قیمت‌گذاری");
        } finally {
            setLoading(false);
        }
    };

    // ذخیره تنظیمات دسترسی‌پذیری
    const handleAvailabilityUpdate = async (values: any) => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 800));
            console.log("Availability Updated:", values);
            message.success("تنظیمات دسترسی‌پذیری ذخیره شد!");
        } catch (error) {
            message.error("خطا در ذخیره تنظیمات");
        } finally {
            setLoading(false);
        }
    };

    // غیرفعال کردن موقت خدمات
    const handleDisableService = () => {
        Modal.confirm({
            title: "غیرفعال کردن موقت خدمات",
            icon: <ExclamationCircleOutlined />,
            content: "آیا مطمئن هستید که می‌خواهید خدمات را به طور موقت غیرفعال کنید؟",
            okText: "بله، غیرفعال کن",
            cancelText: "انصراف",
            onOk: () => {
                message.warning("خدمات به طور موقت غیرفعال شد");
            },
        });
    };

    // حذف دائمی خدمات
    const handleDeleteService = () => {
        Modal.confirm({
            title: "حذف دائمی خدمات",
            icon: <ExclamationCircleOutlined style={{ color: "#ef4444" }} />,
            content: (
                <div>
                    <p className="text-red-600 font-semibold mb-2">⚠️ هشدار: این عمل غیرقابل بازگشت است!</p>
                    <p className="text-sm text-gray-600">
                        با حذف خدمات، تمام اطلاعات، قراردادها و تاریخچه خدمات شما به طور دائم حذف خواهد شد.
                    </p>
                </div>
            ),
            okText: "بله، حذف کن",
            okType: "danger",
            cancelText: "انصراف",
            onOk: () => {
                message.error("خدمات حذف شد");
                setTimeout(() => {
                    window.location.href = "/services";
                }, 1000);
            },
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {/* Header */}
            <div className="mb-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <SettingsIcon className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">تنظیمات خدمات</h1>
                        <p className="text-gray-500">مدیریت خدمات و تنظیمات ارائه</p>
                    </div>
                </div>
            </div>

            <Card
                className="shadow-lg rounded-2xl"
                styles={{
                    body: {
                        padding: '24px'
                    }
                }}
            >
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={[
                        {
                            key: "general",
                            label: (
                                <span className="flex items-center gap-2">
                                    <Package size={18} />
                                    عمومی
                                </span>
                            ),
                            children: (
                                <div className="animate-slideIn">
                                    <Alert
                                        message="تنظیمات عمومی خدمات"
                                        description="اطلاعات پایه و مشخصات خدمات خود را در این بخش مدیریت کنید."
                                        type="info"
                                        showIcon
                                        className="mb-6"
                                    />

                                    <Form
                                        form={generalForm}
                                        layout="vertical"
                                        onFinish={handleGeneralUpdate}
                                        initialValues={currentSettings}
                                    >
                                        <Form.Item
                                            label="نام خدمات"
                                            name="serviceName"
                                            rules={[{ required: true, message: "نام خدمات الزامی است" }]}
                                        >
                                            <Input
                                                prefix={<AppstoreOutlined />}
                                                size="large"
                                                placeholder="نام خدمات خود را وارد کنید"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="توضیحات خدمات"
                                            name="description"
                                            rules={[{ required: true, message: "توضیحات خدمات الزامی است" }]}
                                        >
                                            <TextArea
                                                rows={4}
                                                placeholder="توضیحات کامل خدمات خود را بنویسید..."
                                                showCount
                                                maxLength={500}
                                            />
                                        </Form.Item>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Form.Item
                                                label="دسته‌بندی"
                                                name="category"
                                                rules={[{ required: true, message: "انتخاب دسته‌بندی الزامی است" }]}
                                            >
                                                <Select size="large">
                                                    <Option value="agriculture">کشاورزی</Option>
                                                    <Option value="consulting">مشاوره</Option>
                                                    <Option value="technical">فنی</Option>
                                                    <Option value="educational">آموزشی</Option>
                                                    <Option value="other">سایر</Option>
                                                </Select>
                                            </Form.Item>

                                            <Form.Item
                                                label="امتیاز کیفیت"
                                                name="qualityRating"
                                            >
                                                <Rate
                                                    allowHalf
                                                    character={<StarOutlined />}
                                                    disabled
                                                    className="text-yellow-500"
                                                />
                                            </Form.Item>
                                        </div>

                                        <Form.Item
                                            label="برچسب‌ها"
                                            name="tags"
                                            tooltip="برچسب‌های مرتبط با خدمات خود را وارد کنید"
                                        >
                                            <Select
                                                mode="tags"
                                                size="large"
                                                placeholder="برچسب اضافه کنید"
                                                style={{ width: '100%' }}
                                                tokenSeparators={[',']}
                                            />
                                        </Form.Item>

                                        <Divider />

                                        <div className="space-y-4">
                                            <h3 className="font-bold text-gray-800 mb-3">تنظیمات پیشرفته</h3>

                                            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                                <div>
                                                    <p className="font-semibold text-gray-800">رزرو فوری</p>
                                                    <p className="text-sm text-gray-600">اجازه رزرو فوری بدون تایید قبلی</p>
                                                </div>
                                                <Form.Item name="instantBooking" valuePropName="checked" noStyle>
                                                    <Switch />
                                                </Form.Item>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Form.Item
                                                    label="حداقل مدت زمان (ساعت)"
                                                    name="minDuration"
                                                    rules={[{ required: true, message: "حداقل مدت زمان الزامی است" }]}
                                                >
                                                    <InputNumber
                                                        min={1}
                                                        max={24}
                                                        size="large"
                                                        className="w-full"
                                                        placeholder="حداقل مدت زمان"
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    label="حداکثر مدت زمان (ساعت)"
                                                    name="maxDuration"
                                                    rules={[{ required: true, message: "حداکثر مدت زمان الزامی است" }]}
                                                >
                                                    <InputNumber
                                                        min={1}
                                                        max={24}
                                                        size="large"
                                                        className="w-full"
                                                        placeholder="حداکثر مدت زمان"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={loading}
                                            size="large"
                                            block
                                            className="bg-gradient-to-r from-blue-500 to-blue-600 mt-6"
                                        >
                                            ذخیره تغییرات
                                        </Button>
                                    </Form>
                                </div>
                            ),
                        },
                        {
                            key: "pricing",
                            label: (
                                <span className="flex items-center gap-2">
                                    <DollarSign size={18} />
                                    قیمت‌گذاری
                                </span>
                            ),
                            children: (
                                <div className="animate-slideIn">
                                    <Alert
                                        message="تنظیمات قیمت‌گذاری"
                                        description="تعرفه‌ها و شرایط مالی خدمات خود را در این بخش مدیریت کنید."
                                        type="info"
                                        showIcon
                                        className="mb-6"
                                    />

                                    <Form
                                        form={pricingForm}
                                        layout="vertical"
                                        onFinish={handlePricingUpdate}
                                        initialValues={currentSettings}
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Form.Item
                                                label="نرخ ساعتی (تومان)"
                                                name="hourlyRate"
                                                rules={[{ required: true, message: "تعیین نرخ ساعتی الزامی است" }]}
                                            >
                                                <InputNumber
                                                    min={0}
                                                    step={10000}
                                                    size="large"
                                                    className="w-full"
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    placeholder="نرخ ساعتی"
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label="حداکثر روزهای رزرو قبلی"
                                                name="advanceBooking"
                                                tooltip="مشتریان حداکثر تا چند روز آینده می‌توانند رزرو کنند"
                                            >
                                                <Space.Compact style={{ width: '100%' }}>
                                                    <InputNumber
                                                        min={1}
                                                        max={30}
                                                        size="large"
                                                        style={{ width: '100%' }}
                                                        placeholder="تعداد روز"
                                                    />
                                                    <Button size="large" style={{ height: '40px' }}>
                                                        روز
                                                    </Button>
                                                </Space.Compact>
                                            </Form.Item>
                                        </div>

                                        <Divider />

                                        <h3 className="font-bold text-gray-800 mb-4">تعرفه‌های ویژه</h3>

                                        <div className="space-y-4">
                                            <Card
                                                className="bg-orange-50 border-orange-200"
                                                styles={{
                                                    body: {
                                                        padding: '16px'
                                                    }
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-semibold text-orange-800 mb-1">تعرفه ساعتی</p>
                                                        <p className="text-sm text-orange-600">قیمت پایه برای هر ساعت خدمات</p>
                                                    </div>
                                                    <span className="font-bold text-orange-700">
                                                        {currentSettings.hourlyRate.toLocaleString()} تومان
                                                    </span>
                                                </div>
                                            </Card>

                                            <Card
                                                className="bg-green-50 border-green-200"
                                                styles={{
                                                    body: {
                                                        padding: '16px'
                                                    }
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-semibold text-green-800 mb-1">تعرفه روزانه (8 ساعت)</p>
                                                        <p className="text-sm text-green-600">10% تخفیف برای خدمات تمام‌روزه</p>
                                                    </div>
                                                    <span className="font-bold text-green-700">
                                                        {(currentSettings.hourlyRate * 8 * 0.9).toLocaleString()} تومان
                                                    </span>
                                                </div>
                                            </Card>

                                            <Card
                                                className="bg-purple-50 border-purple-200"
                                                styles={{
                                                    body: {
                                                        padding: '16px'
                                                    }
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-semibold text-purple-800 mb-1">تعرفه هفتگی</p>
                                                        <p className="text-sm text-purple-600">15% تخفیف برای خدمات هفتگی</p>
                                                    </div>
                                                    <span className="font-bold text-purple-700">
                                                        {(currentSettings.hourlyRate * 40 * 0.85).toLocaleString()} تومان
                                                    </span>
                                                </div>
                                            </Card>
                                        </div>

                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={loading}
                                            size="large"
                                            block
                                            className="bg-gradient-to-r from-green-500 to-green-600 mt-6"
                                            icon={<DollarOutlined />}
                                        >
                                            بروزرسانی قیمت‌ها
                                        </Button>
                                    </Form>
                                </div>
                            ),
                        },
                        {
                            key: "availability",
                            label: (
                                <span className="flex items-center gap-2">
                                    <Clock size={18} />
                                    دسترسی‌پذیری
                                </span>
                            ),
                            children: (
                                <div className="animate-slideIn">
                                    <Alert
                                        message="تنظیمات دسترسی‌پذیری"
                                        description="روزها و ساعات کاری خود را برای ارائه خدمات تنظیم کنید."
                                        type="info"
                                        showIcon
                                        className="mb-6"
                                    />

                                    <Form
                                        form={availabilityForm}
                                        layout="vertical"
                                        onFinish={handleAvailabilityUpdate}
                                        initialValues={currentSettings}
                                    >
                                        <h3 className="font-bold text-gray-800 mb-4">روزهای کاری</h3>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                            {[
                                                { key: 'saturday', label: 'شنبه' },
                                                { key: 'sunday', label: 'یکشنبه' },
                                                { key: 'monday', label: 'دوشنبه' },
                                                { key: 'tuesday', label: 'سه‌شنبه' },
                                                { key: 'wednesday', label: 'چهارشنبه' },
                                                { key: 'thursday', label: 'پنجشنبه' },
                                                { key: 'friday', label: 'جمعه' },
                                            ].map(day => (
                                                <Form.Item
                                                    key={day.key}
                                                    name={['availability', day.key]}
                                                    valuePropName="checked"
                                                    noStyle
                                                >
                                                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                                        <span className="text-gray-700">{day.label}</span>
                                                        <Switch size="small" />
                                                    </div>
                                                </Form.Item>
                                            ))}
                                        </div>

                                        <Divider />

                                        <h3 className="font-bold text-gray-800 mb-4">ساعات کاری</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Form.Item
                                                label="ساعت شروع"
                                                name={['workHours', 'start']}
                                            >
                                                <Input
                                                    type="time"
                                                    size="large"
                                                    prefix={<ClockCircleOutlined />}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label="ساعت پایان"
                                                name={['workHours', 'end']}
                                            >
                                                <Input
                                                    type="time"
                                                    size="large"
                                                    prefix={<ClockCircleOutlined />}
                                                />
                                            </Form.Item>
                                        </div>

                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={loading}
                                            size="large"
                                            block
                                            className="bg-gradient-to-r from-purple-500 to-purple-600"
                                            icon={<ClockCircleOutlined />}
                                        >
                                            ذخیره تنظیمات دسترسی
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
                                    مدیریت خدمات
                                </span>
                            ),
                            children: (
                                <div className="animate-slideIn">
                                    <Alert
                                        message="⚠️ مدیریت خدمات"
                                        description="عملیات‌های مدیریتی خدمات خود را در این بخش انجام دهید."
                                        type="warning"
                                        showIcon
                                        className="mb-6"
                                    />

                                    <Card
                                        className="border-2 border-orange-200 mb-4"
                                        styles={{
                                            body: {
                                                padding: '16px'
                                            }
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-bold text-gray-800 mb-1">غیرفعال کردن موقت خدمات</h3>
                                                <p className="text-sm text-gray-600">خدمات شما به طور موقت در دسترس نخواهد بود</p>
                                            </div>
                                            <Button
                                                type="default"
                                                danger
                                                icon={<SettingOutlined />}
                                                onClick={handleDisableService}
                                            >
                                                غیرفعال کردن
                                            </Button>
                                        </div>
                                    </Card>

                                    <Card
                                        className="border-2 border-red-300"
                                        styles={{
                                            body: {
                                                padding: '16px'
                                            }
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-bold text-red-600 mb-1">حذف دائمی خدمات</h3>
                                                <p className="text-sm text-gray-600">
                                                    حذف دائمی خدمات و تمام اطلاعات مرتبط
                                                </p>
                                            </div>
                                            <Button
                                                danger
                                                type="primary"
                                                icon={<DeleteOutlined />}
                                                onClick={handleDeleteService}
                                            >
                                                حذف خدمات
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