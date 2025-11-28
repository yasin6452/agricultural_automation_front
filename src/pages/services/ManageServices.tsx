// src/pages/services/ManageServices.tsx
import { useState } from "react";
import {
    Plus,
    Filter,
    Edit,
    Trash2,
    Eye,
    Package,
    MapPin,
    DollarSign,
    Clock,
    Activity,
    MoreVertical,
    Save,
    X
} from "lucide-react";
import { Badge, Input, Select, Dropdown, Button, Modal, Switch, Card, Tag, Form, message } from "antd";
import type { MenuProps } from "antd";

const { Option } = Select;
const { Search: SearchInput } = Input;
const { TextArea } = Input;

// خدمات قابل ارائه توسط این شرکت/فرد
interface MyService {
    id: number;
    name: string;                    // نام خدمت
    category: string;               // دسته‌بندی
    description: string;            // توضیحات خدمت
    pricingModel: 'per_hectare' | 'per_tree' | 'per_hour' | 'per_project' | 'per_kg';
    basePrice: number;              // قیمت پایه برای محاسبه
    unit: string;                   // واحد محاسبه ("هکتار", "درخت", "ساعت")
    minOrder: number;               // حداقل سفارش
    estimatedDuration: string;      // مدت زمان تخمینی
    serviceAreas: string[];         // مناطق تحت پوشش
    requirements: string[];         // نیازمندی‌ها
    isActive: boolean;              // فعال/غیرفعال
    totalRequests: number;          // تعداد درخواست‌های دریافتی
    successRate: number;            // درصد موفقیت (پروژه‌های انجام شده)
}

// فرم جدید برای افزودن خدمت
interface NewServiceForm {
    name: string;
    category: string;
    description: string;
    pricingModel: 'per_hectare' | 'per_tree' | 'per_hour' | 'per_project' | 'per_kg';
    basePrice: number;
    unit: string;
    minOrder: number;
    estimatedDuration: string;
    serviceAreas: string[];
    requirements: string[];
}

export default function ManageServices() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [editingService, setEditingService] = useState<MyService | null>(null);
    const [form] = Form.useForm();

    // خدمات قابل ارائه توسط این شرکت
    const [myServices, setMyServices] = useState<MyService[]>([
        {
            id: 1,
            name: "سم‌پاشی ارگانیک",
            category: "مبارزه با آفات",
            description: "سم‌پاشی باغ و مزرعه با استفاده از مواد ارگانیک و بی‌خطر برای محیط زیست",
            pricingModel: "per_hectare",
            basePrice: 2500000,
            unit: "هکتار",
            minOrder: 0.5,
            estimatedDuration: "3-4 ساعت در هکتار",
            serviceAreas: ["تهران", "البرز", "قم", "کرج"],
            requirements: ["دسترسی به آب", "هماهنگی 24 ساعته قبل"],
            isActive: true,
            totalRequests: 15,
            successRate: 92
        },
        {
            id: 2,
            name: "هرس تخصصی درختان میوه",
            category: "باغداری",
            description: "هرس اصولی درختان میوه با رعایت اصول باغداری و افزایش باردهی",
            pricingModel: "per_tree",
            basePrice: 15000,
            unit: "درخت",
            minOrder: 10,
            estimatedDuration: "2-3 دقیقه per درخت",
            serviceAreas: ["تهران", "البرز", "شمال"],
            requirements: ["دسترسی به درختان", "نردبان مناسب"],
            isActive: true,
            totalRequests: 8,
            successRate: 88
        },
        {
            id: 3,
            name: "نصب سیستم آبیاری قطره‌ای",
            category: "آبیاری",
            description: "طراحی و نصب سیستم آبیاری قطره‌ای هوشمند با قابلیت کنترل از راه دور",
            pricingModel: "per_project",
            basePrice: 5000000,
            unit: "پروژه",
            minOrder: 1,
            estimatedDuration: "2-3 روز",
            serviceAreas: ["تهران", "البرز", "مرکزی"],
            requirements: ["منبع آب", "دسترسی برق", "طرح اولیه"],
            isActive: true,
            totalRequests: 5,
            successRate: 95
        }
    ]);

    const categories = [
        "همه دسته‌بندی‌ها",
        "مبارزه با آفات",
        "باغداری",
        "آبیاری",
        "خاک‌شناسی",
        "مکانیزاسیون",
        "حمل و نقل",
        "بسته‌بندی",
        "انبارداری",
        "مشاوره"
    ];

    const serviceAreasOptions = [
        "تهران", "البرز", "قم", "کرج", "شمال", "مرکزی",
        "اصفهان", "شیراز", "مشهد", "تبریز", "سراسر کشور"
    ];

    const requirementsOptions = [
        "دسترسی به آب",
        "دسترسی برق",
        "هماهنگی 24 ساعته قبل",
        "نردبان مناسب",
        "زمین هموار",
        "دسترسی جاده‌ای",
        "منبع آب",
        "طرح اولیه",
        "نمونه خاک",
        "سابقه کشت"
    ];

    const getStatusColor = (status: boolean) => {
        return status
            ? 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/50 dark:text-green-300'
            : 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/50 dark:text-red-300';
    };

    const getStatusText = (status: boolean) => {
        return status ? 'فعال' : 'غیرفعال';
    };

    const getPricingModelText = (model: string) => {
        switch (model) {
            case 'per_hectare': return 'بر اساس هکتار';
            case 'per_tree': return 'بر اساس تعداد درخت';
            case 'per_hour': return 'ساعتی';
            case 'per_project': return 'پروژه‌ای';
            case 'per_kg': return 'بر اساس وزن';
            default: return 'سفارشی';
        }
    };

    const getPriceExample = (service: MyService) => {
        switch (service.pricingModel) {
            case 'per_hectare':
                return `${service.basePrice.toLocaleString()} تومان per هکتار`;
            case 'per_tree':
                return `${service.basePrice.toLocaleString()} تومان per درخت`;
            case 'per_hour':
                return `${service.basePrice.toLocaleString()} تومان per ساعت`;
            case 'per_project':
                return `از ${service.basePrice.toLocaleString()} تومان`;
            default:
                return `${service.basePrice.toLocaleString()} تومان`;
        }
    };

    const getUnitByPricingModel = (pricingModel: string) => {
        switch (pricingModel) {
            case 'per_hectare': return 'هکتار';
            case 'per_tree': return 'درخت';
            case 'per_hour': return 'ساعت';
            case 'per_project': return 'پروژه';
            case 'per_kg': return 'کیلوگرم';
            default: return 'واحد';
        }
    };

    const filteredServices = myServices.filter(service => {
        const matchesSearch = service.name.includes(searchTerm) ||
            service.description.includes(searchTerm) ||
            service.category.includes(searchTerm);
        const matchesCategory = categoryFilter === 'all' || categoryFilter === 'همه دسته‌بندی‌ها' || service.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'active' && service.isActive) ||
            (statusFilter === 'inactive' && !service.isActive);

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const handleStatusToggle = (serviceId: number, newStatus: boolean) => {
        setMyServices(prev => prev.map(service =>
            service.id === serviceId ? { ...service, isActive: newStatus } : service
        ));
        message.success(newStatus ? 'خدمت فعال شد' : 'خدمت غیرفعال شد');
    };

    const handleEditService = (service: MyService) => {
        setEditingService(service);
        setIsEditModalVisible(true);
    };

    const handleDeleteService = (serviceId: number) => {
        setMyServices(prev => prev.filter(service => service.id !== serviceId));
        message.success('خدمت با موفقیت حذف شد');
    };

    const handleAddNewService = () => {
        form.resetFields();
        setIsAddModalVisible(true);
    };

    const handleSaveNewService = async (values: any) => {
        try {
            const newService: MyService = {
                id: Math.max(...myServices.map(s => s.id), 0) + 1,
                name: values.name,
                category: values.category,
                description: values.description,
                pricingModel: values.pricingModel,
                basePrice: values.basePrice,
                unit: getUnitByPricingModel(values.pricingModel),
                minOrder: values.minOrder,
                estimatedDuration: values.estimatedDuration,
                serviceAreas: values.serviceAreas || [],
                requirements: values.requirements || [],
                isActive: true,
                totalRequests: 0,
                successRate: 0
            };

            setMyServices(prev => [...prev, newService]);
            setIsAddModalVisible(false);
            form.resetFields();
            message.success('خدمت جدید با موفقیت اضافه شد');
        } catch (error) {
            message.error('خطا در افزودن خدمت جدید');
        }
    };

    const handleUpdateService = async (values: any) => {
        if (!editingService) return;

        try {
            const updatedService: MyService = {
                ...editingService,
                name: values.name,
                category: values.category,
                description: values.description,
                pricingModel: values.pricingModel,
                basePrice: values.basePrice,
                unit: getUnitByPricingModel(values.pricingModel),
                minOrder: values.minOrder,
                estimatedDuration: values.estimatedDuration,
                serviceAreas: values.serviceAreas || [],
                requirements: values.requirements || []
            };

            setMyServices(prev => prev.map(service =>
                service.id === editingService.id ? updatedService : service
            ));

            setIsEditModalVisible(false);
            setEditingService(null);
            message.success('خدمت با موفقیت ویرایش شد');
        } catch (error) {
            message.error('خطا در ویرایش خدمت');
        }
    };

    const cardClass = "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg";
    const textClass = "text-gray-600 dark:text-gray-300";
    const titleClass = "text-gray-800 dark:text-white";

    const createMenuItems = (service: MyService): MenuProps['items'] => [
        {
            key: 'edit',
            label: 'ویرایش خدمت',
            icon: <Edit size={14} />,
            onClick: () => handleEditService(service)
        },
        {
            key: 'toggle',
            label: service.isActive ? 'غیرفعال کردن' : 'فعال کردن',
            icon: <Activity size={14} />,
            onClick: () => handleStatusToggle(service.id, !service.isActive)
        },
        { type: 'divider' },
        {
            key: 'delete',
            label: 'حذف خدمت',
            icon: <Trash2 size={14} />,
            danger: true,
            onClick: () => handleDeleteService(service.id)
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 font-[IRANSans] transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* هدر */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                                    <Package className="text-white" size={24} />
                                </div>
                                خدمات قابل ارائه من
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                مدیریت خدمات و تعرفه‌های قابل ارائه به کشاورزان
                            </p>
                        </div>
                        <Button
                            type="primary"
                            className="bg-orange-500 hover:bg-orange-600 border-orange-500 h-12 px-6 font-medium flex items-center gap-2"
                            size="large"
                            icon={<Plus size={18} />}
                            onClick={handleAddNewService}
                        >
                            افزودن خدمت جدید
                        </Button>
                    </div>

                    {/* آمار سریع */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {[
                            {
                                title: "کل خدمات",
                                value: myServices.length,
                                color: "bg-blue-500",
                                icon: Package
                            },
                            {
                                title: "خدمات فعال",
                                value: myServices.filter(s => s.isActive).length,
                                color: "bg-green-500",
                                icon: Activity
                            },
                            {
                                title: "درخواست‌های دریافتی",
                                value: myServices.reduce((acc, s) => acc + s.totalRequests, 0),
                                color: "bg-orange-500",
                                icon: Eye
                            },
                            {
                                title: "میانگین موفقیت",
                                value: `${Math.round(myServices.reduce((acc, s) => acc + s.successRate, 0) / myServices.length)}%`,
                                color: "bg-purple-500",
                                icon: DollarSign
                            },
                        ].map((stat, idx) => (
                            <div key={idx} className={`rounded-2xl p-4 shadow-lg border transition-all ${cardClass}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className={`text-sm ${textClass}`}>{stat.title}</div>
                                        <div className={`text-lg font-bold ${titleClass}`}>{stat.value}</div>
                                    </div>
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} bg-opacity-10`}>
                                        <stat.icon className={stat.color.replace('bg-', 'text-')} size={24} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* فیلتر و جستجو */}
                <div className={`p-6 mb-6 ${cardClass}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                            <SearchInput
                                placeholder="جستجو در خدمات..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full"
                                size="large"
                            />
                        </div>
                        <Select
                            value={categoryFilter}
                            onChange={setCategoryFilter}
                            className="w-full"
                            size="large"
                            suffixIcon={<Filter size={16} />}
                            placeholder="دسته‌بندی"
                            defaultValue="all"
                        >
                            {categories.map(category => (
                                <Option key={category} value={category}>{category}</Option>
                            ))}
                        </Select>
                        <Select
                            value={statusFilter}
                            onChange={setStatusFilter}
                            className="w-full"
                            size="large"
                            suffixIcon={<Filter size={16} />}
                            placeholder="وضعیت"
                            defaultValue="all"
                        >
                            <Option value="all">همه وضعیت‌ها</Option>
                            <Option value="active">فعال</Option>
                            <Option value="inactive">غیرفعال</Option>
                        </Select>
                    </div>
                </div>

                {/* لیست خدمات */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                            خدمات من ({filteredServices.length})
                        </h2>
                        <Badge
                            count={filteredServices.length}
                            className="bg-orange-500"
                            showZero
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredServices.map((service) => (
                            <Card
                                key={service.id}
                                className={`rounded-2xl overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${service.isActive
                                        ? 'hover:border-orange-300 dark:hover:border-orange-500'
                                        : 'opacity-70 grayscale'
                                    }`}
                                bodyStyle={{ padding: 0 }}
                            >
                                <div className="relative">
                                    {/* وضعیت خدمت */}
                                    <div className="absolute top-3 left-3 z-10">
                                        <Badge
                                            className={getStatusColor(service.isActive)}
                                            count={getStatusText(service.isActive)}
                                        />
                                    </div>

                                    {/* منوی عملیات */}
                                    <div className="absolute top-3 right-3 z-10">
                                        <Dropdown
                                            menu={{ items: createMenuItems(service) }}
                                            trigger={['click']}
                                            placement="bottomRight"
                                        >
                                            <Button
                                                type="text"
                                                icon={<MoreVertical size={16} />}
                                                className="text-gray-500 hover:text-orange-500 bg-white bg-opacity-90"
                                            />
                                        </Dropdown>
                                    </div>

                                    {/* هدر کارت */}
                                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 border-b border-orange-200 dark:border-orange-700">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                                                <Package className="text-white" size={24} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-800 dark:text-white text-lg">
                                                    {service.name}
                                                </h3>
                                                <p className="text-orange-600 dark:text-orange-400 text-sm">
                                                    {service.category}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                                            {service.description}
                                        </p>
                                    </div>

                                    {/* بدنه کارت */}
                                    <div className="p-4">
                                        {/* اطلاعات قیمت‌گذاری */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <DollarSign size={16} className="text-green-500" />
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        {getPricingModelText(service.pricingModel)}
                                                    </span>
                                                </div>
                                                <div className="text-left">
                                                    <span className="font-bold text-orange-600 dark:text-orange-400 text-lg">
                                                        {getPriceExample(service)}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={12} />
                                                    <span>{service.estimatedDuration}</span>
                                                </div>
                                                <div>
                                                    حداقل سفارش: {service.minOrder} {service.unit}
                                                </div>
                                            </div>
                                        </div>

                                        {/* مناطق تحت پوشش */}
                                        <div className="mb-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <MapPin size={14} className="text-blue-500" />
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    مناطق تحت پوشش
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {service.serviceAreas.slice(0, 2).map((area, idx) => (
                                                    <Tag key={idx} color="blue" className="text-xs">
                                                        {area}
                                                    </Tag>
                                                ))}
                                                {service.serviceAreas.length > 2 && (
                                                    <Tag className="text-xs">
                                                        +{service.serviceAreas.length - 2}
                                                    </Tag>
                                                )}
                                            </div>
                                        </div>

                                        {/* آمار عملکرد */}
                                        <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-3">
                                            <div className="text-center">
                                                <div className="text-sm font-bold text-gray-800 dark:text-white">
                                                    {service.totalRequests}
                                                </div>
                                                <div className="text-xs text-gray-500">درخواست</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm font-bold text-green-500">
                                                    {service.successRate}%
                                                </div>
                                                <div className="text-xs text-gray-500">موفقیت</div>
                                            </div>
                                        </div>

                                        {/* سوئیچ فعال/غیرفعال */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                                وضعیت خدمت:
                                            </span>
                                            <Switch
                                                checked={service.isActive}
                                                onChange={(checked) => handleStatusToggle(service.id, checked)}
                                                className={service.isActive ? '' : 'opacity-50'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {filteredServices.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">
                                هیچ خدمتی یافت نشد
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm">
                                سعی کنید فیلترها را تغییر دهید یا خدمت جدیدی اضافه کنید
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal افزودن خدمت جدید */}
                <Modal
                    title={
                        <div className="flex items-center gap-2">
                            <Plus size={20} className="text-green-500" />
                            <span>افزودن خدمت جدید</span>
                        </div>
                    }
                    open={isAddModalVisible}
                    onCancel={() => setIsAddModalVisible(false)}
                    footer={null}
                    width={700}
                    centered
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSaveNewService}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                                label="نام خدمت"
                                name="name"
                                rules={[{ required: true, message: 'نام خدمت الزامی است' }]}
                            >
                                <Input placeholder="مثال: سم‌پاشی ارگانیک" size="large" />
                            </Form.Item>

                            <Form.Item
                                label="دسته‌بندی"
                                name="category"
                                rules={[{ required: true, message: 'دسته‌بندی الزامی است' }]}
                            >
                                <Select placeholder="انتخاب دسته‌بندی" size="large">
                                    {categories.filter(cat => !cat.includes('همه')).map(category => (
                                        <Option key={category} value={category}>{category}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>

                        <Form.Item
                            label="توضیحات خدمت"
                            name="description"
                            rules={[{ required: true, message: 'توضیحات خدمت الزامی است' }]}
                        >
                            <TextArea
                                rows={3}
                                placeholder="شرح کامل خدمت و مزایای آن..."
                                size="large"
                            />
                        </Form.Item>

                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                                label="مدل قیمت‌گذاری"
                                name="pricingModel"
                                rules={[{ required: true, message: 'مدل قیمت‌گذاری الزامی است' }]}
                            >
                                <Select placeholder="انتخاب مدل قیمت‌گذاری" size="large">
                                    <Option value="per_hectare">بر اساس هکتار</Option>
                                    <Option value="per_tree">بر اساس تعداد درخت</Option>
                                    <Option value="per_hour">ساعتی</Option>
                                    <Option value="per_project">پروژه‌ای</Option>
                                    <Option value="per_kg">بر اساس وزن</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="قیمت پایه (تومان)"
                                name="basePrice"
                                rules={[{ required: true, message: 'قیمت پایه الزامی است' }]}
                            >
                                <Input
                                    type="number"
                                    placeholder="مثال: 2500000"
                                    size="large"
                                />
                            </Form.Item>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                                label="حداقل سفارش"
                                name="minOrder"
                                rules={[{ required: true, message: 'حداقل سفارش الزامی است' }]}
                            >
                                <Input
                                    type="number"
                                    placeholder="مثال: 0.5"
                                    step="0.1"
                                    size="large"
                                />
                            </Form.Item>

                            <Form.Item
                                label="مدت زمان تخمینی"
                                name="estimatedDuration"
                                rules={[{ required: true, message: 'مدت زمان الزامی است' }]}
                            >
                                <Input
                                    placeholder="مثال: 3-4 ساعت در هکتار"
                                    size="large"
                                />
                            </Form.Item>
                        </div>

                        <Form.Item
                            label="مناطق تحت پوشش"
                            name="serviceAreas"
                        >
                            <Select
                                mode="multiple"
                                placeholder="مناطق تحت پوشش را انتخاب کنید"
                                size="large"
                            >
                                {serviceAreasOptions.map(area => (
                                    <Option key={area} value={area}>{area}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="نیازمندی‌های اجرا"
                            name="requirements"
                        >
                            <Select
                                mode="multiple"
                                placeholder="نیازمندی‌ها را انتخاب کنید"
                                size="large"
                            >
                                {requirementsOptions.map(req => (
                                    <Option key={req} value={req}>{req}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <Button
                                onClick={() => setIsAddModalVisible(false)}
                                icon={<X size={16} />}
                                size="large"
                            >
                                انصراف
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<Save size={16} />}
                                size="large"
                                className="bg-green-500 hover:bg-green-600 border-green-500"
                            >
                                ذخیره خدمت
                            </Button>
                        </div>
                    </Form>
                </Modal>

                {/* Modal ویرایش خدمت */}
                <Modal
                    title={
                        <div className="flex items-center gap-2">
                            <Edit size={20} className="text-orange-500" />
                            <span>ویرایش خدمت</span>
                        </div>
                    }
                    open={isEditModalVisible}
                    onCancel={() => {
                        setIsEditModalVisible(false);
                        setEditingService(null);
                    }}
                    footer={null}
                    width={700}
                    centered
                >
                    {editingService && (
                        <Form
                            layout="vertical"
                            onFinish={handleUpdateService}
                            initialValues={{
                                name: editingService.name,
                                category: editingService.category,
                                description: editingService.description,
                                pricingModel: editingService.pricingModel,
                                basePrice: editingService.basePrice,
                                minOrder: editingService.minOrder,
                                estimatedDuration: editingService.estimatedDuration,
                                serviceAreas: editingService.serviceAreas,
                                requirements: editingService.requirements
                            }}
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item
                                    label="نام خدمت"
                                    name="name"
                                    rules={[{ required: true, message: 'نام خدمت الزامی است' }]}
                                >
                                    <Input size="large" />
                                </Form.Item>

                                <Form.Item
                                    label="دسته‌بندی"
                                    name="category"
                                    rules={[{ required: true, message: 'دسته‌بندی الزامی است' }]}
                                >
                                    <Select size="large">
                                        {categories.filter(cat => !cat.includes('همه')).map(category => (
                                            <Option key={category} value={category}>{category}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>

                            <Form.Item
                                label="توضیحات خدمت"
                                name="description"
                                rules={[{ required: true, message: 'توضیحات خدمت الزامی است' }]}
                            >
                                <TextArea rows={3} size="large" />
                            </Form.Item>

                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item
                                    label="مدل قیمت‌گذاری"
                                    name="pricingModel"
                                    rules={[{ required: true, message: 'مدل قیمت‌گذاری الزامی است' }]}
                                >
                                    <Select size="large">
                                        <Option value="per_hectare">بر اساس هکتار</Option>
                                        <Option value="per_tree">بر اساس تعداد درخت</Option>
                                        <Option value="per_hour">ساعتی</Option>
                                        <Option value="per_project">پروژه‌ای</Option>
                                        <Option value="per_kg">بر اساس وزن</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="قیمت پایه (تومان)"
                                    name="basePrice"
                                    rules={[{ required: true, message: 'قیمت پایه الزامی است' }]}
                                >
                                    <Input type="number" size="large" />
                                </Form.Item>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item
                                    label="حداقل سفارش"
                                    name="minOrder"
                                    rules={[{ required: true, message: 'حداقل سفارش الزامی است' }]}
                                >
                                    <Input type="number" step="0.1" size="large" />
                                </Form.Item>

                                <Form.Item
                                    label="مدت زمان تخمینی"
                                    name="estimatedDuration"
                                    rules={[{ required: true, message: 'مدت زمان الزامی است' }]}
                                >
                                    <Input size="large" />
                                </Form.Item>
                            </div>

                            <Form.Item
                                label="مناطق تحت پوشش"
                                name="serviceAreas"
                            >
                                <Select
                                    mode="multiple"
                                    size="large"
                                >
                                    {serviceAreasOptions.map(area => (
                                        <Option key={area} value={area}>{area}</Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="نیازمندی‌های اجرا"
                                name="requirements"
                            >
                                <Select
                                    mode="multiple"
                                    size="large"
                                >
                                    {requirementsOptions.map(req => (
                                        <Option key={req} value={req}>{req}</Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <Button
                                    onClick={() => setIsEditModalVisible(false)}
                                    icon={<X size={16} />}
                                    size="large"
                                >
                                    انصراف
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<Save size={16} />}
                                    size="large"
                                    className="bg-orange-500 hover:bg-orange-600 border-orange-500"
                                >
                                    بروزرسانی خدمت
                                </Button>
                            </div>
                        </Form>
                    )}
                </Modal>
            </div>
        </div>
    );
}