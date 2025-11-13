import { useState } from "react";
import { Button, Modal, Form, Input, InputNumber, Select, Card, Empty } from "antd";
import { PlusOutlined, EnvironmentOutlined } from "@ant-design/icons";

const { Option } = Select;

export const MyLands = () => {
    const [lands, setLands] = useState([
        {
            id: 1,
            name: "زمین شمالی",
            area: 3.5,
            crop: "گندم",
            location: "گیلان، فومن",
        },
        {
            id: 2,
            name: "زمین جنوبی",
            area: 2,
            crop: "برنج",
            location: "مازندران، بابل",
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const handleAddLand = (values: any) => {
        const newLand = { id: Date.now(), ...values };
        setLands([...lands, newLand]);
        setIsModalOpen(false);
        form.resetFields();
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-[#328E6E]">زمین‌های من</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#328E6E]"
                >
                    افزودن زمین جدید
                </Button>
            </div>

            {lands.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lands.map((land) => (
                        <Card
                            key={land.id}
                            title={<span className="text-[#328E6E] font-semibold">{land.name}</span>}
                            className="shadow-md rounded-2xl border border-gray-100 hover:shadow-lg transition"
                        >
                            <Card.Meta
                                description={
                                    <div className="space-y-2 text-gray-600">
                                        <p>محصول: {land.crop}</p>
                                        <p>مساحت: {land.area} هکتار</p>
                                        <p>
                                            <EnvironmentOutlined className="text-[#328E6E] mr-1" />
                                            {land.location}
                                        </p>
                                    </div>
                                }
                            />
                        </Card>
                    ))}
                </div>
            ) : (
                <Empty description="هنوز هیچ زمینی ثبت نکرده‌اید." />
            )}

            {/* Modal افزودن زمین */}
            <Modal
                title="افزودن زمین جدید"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleAddLand}>
                    <Form.Item
                        name="name"
                        label="نام زمین"
                        rules={[{ required: true, message: "لطفا نام زمین را وارد کنید" }]}
                    >
                        <Input placeholder="مثلاً زمین شمالی" />
                    </Form.Item>

                    <Form.Item
                        name="area"
                        label="مساحت (هکتار)"
                        rules={[{ required: true, message: "لطفا مساحت زمین را وارد کنید" }]}
                    >
                        <InputNumber className="w-full" min={0.1} step={0.1} placeholder="مثلاً ۲.۵" />
                    </Form.Item>

                    <Form.Item
                        name="crop"
                        label="نوع محصول"
                        rules={[{ required: true, message: "نوع محصول را انتخاب کنید" }]}
                    >
                        <Select placeholder="انتخاب محصول">
                            <Option value="گندم">گندم</Option>
                            <Option value="برنج">برنج</Option>
                            <Option value="جو">جو</Option>
                            <Option value="ذرت">ذرت</Option>
                            <Option value="زعفران">زعفران</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="location" label="موقعیت زمین">
                        <Input placeholder="مثلاً خراسان رضوی، تربت حیدریه" />
                    </Form.Item>

                    <div className="flex justify-end">
                        <Button onClick={() => setIsModalOpen(false)} className="mr-2">
                            انصراف
                        </Button>
                        <Button type="primary" htmlType="submit" className="bg-[#328E6E]">
                            ذخیره
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};
