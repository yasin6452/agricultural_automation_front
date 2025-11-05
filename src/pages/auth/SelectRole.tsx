import { Card, Row, Col, Typography, Button } from "antd";
import { motion } from "framer-motion";
import {
    UserOutlined,
    ShoppingCartOutlined,
    BankOutlined,
    ToolOutlined,
    ArrowLeftOutlined,
    LoginOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export const SelectRole = () => {
    const navigate = useNavigate();

    const roles = [
        {
            title: "کشاورز",
            icon: <UserOutlined style={{ fontSize: 48, color: "#328E6E" }} />,
            desc: "مدیریت محصولات و ارتباط مستقیم با خریداران",
            route: "/complete-info/farmer",
        },
        {
            title: "خریدار / بازاریاب",
            icon: <ShoppingCartOutlined style={{ fontSize: 48, color: "#328E6E" }} />,
            desc: "مشاهده محصولات و ثبت سفارش‌های کشاورزی",
            route: "/complete-info/buyer",
        },
        {
            title: "سازمان‌ها و نهادهای کشاورزی",
            icon: <BankOutlined style={{ fontSize: 48, color: "#328E6E" }} />,
            desc: "نظارت و ارائه خدمات دولتی یا غیردولتی",
            route: "/complete-info/organization",
        },
        {
            title: "خدمات کشاورزی",
            icon: <ToolOutlined style={{ fontSize: 48, color: "#328E6E" }} />,
            desc: "ارائه خدمات پشتیبانی، مشاوره و تجهیزات",
            route: "/complete-info/services",
        },
    ];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#F7FAF9",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 20px",
            }}
        >
            {/* عنوان صفحه */}
            <Title
                level={2}
                style={{
                    color: "#444C47",
                    marginBottom: 40,
                    fontWeight: 700,
                }}
            >
                انتخاب نقش کاربری
            </Title>

            {/* کارت‌های نقش */}
            <Row gutter={[24, 24]} justify="center" style={{ maxWidth: 1200 }}>
                {roles.map((role, index) => (
                    <Col xs={24} sm={12} md={12} lg={6} key={index}>
                        <motion.div
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0px 10px 30px rgba(50, 142, 110, 0.25)",
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => navigate(role.route)}
                        >
                            <Card
                                hoverable
                                style={{
                                    borderRadius: 16,
                                    textAlign: "center",
                                    background: "#fff",
                                    border: "1px solid #E5E8E7",
                                    cursor: "pointer",
                                    padding: "24px 8px",
                                }}
                            >
                                <div style={{ marginBottom: 16 }}>{role.icon}</div>
                                <Title
                                    level={4}
                                    style={{ color: "#328E6E", fontWeight: 600, marginBottom: 8 }}
                                >
                                    {role.title}
                                </Title>
                                <Text style={{ color: "#444C47" }}>{role.desc}</Text>
                            </Card>
                        </motion.div>
                    </Col>
                ))}
            </Row>

            {/* دکمه‌ها */}
            <div
                style={{
                    marginTop: 50,
                    display: "flex",
                    gap: 20,
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <Button
                    type="default"
                    icon={<ArrowLeftOutlined />}
                    size="large"
                    style={{
                        borderColor: "#BFA980",
                        color: "#BFA980",
                        fontWeight: 500,
                    }}
                    onClick={() => navigate(-1)}
                >
                    بازگشت
                </Button>

            </div>

            {/* فوتر کوچک */}
            <div
                style={{
                    marginTop: 60,
                    color: "#BFA980",
                    fontSize: 16,
                    fontWeight: 500,
                }}
            >
                سامانه کشاورزی هوشمند 🌿
            </div>
        </div>
    );
};
