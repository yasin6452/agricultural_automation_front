import { useState } from "react";
import {
    Card,
    Table,
    Button,
    Modal,
    Form,
    Input,
    InputNumber,
    Select,
    message,
    Tabs,
    Tag,
    Space,
    Avatar,
    Badge,
    Statistic,
    Upload,
    Image,
    Tooltip,
    Alert,
    Divider,
} from "antd";
import {
    PlusOutlined,
    ShoppingCartOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    MessageOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    StarFilled,
    CheckCircleOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";
import { Package,  ShoppingBag, FileText, Send } from "lucide-react";

const { Option } = Select;
const { TextArea } = Input;

// ============ INTERFACES ============
interface MyProduct {
    id: number;
    name: string;
    landId: number;
    landName: string;
    quantity: number;
    unit: string;
    price: number;
    marketPrice: number;
    quality: string;
    organic: boolean;
    images: string[];
    description: string;
    harvestDate: string;
    location: string;
    status: "available" | "reserved" | "sold";
    views: number;
    interested: number;
    createdAt: string;
}

interface MarketProduct {
    id: number;
    sellerId: number;
    sellerName: string;
    sellerAvatar?: string;
    sellerRating: number;
    name: string;
    quantity: number;
    unit: string;
    price: number;
    quality: string;
    organic: boolean;
    images: string[];
    description: string;
    location: string;
    harvestDate: string;
    views: number;
}

interface BuyRequest {
    id: number;
    buyerId: number;
    buyerName: string;
    buyerType: "factory" | "wholesaler" | "retailer";
    productName: string;
    quantity: number;
    unit: string;
    maxPrice: number;
    quality: string;
    location: string;
    deliveryDate: string;
    description: string;
    status: "open" | "closed";
    proposals: number;
    createdAt: string;
}



export const Marketplace = () => {
    const [activeTab, setActiveTab] = useState("my-products");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<BuyRequest | null>(null);
    const [form] = Form.useForm();
    const [proposalForm] = Form.useForm();

    // ============ MY PRODUCTS DATA ============
    const [myProducts, setMyProducts] = useState<MyProduct[]>([
        {
            id: 1,
            name: "گندم",
            landId: 1,
            landName: "زمین شمالی",
            quantity: 10,
            unit: "تن",
            price: 500000,
            marketPrice: 520000,
            quality: "درجه یک",
            organic: true,
            images: ["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400"],
            description: "گندم مرغوب با کیفیت عالی، ارگانیک و دارای گواهینامه",
            harvestDate: "1403/06/20",
            location: "گیلان، فومن",
            status: "available",
            views: 145,
            interested: 5,
            createdAt: "1403/07/01",
        },
        {
            id: 2,
            name: "برنج",
            landId: 2,
            landName: "زمین جنوبی",
            quantity: 5,
            unit: "تن",
            price: 1200000,
            marketPrice: 1150000,
            quality: "درجه یک",
            organic: false,
            images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"],
            description: "برنج طارم معطر، کیفیت بالا",
            harvestDate: "1403/08/15",
            location: "مازندران، بابل",
            status: "reserved",
            views: 89,
            interested: 8,
            createdAt: "1403/08/10",
        },
    ]);

    // ============ MARKET PRODUCTS DATA ============
    const [marketProducts] = useState<MarketProduct[]>([
        {
            id: 101,
            sellerId: 2,
            sellerName: "محمد احمدی",
            sellerAvatar: "https://i.pravatar.cc/150?img=12",
            sellerRating: 4.5,
            name: "ذرت",
            quantity: 15,
            unit: "تن",
            price: 380000,
            quality: "درجه یک",
            organic: false,
            images: ["https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400"],
            description: "ذرت دامی با کیفیت عالی",
            location: "خراسان رضوی، مشهد",
            harvestDate: "1403/07/10",
            views: 234,
        },
        {
            id: 102,
            sellerId: 3,
            sellerName: "حسن رضایی",
            sellerAvatar: "https://i.pravatar.cc/150?img=33",
            sellerRating: 4.8,
            name: "پیاز",
            quantity: 8,
            unit: "تن",
            price: 250000,
            quality: "درجه یک",
            organic: true,
            images: ["https://images.unsplash.com/photo-1587049352846-4a222e784720?w=400"],
            description: "پیاز قرمز ارگانیک",
            location: "آذربایجان شرقی، تبریز",
            harvestDate: "1403/06/25",
            views: 178,
        },
    ]);

    // ============ BUY REQUESTS DATA ============
    const [buyRequests] = useState<BuyRequest[]>([
        {
            id: 201,
            buyerId: 10,
            buyerName: "کارخانه روغن پاک",
            buyerType: "factory",
            productName: "پیاز قرمز",
            quantity: 100,
            unit: "تن",
            maxPrice: 280000,
            quality: "درجه یک و دو",
            location: "تهران",
            deliveryDate: "1403/09/01",
            description: "نیاز به 100 تن پیاز قرمز برای تولید رب. ترجیحاً از استان‌های شمالی",
            status: "open",
            proposals: 12,
            createdAt: "1403/08/20",
        },
        {
            id: 202,
            buyerId: 11,
            buyerName: "شرکت توزیع غله",
            buyerType: "wholesaler",
            productName: "گندم",
            quantity: 50,
            unit: "تن",
            maxPrice: 530000,
            quality: "درجه یک",
            location: "کرج",
            deliveryDate: "1403/08/30",
            description: "خرید گندم درجه یک با قیمت مناسب",
            status: "open",
            proposals: 8,
            createdAt: "1403/08/18",
        },
        {
            id: 203,
            buyerId: 12,
            buyerName: "مجتمع تجاری میوه و تره‌بار",
            buyerType: "retailer",
            productName: "سیب زمینی",
            quantity: 20,
            unit: "تن",
            maxPrice: 180000,
            quality: "درجه یک",
            location: "اصفهان",
            deliveryDate: "1403/08/28",
            description: "نیاز فوری به سیب‌زمینی درشت و تمیز",
            status: "open",
            proposals: 15,
            createdAt: "1403/08/22",
        },
    ]);

    // ============ HANDLERS ============
    const handleAddProduct = async () => {
        try {
            const values = await form.validateFields();
            const newProduct: MyProduct = {
                id: Date.now(),
                ...values,
                status: "available",
                views: 0,
                interested: 0,
                createdAt: new Date().toLocaleDateString("fa-IR"),
            };
            setMyProducts([newProduct, ...myProducts]);
            message.success("آگهی با موفقیت ثبت شد!");
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteProduct = (id: number) => {
        setMyProducts(myProducts.filter(p => p.id !== id));
        message.success("آگهی حذف شد!");
    };

    const handleSubmitProposal = async () => {
        try {
            message.success("پیشنهاد شما با موفقیت ارسال شد!");
            setIsProposalModalOpen(false);
            proposalForm.resetFields();
        } catch (error) {
            console.error(error);
        }
    };

    const getBuyerTypeConfig = (type: string) => {
        const configs = {
            factory: { label: "کارخانه", color: "blue", icon: "🏭" },
            wholesaler: { label: "عمده‌فروش", color: "green", icon: "🏪" },
            retailer: { label: "خرده‌فروش", color: "orange", icon: "🛒" },
        };
        return configs[type as keyof typeof configs];
    };

    // ============ STATS ============
    const stats = {
        myProducts: myProducts.length,
        available: myProducts.filter(p => p.status === "available").length,
        totalViews: myProducts.reduce((sum, p) => sum + p.views, 0),
        totalInterested: myProducts.reduce((sum, p) => sum + p.interested, 0),
    };

    // ============ COLUMNS ============
    const myProductsColumns = [
        {
            title: "محصول",
            key: "product",
            width: 250,
            render: (record: MyProduct) => (
                <div className="flex items-center gap-3">
                    <Image
                        src={record.images[0]}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                        preview={false}
                    />
                    <div>
                        <div className="font-semibold text-gray-800">{record.name}</div>
                        <div className="text-xs text-gray-500">{record.landName}</div>
                        {record.organic && (
                            <Tag color="green" className="mt-1">🌿 ارگانیک</Tag>
                        )}
                    </div>
                </div>
            ),
        },
        {
            title: "مقدار",
            key: "quantity",
            render: (record: MyProduct) => (
                <span className="font-semibold">{record.quantity} {record.unit}</span>
            ),
        },
        {
            title: "قیمت",
            key: "price",
            render: (record: MyProduct) => (
                <div>
                    <div className="font-bold text-green-600">
                        {record.price.toLocaleString()} تومان
                    </div>
                    <div className="text-xs text-gray-500">
                        بازار: {record.marketPrice.toLocaleString()}
                    </div>
                </div>
            ),
        },
        {
            title: "وضعیت",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                const configs = {
                    available: { label: "موجود", color: "green" },
                    reserved: { label: "رزرو شده", color: "orange" },
                    sold: { label: "فروخته شده", color: "red" },
                };
                const config = configs[status as keyof typeof configs];
                return <Tag color={config.color}>{config.label}</Tag>;
            },
        },
        {
            title: "آمار",
            key: "stats",
            render: (record: MyProduct) => (
                <Space direction="vertical" size="small">
                    <div className="text-xs">👁️ {record.views} بازدید</div>
                    <div className="text-xs">💬 {record.interested} علاقه‌مند</div>
                </Space>
            ),
        },
        {
            title: "عملیات",
            key: "actions",
            fixed: 'right' as const,
            render: (record: MyProduct) => (
                <Space>
                    <Tooltip title="مشاهده">
                        <Button type="text" icon={<EyeOutlined />} />
                    </Tooltip>
                    <Tooltip title="ویرایش">
                        <Button type="text" icon={<EditOutlined />} className="text-blue-600" />
                    </Tooltip>
                    <Tooltip title="حذف">
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            danger
                            onClick={() => handleDeleteProduct(record.id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    // ============ RENDER ============
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {/* Header */}
            <div className="mb-6 animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                <ShoppingBag className="text-white" size={24} />
                            </div>
                            بازار کشاورزی
                        </h1>
                        <p className="text-gray-500 mt-2">خرید و فروش محصولات کشاورزی</p>
                    </div>
                </div>

                {/* آمار کلی */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="shadow-md hover:shadow-lg transition-all">
                        <Statistic
                            title="آگهی‌های من"
                            value={stats.myProducts}
                            prefix={<Package size={20} />}
                            valueStyle={{ color: '#3b82f6' }}
                        />
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-all">
                        <Statistic
                            title="موجود"
                            value={stats.available}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#22c55e' }}
                        />
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-all">
                        <Statistic
                            title="بازدیدها"
                            value={stats.totalViews}
                            prefix={<EyeOutlined />}
                            valueStyle={{ color: '#f59e0b' }}
                        />
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-all">
                        <Statistic
                            title="علاقه‌مندی‌ها"
                            value={stats.totalInterested}
                            prefix={<StarFilled />}
                            valueStyle={{ color: '#ec4899' }}
                        />
                    </Card>
                </div>
            </div>

            {/* Tabs */}
            <Card className="shadow-lg rounded-2xl">
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={[
                        {
                            key: "my-products",
                            label: (
                                <span className="flex items-center gap-2">
                                    <Package size={18} />
                                    محصولات من ({myProducts.length})
                                </span>
                            ),
                            children: (
                                <div>
                                    <Button
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        onClick={() => setIsModalOpen(true)}
                                        className="mb-4 bg-gradient-to-r from-green-500 to-green-600"
                                        size="large"
                                    >
                                        ثبت آگهی جدید
                                    </Button>
                                    <Table
                                        columns={myProductsColumns}
                                        dataSource={myProducts}
                                        rowKey="id"
                                        pagination={{ pageSize: 10 }}
                                        scroll={{ x: 1000 }}
                                    />
                                </div>
                            ),
                        },
                        {
                            key: "market",
                            label: (
                                <span className="flex items-center gap-2">
                                    <ShoppingCartOutlined />
                                    بازار محصولات ({marketProducts.length})
                                </span>
                            ),
                            children: (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {marketProducts.map((product) => (
                                        <Card
                                            key={product.id}
                                            className="hover:shadow-xl transition-all duration-300"
                                            cover={
                                                <div className="relative">
                                                    <Image
                                                        src={product.images[0]}
                                                        height={200}
                                                        className="object-cover"
                                                        preview={false}
                                                    />
                                                    {product.organic && (
                                                        <Tag color="green" className="absolute top-2 right-2">
                                                            🌿 ارگانیک
                                                        </Tag>
                                                    )}
                                                </div>
                                            }
                                        >
                                            <div className="space-y-3">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                                                    <p className="text-sm text-gray-500">{product.quality}</p>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">
                                                        {product.quantity} {product.unit}
                                                    </span>
                                                    <span className="text-lg font-bold text-green-600">
                                                        {product.price.toLocaleString()} تومان
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <EnvironmentOutlined />
                                                    {product.location}
                                                </div>

                                                <Divider className="my-3" />

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar src={product.sellerAvatar} size="small" />
                                                        <div>
                                                            <div className="text-xs font-medium">{product.sellerName}</div>
                                                            <div className="text-xs text-gray-500">
                                                                ⭐ {product.sellerRating}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        👁️ {product.views}
                                                    </div>
                                                </div>

                                                <Space className="w-full">
                                                    <Button
                                                        type="primary"
                                                        icon={<MessageOutlined />}
                                                        block
                                                        className="bg-blue-600"
                                                    >
                                                        پیام
                                                    </Button>
                                                    <Button icon={<PhoneOutlined />} block>
                                                        تماس
                                                    </Button>
                                                </Space>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            ),
                        },
                        {
                            key: "buy-requests",
                            label: (
                                <Badge count={buyRequests.filter(r => r.status === "open").length} offset={[10, 0]}>
                                    <span className="flex items-center gap-2">
                                        <FileText size={18} />
                                        درخواست‌های خرید ({buyRequests.length})
                                    </span>
                                </Badge>
                            ),
                            children: (
                                <div className="space-y-4">
                                    <Alert
                                        message="💡 نکته"
                                        description="خریداران عمده مانند کارخانه‌ها درخواست خرید ثبت می‌کنند. شما می‌توانید پیشنهاد قیمت خود را ارسال کنید."
                                        type="info"
                                        showIcon
                                        closable
                                    />

                                    {buyRequests.map((request) => {
                                        const buyerConfig = getBuyerTypeConfig(request.buyerType);
                                        return (
                                            <Card
                                                key={request.id}
                                                className="shadow-md hover:shadow-lg transition-all"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                                            <span>{buyerConfig.icon}</span>
                                                            {request.buyerName}
                                                        </h3>
                                                        <Tag color={buyerConfig.color} className="mt-1">
                                                            {buyerConfig.label}
                                                        </Tag>
                                                    </div>
                                                    <Tag
                                                        color={request.status === "open" ? "green" : "default"}
                                                        icon={request.status === "open" ? <ClockCircleOutlined /> : <CheckCircleOutlined />}
                                                    >
                                                        {request.status === "open" ? "باز" : "بسته"}
                                                    </Tag>
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">محصول</p>
                                                        <p className="font-semibold">{request.productName}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">مقدار</p>
                                                        <p className="font-semibold">{request.quantity} {request.unit}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">حداکثر قیمت</p>
                                                        <p className="font-semibold text-green-600">
                                                            {request.maxPrice.toLocaleString()} تومان
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">موقعیت</p>
                                                        <p className="font-semibold">{request.location}</p>
                                                    </div>
                                                </div>

                                                <Alert
                                                    message={request.description}
                                                    className="mb-4"
                                                />

                                                <div className="flex justify-between items-center">
                                                    <Space>
                                                        <span className="text-sm text-gray-600">
                                                            📅 تحویل: {request.deliveryDate}
                                                        </span>
                                                        <span className="text-sm text-gray-600">
                                                            💼 {request.proposals} پیشنهاد
                                                        </span>
                                                    </Space>
                                                    {request.status === "open" && (
                                                        <Button
                                                            type="primary"
                                                            icon={<Send size={16} />}
                                                            onClick={() => {
                                                                setSelectedRequest(request);
                                                                setIsProposalModalOpen(true);
                                                            }}
                                                            className="bg-gradient-to-r from-green-500 to-green-600"
                                                        >
                                                            ارسال پیشنهاد
                                                        </Button>
                                                    )}
                                                </div>
                                            </Card>
                                        );
                                    })}
                                </div>
                            ),
                        },
                    ]}
                />
            </Card>

            {/* Modal ثبت آگهی */}
            <Modal
                title="ثبت آگهی جدید"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleAddProduct}
                width={700}
                okText="ثبت آگهی"
                cancelText="انصراف"
            >
                <Form form={form} layout="vertical" className="mt-4">
                    <Form.Item
                        name="name"
                        label="نام محصول"
                        rules={[{ required: true, message: "نام محصول را وارد کنید" }]}
                    >
                        <Input placeholder="مثال: گندم" size="large" />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="quantity"
                            label="مقدار"
                            rules={[{ required: true, message: "مقدار را وارد کنید" }]}
                        >
                            <InputNumber min={0.1} style={{ width: "100%" }} size="large" />
                        </Form.Item>

                        <Form.Item
                            name="unit"
                            label="واحد"
                            rules={[{ required: true, message: "واحد را انتخاب کنید" }]}
                        >
                            <Select placeholder="انتخاب واحد" size="large">
                                <Option value="کیلوگرم">کیلوگرم</Option>
                                <Option value="تن">تن</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="price"
                            label="قیمت (تومان)"
                            rules={[{ required: true }]}
                        >
                            <InputNumber min={0} style={{ width: "100%" }} size="large" placeholder="نرخ روز بازار" />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="landId"
                        label="انتخاب زمین"
                        rules={[{ required: true }]}
                    >
                        <Select placeholder="زمین را انتخاب کنید" size="large">
                            <Option value={1}>زمین شمالی</Option>
                            <Option value={2}>زمین جنوبی</Option>
                            <Option value={3}>زمین شرقی</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="quality"
                        label="کیفیت"
                        rules={[{ required: true }]}
                    >
                        <Select placeholder="کیفیت محصول" size="large">
                            <Option value="درجه یک">درجه یک</Option>
                            <Option value="درجه دو">درجه دو</Option>
                            <Option value="درجه سه">درجه سه</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="organic"
                        label="ارگانیک"
                        valuePropName="checked"
                    >
                        <Select placeholder="آیا محصول ارگانیک است؟" size="large">
                            <Option value={true}>بله</Option>
                            <Option value={false}>خیر</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="location"
                        label="موقعیت مکانی"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="مثال: گیلان، فومن" size="large" prefix={<EnvironmentOutlined />} />
                    </Form.Item>

                    <Form.Item
                        name="harvestDate"
                        label="تاریخ برداشت"
                    >
                        <Input placeholder="1403/06/20" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="توضیحات"
                        rules={[{ required: true, message: "توضیحات را وارد کنید" }]}
                    >
                        <TextArea rows={4} placeholder="توضیحات کامل درباره محصول..." />
                    </Form.Item>

                    <Form.Item
                        name="images"
                        label="تصاویر محصول"
                    >
                        <Upload
                            listType="picture-card"
                            maxCount={5}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>آپلود</div>
                            </div>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal ارسال پیشنهاد */}
            <Modal
                title={
                    <div>
                        <h3 className="text-lg font-bold">ارسال پیشنهاد</h3>
                        {selectedRequest && (
                            <p className="text-sm text-gray-500 mt-1">
                                درخواست: {selectedRequest.productName} - {selectedRequest.quantity} {selectedRequest.unit}
                            </p>
                        )}
                    </div>
                }
                open={isProposalModalOpen}
                onCancel={() => {
                    setIsProposalModalOpen(false);
                    setSelectedRequest(null);
                    proposalForm.resetFields();
                }}
                onOk={handleSubmitProposal}
                width={600}
                okText="ارسال پیشنهاد"
                cancelText="انصراف"
            >
                {selectedRequest && (
                    <>
                        <Alert
                            message="اطلاعات درخواست"
                            description={
                                <div className="space-y-2 mt-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">خریدار:</span>
                                        <span className="font-semibold">{selectedRequest.buyerName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">حداکثر قیمت:</span>
                                        <span className="font-semibold text-green-600">
                                            {selectedRequest.maxPrice.toLocaleString()} تومان
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">تاریخ تحویل:</span>
                                        <span className="font-semibold">{selectedRequest.deliveryDate}</span>
                                    </div>
                                </div>
                            }
                            type="info"
                            showIcon
                            className="mb-4"
                        />

                        <Form form={proposalForm} layout="vertical">
                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item
                                    name="quantity"
                                    label="مقدار پیشنهادی"
                                    rules={[{ required: true, message: "مقدار را وارد کنید" }]}
                                    initialValue={selectedRequest.quantity}
                                >
                                    <InputNumber
                                        min={0.1}
                                        max={selectedRequest.quantity}
                                        style={{ width: "100%" }}
                                        size="large"
                                        suffix={selectedRequest.unit}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="price"
                                    label="قیمت پیشنهادی (تومان)"
                                    rules={[{ required: true, message: "قیمت را وارد کنید" }]}
                                >
                                    <InputNumber
                                        min={0}
                                        max={selectedRequest.maxPrice}
                                        style={{ width: "100%" }}
                                        size="large"
                                        placeholder="قیمت هر واحد"
                                    />
                                </Form.Item>
                            </div>

                            <Form.Item
                                name="quality"
                                label="کیفیت محصول"
                                rules={[{ required: true }]}
                            >
                                <Select placeholder="کیفیت" size="large">
                                    <Option value="درجه یک">درجه یک</Option>
                                    <Option value="درجه دو">درجه دو</Option>
                                    <Option value="درجه سه">درجه سه</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="deliveryDate"
                                label="تاریخ تحویل پیشنهادی"
                                rules={[{ required: true }]}
                                initialValue={selectedRequest.deliveryDate}
                            >
                                <Input placeholder="1403/09/01" size="large" />
                            </Form.Item>

                            <Form.Item
                                name="note"
                                label="توضیحات اضافی"
                            >
                                <TextArea
                                    rows={3}
                                    placeholder="توضیحات درباره محصول، شرایط تحویل و..."
                                />
                            </Form.Item>

                            <Alert
                                message="نکته"
                                description="پس از ارسال پیشنهاد، خریدار پیشنهاد شما را بررسی کرده و در صورت تایید با شما تماس خواهد گرفت."
                                type="warning"
                                showIcon
                            />
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
<Form.Item
    name="marketPrice"
    label="نرخ بازار (تومان)"
>
    <InputNumber
        min={0}
        style={{ width: "100%" }}
        size="large"
        placeholder="مثال: 520000"
    />
    {/* توضیح اضافه اگر لازم باشه */}
    <div className="text-xs text-gray-500 mt-1">قیمت متوسط بازار به تومان</div>
</Form.Item>
