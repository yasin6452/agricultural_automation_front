import { useState } from "react";
import {
    Button,
    Modal,
    Form,
    Input,
    Select,
    Tag,
    Table,
    message,
} from "antd";
import {
    PlusOutlined,
    MessageOutlined,
} from "@ant-design/icons";

const { Option } = Select;

export const Consultation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [consultations, setConsultations] = useState([
        {
            id: 1,
            topic: "کاهش عملکرد گندم",
            expertType: "گیاه‌پزشک",
            status: "در انتظار پاسخ",
            date: "1403/08/20",
        },
        {
            id: 2,
            topic: "آفات برگ برنج",
            expertType: "کارشناس آفات",
            status: "پاسخ داده شد",
            date: "1403/08/18",
        },
    ]);

    const [form] = Form.useForm();

    const handleAddConsultation = (values: any) => {
        const newConsultation = {
            id: Date.now(),
            ...values,
            status: "در انتظار پاسخ",
            date: new Date().toLocaleDateString("fa-IR"),
        };
        setConsultations([...consultations, newConsultation]);
        setIsModalOpen(false);
        message.success("درخواست مشاوره با موفقیت ثبت شد");
        form.resetFields();
    };

    const columns = [
        {
            title: "موضوع",
            dataIndex: "topic",
            key: "topic",
            render: (text: string) => (
                <span className="font-medium text-gray-700">{text}</span>
            ),
        },
        {
            title: "نوع کارشناس",
            dataIndex: "expertType",
            key: "expertType",
            render: (text: string) => (
                <Tag color="green" className="px-3 py-1 text-sm">
                    {text}
                </Tag>
            ),
        },
        {
            title: "وضعیت",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                let color = "gold";
                if (status === "پاسخ داده شد") color = "green";
                if (status === "رد شد") color = "red";
                return (
                    <Tag color={color} className="px-3 py-1 text-sm">
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: "تاریخ ثبت",
            dataIndex: "date",
            key: "date",
        },
    ];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-[#328E6E] flex items-center gap-2">
                    <MessageOutlined />
                    درخواست‌های مشاوره
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
                dataSource={consultations}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                bordered
                className="rounded-2xl shadow-sm"
            />

            {/* Modal ثبت درخواست */}
            <Modal
                title="ثبت درخواست مشاوره جدید"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleAddConsultation}>
                    <Form.Item
                        name="topic"
                        label="موضوع مشاوره"
                        rules={[{ required: true, message: "موضوع را وارد کنید" }]}
                    >
                        <Input placeholder="مثلاً بررسی آفات زمین گندم" />
                    </Form.Item>

                    <Form.Item
                        name="expertType"
                        label="نوع کارشناس"
                        rules={[{ required: true, message: "نوع کارشناس را انتخاب کنید" }]}
                    >
                        <Select placeholder="انتخاب نوع کارشناس">
                            <Option value="کارشناس آفات">کارشناس آفات</Option>
                            <Option value="گیاه‌پزشک">گیاه‌پزشک</Option>
                            <Option value="خاک‌شناس">خاک‌شناس</Option>
                            <Option value="کارشناس آبیاری">کارشناس آبیاری</Option>
                            <Option value="مشاور تغذیه گیاه">مشاور تغذیه گیاه</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="description" label="توضیحات">
                        <Input.TextArea
                            rows={4}
                            placeholder="توضیحات کوتاهی درباره مشکل یا درخواست خود بنویسید..."
                        />
                    </Form.Item>

                    <div className="flex justify-end mt-4">
                        <Button onClick={() => setIsModalOpen(false)} className="mr-2">
                            انصراف
                        </Button>
                        <Button type="primary" htmlType="submit" className="bg-[#328E6E]">
                            ارسال درخواست
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};
