import { useState } from "react";
import { Form, Input, Button, Select, DatePicker, InputNumber, message, Card, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { LocationMap } from "@/components/farmer/LocationMap";
import "../../styles/farmer/FarmerForm.css";

const { Title } = Typography;
const { Option } = Select;

export const CompleteFarmerForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [locationPoints, setLocationPoints] = useState<[number, number][]>([]);
    const [fileList, setFileList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        if (locationPoints.length < 3) {
            message.error("لطفا محدوده زمین خود را روی نقشه مشخص کنید (حداقل ۳ نقطه)");
            return;
        }
        setLoading(true);
        try {
            // شبیه‌سازی ارسال اطلاعات به سرور
            const formData = {
                ...values,
                locationPoints,
                files: fileList,
            };
            console.log("Form Data:", formData);

            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("اطلاعات با موفقیت ثبت شد!");
            navigate("/dashboard");
        } catch (error) {
            message.error("خطا در ثبت اطلاعات، دوباره تلاش کنید");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = ({ fileList }: any) => {
        setFileList(fileList);
    };

    return (
        <div className="farmer-form-container">
            <Card className="farmer-form-card">
                <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
                    تکمیل اطلاعات کشاورز
                </Title>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    size="large"
                >
                    {/* اطلاعات پایه */}
                    <Form.Item
                        label="نام"
                        name="firstName"
                        rules={[{ required: true, message: "لطفا نام خود را وارد کنید" }]}
                    >
                        <Input placeholder="نام" />
                    </Form.Item>

                    <Form.Item
                        label="نام خانوادگی"
                        name="lastName"
                        rules={[{ required: true, message: "لطفا نام خانوادگی خود را وارد کنید" }]}
                    >
                        <Input placeholder="نام خانوادگی" />
                    </Form.Item>

                    <Form.Item
                        label="تاریخ تولد"
                        name="dob"
                        rules={[{ required: true, message: "لطفا تاریخ تولد خود را وارد کنید" }]}
                    >
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        label="کد ملی"
                        name="nationalCode"
                        rules={[
                            { required: true, message: "لطفا کد ملی خود را وارد کنید" },
                            { pattern: /^[0-9]{10}$/, message: "کد ملی معتبر نیست" },
                        ]}
                    >
                        <Input maxLength={10} placeholder="مثال: 0012345678" />
                    </Form.Item>

                    {/* آدرس */}
                    <Form.Item
                        label="استان"
                        name="province"
                        rules={[{ required: true, message: "استان را انتخاب کنید" }]}
                    >
                        <Select placeholder="استان">
                            <Option value="tehran">تهران</Option>
                            <Option value="fars">فارس</Option>
                            <Option value="khorasan">خراسان</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="شهر"
                        name="city"
                        rules={[{ required: true, message: "شهر را وارد کنید" }]}
                    >
                        <Input placeholder="شهر" />
                    </Form.Item>

                    {/* اطلاعات کشاورزی */}
                    <Form.Item
                        label="نوع محصول"
                        name="cropType"
                        rules={[{ required: true, message: "نوع محصول را وارد کنید" }]}
                    >
                        <Select placeholder="نوع محصول">
                            <Option value="wheat">گندم</Option>
                            <Option value="rice">برنج</Option>
                            <Option value="corn">ذرت</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="سطح زیرکشت (هکتار)"
                        name="area"
                        rules={[{ required: true, message: "سطح زیرکشت را وارد کنید" }]}
                    >
                        <InputNumber style={{ width: "100%" }} min={0.1} step={0.1} placeholder="مثال: 1.5" />
                    </Form.Item>

                    <Form.Item
                        label="نوع آبیاری"
                        name="irrigationType"
                        rules={[{ required: true, message: "نوع آبیاری را انتخاب کنید" }]}
                    >
                        <Select placeholder="نوع آبیاری">
                            <Option value="drip">قطره‌ای</Option>
                            <Option value="sprinkler">بارانی</Option>
                            <Option value="flood">سیلابی</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="سهمیه آب (متر مکعب)"
                        name="waterQuota"
                        rules={[{ required: true, message: "مقدار سهمیه آب را وارد کنید" }]}
                    >
                        <InputNumber style={{ width: "100%" }} min={0} step={10} placeholder="مثال: 500" />
                    </Form.Item>

                    {/* نقشه تعاملی */}
                    <Form.Item label="محدوده زمین">
                        <LocationMap initialPoints={[]} onChange={setLocationPoints} />
                    </Form.Item>

                    {/* آپلود مدارک */}
                    <Form.Item label="مدارک لازم">
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setFileList(Array.from(e.target.files || []))}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            ثبت اطلاعات
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
