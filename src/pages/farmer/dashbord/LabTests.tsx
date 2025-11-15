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
    Card,
    Tooltip,
    Tabs,
    Badge,
    Alert,
    Space,
    Statistic,
    Avatar,
    Upload,
} from "antd";
import {
    PlusOutlined,
    ExperimentOutlined,
    EyeOutlined,
    DownloadOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    WarningOutlined,
    FileTextOutlined,
    SendOutlined,
    PaperClipOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Droplets, Leaf, FlaskConical, MessageCircle, Phone, Video } from "lucide-react";

const { Option } = Select;
const { TextArea } = Input;

interface Message {
    id: number;
    sender: "farmer" | "expert";
    content: string;
    timestamp: string;
    attachments?: { name: string; url: string }[];
}

interface LabTest {
    id: number;
    testType: "soil" | "leaf" | "water";
    landId?: number;
    landName?: string;
    crop?: string;
    status: "pending" | "in_progress" | "completed" | "cancelled";
    date: string;
    completedDate?: string;
    sampleId?: string;
    results?: {
        pH?: number;
        nitrogen?: number;
        phosphorus?: number;
        potassium?: number;
        organicMatter?: number;
        [key: string]: any;
    };
    recommendations?: string[];
    notes?: string;
    labName?: string;
    cost?: number;
    consultation?: {
        expertName: string;
        expertAvatar?: string;
        expertSpecialty: string;
        status: "active" | "closed";
        messages: Message[];
        unreadCount: number;
    };
}

export const LabTests = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
    const [activeTab, setActiveTab] = useState<string>("all");
    const [detailTab, setDetailTab] = useState<string>("results");
    const [messageInput, setMessageInput] = useState("");

    const [tests, setTests] = useState<LabTest[]>([
        {
            id: 1,
            testType: "soil",
            landId: 1,
            landName: "زمین شمالی",
            crop: "گندم",
            status: "in_progress",
            date: "1403/08/20",
            sampleId: "SOIL-2024-001",
            labName: "آزمایشگاه خاک و آب تهران",
            cost: 450000,
            notes: "نمونه از عمق 20 سانتی‌متری",
        },
        {
            id: 2,
            testType: "leaf",
            landId: 2,
            landName: "زمین جنوبی",
            crop: "برنج",
            status: "completed",
            date: "1403/08/18",
            completedDate: "1403/08/25",
            sampleId: "LEAF-2024-002",
            results: {
                pH: 6.5,
                nitrogen: 2.8,
                phosphorus: 45,
                potassium: 180,
                organicMatter: 3.2,
            },
            recommendations: [
                "میزان نیتروژن در حد مطلوب است",
                "توصیه به مصرف کود فسفره (50 کیلوگرم در هکتار)",
                "pH خاک مناسب برای کشت برنج",
                "سطح پتاسیم خوب است"
            ],
            labName: "آزمایشگاه کشاورزی مازندران",
            cost: 380000,
            consultation: {
                expertName: "دکتر احمد رضایی",
                expertAvatar: "https://i.pravatar.cc/150?img=12",
                expertSpecialty: "متخصص خاک‌شناسی",
                status: "active",
                unreadCount: 2,
                messages: [
                    {
                        id: 1,
                        sender: "farmer",
                        content: "سلام دکتر، نتایج آزمایش رو دیدم. می‌خوام بدونم چه نوع کود فسفره‌ای مناسبه؟",
                        timestamp: "1403/08/25 - 14:30",
                    },
                    {
                        id: 2,
                        sender: "expert",
                        content: "سلام. با توجه به نتایج، سوپرفسفات تریپل توصیه می‌کنم. دوز مصرف: 50 کیلوگرم در هکتار قبل از کاشت.",
                        timestamp: "1403/08/25 - 15:10",
                    },
                    {
                        id: 3,
                        sender: "farmer",
                        content: "ممنون. آیا نیاز به کود دیگه‌ای هم هست؟",
                        timestamp: "1403/08/25 - 15:45",
                    },
                    {
                        id: 4,
                        sender: "expert",
                        content: "با توجه به نتایج، نیتروژن و پتاسیم شما در حد مطلوب است. فقط فسفر کم دارید.",
                        timestamp: "1403/08/25 - 16:20",
                    },
                ],
            },
        },
        {
            id: 3,
            testType: "water",
            landId: 1,
            landName: "زمین شمالی",
            status: "completed",
            date: "1403/08/10",
            completedDate: "1403/08/15",
            sampleId: "WATER-2024-003",
            results: {
                pH: 7.2,
                ec: 1.2,
                totalDissolvedSolids: 850,
                hardness: 220,
            },
            recommendations: [
                "کیفیت آب مناسب برای آبیاری",
                "سطح شوری قابل قبول",
                "نیازی به تصفیه آب نیست"
            ],
            labName: "آزمایشگاه آب گیلان",
            cost: 320000,
        },
    ]);

    const [form] = Form.useForm();

    const mockLands = [
        { id: 1, name: "زمین شمالی", area: 3.5, crop: "گندم" },
        { id: 2, name: "زمین جنوبی", area: 2, crop: "برنج" },
        { id: 3, name: "زمین شرقی", area: 4.2, crop: "ذرت" },
    ];

    const handleAddTest = (values: any) => {
        const selectedLand = mockLands.find(l => l.id === values.landId);
        const newTest: LabTest = {
            id: Date.now(),
            testType: values.testType,
            landId: values.landId,
            landName: selectedLand?.name,
            crop: selectedLand?.crop,
            status: "pending",
            date: new Date().toLocaleDateString("fa-IR"),
            sampleId: `${values.testType.toUpperCase()}-2024-${String(tests.length + 1).padStart(3, '0')}`,
            notes: values.notes,
            labName: values.labName,
            cost: values.cost,
        };
        setTests([newTest, ...tests]);
        setIsModalOpen(false);
        message.success("درخواست آزمایش با موفقیت ثبت شد");
        form.resetFields();
    };

    const handleSendMessage = () => {
        if (!messageInput.trim() || !selectedTest) return;

        const newMessage: Message = {
            id: Date.now(),
            sender: "farmer",
            content: messageInput,
            timestamp: new Date().toLocaleTimeString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        const updatedTests = tests.map(test => {
            if (test.id === selectedTest.id) {
                return {
                    ...test,
                    consultation: test.consultation ? {
                        ...test.consultation,
                        messages: [...test.consultation.messages, newMessage],
                    } : undefined,
                };
            }
            return test;
        });

        setTests(updatedTests);
        setSelectedTest({
            ...selectedTest,
            consultation: selectedTest.consultation ? {
                ...selectedTest.consultation,
                messages: [...selectedTest.consultation.messages, newMessage],
            } : undefined,
        });
        setMessageInput("");
    };

    const startConsultation = () => {
        if (!selectedTest) return;

        const updatedTests = tests.map(test => {
            if (test.id === selectedTest.id) {
                return {
                    ...test,
                    consultation: {
                        expertName: "دکتر علی محمدی",
                        expertAvatar: "https://i.pravatar.cc/150?img=33",
                        expertSpecialty: "متخصص خاک‌شناسی",
                        status: "active" as const,
                        unreadCount: 0,
                        messages: [],
                    },
                };
            }
            return test;
        });

        setTests(updatedTests);
        setSelectedTest({
            ...selectedTest,
            consultation: {
                expertName: "دکتر علی محمدی",
                expertAvatar: "https://i.pravatar.cc/150?img=33",
                expertSpecialty: "متخصص خاک‌شناسی",
                status: "active",
                unreadCount: 0,
                messages: [],
            },
        });
        setDetailTab("consultation");
        message.success("مشاوره با کارشناس آغاز شد");
    };

    const getStatusConfig = (status: string) => {
        const configs = {
            pending: { label: "در انتظار", color: "orange", icon: <ClockCircleOutlined /> },
            in_progress: { label: "در حال انجام", color: "blue", icon: <ExperimentOutlined /> },
            completed: { label: "تکمیل شده", color: "green", icon: <CheckCircleOutlined /> },
            cancelled: { label: "لغو شده", color: "red", icon: <WarningOutlined /> },
        };
        return configs[status as keyof typeof configs];
    };

    const getTestTypeConfig = (type: string) => {
        const configs = {
            soil: { label: "آزمایش خاک", icon: <Droplets className="inline" size={16} />, color: "#8b4513" },
            leaf: { label: "آزمایش برگ", icon: <Leaf className="inline" size={16} />, color: "#22c55e" },
            water: { label: "آزمایش آب", icon: <FlaskConical className="inline" size={16} />, color: "#3b82f6" },
        };
        return configs[type as keyof typeof configs];
    };

    const getTestsByStatus = (status: string) => {
        if (status === "all") return tests;
        return tests.filter(test => test.status === status);
    };

    const stats = {
        total: tests.length,
        pending: tests.filter(t => t.status === "pending").length,
        in_progress: tests.filter(t => t.status === "in_progress").length,
        completed: tests.filter(t => t.status === "completed").length,
    };

    const columns = [
        {
            title: "شناسه نمونه",
            dataIndex: "sampleId",
            key: "sampleId",
            width: 150,
            render: (text: string) => (
                <span className="font-mono text-sm font-semibold text-blue-600">{text}</span>
            ),
        },
        {
            title: "نوع آزمایش",
            dataIndex: "testType",
            key: "testType",
            width: 140,
            render: (type: string) => {
                const config = getTestTypeConfig(type);
                return (
                    <Space>
                        <span style={{ color: config.color }}>{config.icon}</span>
                        <span className="font-medium">{config.label}</span>
                    </Space>
                );
            },
        },
        {
            title: "زمین / محصول",
            key: "land",
            width: 180,
            render: (record: LabTest) => (
                <div>
                    <div className="font-medium text-gray-800">{record.landName}</div>
                    <div className="text-xs text-gray-500">{record.crop}</div>
                </div>
            ),
        },
        {
            title: "وضعیت",
            dataIndex: "status",
            key: "status",
            width: 140,
            render: (status: string) => {
                const config = getStatusConfig(status);
                return (
                    <Tag color={config.color} icon={config.icon} className="px-3 py-1">
                        {config.label}
                    </Tag>
                );
            },
        },
        {
            title: "تاریخ ثبت",
            dataIndex: "date",
            key: "date",
            width: 120,
        },
        {
            title: "مشاوره",
            key: "consultation",
            width: 100,
            render: (record: LabTest) => (
                record.consultation ? (
                    <Badge count={record.consultation.unreadCount} offset={[-5, 5]}>
                        <Tag color="green" icon={<MessageCircle size={14} />}>
                            فعال
                        </Tag>
                    </Badge>
                ) : record.status === "completed" ? (
                    <Tag color="default">بدون مشاوره</Tag>
                ) : null
            ),
        },
        {
            title: "عملیات",
            key: "actions",
            width: 100,
            fixed: 'right' as const,
            render: (record: LabTest) => (
                <Space>
                    <Tooltip title="مشاهده جزئیات">
                        <Button
                            type="text"
                            icon={<EyeOutlined />}
                            onClick={() => {
                                setSelectedTest(record);
                                setIsDetailModalOpen(true);
                                setDetailTab(record.consultation ? "consultation" : "results");
                            }}
                            className="text-blue-600"
                        />
                    </Tooltip>
                    {record.status === "completed" && (
                        <Tooltip title="دانلود گزارش">
                            <Button
                                type="text"
                                icon={<DownloadOutlined />}
                                className="text-green-600"
                            />
                        </Tooltip>
                    )}
                </Space>
            ),
        },
    ];

    const renderDetailModal = () => {
        if (!selectedTest) return null;

        const config = getTestTypeConfig(selectedTest.testType);
        const statusConfig = getStatusConfig(selectedTest.status);

        return (
            <Modal
                title={
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            {config.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">جزئیات آزمایش</h3>
                            <p className="text-sm text-gray-500 font-mono">{selectedTest.sampleId}</p>
                        </div>
                    </div>
                }
                open={isDetailModalOpen}
                onCancel={() => {
                    setIsDetailModalOpen(false);
                    setDetailTab("results");
                }}
                width={900}
                footer={null}
                className="lab-detail-modal"
            >
                <Tabs
                    activeKey={detailTab}
                    onChange={setDetailTab}
                    items={[
                        {
                            key: "results",
                            label: (
                                <span className="flex items-center gap-2">
                                    <FileTextOutlined />
                                    نتایج آزمایش
                                </span>
                            ),
                            children: (
                                <div className="space-y-4" style={{ maxHeight: "60vh", overflowY: "auto", padding: "4px" }}>
                                    {/* اطلاعات کلی */}
                                    <Card size="small" className="bg-gray-50">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">نوع آزمایش</p>
                                                <p className="font-semibold">{config.label}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">وضعیت</p>
                                                <Tag color={statusConfig.color} icon={statusConfig.icon}>
                                                    {statusConfig.label}
                                                </Tag>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">زمین</p>
                                                <p className="font-semibold">{selectedTest.landName}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">محصول</p>
                                                <p className="font-semibold">{selectedTest.crop}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">تاریخ ثبت</p>
                                                <p className="font-semibold">{selectedTest.date}</p>
                                            </div>
                                            {selectedTest.completedDate && (
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">تاریخ تکمیل</p>
                                                    <p className="font-semibold">{selectedTest.completedDate}</p>
                                                </div>
                                            )}
                                        </div>
                                    </Card>

                                    {/* نتایج */}
                                    {selectedTest.results && (
                                        <Card title={<span className="flex items-center gap-2"><FileTextOutlined /> نتایج آزمایش</span>}>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                                {Object.entries(selectedTest.results).map(([key, value]) => {
                                                    const labels: { [key: string]: string } = {
                                                        pH: "pH",
                                                        nitrogen: "نیتروژن (N)",
                                                        phosphorus: "فسفر (P)",
                                                        potassium: "پتاسیم (K)",
                                                        organicMatter: "ماده آلی",
                                                        ec: "EC",
                                                        totalDissolvedSolids: "TDS",
                                                        hardness: "سختی آب",
                                                    };
                                                    const units: { [key: string]: string } = {
                                                        pH: "",
                                                        nitrogen: "%",
                                                        phosphorus: "ppm",
                                                        potassium: "ppm",
                                                        organicMatter: "%",
                                                        ec: "dS/m",
                                                        totalDissolvedSolids: "ppm",
                                                        hardness: "ppm",
                                                    };
                                                    return (
                                                        <div key={key} className="text-center">
                                                            <Statistic
                                                                title={labels[key] || key}
                                                                value={value as number}
                                                                suffix={units[key] || ""}
                                                                valueStyle={{ color: '#328E6E' }}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </Card>
                                    )}

                                    {/* توصیه‌ها */}
                                    {selectedTest.recommendations && selectedTest.recommendations.length > 0 && (
                                        <Alert
                                            message="توصیه‌های کارشناسی"
                                            description={
                                                <ul className="list-disc list-inside space-y-2 mt-2">
                                                    {selectedTest.recommendations.map((rec, index) => (
                                                        <li key={index} className="text-sm">{rec}</li>
                                                    ))}
                                                </ul>
                                            }
                                            type="success"
                                            showIcon
                                        />
                                    )}

                                    {/* دکمه شروع مشاوره */}
                                    {selectedTest.status === "completed" && !selectedTest.consultation && (
                                        <Alert
                                            message="نیاز به مشاوره دارید؟"
                                            description={
                                                <div className="mt-2">
                                                    <p className="text-sm mb-3">برای دریافت توضیحات بیشتر یا پرسیدن سوالات خود، می‌توانید با کارشناس گفتگو کنید.</p>
                                                    <Button
                                                        type="primary"
                                                        icon={<MessageCircle size={16} />}
                                                        onClick={startConsultation}
                                                        className="bg-gradient-to-r from-green-500 to-green-600"
                                                    >
                                                        شروع مشاوره با کارشناس
                                                    </Button>
                                                </div>
                                            }
                                            type="info"
                                            showIcon
                                        />
                                    )}

                                    {selectedTest.notes && (
                                        <Card size="small" title="یادداشت‌ها">
                                            <p className="text-gray-600">{selectedTest.notes}</p>
                                        </Card>
                                    )}

                                    <div className="flex justify-end gap-2 pt-4 border-t">
                                        {selectedTest.status === "completed" && (
                                            <Button type="primary" icon={<DownloadOutlined />} className="bg-green-600">
                                                دانلود گزارش PDF
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ),
                        },
                        {
                            key: "consultation",
                            label: (
                                <Badge count={selectedTest.consultation?.unreadCount || 0} offset={[10, 0]}>
                                    <span className="flex items-center gap-2">
                                        <MessageCircle size={16} />
                                        مشاوره با کارشناس
                                    </span>
                                </Badge>
                            ),
                            disabled: !selectedTest.consultation,
                            children: selectedTest.consultation && (
                                <div className="flex flex-col h-[60vh]">
                                    {/* هدر کارشناس */}
                                    <Card className="mb-3 bg-gradient-to-r from-green-50 to-blue-50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    size={48}
                                                    src={selectedTest.consultation.expertAvatar}
                                                    icon={<UserOutlined />}
                                                />
                                                <div>
                                                    <h4 className="font-bold text-gray-800">{selectedTest.consultation.expertName}</h4>
                                                    <p className="text-sm text-gray-600">{selectedTest.consultation.expertSpecialty}</p>
                                                </div>
                                            </div>
                                            <Space>
                                                <Tooltip title="تماس صوتی">
                                                    <Button icon={<Phone size={18} />} shape="circle" className="text-green-600" />
                                                </Tooltip>
                                                <Tooltip title="تماس تصویری">
                                                    <Button icon={<Video size={18} />} shape="circle" className="text-blue-600" />
                                                </Tooltip>
                                            </Space>
                                        </div>
                                    </Card>

                                    {/* پیام‌ها */}
                                    <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-4 mb-3 space-y-3">
                                        {selectedTest.consultation.messages.length === 0 ? (
                                            <div className="text-center text-gray-400 py-8">
                                                <MessageCircle size={48} className="mx-auto mb-2 opacity-50" />
                                                <p>هنوز پیامی وجود ندارد</p>
                                                <p className="text-sm mt-1">اولین پیام خود را ارسال کنید</p>
                                            </div>
                                        ) : (
                                            selectedTest.consultation.messages.map((msg) => (
                                                <div
                                                    key={msg.id}
                                                    className={`flex ${msg.sender === "farmer" ? "justify-end" : "justify-start"}`}
                                                >
                                                    <div
                                                        className={`max-w-[70%] rounded-2xl px-4 py-3 ${msg.sender === "farmer"
                                                                ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                                                                : "bg-white text-gray-800 shadow-md"
                                                            }`}
                                                    >
                                                        <p className="text-sm leading-relaxed">{msg.content}</p>
                                                        <p
                                                            className={`text-xs mt-2 ${msg.sender === "farmer" ? "text-green-100" : "text-gray-400"
                                                                }`}
                                                        >
                                                            {msg.timestamp}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {/* ورودی پیام */}
                                    <div className="flex gap-2">
                                        <Upload showUploadList={false}>
                                            <Button icon={<PaperClipOutlined />} />
                                        </Upload>
                                        <Input
                                            placeholder="پیام خود را بنویسید..."
                                            value={messageInput}
                                            onChange={(e) => setMessageInput(e.target.value)}
                                            onPressEnter={handleSendMessage}
                                            size="large"
                                        />
                                        <Button
                                            type="primary"
                                            icon={<SendOutlined />}
                                            onClick={handleSendMessage}
                                            disabled={!messageInput.trim()}
                                            className="bg-gradient-to-r from-green-500 to-green-600"
                                            size="large"
                                        >
                                            ارسال
                                        </Button>
                                    </div>
                                </div>
                            ),
                        },
                    ]}
                />
            </Modal>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="mb-6 animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <FlaskConical className="text-white" size={24} />
                            </div>
                            آزمایشگاه خاک و گیاه
                        </h1>
                        <p className="text-gray-500 mt-2">مدیریت آزمایش‌ها و مشاوره با کارشناسان</p>
                    </div>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalOpen(true)}
                        size="large"
                        className="bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg hover:shadow-xl transition-all"
                    >
                        ثبت درخواست جدید
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="shadow-md hover:shadow-lg transition-all animate-slideUp">
                        <Statistic
                            title="کل آزمایش‌ها"
                            value={stats.total}
                            prefix={<ExperimentOutlined />}
                            valueStyle={{ color: '#6366f1' }}
                        />
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-all animate-slideUp" style={{ animationDelay: '0.1s' }}>
                        <Statistic
                            title="در انتظار"
                            value={stats.pending}
                            prefix={<ClockCircleOutlined />}
                            valueStyle={{ color: '#f59e0b' }}
                        />
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-all animate-slideUp" style={{ animationDelay: '0.2s' }}>
                        <Statistic
                            title="در حال انجام"
                            value={stats.in_progress}
                            prefix={<ExperimentOutlined />}
                            valueStyle={{ color: '#3b82f6' }}
                        />
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-all animate-slideUp" style={{ animationDelay: '0.3s' }}>
                        <Statistic
                            title="تکمیل شده"
                            value={stats.completed}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#22c55e' }}
                        />
                    </Card>
                </div>
            </div>

            <Card className="shadow-lg rounded-2xl animate-fadeIn">
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={[
                        {
                            key: "all",
                            label: <Badge count={stats.total} offset={[10, 0]}><span>همه آزمایش‌ها</span></Badge>,
                        },
                        {
                            key: "pending",
                            label: <Badge count={stats.pending} offset={[10, 0]} color="orange"><span>در انتظار</span></Badge>,
                        },
                        {
                            key: "in_progress",
                            label: <Badge count={stats.in_progress} offset={[10, 0]} color="blue"><span>در حال انجام</span></Badge>,
                        },
                        {
                            key: "completed",
                            label: <Badge count={stats.completed} offset={[10, 0]} color="green"><span>تکمیل شده</span></Badge>,
                        },
                    ]}
                />
                <Table
                    columns={columns}
                    dataSource={getTestsByStatus(activeTab)}
                    rowKey="id"
                    pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `مجموع ${total} آزمایش` }}
                    scroll={{ x: 1200 }}
                    className="mt-4"
                />
            </Card>

            {/* Modal ثبت درخواست */}
            <Modal
                title={
                    <span className="text-lg font-semibold flex items-center gap-2">
                        <PlusOutlined />
                        ثبت درخواست آزمایش جدید
                    </span>
                }
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={600}
            >
                <Form form={form} layout="vertical" onFinish={handleAddTest} className="mt-4">
                    <Form.Item
                        name="landId"
                        label="انتخاب زمین"
                        rules={[{ required: true, message: "لطفا زمین را انتخاب کنید" }]}
                    >
                        <Select placeholder="انتخاب زمین" size="large">
                            {mockLands.map(land => (
                                <Option key={land.id} value={land.id}>
                                    {land.name} ({land.crop} - {land.area} هکتار)
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="testType"
                        label="نوع آزمایش"
                        rules={[{ required: true, message: "نوع آزمایش را انتخاب کنید" }]}
                    >
                        <Select placeholder="انتخاب نوع آزمایش" size="large">
                            <Option value="soil">
                                <Space><Droplets size={16} /> آزمایش خاک</Space>
                            </Option>
                            <Option value="leaf">
                                <Space><Leaf size={16} /> آزمایش برگ</Space>
                            </Option>
                            <Option value="water">
                                <Space><FlaskConical size={16} /> آزمایش آب</Space>
                            </Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="labName"
                        label="نام آزمایشگاه"
                        rules={[{ required: true, message: "نام آزمایشگاه را وارد کنید" }]}
                    >
                        <Input placeholder="مثلاً آزمایشگاه خاک تهران" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="cost"
                        label="هزینه تخمینی (تومان)"
                    >
                        <Input type="number" placeholder="350000" size="large" />
                    </Form.Item>

                    <Form.Item name="notes" label="یادداشت">
                        <TextArea rows={3} placeholder="توضیحات اضافی..." />
                    </Form.Item>

                    <Alert
                        message="نکته"
                        description="پس از ثبت درخواست، کد رهگیری برای شما ارسال می‌شود."
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
                            className="bg-gradient-to-r from-purple-500 to-purple-600"
                        >
                            ثبت درخواست
                        </Button>
                    </div>
                </Form>
            </Modal>

            {renderDetailModal()}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
                .animate-slideUp { animation: slideUp 0.6s ease-out; }
                
                .lab-detail-modal .ant-tabs-content {
                    height: 100%;
                }
            `}</style>
        </div>
    );
};