import { useState } from "react";
import { Card, Table, Button, Modal, Form, Input, InputNumber, Select, message, Typography } from "antd";

const { Title } = Typography;
const { Option } = Select;

interface Product {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    price: number;
}

export const MyProducts = () => {
    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: "گندم", quantity: 10, unit: "تن", price: 500000 },
        { id: 2, name: "برنج", quantity: 5, unit: "تن", price: 1200000 },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [form] = Form.useForm();

    const showModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            form.setFieldsValue(product);
        } else {
            setEditingProduct(null);
            form.resetFields();
        }
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingProduct(null);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingProduct) {
                setProducts(products.map(p => (p.id === editingProduct.id ? { ...editingProduct, ...values } : p)));
                message.success("محصول با موفقیت ویرایش شد!");
            } else {
                const newProduct: Product = {
                    id: products.length + 1,
                    ...values,
                };
                setProducts([...products, newProduct]);
                message.success("محصول جدید با موفقیت اضافه شد!");
            }
            setIsModalVisible(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (id: number) => {
        setProducts(products.filter(p => p.id !== id));
        message.success("محصول حذف شد!");
    };

    const columns = [
        { title: "نام محصول", dataIndex: "name", key: "name" },
        { title: "مقدار", dataIndex: "quantity", key: "quantity" },
        { title: "واحد", dataIndex: "unit", key: "unit" },
        { title: "قیمت (تومان)", dataIndex: "price", key: "price", render: (price: number) => price.toLocaleString() },
        {
            title: "عملیات",
            key: "actions",
            render: (_: any, record: Product) => (
                <div className="flex gap-2">
                    <Button type="primary" onClick={() => showModal(record)} style={{ backgroundColor: "#328E6E", borderColor: "#328E6E" }}>
                        ویرایش
                    </Button>
                    <Button danger onClick={() => handleDelete(record.id)}>
                        حذف
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-4">
            <Card className="shadow-lg rounded-2xl p-6">
                <Title level={2} style={{ color: "#328E6E", marginBottom: 24, textAlign: "center" }}>
                    محصولات من
                </Title>
                <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16, backgroundColor: "#328E6E", borderColor: "#328E6E" }}>
                    افزودن محصول جدید
                </Button>
                <Table columns={columns} dataSource={products} rowKey="id" pagination={{ pageSize: 5 }} />
            </Card>

            <Modal
                title={editingProduct ? "ویرایش محصول" : "افزودن محصول جدید"}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="ذخیره"
                cancelText="انصراف"
            >
                <Form form={form} layout="vertical" size="large">
                    <Form.Item label="نام محصول" name="name" rules={[{ required: true, message: "نام محصول را وارد کنید" }]}>
                        <Input placeholder="مثال: گندم" />
                    </Form.Item>

                    <Form.Item label="مقدار" name="quantity" rules={[{ required: true, message: "مقدار را وارد کنید" }]}>
                        <InputNumber min={0.1} style={{ width: "100%" }} placeholder="مثال: 10" />
                    </Form.Item>

                    <Form.Item label="واحد" name="unit" rules={[{ required: true, message: "واحد را وارد کنید" }]}>
                        <Select placeholder="واحد">
                            <Option value="کیلوگرم">کیلوگرم</Option>
                            <Option value="تن">تن</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="قیمت (تومان)" name="price" rules={[{ required: true, message: "قیمت را وارد کنید" }]}>
                        <InputNumber min={0} style={{ width: "100%" }} placeholder="مثال: 500000" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
