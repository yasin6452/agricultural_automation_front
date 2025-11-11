import { Layout, Avatar, Dropdown, Menu, Badge } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";

const { Header } = Layout;

export const FarmerHeader = () => {
    const menu = (
        <Menu>
            <Menu.Item key="1">پروفایل</Menu.Item>
            <Menu.Item key="2">خروج</Menu.Item>
        </Menu>
    );

    return (
        <Header
            style={{
                background: "#fff",
                padding: "0 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                borderRadius: "0 0 12px 12px",
            }}
        >
            <h2 style={{ margin: 0, color: "#328E6E" }}>داشبورد کشاورز</h2>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Badge count={3}>
                    <BellOutlined style={{ fontSize: 20, color: "#328E6E", cursor: "pointer" }} />
                </Badge>
                <Dropdown overlay={menu}>
                    <Avatar icon={<UserOutlined />} style={{ cursor: "pointer", backgroundColor: "#328E6E" }} />
                </Dropdown>
            </div>
        </Header>
    );
};
