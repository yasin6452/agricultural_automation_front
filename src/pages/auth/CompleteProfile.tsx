import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Select, Row, Col } from 'antd';
import { UserOutlined, IdcardOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import "@/styles/auth/Auth.css";
import 'react-multi-date-picker/styles/colors/red.css';

const { Title, Text } = Typography;
const { Option } = Select;

// لیست استان‌ها
const provinces = [
    'تهران', 'اصفهان', 'خراسان رضوی', 'فارس', 'خوزستان',
    'مازندران', 'گیلان', 'آذربایجان شرقی', 'آذربایجان غربی', 'کرمان',
    'البرز', 'کرمانشاه', 'همدان', 'قم', 'یزد', 'لرستان', 'قزوین'
];

// لیست شهرها به تفکیک استان
const cities: { [key: string]: string[] } = {
    'تهران': ['تهران', 'شهریار', 'ری', 'ورامین', 'پاکدشت', 'دماوند', 'اسلامشهر'],
    'اصفهان': ['اصفهان', 'کاشان', 'نجف‌آباد', 'خمینی‌شهر', 'شاهین‌شهر', 'فلاورجان'],
    'خراسان رضوی': ['مشهد', 'نیشابور', 'سبزوار', 'تربت حیدریه', 'گناباد', 'کاشمر'],
    'فارس': ['شیراز', 'مرودشت', 'کازرون', 'جهرم', 'لار', 'فسا', 'آباده'],
    'خوزستان': ['اهواز', 'آبادان', 'دزفول', 'خرمشهر', 'بندر ماهشهر', 'اندیمشک'],
    'مازندران': ['ساری', 'بابل', 'آمل', 'قائمشهر', 'تنکابن', 'بهشهر', 'نوشهر'],
    'گیلان': ['رشت', 'بندر انزلی', 'لاهیجان', 'رودسر', 'لنگرود', 'آستارا'],
    'آذربایجان شرقی': ['تبریز', 'مراغه', 'مرند', 'میانه', 'سراب', 'بناب'],
    'آذربایجان غربی': ['ارومیه', 'خوی', 'مهاباد', 'بوکان', 'میاندوآب', 'نقده'],
    'کرمان': ['کرمان', 'رفسنجان', 'سیرجان', 'جیرفت', 'بم', 'زرند'],
};

export const CompleteProfile = () => {
    const [loading, setLoading] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [birthDate, setBirthDate] = useState<any>(null);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        // چک کردن تاریخ تولد
        if (!birthDate) {
            message.error('لطفا تاریخ تولد را انتخاب کنید!');
            return;
        }

        setLoading(true);

        try {
            console.log('Profile data:', values);
            console.log('Birth date:', birthDate.format('YYYY/MM/DD'));

            // شبیه‌سازی API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // ذخیره اطلاعات کاربر
            const userData = {
                phone: localStorage.getItem('tempPhone'),
                firstName: values.firstName,
                lastName: values.lastName,
                nationalCode: values.nationalCode,
                birthDate: birthDate.format('YYYY/MM/DD'),
                province: values.province,
                city: values.city,
                isRegistered: true
            };

            localStorage.setItem('token', 'fake-jwt-token');
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.removeItem('tempPhone');

            message.success('ثبت نام با موفقیت انجام شد!');
            navigate('/dashboard');

        } catch (error) {
            message.error('خطا در ثبت اطلاعات!');
            console.error('Complete profile error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleProvinceChange = (value: string) => {
        setSelectedProvince(value);
        form.setFieldsValue({ city: undefined }); // ریست کردن شهر
    };

    return (
        <div className="auth-container">
            <Card className="auth-card large">
                <div className="auth-header">
                    <Title level={2}>تکمیل اطلاعات</Title>
                    <Text type="secondary">
                        لطفا اطلاعات خود را وارد کنید
                    </Text>
                </div>

                <Form
                    form={form}
                    name="complete-profile"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    {/* نام و نام خانوادگی - در یک ردیف */}
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="نام"
                                name="firstName"
                                rules={[
                                    { required: true, message: 'لطفا نام خود را وارد کنید!' },
                                    { min: 2, message: 'نام باید حداقل 5 کاراکتر باشد!' }
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="نام"
                                />
                            </Form.Item>
                        </Col>
              
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="نام خانوادگی"
                                name="lastName"
                                rules={[
                                    { required: true, message: 'لطفا نام خانوادگی را وارد کنید!' },
                                    { min: 2, message: 'نام خانوادگی باید حداقل 2 کاراکتر باشد!' }
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="نام خانوادگی"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* کد ملی و تاریخ تولد - در یک ردیف */}
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="کد ملی"
                                name="nationalCode"
                                rules={[
                                    { required: true, message: 'لطفا کد ملی را وارد کنید!' },
                                    {
                                        pattern: /^[0-9]{10}$/,
                                        message: 'کد ملی باید 10 رقم باشد!'
                                    }
                                ]}
                            >
                                <Input
                                    prefix={<IdcardOutlined />}
                                    placeholder="کد ملی 10 رقمی"
                                    maxLength={10}
                                    dir="ltr"
                                    style={{ textAlign: 'right' }}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="تاریخ تولد (شمسی)"
                                required
                            >
                                <DatePicker
                                    value={birthDate}
                                    onChange={setBirthDate}
                                    calendar={persian}
                                    locale={persian_fa}
                                    format="YYYY/MM/DD"
                                    placeholder="انتخاب تاریخ تولد"
                                    calendarPosition="bottom-right"
                                    inputClass="custom-date-input"
                                    containerStyle={{ width: '100%' }}
                                    style={{
                                        width: '100%',
                                        height: '48px',
                                        borderRadius: '8px',
                                        border: '1px solid #d9d9d9',
                                        padding: '4px 11px',
                                        fontSize: '16px',
                                    }}
                                    maxDate={new Date()}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* استان و شهر - در یک ردیف */}
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="استان"
                                name="province"
                                rules={[
                                    { required: true, message: 'لطفا استان را انتخاب کنید!' }
                                ]}
                            >
                                <Select
                                    placeholder="انتخاب استان"
                                    onChange={handleProvinceChange}
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.children as string).toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    {provinces.map(province => (
                                        <Option key={province} value={province}>
                                            {province}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="شهر"
                                name="city"
                                rules={[
                                    { required: true, message: 'لطفا شهر را انتخاب کنید!' }
                                ]}
                            >
                                <Select
                                    placeholder={selectedProvince ? "انتخاب شهر" : "ابتدا استان را انتخاب کنید"}
                                    disabled={!selectedProvince}
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.children as string).toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    {selectedProvince && cities[selectedProvince]?.map(city => (
                                        <Option key={city} value={city}>
                                            {city}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                        >
                            تکمیل ثبت نام
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <div className="auth-logo-section">
                <img
                    src="/public/logo.png"
                    alt="Logo"
                    className="auth-logo"
                />
            </div>
        </div>
    );
};