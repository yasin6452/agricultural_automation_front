import { useState } from "react";
import { Card, Select, Row, Col, Statistic, Tag, Table,  Space, Alert } from "antd";
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";
import {   Activity, MapPin } from "lucide-react";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const { Option } = Select;

interface PriceData {
    date: string;
    price: number;
    volume?: number;
}

interface ProvincePrice {
    name: string;
    price: number;
    change: number;
}

interface CropInfo {
    name: string;
    currentPrice: number;
    previousPrice: number;
    change: number;
    changePercent: number;
    unit: string;
    quality: string;
    data: PriceData[];
    provinces: ProvincePrice[];
}

type CropType = "wheat" | "rice" | "corn" | "barley" | "onion" | "tomato";

const marketData: Record<CropType, CropInfo> = {
    wheat: {
        name: "گندم",
        currentPrice: 520000,
        previousPrice: 500000,
        change: 20000,
        changePercent: 4,
        unit: "تن",
        quality: "درجه یک",
        data: [
            { date: "1403/06/01", price: 480000, volume: 1200 },
            { date: "1403/06/10", price: 490000, volume: 1350 },
            { date: "1403/06/20", price: 495000, volume: 1100 },
            { date: "1403/07/01", price: 500000, volume: 1500 },
            { date: "1403/07/10", price: 505000, volume: 1400 },
            { date: "1403/07/20", price: 510000, volume: 1300 },
            { date: "1403/08/01", price: 515000, volume: 1600 },
            { date: "1403/08/10", price: 520000, volume: 1450 },
        ],
        provinces: [
            { name: "خوزستان", price: 525000, change: 4.5 },
            { name: "گلستان", price: 518000, change: 3.8 },
            { name: "کرمانشاه", price: 520000, change: 4.0 },
            { name: "خراسان رضوی", price: 515000, change: 3.5 },
            { name: "فارس", price: 522000, change: 4.2 },
        ],
    },
    rice: {
        name: "برنج",
        currentPrice: 1150000,
        previousPrice: 1200000,
        change: -50000,
        changePercent: -4.17,
        unit: "تن",
        quality: "طارم",
        data: [
            { date: "1403/06/01", price: 1250000, volume: 800 },
            { date: "1403/06/10", price: 1230000, volume: 850 },
            { date: "1403/06/20", price: 1220000, volume: 900 },
            { date: "1403/07/01", price: 1200000, volume: 950 },
            { date: "1403/07/10", price: 1190000, volume: 880 },
            { date: "1403/07/20", price: 1180000, volume: 920 },
            { date: "1403/08/01", price: 1160000, volume: 1000 },
            { date: "1403/08/10", price: 1150000, volume: 980 },
        ],
        provinces: [
            { name: "مازندران", price: 1140000, change: -5.2 },
            { name: "گیلان", price: 1155000, change: -3.9 },
            { name: "گلستان", price: 1148000, change: -4.3 },
            { name: "خوزستان", price: 1160000, change: -3.4 },
        ],
    },
    corn: {
        name: "ذرت",
        currentPrice: 380000,
        previousPrice: 385000,
        change: -5000,
        changePercent: -1.3,
        unit: "تن",
        quality: "دامی",
        data: [
            { date: "1403/06/01", price: 375000, volume: 2000 },
            { date: "1403/06/10", price: 378000, volume: 2100 },
            { date: "1403/06/20", price: 380000, volume: 1950 },
            { date: "1403/07/01", price: 385000, volume: 2200 },
            { date: "1403/07/10", price: 383000, volume: 2050 },
            { date: "1403/07/20", price: 382000, volume: 2150 },
            { date: "1403/08/01", price: 381000, volume: 2300 },
            { date: "1403/08/10", price: 380000, volume: 2250 },
        ],
        provinces: [
            { name: "خراسان رضوی", price: 378000, change: -1.5 },
            { name: "آذربایجان شرقی", price: 382000, change: -1.0 },
            { name: "اصفهان", price: 380000, change: -1.3 },
            { name: "فارس", price: 379000, change: -1.6 },
        ],
    },
    barley: {
        name: "جو",
        currentPrice: 420000,
        previousPrice: 410000,
        change: 10000,
        changePercent: 2.44,
        unit: "تن",
        quality: "دامی",
        data: [
            { date: "1403/06/01", price: 395000, volume: 900 },
            { date: "1403/06/10", price: 400000, volume: 950 },
            { date: "1403/06/20", price: 405000, volume: 920 },
            { date: "1403/07/01", price: 410000, volume: 1000 },
            { date: "1403/07/10", price: 412000, volume: 980 },
            { date: "1403/07/20", price: 415000, volume: 1050 },
            { date: "1403/08/01", price: 418000, volume: 1100 },
            { date: "1403/08/10", price: 420000, volume: 1080 },
        ],
        provinces: [
            { name: "فارس", price: 422000, change: 2.9 },
            { name: "کرمانشاه", price: 418000, change: 2.0 },
            { name: "خراسان رضوی", price: 420000, change: 2.4 },
        ],
    },
    onion: {
        name: "پیاز",
        currentPrice: 250000,
        previousPrice: 280000,
        change: -30000,
        changePercent: -10.71,
        unit: "تن",
        quality: "قرمز",
        data: [
            { date: "1403/06/01", price: 320000, volume: 1500 },
            { date: "1403/06/10", price: 310000, volume: 1600 },
            { date: "1403/06/20", price: 300000, volume: 1700 },
            { date: "1403/07/01", price: 280000, volume: 1800 },
            { date: "1403/07/10", price: 270000, volume: 1900 },
            { date: "1403/07/20", price: 260000, volume: 2000 },
            { date: "1403/08/01", price: 255000, volume: 2100 },
            { date: "1403/08/10", price: 250000, volume: 2200 },
        ],
        provinces: [
            { name: "آذربایجان شرقی", price: 245000, change: -11.5 },
            { name: "خراسان جنوبی", price: 252000, change: -10.0 },
            { name: "اصفهان", price: 248000, change: -11.4 },
            { name: "یزد", price: 250000, change: -10.7 },
        ],
    },
    tomato: {
        name: "گوجه فرنگی",
        currentPrice: 180000,
        previousPrice: 175000,
        change: 5000,
        changePercent: 2.86,
        unit: "تن",
        quality: "درجه یک",
        data: [
            { date: "1403/06/01", price: 165000, volume: 3000 },
            { date: "1403/06/10", price: 168000, volume: 3200 },
            { date: "1403/06/20", price: 170000, volume: 3100 },
            { date: "1403/07/01", price: 175000, volume: 3400 },
            { date: "1403/07/10", price: 177000, volume: 3300 },
            { date: "1403/07/20", price: 178000, volume: 3500 },
            { date: "1403/08/01", price: 179000, volume: 3600 },
            { date: "1403/08/10", price: 180000, volume: 3550 },
        ],
        provinces: [
            { name: "هرمزگان", price: 178000, change: 2.3 },
            { name: "بوشهر", price: 182000, change: 4.0 },
            { name: "خوزستان", price: 180000, change: 2.9 },
            { name: "فارس", price: 179000, change: 2.3 },
        ],
    },
};

export const MarketRates = () => {
    const [selectedCrop, setSelectedCrop] = useState<CropType>("wheat");
    const [chartType, setChartType] = useState<"line" | "area" | "bar">("area");

    const crop = marketData[selectedCrop];
    const isPositive = crop.change >= 0;

    const provinceColumns = [
        {
            title: "استان",
            dataIndex: "name",
            key: "name",
            render: (text: string) => (
                <span className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    {text}
                </span>
            ),
        },
        {
            title: "قیمت (تومان)",
            dataIndex: "price",
            key: "price",
            render: (price: number) => (
                <span className="font-semibold">{price.toLocaleString()}</span>
            ),
            sorter: (a: ProvincePrice, b: ProvincePrice) => a.price - b.price,
        },
        {
            title: "تغییرات",
            dataIndex: "change",
            key: "change",
            render: (change: number) => (
                <Tag color={change >= 0 ? "green" : "red"} icon={change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}>
                    {Math.abs(change)}%
                </Tag>
            ),
            sorter: (a: ProvincePrice, b: ProvincePrice) => a.change - b.change,
        },
    ];

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border">
                    <p className="text-sm font-semibold text-gray-800">{payload[0].payload.date}</p>
                    <p className="text-sm text-green-600">
                        قیمت: {payload[0].value.toLocaleString()} تومان
                    </p>
                    {payload[0].payload.volume && (
                        <p className="text-xs text-gray-500">
                            حجم معاملات: {payload[0].payload.volume} تن
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {/* Header */}
            <div className="mb-6 animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Activity className="text-white" size={24} />
                            </div>
                            نرخ بازار محصولات
                        </h1>
                        <p className="text-gray-500 mt-2">قیمت‌ها به روز و تحلیل بازار</p>
                    </div>
                    <Space size="middle">
                        <Select
                            value={selectedCrop}
                            onChange={(value) => setSelectedCrop(value)}
                            style={{ width: 180 }}
                            size="large"
                        >
                            <Option value="wheat">🌾 گندم</Option>
                            <Option value="rice">🌾 برنج</Option>
                            <Option value="corn">🌽 ذرت</Option>
                            <Option value="barley">🌾 جو</Option>
                            <Option value="onion">🧅 پیاز</Option>
                            <Option value="tomato">🍅 گوجه فرنگی</Option>
                        </Select>
                        <Select
                            value={chartType}
                            onChange={(value) => setChartType(value)}
                            style={{ width: 140 }}
                            size="large"
                        >
                            <Option value="line">خطی</Option>
                            <Option value="area">ناحیه‌ای</Option>
                            <Option value="bar">میله‌ای</Option>
                        </Select>
                    </Space>
                </div>

                {/* آمار کلی */}
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="shadow-md hover:shadow-lg transition-all">
                            <Statistic
                                title={`قیمت فعلی ${crop.name}`}
                                value={crop.currentPrice}
                                suffix="تومان"
                                valueStyle={{ color: isPositive ? '#22c55e' : '#ef4444' }}
                            />
                            <div className="text-xs text-gray-500 mt-2">{crop.quality} / {crop.unit}</div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="shadow-md hover:shadow-lg transition-all">
                            <Statistic
                                title="تغییرات امروز"
                                value={Math.abs(crop.changePercent)}
                                prefix={isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                suffix="%"
                                valueStyle={{ color: isPositive ? '#22c55e' : '#ef4444' }}
                            />
                            <div className="text-xs text-gray-500 mt-2">
                                {isPositive ? '+' : ''}{crop.change.toLocaleString()} تومان
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="shadow-md hover:shadow-lg transition-all">
                            <Statistic
                                title="قیمت دیروز"
                                value={crop.previousPrice}
                                suffix="تومان"
                                valueStyle={{ color: '#6b7280' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="shadow-md hover:shadow-lg transition-all">
                            <Statistic
                                title="بالاترین قیمت"
                                value={Math.max(...crop.data.map(d => d.price))}
                                suffix="تومان"
                                valueStyle={{ color: '#3b82f6' }}
                            />
                            <div className="text-xs text-gray-500 mt-2">در 30 روز گذشته</div>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Alert */}
            {Math.abs(crop.changePercent) > 5 && (
                <Alert
                    message={`هشدار تغییرات قیمت`}
                    description={`قیمت ${crop.name} در روز گذشته ${Math.abs(crop.changePercent)}% ${isPositive ? 'افزایش' : 'کاهش'} داشته است.`}
                    type={isPositive ? "success" : "warning"}
                    showIcon
                    closable
                    className="mb-6"
                />
            )}

            {/* نمودار */}
            <Card className="shadow-lg rounded-2xl mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">روند قیمت در 30 روز اخیر</h3>
                <ResponsiveContainer width="100%" height={400}>
                    {chartType === "line" ? (
                        <LineChart data={crop.data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="date" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#328E6E"
                                strokeWidth={3}
                                dot={{ fill: '#328E6E', r: 5 }}
                                activeDot={{ r: 8 }}
                                name="قیمت (تومان)"
                            />
                        </LineChart>
                    ) : chartType === "area" ? (
                        <AreaChart data={crop.data}>
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#328E6E" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#328E6E" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="date" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="price"
                                stroke="#328E6E"
                                fillOpacity={1}
                                fill="url(#colorPrice)"
                                strokeWidth={2}
                                name="قیمت (تومان)"
                            />
                        </AreaChart>
                    ) : (
                        <BarChart data={crop.data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="date" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="price" fill="#328E6E" radius={[8, 8, 0, 0]} name="قیمت (تومان)" />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </Card>

            {/* جدول قیمت استان‌ها */}
            <Card className="shadow-lg rounded-2xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4">مقایسه قیمت در استان‌ها</h3>
                <Table
                    columns={provinceColumns}
                    dataSource={crop.provinces}
                    rowKey="name"
                    pagination={false}
                />
            </Card>

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