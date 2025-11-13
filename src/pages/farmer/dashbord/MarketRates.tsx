// src/pages/farmer/dashbord/MarketRates.tsx
import React, { useState } from "react";
import { Card, Select, Typography } from "antd";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const { Title } = Typography;
const { Option } = Select;

type CropType = "wheat" | "rice" | "corn";

const marketData: Record<CropType, { date: string; price: number }[]> = {
    wheat: [
        { date: "2025-01-01", price: 200 },
        { date: "2025-01-02", price: 210 },
        { date: "2025-01-03", price: 205 },
    ],
    rice: [
        { date: "2025-01-01", price: 150 },
        { date: "2025-01-02", price: 155 },
        { date: "2025-01-03", price: 158 },
    ],
    corn: [
        { date: "2025-01-01", price: 180 },
        { date: "2025-01-02", price: 185 },
        { date: "2025-01-03", price: 190 },
    ],
};

export const MarketRates: React.FC = () => {
    const [selectedCrop, setSelectedCrop] = useState<CropType>("wheat");

    const handleCropChange = (value: CropType) => {
        setSelectedCrop(value);
    };

    return (
        <Card
            style={{
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                padding: "24px",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <Title level={3} style={{ margin: 0 }}>
                    نرخ بازار محصولات
                </Title>
                <Select value={selectedCrop} onChange={handleCropChange} style={{ width: 160 }}>
                    <Option value="wheat">گندم</Option>
                    <Option value="rice">برنج</Option>
                    <Option value="corn">ذرت</Option>
                </Select>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={marketData[selectedCrop]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#328E6E" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
};
