import { useState } from "react";
import { Layout, Menu, Card, Typography } from "antd";
import {
    BarChartOutlined,
    ShopOutlined,
    EnvironmentOutlined,
    ExperimentOutlined,
    MessageOutlined,
    SettingOutlined,
    UserOutlined,
    LineChartOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export const FarmerDashboardLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: "100vh", direction: "rtl" }}>
            {/* سایدبار */}
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                width={250}
                style={{
                    backgroundColor: "#328E6E",
                }}
            >
                <div className="text-white text-center py-5 text-xl font-bold">
                    {!collapsed ? "پنل کشاورز" : "🌾"}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    style={{ backgroundColor: "#328E6E" }}
                    defaultSelectedKeys={["overview"]}
                    items={[
                        {
                            key: "overview",
                            icon: <BarChartOutlined />,
                            label: "نمای کلی",
                        },
                        {
                            key: "products",
                            icon: <ShopOutlined />,
                            label: "محصولات من",
                        },
                        {
                            key: "lands",
                            icon: <EnvironmentOutlined />,
                            label: "زمین‌های من",
                        },
                        {
                            key: "rates",
                            icon: <LineChartOutlined />,
                            label: "نرخ‌نامه بازار",
                        },
                        {
                            key: "lab",
                            icon: <ExperimentOutlined />,
                            label: "آزمایش خاک و گیاه",
                        },
                        {
                            key: "consult",
                            icon: <UserOutlined />,
                            label: "ارتباط با کارشناس",
                        },
                        {
                            key: "messages",
                            icon: <MessageOutlined />,
                            label: "پیام‌ها",
                        },
                        {
                            key: "settings",
                            icon: <SettingOutlined />,
                            label: "تنظیمات",
                        },
                    ]}
                />
            </Sider>

            {/* بخش اصلی */}
            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        padding: "0 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #eee",
                    }}
                >
                    <Title level={4} style={{ margin: 0, color: "#328E6E" }}>
                        خوش آمدید 👋 کشاورز عزیز
                    </Title>
                    <div className="text-gray-600">🌱 سامانه کشاورزی هوشمند</div>
                </Header>

                <Content style={{ margin: "24px 16px", minHeight: 280 }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card hoverable className="shadow-md border-t-4 border-[#328E6E]">
                            <div className="flex items-center justify-between p-3">
                                <div>
                                    <p className="text-gray-500 text-sm">کل محصولات</p>
                                    <h2 className="text-2xl font-bold text-gray-700">24</h2>
                                </div>
                                <div className="bg-[#E7F5EF] p-3 rounded-xl">
                                    <ShopOutlined style={{ color: "#328E6E", fontSize: "24px" }} />
                                </div>
                            </div>
                        </Card>

                        <Card hoverable className="shadow-md border-t-4 border-[#328E6E]">
                            <div className="flex items-center justify-between p-3">
                                <div>
                                    <p className="text-gray-500 text-sm">تعداد زمین‌ها</p>
                                    <h2 className="text-2xl font-bold text-gray-700">5</h2>
                                </div>
                                <div className="bg-[#E7F5EF] p-3 rounded-xl">
                                    <EnvironmentOutlined style={{ color: "#328E6E", fontSize: "24px" }} />
                                </div>
                            </div>
                        </Card>

                        <Card hoverable className="shadow-md border-t-4 border-[#328E6E]">
                            <div className="flex items-center justify-between p-3">
                                <div>
                                    <p className="text-gray-500 text-sm">آزمایش‌های انجام شده</p>
                                    <h2 className="text-2xl font-bold text-gray-700">12</h2>
                                </div>
                                <div className="bg-[#E7F5EF] p-3 rounded-xl">
                                    <ExperimentOutlined style={{ color: "#328E6E", fontSize: "24px" }} />
                                </div>
                            </div>
                        </Card>

                        <Card hoverable className="shadow-md border-t-4 border-[#328E6E]">
                            <div className="flex items-center justify-between p-3">
                                <div>
                                    <p className="text-gray-500 text-sm">مشاوره‌ها</p>
                                    <h2 className="text-2xl font-bold text-gray-700">8</h2>
                                </div>
                                <div className="bg-[#E7F5EF] p-3 rounded-xl">
                                    <UserOutlined style={{ color: "#328E6E", fontSize: "24px" }} />
                                </div>
                            </div>
                        </Card>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default FarmerDashboardLayout;
