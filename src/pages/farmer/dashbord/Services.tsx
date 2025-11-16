import { useState } from "react";
import {
    Card,
    Row,
    Col,
    Modal,
    Form,
    Input,
    InputNumber,
    Select,
    Button,
    message,
    Tabs,
    Badge,
    Tag,
    Table,
    Space,
    Upload,
    Alert,
} from "antd";
import {
    SafetyOutlined,
    SnippetsOutlined,
    ExperimentOutlined,
    PhoneOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    FileTextOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import {
    Package,
    Truck,
    Snowflake,
    Scale,
    Droplets,
    Sprout,
    Users,
    FileCheck,
    Wrench,
    Tractor,
    Warehouse,
} from "lucide-react";

const { Option } = Select;
const { TextArea } = Input;

interface Service {
    id: string;
    name: string;
    icon: any;
    color: string;
    bgColor: string;
    description: string;
    features: string[];
    providers?: number;
}

interface ServiceRequest {
    id: number;
    serviceType: string;
    serviceName: string;
    status: "pending" | "approved" | "completed" | "cancelled";
    date: string;
    details: any;
}

const services: Service[] = [
    {
        id: "insurance",
        name: "بیمه محصولات",
        icon: <SafetyOutlined />,
        color: "#3b82f6",
        bgColor: "#dbeafe",
        description: "بیمه محصولات کشاورزی در برابر خسارات طبیعی",
        features: ["بیمه محصول", "بیمه دام", "بیمه باغات", "بیمه گلخانه"],
        providers: 12,
    },
    {
        id: "packaging",
        name: "بسته‌بندی",
        icon: <Package size={32} />,
        color: "#22c55e",
        bgColor: "#dcfce7",
        description: "خدمات بسته‌بندی حرفه‌ای محصولات",
        features: ["بسته‌بندی میوه", "بسته‌بندی سبزیجات", "کارتن و جعبه", "برچسب‌گذاری"],
        providers: 8,
    },
    {
        id: "equipment",
        name: "لوازم کشاورزی",
        icon: <Wrench size={32} />,
        color: "#f59e0b",
        bgColor: "#fef3c7",
        description: "خرید و تأمین ابزار و لوازم کشاورزی",
        features: ["کود و سم", "بذر", "نهال", "ابزار دستی", "سیستم آبیاری"],
        providers: 25,
    },
    {
        id: "machinery",
        name: "اجاره ماشین‌آلات",
        icon: <Tractor size={32} />,
        color: "#ef4444",
        bgColor: "#fee2e2",
        description: "اجاره انواع ماشین‌آلات کشاورزی",
        features: ["تراکتور", "کمباین", "سمپاش", "بذرکار", "کودپاش"],
        providers: 15,
    },
    {
        id: "coldstorage",
        name: "سردخانه",
        icon: <Snowflake size={32} />,
        color: "#06b6d4",
        bgColor: "#cffafe",
        description: "خدمات نگهداری محصول در سردخانه",
        features: ["سردخانه صنعتی", "انبار یخچالی", "فریزر", "کنترل دما"],
        providers: 10,
    },
    {
        id: "weighing",
        name: "باسکول",
        icon: <Scale size={32} />,
        color: "#8b5cf6",
        bgColor: "#ede9fe",
        description: "خدمات وزن‌کشی دقیق محصولات",
        features: ["باسکول 60 تنی", "باسکول 30 تنی", "ترازوی دیجیتال"],
        providers: 18,
    },
    {
        id: "irrigation",
        name: "سیستم آبیاری",
        icon: <Droplets size={32} />,
        color: "#14b8a6",
        bgColor: "#ccfbf1",
        description: "نصب و راه‌اندازی سیستم‌های آبیاری نوین",
        features: ["آبیاری قطره‌ای", "آبیاری بارانی", "تحت فشار", "اتوماسیون"],
        providers: 14,
    },
    {
        id: "warehouse",
        name: "انبار",
        icon: <Warehouse size={32} />,
        color: "#f97316",
        bgColor: "#ffedd5",
        description: "خدمات انبارداری و نگهداری محصول",
        features: ["انبار سرپوشیده", "انبار استاندارد", "کنترل رطوبت"],
        providers: 9,
    },
    {
        id: "seeds",
        name: "بذر و نهال",
        icon: <Sprout size={32} />,
        color: "#84cc16",
        bgColor: "#ecfccb",
        description: "تأمین بذر اصلاح شده و نهال‌های گواهی‌شده",
        features: ["بذر هیبرید", "بذر بومی", "نهال میوه", "نهال جنگلی"],
        providers: 20,
    },
    {
        id: "fertilizer",
        name: "کود و سم",
        icon: <ExperimentOutlined />,
        color: "#a855f7",
        bgColor: "#f3e8ff",
        description: "تأمین انواع کود و سموم کشاورزی",
        features: ["کود شیمیایی", "کود آلی", "سم حشره‌کش", "علف‌کش"],
        providers: 22,
    },
    {
        id: "transport",
        name: "حمل و نقل",
        icon: <Truck size={32} />,
        color: "#ec4899",
        bgColor: "#fce7f3",
        description: "خدمات حمل و نقل محصولات کشاورزی",
        features: ["کامیون یخچالدار", "کامیون باری", "حمل بین‌شهری"],
        providers: 16,
    },
    {
        id: "consultation",
        name: "مشاوره تخصصی",
        icon: <Users size={32} />,
        color: "#6366f1",
        bgColor: "#e0e7ff",
        description: "مشاوره با کارشناسان کشاورزی",
        features: ["مشاوره زراعی", "مشاوره باغبانی", "مشاوره دامی", "مشاوره خاک"],
        providers: 30,
    },
];

export const Services = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [activeTab, setActiveTab] = useState("services");
    const [form] = Form.useForm();

    const [requests, setRequests] = useState<ServiceRequest[]>([
        {
            id: 1,
            serviceType: "insurance",
            serviceName: "بیمه محصولات",
            status: "approved",
            date: "1403/08/15",
            details: { product: "گندم", area: 10, farmName: "زمین شمالی" },
        },
        {
            id: 2,
            serviceType: "machinery",
            serviceName: "اجاره ماشین‌آلات",
            status: "pending",
            date: "1403/08/20",
            details: { machine: "تراکتور", duration: 5, purpose: "شخم زدن" },
        },
    ]);

    const handleServiceClick = (service: Service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const handleSubmitRequest = async () => {
        try {
            const values = await form.validateFields();
            const newRequest: ServiceRequest = {
                id: Date.now(),
                serviceType: selectedService!.id,
                serviceName: selectedService!.name,
                status: "pending",
                date: new Date().toLocaleDateString("fa-IR"),
                details: values,
            };
            setRequests([newRequest, ...requests]);
            message.success("درخواست شما با موفقیت ثبت شد!");
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.error(error);
        }
    };

    const getStatusConfig = (status: string) => {
        const configs = {
            pending: { label: "در انتظار بررسی", color: "orange", icon: <ClockCircleOutlined /> },
            approved: { label: "تأیید شده", color: "green", icon: <CheckCircleOutlined /> },
            completed: { label: "تکمیل شده", color: "blue", icon: <FileCheck size={14} /> },
            cancelled: { label: "لغو شده", color: "red", icon: <FileTextOutlined /> },
        };
        return configs[status as keyof typeof configs];
    };

    const requestColumns = [
        {
            title: "خدمت",
            dataIndex: "serviceName",
            key: "serviceName",
            render: (text: string) => <span className="font-semibold text-gray-800">{text}</span>,
        },
        {
            title: "تاریخ درخواست",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "وضعیت",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                const config = getStatusConfig(status);
                return (
                    <Tag color={config.color} icon={config.icon}>
                        {config.label}
                    </Tag>
                );
            },
        },
        {
            title: "عملیات",
            key: "actions",
            render: (record: ServiceRequest) => (
                <Space>
                    <Button type="link" size="small">جزئیات</Button>
                    {record.status === "pending" && (
                        <Button type="link" danger size="small">لغو</Button>
                    )}
                </Space>
            ),
        },
    ];

    const renderServiceForm = () => {
        if (!selectedService) return null;

        switch (selectedService.id) {
            case "insurance":
                return (
                    <>
                        <Form.Item name="product" label="نوع محصول" rules={[{ required: true }]}>
                            <Select placeholder="انتخاب محصول" size="large">
                                <Option value="wheat">گندم</Option>
                                <Option value="rice">برنج</Option>
                                <Option value="corn">ذرت</Option>
                                <Option value="barley">جو</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="area" label="مساحت (هکتار)" rules={[{ required: true }]}>
                            <InputNumber min={0.1} style={{ width: "100%" }} size="large" />
                        </Form.Item>
                        <Form.Item name="farmName" label="نام زمین" rules={[{ required: true }]}>
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item name="estimatedValue" label="ارزش تخمینی (تومان)">
                            <InputNumber min={0} style={{ width: "100%" }} size="large" />
                        </Form.Item>
                    </>
                );

            case "machinery":
                return (
                    <>
                        <Form.Item name="machine" label="نوع ماشین" rules={[{ required: true }]}>
                            <Select placeholder="انتخاب ماشین" size="large">
                                <Option value="tractor">تراکتور</Option>
                                <Option value="combine">کمباین</Option>
                                <Option value="sprayer">سمپاش</Option>
                                <Option value="planter">بذرکار</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="duration" label="مدت اجاره (روز)" rules={[{ required: true }]}>
                            <InputNumber min={1} style={{ width: "100%" }} size="large" />
                        </Form.Item>
                        <Form.Item name="startDate" label="تاریخ شروع" rules={[{ required: true }]}>
                            <Input placeholder="1403/09/01" size="large" />
                        </Form.Item>
                        <Form.Item name="purpose" label="هدف استفاده">
                            <TextArea rows={2} placeholder="مثلاً شخم زدن، برداشت محصول..." />
                        </Form.Item>
                    </>
                );

            case "coldstorage":
                return (
                    <>
                        <Form.Item name="product" label="نوع محصول" rules={[{ required: true }]}>
                            <Input placeholder="مثلاً سیب، گوجه فرنگی..." size="large" />
                        </Form.Item>
                        <Form.Item name="quantity" label="مقدار (تن)" rules={[{ required: true }]}>
                            <InputNumber min={0.1} style={{ width: "100%" }} size="large" />
                        </Form.Item>
                        <Form.Item name="duration" label="مدت نگهداری (ماه)" rules={[{ required: true }]}>
                            <InputNumber min={1} style={{ width: "100%" }} size="large" />
                        </Form.Item>
                        <Form.Item name="temperature" label="دمای مورد نیاز">
                            <Select placeholder="انتخاب دما" size="large">
                                <Option value="-18">-18 درجه (فریزر)</Option>
                                <Option value="0-4">0 تا 4 درجه</Option>
                                <Option value="4-10">4 تا 10 درجه</Option>
                            </Select>
                        </Form.Item>
                    </>
                );

            case "packaging":
                return (
                    <>
                        <Form.Item name="product" label="نوع محصول" rules={[{ required: true }]}>
                            <Input placeholder="مثلاً سیب، انار..." size="large" />
                        </Form.Item>
                        <Form.Item name="quantity" label="مقدار (کیلوگرم)" rules={[{ required: true }]}>
                            <InputNumber min={1} style={{ width: "100%" }} size="large" />
                        </Form.Item>
                        <Form.Item name="packageType" label="نوع بسته‌بندی" rules={[{ required: true }]}>
                            <Select placeholder="انتخاب نوع" size="large">
                                <Option value="box">جعبه کارتنی</Option>
                                <Option value="plastic">سبد پلاستیکی</Option>
                                <Option value="bag">کیسه</Option>
                                <Option value="vacuum">وکیوم</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="labeling" label="نیاز به برچسب" valuePropName="checked">
                            <Select size="large">
                                <Option value={true}>بله</Option>
                                <Option value={false}>خیر</Option>
                            </Select>
                        </Form.Item>
                    </>
                );

            case "weighing":
                return (
                    <>
                        <Form.Item name="product" label="نوع محصول" rules={[{ required: true }]}>
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item name="estimatedWeight" label="وزن تخمینی (تن)">
                            <InputNumber min={0.1} style={{ width: "100%" }} size="large" />
                        </Form.Item>
                        <Form.Item name="weighingDate" label="تاریخ وزن‌کشی" rules={[{ required: true }]}>
                            <Input placeholder="1403/09/01" size="large" />
                        </Form.Item>
                        <Form.Item name="location" label="محل">
                            <Input placeholder="آدرس محل مورد نظر" size="large" />
                        </Form.Item>
                    </>
                );

            default:
                return (
                    <>
                        <Form.Item name="details" label="جزئیات درخواست" rules={[{ required: true }]}>
                            <TextArea rows={4} placeholder="توضیحات کامل درخواست خود را وارد کنید..." />
                        </Form.Item>
                        <Form.Item name="quantity" label="مقدار/تعداد">
                            <InputNumber min={1} style={{ width: "100%" }} size="large" />
                        </Form.Item>
                        <Form.Item name="preferredDate" label="تاریخ مورد نظر">
                            <Input placeholder="1403/09/01" size="large" />
                        </Form.Item>
                    </>
                );
        }
    };

    const stats = {
        total: requests.length,
        pending: requests.filter(r => r.status === "pending").length,
        approved: requests.filter(r => r.status === "approved").length,
        completed: requests.filter(r => r.status === "completed").length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {/* Header */}
            <div className="mb-6 animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                <SnippetsOutlined className="text-white text-2xl" />
                            </div>
                            خدمات کشاورزی
                        </h1>
                        <p className="text-gray-500 mt-2">دسترسی آسان به تمام خدمات مورد نیاز</p>
                    </div>
                </div>

                {/* آمار */}
                <Row gutter={[16, 16]}>
                    <Col xs={12} md={6}>
                        <Card className="shadow-md hover:shadow-lg transition-all text-center">
                            <div className="text-3xl font-bold text-blue-600">{services.length}</div>
                            <div className="text-sm text-gray-600 mt-1">خدمات موجود</div>
                        </Card>
                    </Col>
                    <Col xs={12} md={6}>
                        <Card className="shadow-md hover:shadow-lg transition-all text-center">
                            <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
                            <div className="text-sm text-gray-600 mt-1">درخواست تأیید شده</div>
                        </Card>
                    </Col>
                    <Col xs={12} md={6}>
                        <Card className="shadow-md hover:shadow-lg transition-all text-center">
                            <div className="text-3xl font-bold text-orange-600">{stats.pending}</div>
                            <div className="text-sm text-gray-600 mt-1">در انتظار بررسی</div>
                        </Card>
                    </Col>
                    <Col xs={12} md={6}>
                        <Card className="shadow-md hover:shadow-lg transition-all text-center">
                            <div className="text-3xl font-bold text-purple-600">
                                {services.reduce((sum, s) => sum + (s.providers || 0), 0)}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">ارائه‌دهنده خدمات</div>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Tabs */}
            <Card className="shadow-lg rounded-2xl">
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={[
                        {
                            key: "services",
                            label: (
                                <span className="flex items-center gap-2">
                                    <SnippetsOutlined />
                                    خدمات موجود ({services.length})
                                </span>
                            ),
                            children: (
                                <div>
                                    <Alert
                                        message="💡 راهنما"
                                        description="با کلیک روی هر خدمت، می‌توانید درخواست خود را ثبت کنید."
                                        type="info"
                                        showIcon
                                        closable
                                        className="mb-4"
                                    />

                                    <Row gutter={[16, 16]}>
                                        {services.map((service) => (
                                            <Col xs={24} sm={12} md={8} lg={6} key={service.id}>
                                                <Card
                                                    hoverable
                                                    className="h-full shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                                                    onClick={() => handleServiceClick(service)}
                                                    style={{ borderTop: `4px solid ${service.color}` }}
                                                >
                                                    <div className="text-center">
                                                        <div
                                                            className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                                                            style={{ background: service.bgColor, color: service.color }}
                                                        >
                                                            <div className="text-3xl">{service.icon}</div>
                                                        </div>
                                                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                                                            {service.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 mb-3 h-12">
                                                            {service.description}
                                                        </p>
                                                        {service.providers && (
                                                            <Badge
                                                                count={`${service.providers} ارائه‌دهنده`}
                                                                style={{ backgroundColor: service.color }}
                                                            />
                                                        )}
                                                        <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                                                            {service.features.slice(0, 2).join(" • ")}
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            ),
                        },
                        {
                            key: "requests",
                            label: (
                                <Badge count={stats.pending} offset={[10, 0]}>
                                    <span className="flex items-center gap-2">
                                        <FileTextOutlined />
                                        درخواست‌های من ({requests.length})
                                    </span>
                                </Badge>
                            ),
                            children: (
                                <div>
                                    <Table
                                        columns={requestColumns}
                                        dataSource={requests}
                                        rowKey="id"
                                        pagination={{ pageSize: 10 }}
                                    />
                                </div>
                            ),
                        },
                    ]}
                />
            </Card>

            {/* Modal درخواست خدمت */}
            <Modal
                title={
                    <div className="flex items-center gap-3">
                        {selectedService && (
                            <>
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ background: selectedService.bgColor, color: selectedService.color }}
                                >
                                    {selectedService.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">درخواست {selectedService.name}</h3>
                                    <p className="text-sm text-gray-500 font-normal">
                                        {selectedService.description}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                }
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    form.resetFields();
                }}
                footer={null}
                width={600}
            >
                {selectedService && (
                    <>
                        <Alert
                            message="ویژگی‌های خدمت"
                            description={
                                <ul className="list-disc list-inside mt-2">
                                    {selectedService.features.map((feature, index) => (
                                        <li key={index} className="text-sm">{feature}</li>
                                    ))}
                                </ul>
                            }
                            type="success"
                            showIcon
                            className="mb-4"
                        />

                        <Form form={form} layout="vertical" onFinish={handleSubmitRequest}>
                            {renderServiceForm()}

                            <Form.Item name="phone" label="شماره تماس" rules={[{ required: true }]}>
                                <Input
                                    placeholder="09123456789"
                                    size="large"
                                    prefix={<PhoneOutlined />}
                                />
                            </Form.Item>

                            <Form.Item name="notes" label="توضیحات تکمیلی">
                                <TextArea rows={3} placeholder="توضیحات بیشتر..." />
                            </Form.Item>

                            <Form.Item name="documents" label="مدارک">
                                <Upload listType="picture-card" maxCount={3}>
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>آپلود</div>
                                    </div>
                                </Upload>
                            </Form.Item>

                            <Alert
                                message="نکته"
                                description="پس از ثبت درخواست، کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت."
                                type="info"
                                showIcon
                                className="mb-4"
                            />

                            <div className="flex justify-end gap-2">
                                <Button onClick={() => setIsModalOpen(false)} size="large">
                                    انصراف
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    style={{ background: selectedService.color }}
                                >
                                    ثبت درخواست
                                </Button>
                            </div>
                        </Form>
                    </>
                )}
            </Modal>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </div>
    );
};