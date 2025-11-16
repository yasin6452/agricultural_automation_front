import { useState } from "react";
import { Card, Input, Button, Form, Steps, Select,  Upload, message, InputNumber, Alert } from "antd";
import {
    UserOutlined,
    MailOutlined,
    UploadOutlined,
    ArrowRightOutlined,
    ArrowLeftOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import { Sprout, User, Briefcase, MapPin, Home } from "lucide-react";

const { Option } = Select;
const { TextArea } = Input;

type RegisterStep = 1 | 2 | 3;
type UserRole = "farmer" | "buyer" | "expert" | "service_provider";

interface GeneralInfo {
    firstName: string;
    lastName: string;
    nationalId: string;
    email?: string;
    province: string;
    city: string;
    address: string;
}

interface RoleSpecificInfo {
    // Farmer
    farmSize?: number;
    farmLocation?: string;
    mainCrops?: string[];
    experience?: number;

    // Buyer
    companyName?: string;
    businessType?: string;
    purchaseVolume?: string;

    // Expert
    expertise?: string[];
    education?: string;
    yearsOfExperience?: number;
    license?: string;

    // Service Provider
    serviceName?: string;
    serviceType?: string[];
    coverage?: string[];
}

export const Register = () => {
    const [currentStep, setCurrentStep] = useState<RegisterStep>(1);
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    // داده‌های فرم
    const [generalInfo, setGeneralInfo] = useState<GeneralInfo | null>(null);
    const [roleInfo, setRoleInfo] = useState<RoleSpecificInfo | null>(null);

    // مرحله 1: اطلاعات عمومی
    const handleGeneralInfoSubmit = async (values: GeneralInfo) => {
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            setGeneralInfo(values);
            setCurrentStep(2);
            message.success("اطلاعات ذخیره شد");
        } catch (error) {
            message.error("خطا در ذخیره اطلاعات");
        } finally {
            setLoading(false);
        }
    };

    // مرحله 2: انتخاب نقش و رفتن به مرحله 3
    const handleRoleSelect = (role: UserRole) => {
        setSelectedRole(role);
        setCurrentStep(3);
    };

    // مرحله 3: اطلاعات تخصصی
    const handleRoleInfoSubmit = async (values: RoleSpecificInfo) => {
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            setRoleInfo(values);

            // ترکیب تمام اطلاعات
            const completeData = {
                ...generalInfo,
                role: selectedRole,
                ...values,
            };

            console.log("Complete Registration Data:", completeData);

            message.success("ثبت‌نام با موفقیت انجام شد!");

            // انتقال به داشبورد
            setTimeout(() => {
                window.location.href = `/${selectedRole}/dashboard`;
            }, 1000);
        } catch (error) {
            message.error("خطا در ثبت‌نام");
        } finally {
            setLoading(false);
        }
    };

    const roles = [
        {
            value: "farmer",
            title: "کشاورز",
            icon: <Sprout size={40} />,
            description: "تولیدکننده محصولات کشاورزی",
            color: "#22c55e",
            bgColor: "#dcfce7",
        },
        {
            value: "buyer",
            title: "خریدار",
            icon: <Briefcase size={40} />,
            description: "خرید عمده محصولات",
            color: "#3b82f6",
            bgColor: "#dbeafe",
        },
        {
            value: "expert",
            title: "کارشناس",
            icon: <User size={40} />,
            description: "ارائه مشاوره تخصصی",
            color: "#f59e0b",
            bgColor: "#fef3c7",
        },
        {
            value: "service_provider",
            title: "ارائه‌دهنده خدمات",
            icon: <Home size={40} />,
            description: "ارائه خدمات کشاورزی",
            color: "#8b5cf6",
            bgColor: "#ede9fe",
        },
    ];

    // رندر فرم اطلاعات تخصصی بر اساس نقش
    const renderRoleSpecificForm = () => {
        switch (selectedRole) {
            case "farmer":
                return (
                    <>
                        <Alert
                            message="اطلاعات مزرعه"
                            description="لطفاً اطلاعات مزرعه خود را وارد کنید"
                            type="info"
                            showIcon
                            className="mb-4"
                        />

                        <Form.Item
                            name="farmSize"
                            label="مساحت زمین (هکتار)"
                            rules={[{ required: true, message: "مساحت الزامی است" }]}
                        >
                            <InputNumber min={0.1} style={{ width: "100%" }} size="large" placeholder="مثال: 5" />
                        </Form.Item>

                        <Form.Item
                            name="farmLocation"
                            label="موقعیت مزرعه"
                            rules={[{ required: true, message: "موقعیت الزامی است" }]}
                        >
                            <Input
                                prefix={<MapPin size={18} />}
                                placeholder="مثال: گیلان، رشت، روستای..."
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            name="mainCrops"
                            label="محصولات اصلی"
                            rules={[{ required: true, message: "حداقل یک محصول انتخاب کنید" }]}
                        >
                            <Select mode="multiple" placeholder="انتخاب محصولات" size="large">
                                <Option value="wheat">گندم</Option>
                                <Option value="rice">برنج</Option>
                                <Option value="corn">ذرت</Option>
                                <Option value="barley">جو</Option>
                                <Option value="vegetables">سبزیجات</Option>
                                <Option value="fruits">میوه‌جات</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="experience"
                            label="سابقه کار (سال)"
                            rules={[{ required: true }]}
                        >
                            <InputNumber min={0} max={50} style={{ width: "100%" }} size="large" />
                        </Form.Item>

                        <Form.Item name="description" label="توضیحات تکمیلی">
                            <TextArea rows={3} placeholder="در مورد فعالیت خود بنویسید..." />
                        </Form.Item>
                    </>
                );

            case "buyer":
                return (
                    <>
                        <Alert
                            message="اطلاعات شرکت/کسب‌وکار"
                            description="لطفاً اطلاعات کسب‌وکار خود را وارد کنید"
                            type="info"
                            showIcon
                            className="mb-4"
                        />

                        <Form.Item
                            name="companyName"
                            label="نام شرکت/کارخانه"
                            rules={[{ required: true, message: "نام شرکت الزامی است" }]}
                        >
                            <Input size="large" placeholder="مثال: کارخانه روغن پاک" />
                        </Form.Item>

                        <Form.Item
                            name="businessType"
                            label="نوع کسب‌وکار"
                            rules={[{ required: true }]}
                        >
                            <Select placeholder="انتخاب نوع" size="large">
                                <Option value="factory">کارخانه</Option>
                                <Option value="wholesaler">عمده‌فروش</Option>
                                <Option value="retailer">خرده‌فروش</Option>
                                <Option value="exporter">صادرکننده</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="purchaseVolume"
                            label="حجم خرید ماهانه (تن)"
                            rules={[{ required: true }]}
                        >
                            <Select placeholder="انتخاب حجم" size="large">
                                <Option value="0-10">کمتر از 10 تن</Option>
                                <Option value="10-50">10 تا 50 تن</Option>
                                <Option value="50-100">50 تا 100 تن</Option>
                                <Option value="100+">بیش از 100 تن</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="interestedProducts"
                            label="محصولات مورد نیاز"
                            rules={[{ required: true }]}
                        >
                            <Select mode="multiple" placeholder="انتخاب محصولات" size="large">
                                <Option value="wheat">گندم</Option>
                                <Option value="rice">برنج</Option>
                                <Option value="corn">ذرت</Option>
                                <Option value="onion">پیاز</Option>
                                <Option value="tomato">گوجه فرنگی</Option>
                            </Select>
                        </Form.Item>
                    </>
                );

            case "expert":
                return (
                    <>
                        <Alert
                            message="اطلاعات تخصصی"
                            description="لطفاً اطلاعات تخصصی و تحصیلی خود را وارد کنید"
                            type="info"
                            showIcon
                            className="mb-4"
                        />

                        <Form.Item
                            name="expertise"
                            label="زمینه تخصصی"
                            rules={[{ required: true, message: "حداقل یک زمینه انتخاب کنید" }]}
                        >
                            <Select mode="multiple" placeholder="انتخاب زمینه‌ها" size="large">
                                <Option value="soil">خاک‌شناسی</Option>
                                <Option value="plant">گیاه‌پزشکی</Option>
                                <Option value="irrigation">آبیاری</Option>
                                <Option value="pest">کنترل آفات</Option>
                                <Option value="fertilizer">تغذیه گیاه</Option>
                                <Option value="horticulture">باغبانی</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="education"
                            label="مدرک تحصیلی"
                            rules={[{ required: true }]}
                        >
                            <Select placeholder="انتخاب مدرک" size="large">
                                <Option value="bachelor">کارشناسی</Option>
                                <Option value="master">کارشناسی ارشد</Option>
                                <Option value="phd">دکترا</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="yearsOfExperience"
                            label="سابقه کار (سال)"
                            rules={[{ required: true }]}
                        >
                            <InputNumber min={0} max={40} style={{ width: "100%" }} size="large" />
                        </Form.Item>

                        <Form.Item
                            name="license"
                            label="شماره پروانه/مجوز"
                        >
                            <Input size="large" placeholder="در صورت وجود" />
                        </Form.Item>

                        <Form.Item name="documents" label="مدارک و گواهی‌نامه‌ها">
                            <Upload listType="picture-card" maxCount={3}>
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>آپلود</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </>
                );

            case "service_provider":
                return (
                    <>
                        <Alert
                            message="اطلاعات خدمات"
                            description="لطفاً اطلاعات خدمات خود را وارد کنید"
                            type="info"
                            showIcon
                            className="mb-4"
                        />

                        <Form.Item
                            name="serviceName"
                            label="نام کسب‌وکار/شرکت"
                            rules={[{ required: true }]}
                        >
                            <Input size="large" placeholder="مثال: شرکت اجاره ماشین‌آلات" />
                        </Form.Item>

                        <Form.Item
                            name="serviceType"
                            label="نوع خدمات"
                            rules={[{ required: true }]}
                        >
                            <Select mode="multiple" placeholder="انتخاب خدمات" size="large">
                                <Option value="machinery">اجاره ماشین‌آلات</Option>
                                <Option value="transport">حمل و نقل</Option>
                                <Option value="coldstorage">سردخانه</Option>
                                <Option value="warehouse">انبارداری</Option>
                                <Option value="packaging">بسته‌بندی</Option>
                                <Option value="irrigation">سیستم آبیاری</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="coverage"
                            label="محدوده خدمات‌رسانی"
                            rules={[{ required: true }]}
                        >
                            <Select mode="multiple" placeholder="انتخاب استان‌ها" size="large">
                                <Option value="tehran">تهران</Option>
                                <Option value="mazandaran">مازندران</Option>
                                <Option value="gilan">گیلان</Option>
                                <Option value="khorasan">خراسان رضوی</Option>
                                <Option value="isfahan">اصفهان</Option>
                                <Option value="fars">فارس</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="description" label="توضیحات خدمات">
                            <TextArea rows={3} placeholder="توضیحات تکمیلی..." />
                        </Form.Item>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-green-50 p-4">
            {/* پس‌زمینه انیمیشن */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>

            <Card className="w-full max-w-2xl shadow-2xl rounded-3xl relative z-10 animate-fadeIn">
                {/* هدر */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg mb-3">
                        <Sprout className="text-white" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">ثبت‌نام در آگرو تک</h1>
                    <p className="text-gray-600 text-sm mt-1">به جامعه کشاورزی ما بپیوندید</p>
                </div>

                {/* Steps */}
                <Steps
                    current={currentStep - 1}
                    items={[
                        { title: "اطلاعات عمومی", icon: <UserOutlined /> },
                        { title: "انتخاب نقش", icon: <Briefcase size={16} /> },
                        { title: "اطلاعات تخصصی", icon: <CheckCircleOutlined /> },
                    ]}
                    className="mb-8"
                />

                {/* مرحله 1: اطلاعات عمومی */}
                {currentStep === 1 && (
                    <Form form={form} onFinish={handleGeneralInfoSubmit} layout="vertical" className="animate-slideIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item
                                name="firstName"
                                label="نام"
                                rules={[{ required: true, message: "نام الزامی است" }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="علی" size="large" />
                            </Form.Item>

                            <Form.Item
                                name="lastName"
                                label="نام خانوادگی"
                                rules={[{ required: true, message: "نام خانوادگی الزامی است" }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="احمدی" size="large" />
                            </Form.Item>
                        </div>

                        <Form.Item
                            name="nationalId"
                            label="کد ملی"
                            rules={[
                                { required: true, message: "کد ملی الزامی است" },
                                { len: 10, message: "کد ملی باید 10 رقم باشد" },
                            ]}
                        >
                            <Input placeholder="1234567890" size="large" maxLength={10} dir="ltr" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="ایمیل (اختیاری)"
                            rules={[{ type: "email", message: "ایمیل معتبر نیست" }]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="example@email.com" size="large" dir="ltr" />
                        </Form.Item>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item
                                name="province"
                                label="استان"
                                rules={[{ required: true, message: "استان الزامی است" }]}
                            >
                                <Select placeholder="انتخاب استان" size="large">
                                    <Option value="tehran">تهران</Option>
                                    <Option value="mazandaran">مازندران</Option>
                                    <Option value="gilan">گیلان</Option>
                                    <Option value="khorasan">خراسان رضوی</Option>
                                    <Option value="isfahan">اصفهان</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="city"
                                label="شهر"
                                rules={[{ required: true, message: "شهر الزامی است" }]}
                            >
                                <Input placeholder="نام شهر" size="large" />
                            </Form.Item>
                        </div>

                        <Form.Item
                            name="address"
                            label="آدرس"
                            rules={[{ required: true, message: "آدرس الزامی است" }]}
                        >
                            <TextArea rows={2} placeholder="آدرس کامل..." />
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={loading}
                            className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg"
                            icon={<ArrowLeftOutlined />}
                        >
                            مرحله بعد
                        </Button>
                    </Form>
                )}

                {/* مرحله 2: انتخاب نقش */}
                {currentStep === 2 && (
                    <div className="animate-slideIn">
                        <Button
                            type="text"
                            icon={<ArrowRightOutlined />}
                            onClick={() => setCurrentStep(1)}
                            className="mb-4"
                        >
                            بازگشت
                        </Button>

                        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">نقش خود را انتخاب کنید</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {roles.map((role) => (
                                <Card
                                    key={role.value}
                                    hoverable
                                    className="text-center cursor-pointer hover:shadow-xl transition-all duration-300 group"
                                    onClick={() => handleRoleSelect(role.value as UserRole)}
                                    style={{ borderTop: `4px solid ${role.color}` }}
                                >
                                    <div
                                        className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                                        style={{ background: role.bgColor, color: role.color }}
                                    >
                                        {role.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">{role.title}</h3>
                                    <p className="text-sm text-gray-600">{role.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* مرحله 3: اطلاعات تخصصی */}
                {currentStep === 3 && selectedRole && (
                    <Form form={form} onFinish={handleRoleInfoSubmit} layout="vertical" className="animate-slideIn">
                        <Button
                            type="text"
                            icon={<ArrowRightOutlined />}
                            onClick={() => setCurrentStep(2)}
                            className="mb-4"
                        >
                            بازگشت
                        </Button>

                        <h2 className="text-xl font-bold text-gray-800 mb-1">
                            اطلاعات {roles.find(r => r.value === selectedRole)?.title}
                        </h2>
                        <p className="text-gray-600 text-sm mb-6">
                            لطفاً اطلاعات تخصصی خود را تکمیل کنید
                        </p>

                        {renderRoleSpecificForm()}

                        <div className="flex gap-3 mt-6">
                            <Button
                                onClick={() => setCurrentStep(2)}
                                size="large"
                                className="flex-1"
                            >
                                بازگشت
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                loading={loading}
                                className="flex-1 bg-gradient-to-r from-green-500 to-green-600"
                                icon={<CheckCircleOutlined />}
                            >
                                تکمیل ثبت‌نام
                            </Button>
                        </div>
                    </Form>
                )}
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
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
                .animate-slideIn { animation: slideIn 0.4s ease-out; }
                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
            `}</style>
        </div>
    );
};