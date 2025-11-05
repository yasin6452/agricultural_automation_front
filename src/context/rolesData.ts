import {
    EnvironmentOutlined,
    ShoppingCartOutlined,
    BankOutlined,
    ToolOutlined,
} from "@ant-design/icons";
import React from "react";

export interface Role {
    id: number;
    key: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    gradient: string;
}

export const roles: Role[] = [
    {
        id: 1,
        key: "farmer",
        title: "کشاورز",
        description: "کشاورزان و تولیدکنندگان محصولات کشاورزی",
        icon: <EnvironmentOutlined />,
    color: "#52c41a",
        gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    },
    {
        id: 2,
        key: "buyer",
        title: "خریدار و بازاریاب",
        description: "خریداران، فروشندگان و بازاریابان محصولات",
        icon: <ShoppingCartOutlined />,
    color: "#1890ff",
        gradient: "linear-gradient(135deg, #667eea 0%, #4481eb 100%)",
    },
    {
        id: 3,
        key: "organization",
        title: "جهاد کشاورزی و سازمان‌ها",
        description: "سازمان‌های دولتی و نهادهای کشاورزی",
        icon: <BankOutlined />,
    color: "#fa8c16",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
        id: 4,
        key: "service",
        title: "ارائه‌دهنده خدمات",
        description: "ارائه‌دهندگان خدمات کشاورزی و مشاوره",
        icon: <ToolOutlined />,
    color: "#722ed1",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
];
