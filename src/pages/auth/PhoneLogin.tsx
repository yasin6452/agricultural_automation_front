import { useState } from "react";
import { Card, Input, Button, Form, message, Steps, Alert } from "antd";
import { PhoneOutlined, LockOutlined, SafetyOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Sprout, Phone, Lock, Shield } from "lucide-react";

type AuthStep = "phone" | "password" | "otp" | "register";

interface UserCheckResponse {
    exists: boolean;
    hasPassword: boolean;
    name?: string;
}

export const Login = () => {
    const [currentStep, setCurrentStep] = useState<AuthStep>("phone");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<UserCheckResponse | null>(null);
    const [otpSent, setOtpSent] = useState(false);
    const [form] = Form.useForm();

    // شبیه‌سازی چک کردن شماره در دیتابیس
    const checkPhoneNumber = async (phone: string): Promise<UserCheckResponse> => {
        // شبیه‌سازی API Call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // شماره‌های تست
        const existingUsers: Record<string, UserCheckResponse> = {
            "09123456789": { exists: true, hasPassword: true, name: "علی احمدی" },
            "09121111111": { exists: true, hasPassword: false, name: "حسن رضایی" },
        };

        return existingUsers[phone] || { exists: false, hasPassword: false };
    };

    // شبیه‌سازی ارسال OTP
    const sendOTP = async (phone: string) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        console.log(`OTP sent to ${phone}: 123456`); // در production از SMS gateway استفاده کن
        return true;
    };

    // مرحله 1: وارد کردن شماره
    const handlePhoneSubmit = async (values: { phone: string }) => {
        setLoading(true);
        setPhoneNumber(values.phone);

        try {
            const response = await checkPhoneNumber(values.phone);
            setUserInfo(response);

            if (response.exists) {
                if (response.hasPassword) {
                    // کاربر وجود دارد و رمز عبور دارد
                    setCurrentStep("password");
                    message.success(`خوش آمدید ${response.name}!`);
                } else {
                    // کاربر وجود دارد ولی رمز ندارد (ثبت‌نام ناقص)
                    await sendOTP(values.phone);
                    setOtpSent(true);
                    setCurrentStep("otp");
                    message.info("کد تأیید به شماره شما ارسال شد");
                }
            } else {
                // کاربر جدید - باید ثبت‌نام کنه
                message.info("شماره شما ثبت نشده است. لطفاً ثبت‌نام کنید");
                // در مرحله بعد به صفحه ثبت‌نام می‌ریم
                setTimeout(() => {
                    message.info("در حال انتقال به صفحه ثبت‌نام...");
                    // اینجا باید navigate کنی به صفحه Register
                }, 1500);
            }
        } catch (error) {
            message.error("خطا در بررسی شماره تلفن");
        } finally {
            setLoading(false);
        }
    };

    // مرحله 2: ورود با رمز عبور
    const handlePasswordSubmit = async (values: { password: string }) => {
        setLoading(true);

        try {
            // شبیه‌سازی Login
            await new Promise(resolve => setTimeout(resolve, 1000));

            // در production: API call برای بررسی رمز
            if (values.password === "123456") { // فقط برای تست
                message.success("ورود موفقیت‌آمیز!");
                // اینجا باید navigate کنی به داشبورد
                setTimeout(() => {
                    window.location.href = "/farmer/dashboard";
                }, 500);
            } else {
                message.error("رمز عبور اشتباه است");
            }
        } catch (error) {
            message.error("خطا در ورود");
        } finally {
            setLoading(false);
        }
    };

    // مرحله 3: ورود با OTP
    const handleOTPSubmit = async (values: { otp: string }) => {
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            // در production: API call برای بررسی OTP
            if (values.otp === "123456") { // فقط برای تست
                message.success("تأیید موفقیت‌آمیز!");
                setTimeout(() => {
                    window.location.href = "/farmer/dashboard";
                }, 500);
            } else {
                message.error("کد وارد شده اشتباه است");
            }
        } catch (error) {
            message.error("خطا در تأیید کد");
        } finally {
            setLoading(false);
        }
    };

    // ارسال مجدد OTP
    const handleResendOTP = async () => {
        setLoading(true);
        try {
            await sendOTP(phoneNumber);
            message.success("کد مجدداً ارسال شد");
        } catch (error) {
            message.error("خطا در ارسال کد");
        } finally {
            setLoading(false);
        }
    };

    // رفتن به مرحله OTP (فراموشی رمز)
    const handleForgotPassword = async () => {
        setLoading(true);
        try {
            await sendOTP(phoneNumber);
            setOtpSent(true);
            setCurrentStep("otp");
            message.info("کد تأیید به شماره شما ارسال شد");
        } catch (error) {
            message.error("خطا در ارسال کد");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-green-50 p-4">
            {/* پس‌زمینه انیمیشن */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <Card className="w-full max-w-md shadow-2xl rounded-3xl relative z-10" style={{ backdropFilter: 'blur(10px)' }}>
                {/* لوگو و عنوان */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl shadow-lg mb-4 animate-bounce">
                        <Sprout className="text-white" size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">آگرو تک</h1>
                    <p className="text-gray-600">پلتفرم جامع کشاورزی هوشمند</p>
                </div>

                {/* Steps indicator */}
                <Steps
                    current={currentStep === "phone" ? 0 : currentStep === "password" || currentStep === "otp" ? 1 : 2}
                    items={[
                        { title: "شماره موبایل", icon: <PhoneOutlined /> },
                        { title: "احراز هویت", icon: <LockOutlined /> },
                        { title: "ورود", icon: <SafetyOutlined /> },
                    ]}
                    className="mb-8"
                    size="small"
                />

                {/* مرحله 1: وارد کردن شماره */}
                {currentStep === "phone" && (
                    <div className="animate-fadeIn">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">ورود / ثبت‌نام</h2>
                        <p className="text-gray-600 mb-6 text-sm">
                            لطفاً شماره موبایل خود را وارد کنید
                        </p>

                        <Form form={form} onFinish={handlePhoneSubmit} layout="vertical">
                            <Form.Item
                                name="phone"
                                rules={[
                                    { required: true, message: "شماره موبایل الزامی است" },
                                    { pattern: /^09\d{9}$/, message: "شماره موبایل معتبر نیست" },
                                ]}
                            >
                                <Input
                                    prefix={<Phone size={18} className="text-gray-400" />}
                                    placeholder="09123456789"
                                    size="large"
                                    maxLength={11}
                                    className="rounded-xl"
                                    dir="ltr"
                                />
                            </Form.Item>

                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                loading={loading}
                                className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg hover:shadow-xl transition-all"
                                icon={<ArrowRightOutlined />}
                            >
                                ادامه
                            </Button>
                        </Form>

                        <Alert
                            message="شماره‌های تست"
                            description={
                                <div className="text-xs">
                                    <p>• <code>09123456789</code> - کاربر موجود با رمز</p>
                                    <p>• <code>09121111111</code> - کاربر موجود بدون رمز</p>
                                    <p>• شماره دیگر - کاربر جدید</p>
                                </div>
                            }
                            type="info"
                            className="mt-4"
                            showIcon
                        />
                    </div>
                )}

                {/* مرحله 2: وارد کردن رمز عبور */}
                {currentStep === "password" && (
                    <div className="animate-fadeIn">
                        <Button
                            type="text"
                            icon={<ArrowRightOutlined style={{ transform: 'rotate(180deg)' }} />}
                            onClick={() => setCurrentStep("phone")}
                            className="mb-4"
                        >
                            بازگشت
                        </Button>

                        <h2 className="text-xl font-bold text-gray-800 mb-2">خوش آمدید!</h2>
                        <p className="text-gray-600 mb-1 text-sm">
                            {userInfo?.name && `سلام ${userInfo.name}`}
                        </p>
                        <p className="text-gray-500 mb-6 text-xs">
                            {phoneNumber}
                        </p>

                        <Form form={form} onFinish={handlePasswordSubmit} layout="vertical">
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: "رمز عبور الزامی است" }]}
                            >
                                <Input.Password
                                    prefix={<Lock size={18} className="text-gray-400" />}
                                    placeholder="رمز عبور"
                                    size="large"
                                    className="rounded-xl"
                                />
                            </Form.Item>

                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                loading={loading}
                                className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg hover:shadow-xl transition-all mb-3"
                            >
                                ورود
                            </Button>

                            <Button
                                type="link"
                                block
                                onClick={handleForgotPassword}
                                loading={loading}
                                className="text-blue-600"
                            >
                                رمز عبور را فراموش کرده‌اید؟
                            </Button>
                        </Form>

                        <Alert
                            message="رمز تست: 123456"
                            type="warning"
                            className="mt-4"
                            showIcon
                        />
                    </div>
                )}

                {/* مرحله 3: وارد کردن OTP */}
                {currentStep === "otp" && (
                    <div className="animate-fadeIn">
                        <Button
                            type="text"
                            icon={<ArrowRightOutlined style={{ transform: 'rotate(180deg)' }} />}
                            onClick={() => setCurrentStep("password")}
                            className="mb-4"
                        >
                            بازگشت
                        </Button>

                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                <Shield className="text-blue-600" size={32} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">کد تأیید</h2>
                            <p className="text-gray-600 text-sm">
                                کد 6 رقمی ارسال شده به شماره
                            </p>
                            <p className="text-green-600 font-semibold mt-1 dir-ltr">
                                {phoneNumber}
                            </p>
                        </div>

                        <Form form={form} onFinish={handleOTPSubmit} layout="vertical">
                            <Form.Item
                                name="otp"
                                rules={[
                                    { required: true, message: "کد تأیید الزامی است" },
                                    { len: 6, message: "کد تأیید باید 6 رقم باشد" },
                                ]}
                            >
                                <Input
                                    placeholder="------"
                                    size="large"
                                    maxLength={6}
                                    className="rounded-xl text-center text-2xl font-bold tracking-widest"
                                    dir="ltr"
                                />
                            </Form.Item>

                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                loading={loading}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-all mb-3"
                            >
                                تأیید و ورود
                            </Button>

                            <Button
                                type="link"
                                block
                                onClick={handleResendOTP}
                                loading={loading}
                                className="text-gray-600"
                            >
                                ارسال مجدد کد
                            </Button>
                        </Form>

                        <Alert
                            message="کد تست: 123456"
                            type="info"
                            className="mt-4"
                            showIcon
                        />
                    </div>
                )}

                {/* Footer */}
                <div className="mt-8 pt-6 border-t text-center text-xs text-gray-500">
                    <p>با ورود و ثبت‌نام، شما <a href="#" className="text-green-600">قوانین و مقررات</a> را می‌پذیرید</p>
                </div>
            </Card>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};