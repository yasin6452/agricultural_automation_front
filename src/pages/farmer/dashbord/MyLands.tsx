import { useState } from "react";
import { Button, Modal, Form, Input, InputNumber, Select, Card, Empty, Progress, Tag, Tooltip } from "antd";
import { PlusOutlined, EnvironmentOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { MapPin, Sprout, TrendingUp, Calendar, Droplets, Sun } from "lucide-react";

const { Option } = Select;

// انواع مرحله رشد
const GROWTH_STAGES = {
    planting: { label: "کاشت", progress: 0, color: "#94a3b8", icon: "🌱" },
    germination: { label: "جوانه‌زنی", progress: 20, color: "#10b981", icon: "🌿" },
    vegetative: { label: "رشد رویشی", progress: 40, color: "#22c55e", icon: "🌾" },
    flowering: { label: "گلدهی", progress: 60, color: "#f59e0b", icon: "🌸" },
    fruiting: { label: "میوه‌دهی", progress: 80, color: "#f97316", icon: "🍃" },
    harvest: { label: "آماده برداشت", progress: 100, color: "#ef4444", icon: "🌾" },
};

interface Land {
    id: number;
    name: string;
    area: number;
    crop: string;
    location: string;
    coordinates?: [number, number][];
    plantDate?: string;
    harvestDate?: string;
    growthStage?: keyof typeof GROWTH_STAGES;
    soilMoisture?: number;
    temperature?: number;
}

export const MyLands = () => {
    const [lands, setLands] = useState<Land[]>([
        {
            id: 1,
            name: "زمین شمالی",
            area: 3.5,
            crop: "گندم",
            location: "گیلان، فومن",
            coordinates: [[37.25, 49.61], [37.25, 49.62], [37.26, 49.62], [37.26, 49.61]],
            plantDate: "1403/01/15",
            harvestDate: "1403/06/20",
            growthStage: "vegetative",
            soilMoisture: 65,
            temperature: 22,
        },
        {
            id: 2,
            name: "زمین جنوبی",
            area: 2,
            crop: "برنج",
            location: "مازندران، بابل",
            coordinates: [[36.55, 52.67], [36.55, 52.68], [36.56, 52.68], [36.56, 52.67]],
            plantDate: "1403/02/10",
            harvestDate: "1403/07/15",
            growthStage: "flowering",
            soilMoisture: 80,
            temperature: 28,
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLand, setSelectedLand] = useState<Land | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
    const [form] = Form.useForm();

    const handleAddLand = (values: any) => {
        const newLand: Land = {
            id: Date.now(),
            ...values,
            growthStage: "planting",
            soilMoisture: 50,
            temperature: 20,
        };
        setLands([...lands, newLand]);
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleDeleteLand = (id: number) => {
        setLands(lands.filter(land => land.id !== id));
    };

    const calculateDaysToHarvest = (harvestDate?: string) => {
        if (!harvestDate) return null;
        // محاسبه ساده روزها تا برداشت
        const today = new Date();
        const harvest = new Date(harvestDate);
        const days = Math.ceil((harvest.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return days > 0 ? days : 0;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {/* Header */}
            <div className="mb-8 animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                <MapPin className="text-white" size={24} />
                            </div>
                            زمین‌های من
                        </h1>
                        <p className="text-gray-500 mt-2">مدیریت و نظارت بر زمین‌های کشاورزی</p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            type={viewMode === "grid" ? "primary" : "default"}
                            onClick={() => setViewMode("grid")}
                            className={viewMode === "grid" ? "bg-[#328E6E]" : ""}
                        >
                            نمای کارت
                        </Button>
                        <Button
                            type={viewMode === "map" ? "primary" : "default"}
                            onClick={() => setViewMode("map")}
                            className={viewMode === "map" ? "bg-[#328E6E]" : ""}
                        >
                            نمای نقشه
                        </Button>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setIsModalOpen(true)}
                            className="bg-gradient-to-r from-green-500 to-green-600 shadow-lg hover:shadow-xl transition-all duration-300"
                            size="large"
                        >
                            افزودن زمین جدید
                        </Button>
                    </div>
                </div>

                {/* آمار کلی */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-slideUp">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">تعداد زمین‌ها</p>
                                <p className="text-2xl font-bold text-gray-800">{lands.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <MapPin className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-slideUp" style={{ animationDelay: "0.1s" }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">مجموع مساحت</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {lands.reduce((sum, land) => sum + land.area, 0)} هکتار
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="text-green-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-slideUp" style={{ animationDelay: "0.2s" }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">در حال رشد</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {lands.filter(l => l.growthStage !== "harvest").length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Sprout className="text-orange-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-slideUp" style={{ animationDelay: "0.3s" }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">آماده برداشت</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {lands.filter(l => l.growthStage === "harvest").length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <Calendar className="text-red-600" size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* محتوای اصلی */}
            {lands.length > 0 ? (
                viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {lands.map((land, index) => {
                            const stage = land.growthStage ? GROWTH_STAGES[land.growthStage] : GROWTH_STAGES.planting;
                            const daysToHarvest = calculateDaysToHarvest(land.harvestDate);

                            return (
                                <div
                                    key={land.id}
                                    className="animate-scaleIn"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <Card
                                        className="shadow-lg rounded-2xl border-0 hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                                        bodyStyle={{ padding: 0 }}
                                    >
                                        {/* Header کارت */}
                                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                                            <div className="relative z-10">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl font-bold">{land.name}</h3>
                                                    <Tag color="white" className="text-green-600 font-semibold">
                                                        {land.area} هکتار
                                                    </Tag>
                                                </div>
                                                <div className="flex items-center gap-2 text-green-50">
                                                    <Sprout size={16} />
                                                    <span>{land.crop}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* بدنه کارت */}
                                        <div className="p-5 space-y-4">
                                            {/* موقعیت */}
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <EnvironmentOutlined className="text-green-600" />
                                                <span className="text-sm">{land.location}</span>
                                            </div>

                                            {/* مرحله رشد */}
                                            <div>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-medium text-gray-700">
                                                        مرحله رشد: {stage.icon} {stage.label}
                                                    </span>
                                                    <span className="text-xs text-gray-500">{stage.progress}%</span>
                                                </div>
                                                <Progress
                                                    percent={stage.progress}
                                                    strokeColor={{
                                                        '0%': stage.color,
                                                        '100%': stage.color,
                                                    }}
                                                    showInfo={false}
                                                    className="mb-2"
                                                />
                                            </div>

                                            {/* تاریخ‌ها */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="bg-blue-50 p-3 rounded-lg">
                                                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                                                        <Calendar size={14} />
                                                        <span className="text-xs font-medium">تاریخ کاشت</span>
                                                    </div>
                                                    <p className="text-sm font-semibold text-gray-800">{land.plantDate || "-"}</p>
                                                </div>
                                                <div className="bg-red-50 p-3 rounded-lg">
                                                    <div className="flex items-center gap-2 text-red-600 mb-1">
                                                        <Calendar size={14} />
                                                        <span className="text-xs font-medium">تاریخ برداشت</span>
                                                    </div>
                                                    <p className="text-sm font-semibold text-gray-800">{land.harvestDate || "-"}</p>
                                                </div>
                                            </div>

                                            {/* زمان باقی‌مانده */}
                                            {daysToHarvest !== null && daysToHarvest > 0 && (
                                                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-3 rounded-lg border border-orange-200">
                                                    <p className="text-center">
                                                        <span className="text-2xl font-bold text-orange-600">{daysToHarvest}</span>
                                                        <span className="text-sm text-gray-600 mr-2">روز تا برداشت</span>
                                                    </p>
                                                </div>
                                            )}

                                            {/* شرایط محیطی */}
                                            <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                                                <Tooltip title="رطوبت خاک">
                                                    <div className="flex items-center gap-2">
                                                        <Droplets size={16} className="text-blue-500" />
                                                        <span className="text-sm text-gray-600">{land.soilMoisture}%</span>
                                                    </div>
                                                </Tooltip>
                                                <Tooltip title="دمای محیط">
                                                    <div className="flex items-center gap-2">
                                                        <Sun size={16} className="text-orange-500" />
                                                        <span className="text-sm text-gray-600">{land.temperature}°C</span>
                                                    </div>
                                                </Tooltip>
                                            </div>

                                            {/* دکمه‌های عملیات */}
                                            <div className="flex gap-2 pt-3 border-t">
                                                <Button
                                                    type="text"
                                                    icon={<EyeOutlined />}
                                                    onClick={() => setSelectedLand(land)}
                                                    className="flex-1 text-blue-600 hover:bg-blue-50"
                                                >
                                                    جزئیات
                                                </Button>
                                                <Button
                                                    type="text"
                                                    icon={<EditOutlined />}
                                                    className="text-green-600 hover:bg-green-50"
                                                >
                                                    ویرایش
                                                </Button>
                                                <Button
                                                    type="text"
                                                    icon={<DeleteOutlined />}
                                                    onClick={() => handleDeleteLand(land.id)}
                                                    className="text-red-600 hover:bg-red-50"
                                                    danger
                                                >
                                                    حذف
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    // نمای نقشه
                    <Card className="shadow-lg rounded-2xl animate-fadeIn">
                        <div className="h-[600px] bg-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                            {/* شبیه‌سازی نقشه */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 opacity-50"></div>
                            {lands.map((land, index) => (
                                <div
                                    key={land.id}
                                    className="absolute bg-white p-4 rounded-lg shadow-xl animate-bounce"
                                    style={{
                                        top: `${20 + index * 15}%`,
                                        left: `${30 + index * 10}%`,
                                        animationDelay: `${index * 0.2}s`,
                                        animationDuration: '2s',
                                    }}
                                >
                                    <MapPin className="text-green-600 mb-2" size={32} />
                                    <p className="font-semibold text-sm">{land.name}</p>
                                    <p className="text-xs text-gray-500">{land.area} هکتار</p>
                                </div>
                            ))}
                            <div className="relative z-10 text-center">
                                <p className="text-gray-500 text-lg mb-4">🗺️ نقشه تعاملی زمین‌ها</p>
                                <p className="text-sm text-gray-400">برای نمایش نقشه واقعی، از API های نقشه استفاده کنید</p>
                            </div>
                        </div>
                    </Card>
                )
            ) : (
                <div className="animate-fadeIn">
                    <Empty
                        description={
                            <div>
                                <p className="text-gray-500 text-lg mb-2">هنوز هیچ زمینی ثبت نکرده‌اید</p>
                                <p className="text-sm text-gray-400">برای شروع، زمین اول خود را اضافه کنید</p>
                            </div>
                        }
                        className="bg-white p-12 rounded-2xl shadow-lg"
                    />
                </div>
            )}

            {/* Modal افزودن زمین */}
            <Modal
                title={
                    <span className="text-lg font-semibold text-gray-800">
                        ➕ افزودن زمین جدید
                    </span>
                }
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={600}
                className="animate-fadeIn"
            >
                <Form form={form} layout="vertical" onFinish={handleAddLand} className="mt-4">
                    <Form.Item
                        name="name"
                        label="نام زمین"
                        rules={[{ required: true, message: "لطفا نام زمین را وارد کنید" }]}
                    >
                        <Input placeholder="مثلاً زمین شمالی" size="large" />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="area"
                            label="مساحت (هکتار)"
                            rules={[{ required: true, message: "مساحت را وارد کنید" }]}
                        >
                            <InputNumber className="w-full" min={0.1} step={0.1} placeholder="۲.۵" size="large" />
                        </Form.Item>

                        <Form.Item
                            name="crop"
                            label="نوع محصول"
                            rules={[{ required: true, message: "محصول را انتخاب کنید" }]}
                        >
                            <Select placeholder="انتخاب محصول" size="large">
                                <Option value="گندم">🌾 گندم</Option>
                                <Option value="برنج">🌾 برنج</Option>
                                <Option value="جو">🌾 جو</Option>
                                <Option value="ذرت">🌽 ذرت</Option>
                                <Option value="زعفران">🌸 زعفران</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item name="location" label="موقعیت زمین">
                        <Input placeholder="مثلاً خراسان رضوی، تربت حیدریه" size="large" prefix={<EnvironmentOutlined />} />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item name="plantDate" label="تاریخ کاشت">
                            <Input placeholder="1403/01/15" size="large" />
                        </Form.Item>

                        <Form.Item name="harvestDate" label="تاریخ برداشت">
                            <Input placeholder="1403/06/20" size="large" />
                        </Form.Item>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button onClick={() => setIsModalOpen(false)} size="large">
                            انصراف
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-gradient-to-r from-green-500 to-green-600"
                            size="large"
                        >
                            ذخیره زمین
                        </Button>
                    </div>
                </Form>
            </Modal>

            {/* Modal جزئیات */}
            <Modal
                title={<span className="text-lg font-semibold">📊 جزئیات زمین</span>}
                open={!!selectedLand}
                onCancel={() => setSelectedLand(null)}
                footer={null}
                width={700}
            >
                {selectedLand && (
                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedLand.name}</h3>
                            <p className="text-gray-600">{selectedLand.crop} - {selectedLand.area} هکتار</p>
                        </div>
                        <p className="text-gray-500">نقشه و اطلاعات دقیق‌تر در اینجا نمایش داده می‌شود...</p>
                    </div>
                )}
            </Modal>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
                .animate-slideUp { animation: slideUp 0.6s ease-out; }
                .animate-scaleIn { animation: scaleIn 0.4s ease-out; }
            `}</style>
        </div>
    );
};