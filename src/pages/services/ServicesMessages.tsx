// src/pages/services/ServicesMessages.tsx
import { useState } from "react";
import {
    MessageCircle,
    Search,
    Phone,
    Video,
    Send,
    MoreVertical,
    User,
    Clock,
    CheckCircle2
} from "lucide-react";
import { Card, Input, Avatar, Badge, Button, Modal, Dropdown, Tag, Empty, Select } from "antd";
import type { MenuProps } from "antd";

const { Search: SearchInput } = Input;
const { Option } = Select;

interface Message {
    id: number;
    content: string;
    sender: "me" | "other";
    timestamp: string;
    read: boolean;
}

interface Conversation {
    id: number;
    farmerName: string;
    farmerAvatar: string;
    serviceType: string;
    projectId: number;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    online: boolean;
    status: 'pending' | 'active' | 'completed';
    messages: Message[];
    contactNumber: string;
}

export default function ServicesMessages() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const [messageInput, setMessageInput] = useState("");

    const [conversations, setConversations] = useState<Conversation[]>([
        {
            id: 1,
            farmerName: "علی رضایی",
            farmerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            serviceType: "سم‌پاشی باغ سیب",
            projectId: 101,
            lastMessage: "سلام، چه زمانی می‌تونید برای سم‌پاشی تشریف بیارید؟",
            lastMessageTime: "10 دقیقه پیش",
            unreadCount: 2,
            online: true,
            status: 'active',
            contactNumber: "09123456789",
            messages: [
                {
                    id: 1,
                    sender: "other",
                    content: "سلام، باغ ما ۵ هکتار سیب داره و نیاز به سم‌پاشی فوری داره",
                    timestamp: "14:30",
                    read: true
                },
                {
                    id: 2,
                    sender: "me",
                    content: "سلام، می‌تونیم فردا صبح تشریف بیاریم. قیمت بر اساس هکتار محاسبه میشه",
                    timestamp: "14:32",
                    read: true
                },
                {
                    id: 3,
                    sender: "other",
                    content: "چه موادی برای سم‌پاشی استفاده می‌کنید؟ ارگانیک هست؟",
                    timestamp: "14:35",
                    read: true
                },
                {
                    id: 4,
                    sender: "me",
                    content: "بله، از مواد ارگانیک و تایید شده استفاده می‌کنیم",
                    timestamp: "14:40",
                    read: true
                },
                {
                    id: 5,
                    sender: "other",
                    content: "سلام، چه زمانی می‌تونید برای سم‌پاشی تشریف بیارید؟",
                    timestamp: "14:45",
                    read: false
                },
            ],
        },
        {
            id: 2,
            farmerName: "زهرا احمدی",
            farmerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            serviceType: "نصب سیستم آبیاری",
            projectId: 102,
            lastMessage: "پیشنهاد قیمت شما رو بررسی کردیم و قبول کردیم",
            lastMessageTime: "2 ساعت پیش",
            unreadCount: 0,
            online: false,
            status: 'completed',
            contactNumber: "09129876543",
            messages: [
                {
                    id: 1,
                    sender: "me",
                    content: "پیشنهاد قیمت برای نصب سیستم آبیاری قطره‌ای ارسال شد",
                    timestamp: "12:00",
                    read: true
                },
                {
                    id: 2,
                    sender: "other",
                    content: "ممنون، بررسی می‌کنیم و جواب میدیم",
                    timestamp: "12:05",
                    read: true
                },
                {
                    id: 3,
                    sender: "other",
                    content: "پیشنهاد قیمت شما رو بررسی کردیم و قبول کردیم",
                    timestamp: "12:30",
                    read: true
                },
            ],
        },
        {
            id: 3,
            farmerName: "محمد کریمی",
            farmerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            serviceType: "هرس درختان هلو",
            projectId: 103,
            lastMessage: "برای شنبه ساعت ۹ صبح هماهنگ کردم",
            lastMessageTime: "دیروز",
            unreadCount: 0,
            online: true,
            status: 'active',
            contactNumber: "09123459876",
            messages: [
                {
                    id: 1,
                    sender: "other",
                    content: "۲۰۰ درخت هلو دارم که نیاز به هرس دارن",
                    timestamp: "دیروز 15:00",
                    read: true
                },
                {
                    id: 2,
                    sender: "me",
                    content: "حتماً، می‌تونیم آخر هفته تشریف بیاریم",
                    timestamp: "دیروز 15:30",
                    read: true
                },
                {
                    id: 3,
                    sender: "other",
                    content: "برای شنبه ساعت ۹ صبح هماهنگ کردم",
                    timestamp: "دیروز 16:00",
                    read: true
                },
            ],
        },
        {
            id: 4,
            farmerName: "فاطمه محمدی",
            farmerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
            serviceType: "آنالیز خاک مزرعه گندم",
            projectId: 104,
            lastMessage: "نمونه خاک رو فردا میارم دفترتون",
            lastMessageTime: "3 روز پیش",
            unreadCount: 1,
            online: false,
            status: 'pending',
            contactNumber: "09128765432",
            messages: [
                {
                    id: 1,
                    sender: "me",
                    content: "برای آنالیز خاک نیاز به نمونه داریم",
                    timestamp: "3 روز پیش",
                    read: true
                },
                {
                    id: 2,
                    sender: "other",
                    content: "نمونه خاک رو فردا میارم دفترتون",
                    timestamp: "3 روز پیش",
                    read: false
                },
            ],
        },
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300';
            case 'active': return 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300';
            case 'completed': return 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/50 dark:text-green-300';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending': return 'در انتظار';
            case 'active': return 'فعال';
            case 'completed': return 'تکمیل شده';
            default: return 'نامشخص';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock size={14} />;
            case 'active': return <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />;
            case 'completed': return <CheckCircle2 size={14} />;
            default: return <Clock size={14} />;
        }
    };

    const filteredConversations = conversations.filter(conv =>
        conv.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenChat = (conversation: Conversation) => {
        setSelectedConversation(conversation);
        setIsChatModalOpen(true);

        // Mark messages as read when opening chat
        const updatedConversations = conversations.map(conv =>
            conv.id === conversation.id
                ? { ...conv, unreadCount: 0 }
                : conv
        );
        setConversations(updatedConversations);
    };

    const handleSendMessage = () => {
        if (!messageInput.trim() || !selectedConversation) return;

        const newMessage: Message = {
            id: Date.now(),
            sender: "me",
            content: messageInput,
            timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
            read: true
        };

        const updatedConversations = conversations.map(conv =>
            conv.id === selectedConversation.id
                ? {
                    ...conv,
                    lastMessage: messageInput,
                    lastMessageTime: 'هم اکنون',
                    messages: [...conv.messages, newMessage]
                }
                : conv
        );

        setConversations(updatedConversations);
        setMessageInput("");
    };

    const cardClass = "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg";
    const textClass = "text-gray-600 dark:text-gray-300";
    const titleClass = "text-gray-800 dark:text-white";

    const createMenuItems = (conversation: Conversation): MenuProps['items'] => [
        {
            key: 'call',
            label: 'تماس تلفنی',
            icon: <Phone size={14} />,
            onClick: () => console.log('Call:', conversation.contactNumber)
        },
        {
            key: 'viewProject',
            label: 'مشاهده پروژه',
            icon: <User size={14} />,
            onClick: () => console.log('View project:', conversation.projectId)
        },
        {
            key: 'markCompleted',
            label: 'علامت به عنوان تکمیل شده',
            icon: <CheckCircle2 size={14} />,
            onClick: () => console.log('Mark completed:', conversation.id)
        },
    ];

    // تابع برای جلوگیری از باز شدن چت هنگام کلیک روی منو
    const handleDropdownClick = (e: React.MouseEvent) => {
        e.stopPropagation();
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
                                    <MessageCircle className="text-white" size={24} />
                                </div>
                                پیام‌های خدمات
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                مدیریت مکالمات با کشاورزان و مشتریان
                            </p>
                        </div>
                    </div>

                    {/* آمار سریع */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {[
                            {
                                title: "کل مکالمات",
                                value: conversations.length,
                                color: "bg-blue-500",
                                icon: MessageCircle
                            },
                            {
                                title: "پیام‌های خوانده نشده",
                                value: conversations.reduce((sum, conv) => sum + conv.unreadCount, 0),
                                color: "bg-orange-500",
                                icon: Clock
                            },
                            {
                                title: "کشاورزان آنلاین",
                                value: conversations.filter(c => c.online).length,
                                color: "bg-green-500",
                                icon: User
                            },
                            {
                                title: "پروژه‌های فعال",
                                value: conversations.filter(c => c.status === 'active').length,
                                color: "bg-purple-500",
                                icon: CheckCircle2
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
                                placeholder="جستجو در مکالمات (کشاورز، نوع خدمت)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full"
                                size="large"
                            />
                        </div>
                        <Select
                            className="w-full"
                            size="large"
                            placeholder="فیلتر بر اساس وضعیت"
                            defaultValue="all"
                        >
                            <Option value="all">همه وضعیت‌ها</Option>
                            <Option value="pending">در انتظار</Option>
                            <Option value="active">فعال</Option>
                            <Option value="completed">تکمیل شده</Option>
                        </Select>
                        <Select
                            className="w-full"
                            size="large"
                            placeholder="فیلتر بر اساس خدمات"
                            defaultValue="all"
                        >
                            <Option value="all">همه خدمات</Option>
                            <Option value="سم‌پاشی">سم‌پاشی</Option>
                            <Option value="آبیاری">آبیاری</Option>
                            <Option value="هرس">هرس</Option>
                            <Option value="آنالیز خاک">آنالیز خاک</Option>
                        </Select>
                    </div>
                </div>

                {/* لیست مکالمات */}
                <div className={`overflow-hidden ${cardClass}`}>
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                مکالمات ({filteredConversations.length})
                            </h2>
                            <Badge
                                count={conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)}
                                className="bg-orange-500"
                                showZero
                            />
                        </div>
                    </div>

                    <div className="p-6">
                        {filteredConversations.length > 0 ? (
                            <div className="space-y-4">
                                {filteredConversations.map((conversation) => (
                                    <div
                                        key={conversation.id}
                                        className={`border rounded-xl p-4 transition-all hover:shadow-md cursor-pointer ${conversation.unreadCount > 0
                                                ? 'border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500'
                                            }`}
                                        onClick={() => handleOpenChat(conversation)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-3 flex-1">
                                                <div className="relative">
                                                    <Avatar
                                                        src={conversation.farmerAvatar}
                                                        size={50}
                                                        className="border-2 border-orange-200 dark:border-orange-700"
                                                    />
                                                    {conversation.online && (
                                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h3 className="font-bold text-gray-800 dark:text-white text-lg">
                                                                {conversation.farmerName}
                                                            </h3>
                                                            <p className="text-orange-600 dark:text-orange-400 text-sm">
                                                                {conversation.serviceType}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Badge
                                                                className={`${getStatusColor(conversation.status)} flex items-center gap-1`}
                                                                count={
                                                                    <div className="flex items-center gap-1">
                                                                        {getStatusIcon(conversation.status)}
                                                                        {getStatusText(conversation.status)}
                                                                    </div>
                                                                }
                                                            />
                                                            <div onClick={handleDropdownClick}>
                                                                <Dropdown
                                                                    menu={{ items: createMenuItems(conversation) }}
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
                                                    </div>

                                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                                                        {conversation.lastMessage}
                                                    </p>

                                                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex items-center gap-1">
                                                                <Phone size={12} />
                                                                <span>{conversation.contactNumber}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Clock size={12} />
                                                                <span>{conversation.lastMessageTime}</span>
                                                            </div>
                                                        </div>
                                                        {conversation.unreadCount > 0 && (
                                                            <Badge
                                                                count={conversation.unreadCount}
                                                                className="bg-orange-500"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">
                                    هیچ مکالمه‌ای یافت نشد
                                </div>
                                <div className="text-gray-500 dark:text-gray-400 text-sm">
                                    سعی کنید فیلترها را تغییر دهید یا عبارت جستجوی دیگری وارد کنید
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal چت */}
                <Modal
                    title={
                        selectedConversation && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Avatar
                                            src={selectedConversation.farmerAvatar}
                                            size={48}
                                            className="border-2 border-orange-200"
                                        />
                                        {selectedConversation.online && (
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-white">
                                            {selectedConversation.farmerName}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {selectedConversation.serviceType}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        type="text"
                                        icon={<Phone size={16} />}
                                        className="text-green-500 hover:text-green-600"
                                        onClick={() => console.log('Call:', selectedConversation.contactNumber)}
                                    />
                                    <Button
                                        type="text"
                                        icon={<Video size={16} />}
                                        className="text-blue-500 hover:text-blue-600"
                                    />
                                    <Badge
                                        className={getStatusColor(selectedConversation.status)}
                                        count={getStatusText(selectedConversation.status)}
                                    />
                                </div>
                            </div>
                        )
                    }
                    open={isChatModalOpen}
                    onCancel={() => setIsChatModalOpen(false)}
                    footer={null}
                    width={700}
                    style={{ top: 20 }}
                    bodyStyle={{ padding: 0 }}
                >
                    {selectedConversation && (
                        <div className="flex flex-col h-[500px]">
                            {/* پیام‌ها */}
                            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 space-y-4">
                                {selectedConversation.messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.sender === "me"
                                                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                                                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md border border-gray-200 dark:border-gray-700"
                                                }`}
                                        >
                                            <p className="text-sm leading-relaxed">{msg.content}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <p
                                                    className={`text-xs ${msg.sender === "me" ? "text-orange-100" : "text-gray-400"
                                                        }`}
                                                >
                                                    {msg.timestamp}
                                                </p>
                                                {msg.sender === "me" && (
                                                    <CheckCircle2
                                                        size={12}
                                                        className={msg.read ? "text-green-300" : "text-gray-300"}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ورودی پیام */}
                            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="پیام خود را بنویسید..."
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onPressEnter={handleSendMessage}
                                        size="large"
                                        className="flex-1"
                                    />
                                    <Button
                                        type="primary"
                                        icon={<Send size={16} />}
                                        onClick={handleSendMessage}
                                        disabled={!messageInput.trim()}
                                        className="bg-orange-500 hover:bg-orange-600 border-orange-500"
                                        size="large"
                                    >
                                        ارسال
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
}