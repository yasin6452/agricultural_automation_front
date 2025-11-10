import { useState } from "react";
import { Form, Input, Button, Select, InputNumber, DatePicker, Typography, Divider, message } from "antd";
import { UploadOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { FileUploader } from "./FileUploader";
import { LocationMap } from "./LocationMap";
import "../../styles/farmer/FarmerForm.css";

const { Title } = Typography;
const { Option } = Select;

export const FarmerForm = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        console.log("🔹 Submitted values:", values);
        message.success("اطلاعات با موفقیت ثبت شد ✅");
        setTimeout(() => setLoading(false), 1000);
    };

    return (
        <div className="farmer-form-container">
            <Title level={3} className="form-title">تکمیل اطلاعات کشاورز</Title>

            <Form
                name="farmerForm"
                layout="vertical"
                onFinish={onFinish}
                size="large"
                className="farmer-form"
            >
                {/* اطلاعات شخصی */}
                <Divider orientation="right">👤 اطلاعات شخصی</Divider>

                <Form.Item label="نام و نام خانوادگی" name="fullName" rules={[{ required: true, message: "لطفا نام خود را وارد کنید" }]}>
                    <Input placeholder="مثلاً علی رضایی" />
                </Form.Item>

                <Form.Item label="تاریخ تولد" name="birthDate" rules={[{ required: true, message: "تاریخ تولد الزامی است" }]}>
                    <DatePicker style={{ width: "100%" }} placeholder="انتخاب تاریخ" />
                </Form.Item>

                <Form.Item label="کد ملی" name="nationalId" rules={[{ required: true, len: 10, message: "کد ملی باید ۱۰ رقم باشد" }]}>
                    <Input maxLength={10} />
                </Form.Item>

                {/* محل زندگی */}
                <Divider orientation="right">🏠 محل زندگی</Divider>

                <Form.Item label="استان" name="province" rules={[{ required: true, message: "استان را انتخاب کنید" }]}>
                    <Select placeholder="انتخاب استان">
                        <Option value="tehran">تهران</Option>
                        <Option value="fars">فارس</Option>
                        <Option value="mazandaran">مازندران</Option>
                        <Option value="kerman">کرمان</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="شهر" name="city" rules={[{ required: true, message: "شهر را وارد کنید" }]}>
                    <Input placeholder="مثلاً شیراز" />
                </Form.Item>

                {/* اطلاعات کشاورزی */}
                <Divider orientation="right">🌾 اطلاعات کشاورزی</Divider>

                <Form.Item label="نوع محصول اصلی" name="productType" rules={[{ required: true, message: "نوع محصول را وارد کنید" }]}>
                    <Input placeholder="مثلاً گندم، پسته، زعفران..." />
                </Form.Item>

                <Form.Item label="سطح زیر کشت (هکتار)" name="farmArea" rules={[{ required: true, message: "لطفا مقدار سطح زیر کشت را وارد کنید" }]}>
                    <InputNumber min={0.1} step={0.1} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item label="نوع آبیاری" name="irrigationType" rules={[{ required: true, message: "نوع آبیاری را مشخص کنید" }]}>
                    <Select placeholder="انتخاب نوع آبیاری">
                        <Option value="drip">قطره‌ای</Option>
                        <Option value="sprinkler">بارانی</Option>
                        <Option value="flood">غرق‌آبی</Option>
                        <Option value="mixed">ترکیبی</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="مقدار سهمیه آب (مترمکعب در ماه)" name="waterQuota">
                    <InputNumber min={0} step={100} style={{ width: "100%" }} />
                </Form.Item>

                {/* نقشه زمین */}
                <Divider orientation="right">🗺️ موقعیت زمین</Divider>

                <div className="map-section">
                    <LocationMap />
                </div>

                {/* مدارک */}
                <Divider orientation="right">📎 مدارک مورد نیاز</Divider>
                <FileUploader />

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        loading={loading}
                        block
                        className="submit-btn"
                    >
                        ثبت اطلاعات
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
