import { useState } from "react";
import { Card, Form, Input, Button, Switch, Typography, message } from "antd";

const { Title } = Typography;

export const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            // 🚀 در آینده: ارسال اطلاعات به API
            console.log("Updated Settings:", values);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("تنظیمات با موفقیت ذخیره شد!");
        } catch (error) {
            message.error("خطا در ذخیره تنظیمات، دوباره تلاش کنید.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 flex justify-center">
            <Card className="w-full max-w-2xl shadow-lg rounded-2xl p-6">
                <Title level={2} style={{ textAlign: "center", color: "#328E6E", marginBottom: 24 }}>
                    تنظیمات حساب
                </Title>

                <Form form={form} layout="vertical" onFinish={onFinish} size="large">
                    {/* اطلاعات شخصی */}
                    <Form.Item label="نام" name="firstName" rules={[{ required: true, message: "لطفا نام خود را وارد کنید" }]}>
                        <Input placeholder="نام" />
                    </Form.Item>

                    <Form.Item label="نام خانوادگی" name="lastName" rules={[{ required: true, message: "لطفا نام خانوادگی خود را وارد کنید" }]}>
                        <Input placeholder="نام خانوادگی" />
                    </Form.Item>

                    <Form.Item label="ایمیل" name="email" rules={[{ type: "email", message: "ایمیل معتبر نیست" }]}>
                        <Input placeholder="example@gmail.com" />
                    </Form.Item>

                    {/* تغییر رمز عبور */}
                    <Form.Item label="رمز عبور فعلی" name="currentPassword">
                        <Input.Password placeholder="رمز عبور فعلی" />
                    </Form.Item>

                    <Form.Item label="رمز عبور جدید" name="newPassword">
                        <Input.Password placeholder="رمز عبور جدید" />
                    </Form.Item>

                    <Form.Item label="تایید رمز عبور جدید" name="confirmPassword">
                        <Input.Password placeholder="تکرار رمز عبور جدید" />
                    </Form.Item>

                    {/* اعلان‌ها */}
                    <Form.Item label="دریافت اعلان‌ها" name="notifications" valuePropName="checked">
                        <Switch />
                    </Form.Item>

                    {/* دکمه ذخیره */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block style={{ backgroundColor: "#328E6E", borderColor: "#328E6E" }}>
                            ذخیره تنظیمات
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
