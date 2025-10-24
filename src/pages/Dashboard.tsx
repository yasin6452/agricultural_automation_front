import { Button, Card, Typography, Descriptions, Space } from 'antd';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, PhoneOutlined, IdcardOutlined, CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title } = Typography;

export const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{
            padding: '40px',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
            <Card
                style={{
                    maxWidth: 800,
                    margin: '0 auto',
                    borderRadius: 12,
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
                }}
            >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Title level={2}>پنل کاربری</Title>
                        <div style={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: '#1890ff',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 40,
                            color: 'white',
                            marginBottom: 16
                        }}>
                            <UserOutlined />
                        </div>
                        <Title level={4}>
                            {user?.firstName && user?.lastName
                                ? `${user.firstName} ${user.lastName}`
                                : 'کاربر گرامی'}
                        </Title>
                    </div>

                    <Descriptions
                        bordered
                        column={1}
                        labelStyle={{ fontWeight: 'bold', width: 150 }}
                    >
                        <Descriptions.Item
                            label={<><PhoneOutlined /> شماره موبایل</>}
                        >
                            <span dir="ltr">{user?.phone}</span>
                        </Descriptions.Item>

                        {user?.firstName && (
                            <Descriptions.Item
                                label={<><UserOutlined /> نام</>}
                            >
                                {user.firstName}
                            </Descriptions.Item>
                        )}

                        {user?.lastName && (
                            <Descriptions.Item
                                label={<><UserOutlined /> نام خانوادگی</>}
                            >
                                {user.lastName}
                            </Descriptions.Item>
                        )}

                        {user?.nationalCode && (
                            <Descriptions.Item
                                label={<><IdcardOutlined /> کد ملی</>}
                            >
                                <span dir="ltr">{user.nationalCode}</span>
                            </Descriptions.Item>
                        )}

                        {user?.birthDate && (
                            <Descriptions.Item
                                label={<><CalendarOutlined /> تاریخ تولد</>}
                            >
                                {user.birthDate}
                            </Descriptions.Item>
                        )}

                        {user?.province && user?.city && (
                            <Descriptions.Item
                                label={<><EnvironmentOutlined /> محل سکونت</>}
                            >
                                {user.city}، {user.province}
                            </Descriptions.Item>
                        )}
                    </Descriptions>

                    <Button
                        type="primary"
                        danger
                        onClick={handleLogout}
                        block
                        size="large"
                    >
                        خروج از حساب کاربری
                    </Button>
                </Space>
            </Card>
        </div>
    );
};