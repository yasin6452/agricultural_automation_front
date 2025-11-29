import { useState } from "react";
import {
    Settings,
    Server,
    Database,
    Shield,
    BarChart3,
    Clock,
    Activity,
    AlertTriangle,
    CheckCircle,
    Play,
    Pause,
    RefreshCw,
    Cpu,
    HardDrive,
    Network
} from "lucide-react";
import {  Progress, Card, Row, Col, Button, Badge, Tooltip, Statistic, Modal,Select, message } from "antd";

const { Option } = Select;

// تعریف interface ها
interface Service {
    id: string;
    name: string;
    status: 'running' | 'stopped' | 'error' | 'warning';
    cpu: number;
    memory: number;
    uptime: string;
    lastRestart: string;
    version: string;
}

interface ServerStats {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
    activeConnections: number;
    responseTime: number;
}

interface Alert {
    id: string;
    service: string;
    type: 'error' | 'warning' | 'info';
    message: string;
    timestamp: string;
    resolved: boolean;
}

export default function ServicePanel() {
    const [activeTab, setActiveTab] = useState("overview");
    const [services, setServices] = useState<Service[]>([
        {
            id: "1",
            name: "API Gateway",
            status: "running",
            cpu: 25,
            memory: 45,
            uptime: "15 روز",
            lastRestart: "1402/10/15",
            version: "v2.4.1"
        },
        {
            id: "2",
            name: "Database Cluster",
            status: "running",
            cpu: 68,
            memory: 72,
            uptime: "30 روز",
            lastRestart: "1402/09/20",
            version: "v1.8.3"
        },
        {
            id: "3",
            name: "Cache Service",
            status: "warning",
            cpu: 85,
            memory: 60,
            uptime: "8 روز",
            lastRestart: "1402/10/22",
            version: "v3.1.0"
        },
        {
            id: "4",
            name: "Authentication",
            status: "running",
            cpu: 12,
            memory: 35,
            uptime: "25 روز",
            lastRestart: "1402/10/10",
            version: "v1.2.5"
        },
        {
            id: "5",
            name: "Notification Service",
            status: "error",
            cpu: 0,
            memory: 0,
            uptime: "0 روز",
            lastRestart: "1402/10/25",
            version: "v2.0.1"
        }
    ]);

    const [serverStats, setServerStats] = useState<ServerStats>({
        cpu: 45,
        memory: 62,
        disk: 78,
        network: 120,
        activeConnections: 2450,
        responseTime: 125
    });

    const [alerts, setAlerts] = useState<Alert[]>([
        {
            id: "1",
            service: "Cache Service",
            type: "warning",
            message: "مصرف CPU به 85% رسیده است",
            timestamp: "1402/10/25 - 14:30",
            resolved: false
        },
        {
            id: "2",
            service: "Notification Service",
            type: "error",
            message: "سرویس متوقف شده است",
            timestamp: "1402/10/25 - 14:25",
            resolved: false
        },
        {
            id: "3",
            service: "Database Cluster",
            type: "warning",
            message: "مصرف حافظه به 72% رسیده است",
            timestamp: "1402/10/25 - 13:45",
            resolved: false
        }
    ]);

    const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const menuItems = [
        { key: "overview", label: "نمای کلی", icon: BarChart3, color: "text-blue-500" },
        { key: "services", label: "سرویس‌ها", icon: Server, color: "text-green-500" },
        { key: "monitoring", label: "مانیتورینگ", icon: Activity, color: "text-purple-500" },
        { key: "alerts", label: "هشدارها", icon: AlertTriangle, color: "text-orange-500" },
        { key: "backup", label: "پشتیبان‌گیری", icon: Database, color: "text-cyan-500" },
        { key: "security", label: "امنیت", icon: Shield, color: "text-red-500" },
    ];

    const getStatusColor = (status: Service['status']) => {
        switch (status) {
            case 'running': return 'text-green-500 bg-green-100';
            case 'stopped': return 'text-gray-500 bg-gray-100';
            case 'warning': return 'text-orange-500 bg-orange-100';
            case 'error': return 'text-red-500 bg-red-100';
            default: return 'text-gray-500 bg-gray-100';
        }
    };

    const getStatusIcon = (status: Service['status']) => {
        switch (status) {
            case 'running': return <CheckCircle className="text-green-500" size={16} />;
            case 'stopped': return <Pause className="text-gray-500" size={16} />;
            case 'warning': return <AlertTriangle className="text-orange-500" size={16} />;
            case 'error': return <AlertTriangle className="text-red-500" size={16} />;
            default: return <Clock className="text-gray-500" size={16} />;
        }
    };

    const handleServiceAction = (serviceId: string, action: 'start' | 'stop' | 'restart') => {
        const service = services.find(s => s.id === serviceId);
        if (!service) return;

        if (action === 'restart') {
            setSelectedService(service);
            setIsRestartModalOpen(true);
            return;
        }

        setServices(prev => prev.map(s =>
            s.id === serviceId
                ? {
                    ...s,
                    status: action === 'start' ? 'running' : 'stopped',
                    cpu: action === 'start' ? 5 : 0,
                    memory: action === 'start' ? 15 : 0
                }
                : s
        ));

        message.success(`سرویس ${service.name} ${action === 'start' ? 'شروع' : 'متوقف'} شد`);
    };

    const handleRestartConfirm = () => {
        if (!selectedService) return;

        setServices(prev => prev.map(s =>
            s.id === selectedService.id
                ? {
                    ...s,
                    status: 'running',
                    lastRestart: new Date().toLocaleDateString('fa-IR'),
                    cpu: 10,
                    memory: 20
                }
                : s
        ));

        message.success(`سرویس ${selectedService.name} با موفقیت راه‌اندازی مجدد شد`);
        setIsRestartModalOpen(false);
        setSelectedService(null);
    };

    const handleResolveAlert = (alertId: string) => {
        setAlerts(prev => prev.map(alert =>
            alert.id === alertId ? { ...alert, resolved: true } : alert
        ));
        message.success("هشدار حل شد");
    };

    const renderOverviewTab = () => (
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <BarChart3 className="text-blue-500" />
                نمای کلی سرور
            </h2>

            {/* آمار کلی */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} sm={12} lg={6}>
                    <Card className="border-0 shadow-lg border-l-4 border-l-blue-500">
                        <Statistic
                            title="مصرف CPU"
                            value={serverStats.cpu}
                            suffix="%"
                            valueStyle={{ color: serverStats.cpu > 80 ? '#ef4444' : serverStats.cpu > 60 ? '#f59e0b' : '#10b981' }}
                        />
                        <Progress
                            percent={serverStats.cpu}
                            strokeColor={{
                                '0%': '#3b82f6',
                                '100%': '#06b6d4',
                            }}
                            showInfo={false}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="border-0 shadow-lg border-l-4 border-l-green-500">
                        <Statistic
                            title="مصرف حافظه"
                            value={serverStats.memory}
                            suffix="%"
                            valueStyle={{ color: serverStats.memory > 80 ? '#ef4444' : serverStats.memory > 60 ? '#f59e0b' : '#10b981' }}
                        />
                        <Progress
                            percent={serverStats.memory}
                            strokeColor={{
                                '0%': '#10b981',
                                '100%': '#84cc16',
                            }}
                            showInfo={false}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="border-0 shadow-lg border-l-4 border-l-purple-500">
                        <Statistic
                            title="فضای دیسک"
                            value={serverStats.disk}
                            suffix="%"
                            valueStyle={{ color: serverStats.disk > 80 ? '#ef4444' : serverStats.disk > 60 ? '#f59e0b' : '#10b981' }}
                        />
                        <Progress
                            percent={serverStats.disk}
                            strokeColor={{
                                '0%': '#8b5cf6',
                                '100%': '#a855f7',
                            }}
                            showInfo={false}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="border-0 shadow-lg border-l-4 border-l-cyan-500">
                        <Statistic
                            title="اتصالات فعال"
                            value={serverStats.activeConnections}
                            valueStyle={{ color: '#06b6d4' }}
                        />
                        <div className="flex items-center gap-2 text-sm text-cyan-600 mt-2">
                            <Network size={16} />
                            <span>شبکه: {serverStats.network} مگابیت</span>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* وضعیت سرویس‌ها */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <div className="flex items-center gap-2">
                                <Activity className="text-purple-500" />
                                <span>وضعیت سرویس‌ها</span>
                            </div>
                        }
                        className="border-0 shadow-lg"
                    >
                        <div className="space-y-4">
                            {services.map(service => (
                                <div key={service.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-purple-50 transition-all">
                                    <div className="flex items-center gap-3">
                                        {getStatusIcon(service.status)}
                                        <div>
                                            <div className="font-semibold text-gray-800">{service.name}</div>
                                            <div className="text-xs text-gray-500">ورژن {service.version}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Badge
                                            className={getStatusColor(service.status)}
                                            text={service.status === 'running' ? 'در حال اجرا' :
                                                service.status === 'stopped' ? 'متوقف' :
                                                    service.status === 'warning' ? 'هشدار' : 'خطا'}
                                        />
                                        <div className="text-xs text-gray-500 mt-1">آپتایم: {service.uptime}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="text-orange-500" />
                                <span>هشدارهای اخیر</span>
                            </div>
                        }
                        className="border-0 shadow-lg"
                    >
                        <div className="space-y-3">
                            {alerts.filter(alert => !alert.resolved).slice(0, 3).map(alert => (
                                <div key={alert.id} className={`p-3 border rounded-xl transition-all ${alert.type === 'error' ? 'border-red-200 bg-red-50' :
                                        alert.type === 'warning' ? 'border-orange-200 bg-orange-50' :
                                            'border-blue-200 bg-blue-50'
                                    }`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-gray-800">{alert.service}</span>
                                        <Badge
                                            color={alert.type === 'error' ? 'red' : alert.type === 'warning' ? 'orange' : 'blue'}
                                            text={alert.type === 'error' ? 'خطا' : alert.type === 'warning' ? 'هشدار' : 'اطلاع'}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>{alert.timestamp}</span>
                                        <Button
                                            size="small"
                                            type="link"
                                            onClick={() => handleResolveAlert(alert.id)}
                                        >
                                            حل شد
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );

    const renderServicesTab = () => (
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Server className="text-green-500" />
                مدیریت سرویس‌ها
            </h2>

            <Row gutter={[16, 16]}>
                {services.map(service => (
                    <Col key={service.id} xs={24} lg={12} xl={8}>
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {getStatusIcon(service.status)}
                                    <div>
                                        <div className="font-bold text-gray-800">{service.name}</div>
                                        <div className="text-xs text-gray-500">ورژن {service.version}</div>
                                    </div>
                                </div>
                                <Badge
                                    className={getStatusColor(service.status)}
                                    text={service.status === 'running' ? 'در حال اجرا' :
                                        service.status === 'stopped' ? 'متوقف' :
                                            service.status === 'warning' ? 'هشدار' : 'خطا'}
                                />
                            </div>

                            <div className="space-y-3 mb-4">
                                <div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>مصرف CPU</span>
                                        <span>{service.cpu}%</span>
                                    </div>
                                    <Progress
                                        percent={service.cpu}
                                        size="small"
                                        strokeColor={
                                            service.cpu > 80 ? '#ef4444' :
                                                service.cpu > 60 ? '#f59e0b' : '#10b981'
                                        }
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>مصرف حافظه</span>
                                        <span>{service.memory}%</span>
                                    </div>
                                    <Progress
                                        percent={service.memory}
                                        size="small"
                                        strokeColor={
                                            service.memory > 80 ? '#ef4444' :
                                                service.memory > 60 ? '#f59e0b' : '#3b82f6'
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                <div>
                                    <div>آپتایم: {service.uptime}</div>
                                    <div>آخرین راه‌اندازی: {service.lastRestart}</div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {service.status === 'running' ? (
                                    <>
                                        <Tooltip title="توقف سرویس">
                                            <Button
                                                icon={<Pause size={14} />}
                                                onClick={() => handleServiceAction(service.id, 'stop')}
                                                className="flex-1"
                                            >
                                                توقف
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="راه‌اندازی مجدد">
                                            <Button
                                                icon={<RefreshCw size={14} />}
                                                onClick={() => handleServiceAction(service.id, 'restart')}
                                                className="flex-1"
                                            >
                                                راه‌اندازی مجدد
                                            </Button>
                                        </Tooltip>
                                    </>
                                ) : (
                                    <Button
                                        icon={<Play size={14} />}
                                        onClick={() => handleServiceAction(service.id, 'start')}
                                        type="primary"
                                        className="flex-1 bg-green-500 border-0"
                                    >
                                        شروع
                                    </Button>
                                )}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );

    const renderMonitoringTab = () => (
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Activity className="text-purple-500" />
                مانیتورینگ زنده
            </h2>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <Card
                        title="مصرف منابع"
                        className="border-0 shadow-lg"
                    >
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold flex items-center gap-2">
                                        <Cpu className="text-blue-500" size={16} />
                                        پردازنده (CPU)
                                    </span>
                                    <span className="text-blue-600 font-bold">{serverStats.cpu}%</span>
                                </div>
                                <Progress
                                    percent={serverStats.cpu}
                                    strokeColor={{
                                        '0%': '#3b82f6',
                                        '100%': '#06b6d4',
                                    }}
                                />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold flex items-center gap-2">
                                        <HardDrive className="text-green-500" size={16} />
                                        حافظه (RAM)
                                    </span>
                                    <span className="text-green-600 font-bold">{serverStats.memory}%</span>
                                </div>
                                <Progress
                                    percent={serverStats.memory}
                                    strokeColor={{
                                        '0%': '#10b981',
                                        '100%': '#84cc16',
                                    }}
                                />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold flex items-center gap-2">
                                        <Database className="text-purple-500" size={16} />
                                        فضای ذخیره‌سازی
                                    </span>
                                    <span className="text-purple-600 font-bold">{serverStats.disk}%</span>
                                </div>
                                <Progress
                                    percent={serverStats.disk}
                                    strokeColor={{
                                        '0%': '#8b5cf6',
                                        '100%': '#a855f7',
                                    }}
                                />
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card
                        title="آمار شبکه"
                        className="border-0 shadow-lg"
                    >
                        <div className="space-y-6">
                            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                                <div className="text-3xl font-bold text-blue-600">{serverStats.activeConnections.toLocaleString()}</div>
                                <div className="text-gray-600">اتصالات فعال</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                                    <div className="text-xl font-bold text-green-600">{serverStats.network} Mbps</div>
                                    <div className="text-gray-600 text-sm">پهنای باند</div>
                                </div>
                                <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                                    <div className="text-xl font-bold text-purple-600">{serverStats.responseTime} ms</div>
                                    <div className="text-gray-600 text-sm">زمان پاسخ</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return renderOverviewTab();
            case "services":
                return renderServicesTab();
            case "monitoring":
                return renderMonitoringTab();
            case "alerts":
                return (
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <AlertTriangle className="text-orange-500" />
                            مدیریت هشدارها
                        </h2>
                        {/* محتوای هشدارها */}
                    </div>
                );
            default:
                return renderOverviewTab();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 font-[IRANSans]">
            <div className="max-w-7xl mx-auto">
                {/* هدر */}
                <div className="mb-8">
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col xs={24} lg={12}>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Settings className="text-white" size={20} />
                                </div>
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                                        پنل مدیریت سرویس‌ها
                                    </h1>
                                    <p className="text-gray-600 mt-1 text-sm lg:text-base">
                                        نظارت و مدیریت سرویس‌های سرور
                                    </p>
                                </div>
                            </div>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Row gutter={[8, 8]} justify="end">
                                {[
                                    { label: "سرویس‌های فعال", value: services.filter(s => s.status === 'running').length, color: "text-green-600" },
                                    { label: "هشدارها", value: alerts.filter(a => !a.resolved).length, color: "text-orange-600" },
                                    { label: "کارایی", value: `${100 - serverStats.cpu}%`, color: "text-blue-600" },
                                ].map((stat, index) => (
                                    <Col key={index}>
                                        <Card className="text-center border-0 shadow-lg min-w-[100px] hover:shadow-xl transition-all bg-white">
                                            <div className="text-xs text-gray-500">{stat.label}</div>
                                            <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </div>

                <Row gutter={[24, 24]}>
                    {/* سایدبار */}
                    <Col xs={24} lg={6}>
                        <Card className="shadow-lg border-0 sticky top-6 bg-white">
                            {/* اطلاعات سرور */}
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                                    <Server className="text-white" size={24} />
                                </div>
                                <h3 className="font-bold text-gray-800 text-lg">سرور اصلی</h3>
                                <p className="text-gray-500 text-sm mt-1">CentOS 8 | 16GB RAM</p>
                                <div className="mt-2 text-xs text-gray-400">
                                    آپتایم: ۹۹.۸٪
                                </div>
                            </div>

                            {/* منوی پنل */}
                            <nav className="space-y-2">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.key}
                                        onClick={() => setActiveTab(item.key)}
                                        className={`w-full flex items-center gap-3 justify-start p-3 rounded-xl transition-all font-medium ${activeTab === item.key
                                            ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg"
                                            : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                            }`}
                                    >
                                        <item.icon size={18} className={activeTab === item.key ? "text-white" : item.color} />
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </Card>
                    </Col>

                    {/* محتوای اصلی */}
                    <Col xs={24} lg={18}>
                        <Card className="shadow-lg border-0 min-h-[600px] bg-white">
                            {renderContent()}
                        </Card>
                    </Col>
                </Row>

                {/* مودال راه‌اندازی مجدد */}
                <Modal
                    title="راه‌اندازی مجدد سرویس"
                    open={isRestartModalOpen}
                    onCancel={() => {
                        setIsRestartModalOpen(false);
                        setSelectedService(null);
                    }}
                    onOk={handleRestartConfirm}
                    okText="راه‌اندازی مجدد"
                    cancelText="انصراف"
                    okButtonProps={{
                        className: "bg-gradient-to-r from-blue-500 to-cyan-600 border-0"
                    }}
                >
                    {selectedService && (
                        <div className="p-4">
                            <p className="text-gray-600 mb-4">
                                آیا از راه‌اندازی مجدد سرویس <strong>{selectedService.name}</strong> اطمینان دارید؟
                            </p>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                                <div className="flex items-center gap-2 text-yellow-800">
                                    <AlertTriangle size={16} />
                                    <span className="text-sm">این عمل ممکن است باعث قطعی موقت سرویس شود.</span>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
}