import { useState } from "react";
import {
    Button,
    Modal,
    Form,
    Input,
    Select,
    Table,
    Tag,
    message,
} from "antd";
import { PlusOutlined, ExperimentOutlined } from "@ant-design/icons";

const { Option } = Select;

export const LabTests = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tests, setTests] = useState([
        {
            id: 1,
            testType: "آزمایش خاک",
            crop: "گندم",
            status: "در حال انجام",
            date: "1403/08/20",
            result: "",
        },
        {
            id: 2,
            testType: "آزمایش برگ",
            crop: "برنج",
            status: "تکمیل شده",
            date: "1403/08/18",
            result: "PH: 6.5, NPK: مناسب",
        },
    ]);

    const [form] = Form.useForm();

    const handleAddTest = (values: any) => {
        const newTest = {
            id: Date.now(),
            ...values,
            status: "در حال انجام",
            date: new Date().toLocaleDateString("fa-IR"),
            result: "",
        };
        setTests([...tests, newTest]);
        setIsModalOpen(false);
        message.success("درخواست آزمایش با موفقیت ثبت شد");
        form.resetFields();
    };

    const columns = [
        {
            title: "نوع آزمایش",
            dataIndex: "testType",
            key: "testType",
            render: (text: string) => <span className="font-medium text-gray-700">{text}</span>,
        },
        {
            title: "محصول",
            dataIndex: "crop",
            key: "crop",
        },
        {
            title: "وضعیت",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                let color = "gold";
                if (status === "تکمیل شده") color = "green";
                if (status === "رد شد") color = "red";
                return <Tag color={color} className="px-3 py-1 text-sm">{status}</Tag>;
            },
        },
        {
            title: "تاریخ ثبت",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "نتیجه",
            dataIndex: "result",
            key: "result",
            render: (result: string) => (
                result ? <span className="text-gray-800">{result}</span> : "-"
            ),
        },
    ];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-[#328E6E] flex items-center gap-2">
                    <ExperimentOutlined />
                    آزمایش‌های ثبت‌شده
                </h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#328E6E]"
                >
                    ثبت درخواست جدید
                </Button>
            </div>

            {/* Table */}
            <Table
                columns={columns}
                dataSource={tests}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                bordered
                className="rounded-2xl shadow-sm"
            />

            {/* Modal ثبت درخواست */}
            <Modal
                title="ثبت درخواست آزمایش جدید"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleAddTest}>
                    <Form.Item
                        name="testType"
                        label="نوع آزمایش"
                        rules={[{ required: true, message: "نوع آزمایش را انتخاب کنید" }]}
                    >
                        <Select placeholder="انتخاب نوع آزمایش">
                            <Option value="آزمایش خاک">آزمایش خاک</Option>
                            <Option value="آزمایش برگ">آزمایش برگ</Option>
                            <Option value="آزمایش آب">آزمایش آب</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="crop"
                        label="محصول"
                        rules={[{ required: true, message: "محصول را وارد کنید" }]}
                    >
                        <Input placeholder="مثلاً گندم یا برنج" />
                    </Form.Item>

                    <Form.Item name="notes" label="توضیحات">
                        <Input.TextArea rows={4} placeholder="توضیحات کوتاه درباره آزمایش..." />
                    </Form.Item>

                    <div className="flex justify-end mt-4">
                        <Button onClick={() => setIsModalOpen(false)} className="mr-2">
                            انصراف
                        </Button>
                        <Button type="primary" htmlType="submit" className="bg-[#328E6E]">
                            ثبت درخواست
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};
