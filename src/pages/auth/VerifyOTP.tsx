import { useState, useEffect } from 'react';
import { Form, Button, Card, Typography, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import "@/styles/auth/Auth.css";

const { Title, Text, Link } = Typography;

export const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(120); // 2 دقیقه
    const navigate = useNavigate();
    const phone = localStorage.getItem('tempPhone');

    // شمارش معکوس
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // اگر شماره موبایل وجود نداشت، برگرد به صفحه اول
    useEffect(() => {
        if (!phone) {
            navigate('/login');
        }
    }, [phone, navigate]);

    const handleVerify = async () => {
        if (otp.length !== 5) {
            message.warning('لطفا کد 5 رقمی را کامل وارد کنید');
            return;
        }

        setLoading(true);

        try {
            // TODO: ارسال کد به API برای تایید
            console.log('Verifying OTP:', otp, 'for phone:', phone);

            // شبیه‌سازی API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // شبیه‌سازی پاسخ API
            const isNewUser = Math.random() > 0.5; // 50% شانس کاربر جدید

            if (isNewUser) {
                // کاربر جدید - انتقال به ثبت نام
                message.info('لطفا اطلاعات خود را تکمیل کنید');
                navigate('/complete-profile');
            } else {
                // کاربر قدیمی - ورود به پنل
                localStorage.setItem('token', 'fake-jwt-token');
                localStorage.setItem('user', JSON.stringify({
                    phone: phone,
                    name: 'کاربر تست',
                    isRegistered: true
                }));
                message.success('ورود موفقیت‌آمیز');
                navigate('/dashboard');
            }

        } catch (error) {
            message.error('کد وارد شده اشتباه است!');
            console.error('Verify OTP error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            // TODO: ارسال مجدد کد
            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success('کد مجدداً ارسال شد');
            setCountdown(120);
            setOtp('');
        } catch (error) {
            message.error('خطا در ارسال مجدد کد');
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="auth-container">
            <Card className="auth-card">
                <div className="auth-header">
                    <Title level={2}>تایید شماره موبایل</Title>
                    <Text type="secondary">
                        کد ارسال شده به شماره <strong dir="ltr">{phone}</strong> را وارد کنید
                    </Text>
                </div>

                <Form layout="vertical">
                    <Form.Item>
                        <div style={{ direction: 'ltr', textAlign: 'center' }}>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={5}
                                renderInput={(props) => (
                                    <input
                                        {...props}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            margin: '0 8px',
                                            fontSize: '20px',
                                            borderRadius: '8px',
                                            border: '1px solid #d9d9d9',
                                            textAlign: 'center',
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            onClick={handleVerify}
                            loading={loading}
                            disabled={otp.length !== 5}
                            block
                        >
                            تایید کد
                        </Button>
                    </Form.Item>

                    <Space direction="vertical" style={{ width: '100%', textAlign: 'center' }}>
                        {countdown > 0 ? (
                            <Text type="secondary">
                                ارسال مجدد کد تا {formatTime(countdown)}
                            </Text>
                        ) : (
                            <Link onClick={handleResend}>
                                ارسال مجدد کد
                            </Link>
                        )}

                        <Link onClick={() => navigate('/login')}>
                            ویرایش شماره موبایل
                        </Link>
                    </Space>
                </Form>
            </Card>
        </div>
    );
};