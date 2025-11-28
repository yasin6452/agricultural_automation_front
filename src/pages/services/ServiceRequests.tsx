// src/pages/services/ServiceRequests.tsx
import { useState } from "react";
import {
    Search,
    Filter,
    Eye,
    MessageCircle,
    Phone,
    MapPin,
    Calendar,
    Users,
    Clock,
    CheckCircle,
    XCircle,
    MoreVertical,
    DollarSign,
    Send,
    Award,
    FileText,
    Edit,
    Ban
} from "lucide-react";
import { Badge, Input, Select, Dropdown, Button, Modal, Form, message, Avatar, Card } from "antd";
import type { MenuProps } from "antd";

const { Option } = Select;
const { Search: SearchInput } = Input;
const { TextArea } = Input;

// درخواست دریافتی از کشاورز
interface ServiceRequest {
    id: number;
    farmerName: string;
    farmerAvatar: string;
    serviceType: string;
    projectDetails: {
        area: number;           // مساحت (هکتار)
        location: string;       // موقعیت
        cropType: string;       // نوع محصول
        description: string;    // توضیحات پروژه
        urgency: 'low' | 'medium' | 'high';
    };
    requestedDate: string;
    status: 'pending' | 'bidding' | 'awarded' | 'completed' | 'cancelled';
    contactNumber: string;
    bids: Bid[]; // پیشنهادهای ارسالی
}

// پیشنهاد قیمت از ارائه‌دهنده
interface Bid {
    id: number;
    providerId: number;
    providerName: string;
    price: number;           // قیمت پیشنهادی
    duration: string;        // مدت زمان اجرا
    startDate: string;       // تاریخ شروع
    notes: string;          // توضیحات پیشنهاد
    status: 'pending' | 'accepted' | 'rejected';
    submittedAt: string;
}

export default function ServiceRequests() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [serviceTypeFilter, setServiceTypeFilter] = useState<string>('all');
    const [isBidModalVisible, setIsBidModalVisible] = useState(false);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
    const [bidForm] = Form.useForm();

    // درخواست‌های دریافتی از کشاورزان
    const [requests, setRequests] = useState<ServiceRequest[]>([
        {
            id: 1,
            farmerName: "علی رضایی",
            farmerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            serviceType: "سم‌پاشی",
            projectDetails: {
                area: 5,
                location: "مزرعه دماوند",
                cropType: "سیب",
                description: "سم‌پاشی کامل باغ سیب ۵ هکتاری در برابر آفات",
                urgency: 'high'
            },
            requestedDate: "1402/10/25",
            status: 'pending',
            contactNumber: "09123456789",
            bids: []
        },
        {
            id: 2,
            farmerName: "زهرا احمدی",
            farmerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            serviceType: "نصب سیستم آبیاری",
            projectDetails: {
                area: 3,
                location: "باغ البرز",
                cropType: "پسته",
                description: "نصب سیستم آبیاری قطره‌ای برای باغ پسته",
                urgency: 'medium'
            },
            requestedDate: "1402/10/24",
            status: 'bidding',
            contactNumber: "09129876543",
            bids: [
                {
                    id: 1,
                    providerId: 1,
                    providerName: "شرکت سبزکوش",
                    price: 4500000,
                    duration: "۳ روز",
                    startDate: "1402/11/01",
                    notes: "استفاده از بهترین تجهیزات آبیاری",
                    status: 'pending',
                    submittedAt: "1402/10/25"
                }
            ]
        },
        {
            id: 3,
            farmerName: "محمد کریمی",
            farmerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            serviceType: "هرس درختان",
            projectDetails: {
                area: 2,
                location: "باغ قم",
                cropType: "هلو و شلیل",
                description: "هرس تخصصی درختان هلو و شلیل",
                urgency: 'low'
            },
            requestedDate: "1402/10/23",
            status: 'awarded',
            contactNumber: "09123459876",
            bids: [
                {
                    id: 2,
                    providerId: 1,
                    providerName: "شرکت سبزکوش",
                    price: 1800000,
                    duration: "۲ روز",
                    startDate: "1402/10/28",
                    notes: "هرس اصولی با افزایش باردهی",
                    status: 'accepted',
                    submittedAt: "1402/10/24"
                }
            ]
        },
        {
            id: 4,
            farmerName: "فاطمه محمدی",
            farmerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
            serviceType: "آنالیز خاک",
            projectDetails: {
                area: 8,
                location: "مزرعه اصفهان",
                cropType: "گندم",
                description: "آنالیز خاک و ارائه برنامه کوددهی برای مزرعه گندم",
                urgency: 'medium'
            },
            requestedDate: "1402/10/22",
            status: 'completed',
            contactNumber: "09128765432",
            bids: [
                {
                    id: 3,
                    providerId: 1,
                    providerName: "شرکت سبزکوش",
                    price: 1200000,
                    duration: "۱ روز",
                    startDate: "1402/10/25",
                    notes: "آنالیز کامل با گزارش دقیق",
                    status: 'accepted',
                    submittedAt: "1402/10/23"
                }
            ]
        }
    ]);

    const serviceTypes = [
        "همه خدمات",
        "سم‌پاشی",
        "نصب سیستم آبیاری",
        "هرس درختان",
        "آنالیز خاک",
        "کوددهی",
        "اجاره ماشین‌آلات",
        "بسته‌بندی"
    ];

    const getStatusColor = (status: ServiceRequest['status']) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300';
            case 'bidding': return 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300';
            case 'awarded': return 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/50 dark:text-orange-300';
            case 'completed': return 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/50 dark:text-green-300';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/50 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const getStatusText = (status: ServiceRequest['status']) => {
        switch (status) {
            case 'pending': return 'در انتظار پیشنهاد';
            case 'bidding': return 'در حال دریافت پیشنهاد';
            case 'awarded': return 'پذیرفته شده';
            case 'completed': return 'تکمیل شده';
            case 'cancelled': return 'لغو شده';
            default: return 'نامشخص';
        }
    };

    const getStatusIcon = (status: ServiceRequest['status']) => {
        switch (status) {
            case 'pending': return <Clock size={16} />;
            case 'bidding': return <DollarSign size={16} />;
            case 'awarded': return <Award size={16} />;
            case 'completed': return <CheckCircle size={16} />;
            case 'cancelled': return <XCircle size={16} />;
            default: return <Clock size={16} />;
        }
    };

    const getUrgencyColor = (urgency: 'low' | 'medium' | 'high') => {
        switch (urgency) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-orange-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    const getUrgencyText = (urgency: 'low' | 'medium' | 'high') => {
        switch (urgency) {
            case 'high': return 'فوری';
            case 'medium': return 'متوسط';
            case 'low': return 'کم';
            default: return 'نامشخص';
        }
    };

    const filteredRequests = requests.filter(request => {
        const matchesSearch = request.serviceType.includes(searchTerm) ||
            request.farmerName.includes(searchTerm) ||
            request.projectDetails.location.includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
        const matchesServiceType = serviceTypeFilter === 'all' || serviceTypeFilter === 'همه خدمات' || request.serviceType === serviceTypeFilter;

        return matchesSearch && matchesStatus && matchesServiceType;
    });

    const handleSendBid = (request: ServiceRequest) => {
        const myBid = getMyBid(request);

        // اگر پیشنهاد پذیرفته شده، اجازه ویرایش نده
        if (myBid?.status === 'accepted') {
            message.warning('این پیشنهاد قبلاً پذیرفته شده و قابل ویرایش نیست');
            return;
        }

        setSelectedRequest(request);

        // اگر پیشنهاد قبلی وجود دارد، فرم را با آن پر کن
        if (myBid) {
            bidForm.setFieldsValue({
                price: myBid.price,
                duration: myBid.duration,
                startDate: myBid.startDate,
                notes: myBid.notes
            });
        } else {
            bidForm.resetFields();
        }

        setIsBidModalVisible(true);
    };

    const handleViewDetails = (request: ServiceRequest) => {
        setSelectedRequest(request);
        setIsDetailModalVisible(true);
    };

    const handleSubmitBid = async (values: any) => {
        if (!selectedRequest) return;

        try {
            const myBid = getMyBid(selectedRequest);
            let newBid: Bid;

            if (myBid) {
                // ویرایش پیشنهاد موجود
                newBid = {
                    ...myBid,
                    price: values.price,
                    duration: values.duration,
                    startDate: values.startDate,
                    notes: values.notes,
                    submittedAt: new Date().toLocaleDateString('fa-IR')
                };
            } else {
                // ایجاد پیشنهاد جدید
                newBid = {
                    id: Math.max(...selectedRequest.bids.map(b => b.id), 0) + 1,
                    providerId: 1, // ID ارائه‌دهنده جاری
                    providerName: "شرکت سبزکوش",
                    price: values.price,
                    duration: values.duration,
                    startDate: values.startDate,
                    notes: values.notes,
                    status: 'pending',
                    submittedAt: new Date().toLocaleDateString('fa-IR')
                };
            }

            const updatedRequests = requests.map(req =>
                req.id === selectedRequest.id
                    ? {
                        ...req,
                        status: req.status === 'pending' ? 'bidding' as const : req.status,
                        bids: myBid
                            ? req.bids.map(b => b.id === myBid.id ? newBid : b) // ویرایش
                            : [...req.bids, newBid] // اضافه کردن جدید
                    }
                    : req
            );

            setRequests(updatedRequests);
            setIsBidModalVisible(false);
            setSelectedRequest(null);
            message.success(myBid ? 'پیشنهاد قیمت با موفقیت ویرایش شد' : 'پیشنهاد قیمت با موفقیت ارسال شد');
        } catch (error) {
            message.error('خطا در ارسال پیشنهاد');
        }
    };

    const getMyBid = (request: ServiceRequest) => {
        return request.bids.find(bid => bid.providerId === 1); // ID ارائه‌دهنده جاری
    };

    const canEditBid = (request: ServiceRequest) => {
        const myBid = getMyBid(request);
        return !myBid || myBid.status !== 'accepted';
    };

    const cardClass = "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg";
    const textClass = "text-gray-600 dark:text-gray-300";
    const titleClass = "text-gray-800 dark:text-white";

    const createMenuItems = (request: ServiceRequest): MenuProps['items'] => {
        const myBid = getMyBid(request);
        const canEdit = canEditBid(request);

        return [
            {
                key: 'view',
                label: 'مشاهده جزئیات',
                icon: <Eye size={14} />,
                onClick: () => handleViewDetails(request)
            },
            {
                key: 'message',
                label: 'ارسال پیام',
                icon: <MessageCircle size={14} />,
                onClick: () => console.log('Send message:', request.id)
            },
            {
                key: 'call',
                label: 'تماس تلفنی',
                icon: <Phone size={14} />,
                onClick: () => console.log('Call:', request.contactNumber)
            },
            ...(myBid?.status === 'accepted' ? [{
                key: 'contract',
                label: 'مشاهده قرارداد',
                icon: <FileText size={14} />,
                onClick: () => console.log('View contract:', request.id)
            }] : [])
        ];
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 font-[IRANSans] transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* هدر */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                                    <FileText className="text-white" size={24} />
                                </div>
                                درخواست‌های دریافتی
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                مدیریت درخواست‌های کشاورزان و ارسال پیشنهاد قیمت
                            </p>
                        </div>
                    </div>

                    {/* آمار سریع */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {[
                            {
                                title: "کل درخواست‌ها",
                                value: requests.length,
                                color: "bg-blue-500",
                                icon: FileText
                            },
                            {
                                title: "در انتظار پیشنهاد",
                                value: requests.filter(r => r.status === 'pending').length,
                                color: "bg-yellow-500",
                                icon: Clock
                            },
                            {
                                title: "پیشنهاد ارسال شده",
                                value: requests.filter(r => r.bids.some(b => b.providerId === 1)).length,
                                color: "bg-orange-500",
                                icon: Send
                            },
                            {
                                title: "پروژه‌های پذیرفته شده",
                                value: requests.filter(r => r.bids.some(b => b.providerId === 1 && b.status === 'accepted')).length,
                                color: "bg-green-500",
                                icon: Award
                            },
                        ].map((stat, idx) => (
                            <div key={idx} className={`rounded-2xl p-4 shadow-lg border transition-all ${cardClass}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className={`text-sm ${textClass}`}>{stat.title}</div>
                                        <div className={`text-lg font-bold ${titleClass}`}>{stat.value}</div>
                                    </div>
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} bg-opacity-10`}>
                                        <stat.icon className={stat.color.replace('bg-', 'text-')} size={24} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* فیلتر و جستجو */}
                <div className={`p-6 mb-6 ${cardClass}`}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <SearchInput
                                placeholder="جستجو در درخواست‌ها (کشاورز، موقعیت، خدمت)..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full"
                                size="large"
                            />
                        </div>
                        <Select
                            value={statusFilter}
                            onChange={setStatusFilter}
                            className="w-full"
                            size="large"
                            suffixIcon={<Filter size={16} />}
                            placeholder="وضعیت درخواست"
                        >
                            <Option value="all">همه وضعیت‌ها</Option>
                            <Option value="pending">در انتظار پیشنهاد</Option>
                            <Option value="bidding">در حال دریافت پیشنهاد</Option>
                            <Option value="awarded">پذیرفته شده</Option>
                            <Option value="completed">تکمیل شده</Option>
                        </Select>
                        <Select
                            value={serviceTypeFilter}
                            onChange={setServiceTypeFilter}
                            className="w-full"
                            size="large"
                            suffixIcon={<Filter size={16} />}
                            placeholder="نوع خدمت"
                        >
                            {serviceTypes.map(type => (
                                <Option key={type} value={type}>{type}</Option>
                            ))}
                        </Select>
                    </div>
                </div>

                {/* لیست درخواست‌ها */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                            درخواست‌های دریافتی ({filteredRequests.length})
                        </h2>
                        <Badge
                            count={filteredRequests.length}
                            className="bg-orange-500"
                            showZero
                        />
                    </div>

                    <div className="space-y-4">
                        {filteredRequests.map((request) => {
                            const myBid = getMyBid(request);
                            const canEdit = canEditBid(request);

                            return (
                                <Card
                                    key={request.id}
                                    className={`rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${request.projectDetails.urgency === 'high'
                                            ? 'border-red-200 dark:border-red-700'
                                            : 'border-gray-200 dark:border-gray-700'
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4 flex-1">
                                            <Avatar
                                                src={request.farmerAvatar}
                                                size={60}
                                                className="border-2 border-orange-200 dark:border-orange-700"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-1">
                                                            {request.serviceType} - {request.projectDetails.area} هکتار
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                                            {request.projectDetails.description}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Badge
                                                            className={getStatusColor(request.status)}
                                                            count={
                                                                <div className="flex items-center gap-1">
                                                                    {getStatusIcon(request.status)}
                                                                    {getStatusText(request.status)}
                                                                </div>
                                                            }
                                                        />
                                                        <Dropdown
                                                            menu={{ items: createMenuItems(request) }}
                                                            trigger={['click']}
                                                            placement="bottomRight"
                                                        >
                                                            <Button
                                                                type="text"
                                                                icon={<MoreVertical size={16} />}
                                                                className="text-gray-500 hover:text-orange-500"
                                                            />
                                                        </Dropdown>
                                                    </div>
                                                </div>

                                                {/* اطلاعات پروژه */}
                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3 text-sm text-gray-600 dark:text-gray-300">
                                                    <div className="flex items-center gap-2">
                                                        <Users size={14} />
                                                        <span>{request.farmerName}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin size={14} />
                                                        <span>{request.projectDetails.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar size={14} />
                                                        <span>{request.requestedDate}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-3 h-3 rounded-full ${getUrgencyColor(request.projectDetails.urgency)}`}></div>
                                                        <span>{getUrgencyText(request.projectDetails.urgency)}</span>
                                                    </div>
                                                </div>

                                                {/* اطلاعات محصول */}
                                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                        <div>
                                                            <div className="text-gray-500 dark:text-gray-400">نوع محصول</div>
                                                            <div className="font-medium">{request.projectDetails.cropType}</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-gray-500 dark:text-gray-400">مساحت</div>
                                                            <div className="font-medium">{request.projectDetails.area} هکتار</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-gray-500 dark:text-gray-400">موقعیت</div>
                                                            <div className="font-medium">{request.projectDetails.location}</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-gray-500 dark:text-gray-400">اولویت</div>
                                                            <div className="font-medium">{getUrgencyText(request.projectDetails.urgency)}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* وضعیت پیشنهاد من */}
                                                {myBid && (
                                                    <div className={`p-3 rounded-lg mb-3 ${myBid.status === 'accepted'
                                                            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700'
                                                            : myBid.status === 'rejected'
                                                                ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
                                                                : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700'
                                                        }`}>
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <div className="font-medium text-sm">
                                                                    پیشنهاد شما: {myBid.price.toLocaleString()} تومان
                                                                </div>
                                                                <div className="text-xs text-gray-600 dark:text-gray-300">
                                                                    مدت زمان: {myBid.duration} - شروع: {myBid.startDate}
                                                                </div>
                                                                {myBid.status === 'accepted' && (
                                                                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                                                                        ✅ این پیشنهاد توسط کشاورز پذیرفته شده است
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <Badge
                                                                status={
                                                                    myBid.status === 'accepted' ? 'success' :
                                                                        myBid.status === 'rejected' ? 'error' : 'processing'
                                                                }
                                                                text={
                                                                    myBid.status === 'accepted' ? 'پذیرفته شده' :
                                                                        myBid.status === 'rejected' ? 'رد شده' : 'در انتظار'
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* اقدامات */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                            <Phone size={14} />
                                            <span>{request.contactNumber}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {myBid?.status === 'accepted' ? (
                                                <Button
                                                    type="primary"
                                                    className="bg-green-500 hover:bg-green-600 border-green-500 flex items-center gap-2"
                                                    onClick={() => handleViewDetails(request)}
                                                >
                                                    <FileText size={14} />
                                                    مشاهده قرارداد
                                                </Button>
                                            ) : canEdit ? (
                                                <>
                                                    {!myBid ? (
                                                        <Button
                                                            type="primary"
                                                            className="bg-orange-500 hover:bg-orange-600 border-orange-500 flex items-center gap-2"
                                                            onClick={() => handleSendBid(request)}
                                                        >
                                                            <Send size={14} />
                                                            ارسال پیشنهاد قیمت
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            className="flex items-center gap-2"
                                                            onClick={() => handleSendBid(request)}
                                                        >
                                                            <Edit size={14} />
                                                            ویرایش پیشنهاد
                                                        </Button>
                                                    )}
                                                    <Button
                                                        className="flex items-center gap-2"
                                                        onClick={() => handleViewDetails(request)}
                                                    >
                                                        <Eye size={14} />
                                                        مشاهده جزئیات
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button
                                                    disabled
                                                    className="flex items-center gap-2"
                                                    icon={<Ban size={14} />}
                                                >
                                                    غیرقابل ویرایش
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    {filteredRequests.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">
                                هیچ درخواستی یافت نشد
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm">
                                سعی کنید فیلترها را تغییر دهید یا عبارت جستجوی دیگری وارد کنید
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal ارسال پیشنهاد قیمت */}
                <Modal
                    title={
                        <div className="flex items-center gap-2">
                            <DollarSign size={20} className="text-green-500" />
                            <span>
                                {selectedRequest && getMyBid(selectedRequest) ? 'ویرایش پیشنهاد قیمت' : 'ارسال پیشنهاد قیمت'}
                            </span>
                        </div>
                    }
                    open={isBidModalVisible}
                    onCancel={() => {
                        setIsBidModalVisible(false);
                        setSelectedRequest(null);
                    }}
                    footer={null}
                    width={600}
                    centered
                >
                    {selectedRequest && (
                        <Form
                            form={bidForm}
                            layout="vertical"
                            onFinish={handleSubmitBid}
                            className="space-y-4"
                        >
                            {/* اطلاعات درخواست */}
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                                <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                                    اطلاعات درخواست
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-gray-500">کشاورز: </span>
                                        <span>{selectedRequest.farmerName}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">خدمت: </span>
                                        <span>{selectedRequest.serviceType}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">مساحت: </span>
                                        <span>{selectedRequest.projectDetails.area} هکتار</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">موقعیت: </span>
                                        <span>{selectedRequest.projectDetails.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item
                                    label="قیمت پیشنهادی (تومان)"
                                    name="price"
                                    rules={[{ required: true, message: 'قیمت پیشنهادی الزامی است' }]}
                                >
                                    <Input
                                        type="number"
                                        placeholder="مثال: 2500000"
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="مدت زمان اجرا"
                                    name="duration"
                                    rules={[{ required: true, message: 'مدت زمان الزامی است' }]}
                                >
                                    <Input
                                        placeholder="مثال: ۳ روز"
                                        size="large"
                                    />
                                </Form.Item>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item
                                    label="تاریخ شروع پیشنهادی"
                                    name="startDate"
                                    rules={[{ required: true, message: 'تاریخ شروع الزامی است' }]}
                                >
                                    <Input
                                        placeholder="مثال: 1402/11/05"
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="شماره تماس"
                                >
                                    <Input
                                        value={selectedRequest.contactNumber}
                                        disabled
                                        size="large"
                                    />
                                </Form.Item>
                            </div>

                            <Form.Item
                                label="توضیحات پیشنهاد"
                                name="notes"
                            >
                                <TextArea
                                    rows={3}
                                    placeholder="توضیحات اضافی درباره پیشنهاد خود بنویسید..."
                                    size="large"
                                />
                            </Form.Item>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <Button
                                    onClick={() => setIsBidModalVisible(false)}
                                    size="large"
                                >
                                    انصراف
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="bg-green-500 hover:bg-green-600 border-green-500 flex items-center gap-2"
                                    size="large"
                                >
                                    <Send size={16} />
                                    {getMyBid(selectedRequest) ? 'بروزرسانی پیشنهاد' : 'ارسال پیشنهاد'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Modal>

                {/* Modal مشاهده جزئیات */}
                <Modal
                    title={
                        <div className="flex items-center gap-2">
                            <Eye size={20} className="text-blue-500" />
                            <span>مشاهده جزئیات درخواست</span>
                        </div>
                    }
                    open={isDetailModalVisible}
                    onCancel={() => {
                        setIsDetailModalVisible(false);
                        setSelectedRequest(null);
                    }}
                    footer={null}
                    width={700}
                    centered
                >
                    {selectedRequest && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Avatar
                                            src={selectedRequest.farmerAvatar}
                                            size={64}
                                            className="border-2 border-orange-200"
                                        />
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                                {selectedRequest.farmerName}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {selectedRequest.serviceType}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">اطلاعات پروژه</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">مساحت:</span>
                                            <span className="font-medium">{selectedRequest.projectDetails.area} هکتار</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">موقعیت:</span>
                                            <span className="font-medium">{selectedRequest.projectDetails.location}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">نوع محصول:</span>
                                            <span className="font-medium">{selectedRequest.projectDetails.cropType}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">اولویت:</span>
                                            <span className="font-medium">{getUrgencyText(selectedRequest.projectDetails.urgency)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">اطلاعات تماس</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">شماره تماس:</span>
                                            <span className="font-medium">{selectedRequest.contactNumber}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">تاریخ درخواست:</span>
                                            <span className="font-medium">{selectedRequest.requestedDate}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">وضعیت:</span>
                                            <Badge
                                                className={getStatusColor(selectedRequest.status)}
                                                count={getStatusText(selectedRequest.status)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">توضیحات پروژه</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                        {selectedRequest.projectDetails.description}
                                    </p>
                                </div>

                                {getMyBid(selectedRequest) && (
                                    <div className="col-span-2">
                                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">پیشنهاد شما</h4>
                                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500">قیمت:</span>
                                                    <span className="font-bold text-green-600 mr-2">
                                                        {getMyBid(selectedRequest)!.price.toLocaleString()} تومان
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">مدت زمان:</span>
                                                    <span className="font-medium">{getMyBid(selectedRequest)!.duration}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">تاریخ شروع:</span>
                                                    <span className="font-medium">{getMyBid(selectedRequest)!.startDate}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">وضعیت:</span>
                                                    <Badge
                                                        status={
                                                            getMyBid(selectedRequest)!.status === 'accepted' ? 'success' :
                                                                getMyBid(selectedRequest)!.status === 'rejected' ? 'error' : 'processing'
                                                        }
                                                        text={
                                                            getMyBid(selectedRequest)!.status === 'accepted' ? 'پذیرفته شده' :
                                                                getMyBid(selectedRequest)!.status === 'rejected' ? 'رد شده' : 'در انتظار'
                                                        }
                                                    />
                                                </div>
                                                {getMyBid(selectedRequest)!.notes && (
                                                    <div className="col-span-2">
                                                        <span className="text-gray-500">توضیحات:</span>
                                                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                                                            {getMyBid(selectedRequest)!.notes}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
}