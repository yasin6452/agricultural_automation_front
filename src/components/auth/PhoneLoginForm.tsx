import { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const { Title, Text } = Typography;

export const PhoneLoginForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const onFinish = async (values: { phone: string }) => {
        setLoading(true);
        try {
            console.log('Phone:', values.phone);
            await new Promise(resolve => setTimeout(resolve, 1000));
            localStorage.setItem('tempPhone', values.phone);
            message.success('کد تایید ارسال شد ✅');
            navigate('/verify-otp');
        } catch (error) {
            message.error('ارسال کد با خطا مواجه شد ❌');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="auth-header">
                <Title level={2}>ورود / ثبت نام</Title>
                <Text type="secondary">شماره موبایل خود را وارد کنید</Text>
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
                        { required: true, message: 'شماره موبایل را وارد کنید' },
                        {
                            pattern: /^09[0-9]{9}$/,
                            message: 'شماره موبایل معتبر نیست (مثال: 09123456789)',
                        },
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
                        className="auth-submit-btn"
                    >
                        ارسال کد تأیید
                    </Button>
                </Form.Item>

                <div className="auth-footer">
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        با ورود و ثبت‌نام، شما{' '}
                        <a href="#">شرایط و قوانین</a> را می‌پذیرید.
                    </Text>
                </div>
            </Form>
        </>
    );
};
