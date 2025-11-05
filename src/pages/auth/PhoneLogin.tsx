import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '@/styles/auth/Auth.css'; // ✅ مسیر جدید برای استایل
import { useAuth } from '@/context/AuthContext'; // ✅ اتصال به context

const { Title, Text } = Typography;

export const PhoneLogin = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); // 👈 برای بررسی لاگین بودن

    const onFinish = async (values: { phone: string }) => {
        setLoading(true);
        try {
            // 🚀 در آینده: درخواست واقعی به API ارسال کن
            console.log('Phone:', values.phone);

            // شبیه‌سازی API
            await new Promise(resolve => setTimeout(resolve, 1000));

            localStorage.setItem('tempPhone', values.phone);
            message.success('کد تایید به شماره شما ارسال شد');
            navigate('/verify-otp');
        } catch (error) {
            message.error('خطا در ارسال کد! لطفا دوباره تلاش کنید.');
            console.error('Send OTP error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <Card className="auth-card">
                <div className="auth-header">
                    <Title level={2}>ورود / ثبت نام</Title>
                    <Text type="secondary">
                        لطفا شماره موبایل خود را وارد کنید
                    </Text>
                </div>

                <Form
                    name="phone-login"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        label="شماره موبایل"
                        name="phone"
                        rules={[
                            { required: true, message: 'لطفا شماره موبایل را وارد کنید!' },
                            {
                                pattern: /^09[0-9]{9}$/,
                                message: 'شماره موبایل معتبر نیست! (مثال: 09123456789)'
                            }
                        ]}
                    >
                        <Input
                            prefix={<PhoneOutlined />}
                            placeholder="09123456789"
                            maxLength={11}
                            dir="ltr"
                            style={{ textAlign: 'right' }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                        >
                            ارسال کد تایید
                        </Button>
                    </Form.Item>

                    <div className="auth-footer">
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            با ورود و ثبت نام، شما{' '}
                            <a href="#">شرایط و قوانین</a>
                            {' '}را می‌پذیرید
                        </Text>
                    </div>
                </Form>
            </Card>

            <div className="auth-logo-section">
                <img
                    src="/logo.png" // ✅ نیازی به /public/ نیست
                    alt="Logo"
                    className="auth-logo"
                />
            </div>
        </div>
    );
};
