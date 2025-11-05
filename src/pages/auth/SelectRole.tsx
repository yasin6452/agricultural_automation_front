import React from "react";
import { Row, Col, Button } from "antd";
import {
    UserOutlined,
    ShoppingCartOutlined,
    BankOutlined,
    ToolOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { RoleCard } from "../../components/auth/RoleCard";
import "../../styles/auth/SelectRole.css";

export const SelectRole: React.FC = () => {
    const navigate = useNavigate();

    const roles = [
        {
            title: "کشاورز",
            desc: "مدیریت زمین‌ها، محصولات و ارسال پیشنهاد فروش محصولات",
            icon: <UserOutlined />,
            route: "/register/farmer",
        },
        {
            title: "خریدار و بازاریاب",
            desc: "مشاهده آگهی‌هاوثبت درخواست خرید محصولات کشاورزی",
            icon: <ShoppingCartOutlined />,
            route: "/register/buyer",
        },
        {
            title: "سازمان‌ها و نهادها",
            desc: "ثبت و بررسی گزارش‌ها و ارتباط با کشاورزان",
            icon: <BankOutlined />,
            route: "/register/organization",
        },
        {
            title: "خدمات کشاورزی",
            desc: "ارائه خدمات مشاوره، آبیاری، سم‌پاشی و سایر خدمات مرتبط",
            icon: <ToolOutlined />,
            route: "/register/service",
        },
    ];

    return (
        <div className="select-role-container">
            <div className="select-role-content">
                <h2 className="select-role-title">انتخاب نقش کاربری</h2>
                <p className="select-role-subtitle">
                    لطفاً نقش خود را انتخاب کنید تا وارد بخش مربوطه شوید
                </p>

                <Row gutter={[24, 24]} justify="center" className="role-grid">
                    {roles.map((role, index) => (
                        <Col xs={24} sm={12} md={12} lg={6} key={index}>
                            <RoleCard
                                title={role.title}
                                description={role.desc}
                                icon={role.icon}
                                onClick={() => navigate(role.route)}
                            />
                        </Col>
                    ))}
                </Row>

                <div className="select-role-actions">
                    <Button
                        type="default"
                        icon={<ArrowLeftOutlined />}
                        size="large"
                        className="back-button"
                        onClick={() => navigate(-1)}
                    >
                        بازگشت
                    </Button>

                    <Button
                        type="primary"
                        size="large"
                        className="continue-button"
                        onClick={() => navigate("/home")}
                    >
                        ادامه بدون انتخاب
                    </Button>
                </div>
            </div>
        </div>
    );
};
