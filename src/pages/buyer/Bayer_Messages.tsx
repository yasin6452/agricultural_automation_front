import { useState, useRef, useEffect } from "react";
import {
    Card,
    List,
    Avatar,
    Badge,
    Input,
    Tag,
    Button,
    Divider,
    Dropdown,
    Modal
} from "antd";
import type { MenuProps } from "antd";
import {
    SearchOutlined,
    MessageOutlined,
    SendOutlined,
    PhoneOutlined,
    VideoCameraOutlined,
    MoreOutlined,
    PaperClipOutlined,
    AudioOutlined,
    InfoCircleOutlined,
    StarFilled,
    EnvironmentOutlined,
    BlockOutlined
} from "@ant-design/icons";
import { MessageCircle, BadgeCheck, Shield } from "lucide-react";

interface Chat {
    id: number;
    name: string;
    lastMessage: string;
    time: string;
    unread: number;
    avatar: string;
    role: string;
    online: boolean;
    rating: number;
    verified: boolean;
}

interface Message {
    id: number;
    from: "me" | "them";
    text: string;
    time: string;
    type: "text" | "image" | "file";
    read: boolean;
}

export default function Messages() {
    const [chats, setChats] = useState<Chat[]>([
        {
            id: 1,
            name: "علی کشاورز",
            lastMessage: "سیب آماده ارسال است. لطفا آدرس دقیق را ارسال کنید.",
            time: "10:45",
            unread: 2,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            role: "تأمین‌کننده",
            online: true,
            rating: 4.8,
            verified: true
        },
        {
            id: 2,
            name: "باغ سردرود",
            lastMessage: "فاکتور محصولات ارسال شد. لطفا بررسی کنید.",
            time: "09:30",
            unread: 0,
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
            role: "فروشنده",
            online: false,
            rating: 4.6,
            verified: true
        },
        {
            id: 3,
            name: "مزرعه سبز دماوند",
            lastMessage: "موجودی هویج افزایش یافت. قیمت جدید: ۸,۵۰۰ تومان",
            time: "دیروز",
            unread: 1,
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            role: "کشاورز",
            online: true,
            rating: 4.9,
            verified: true
        },
        {
            id: 4,
            name: "شالیزار شمال",
            lastMessage: "برنج محلی موجود شد. نمونه ارسال کنیم؟",
            time: "دیروز",
            unread: 0,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            role: "تأمین‌کننده",
            online: false,
            rating: 4.7,
            verified: false
        },
    ]);

    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, from: "them", text: "سلام، محصول سیب با کیفیت عالی موجود دارید؟", time: "10:40", type: "text", read: true },
        { id: 2, from: "me", text: "بله موجوده، چه مقدار و چه نوعی لازم دارید؟", time: "10:42", type: "text", read: true },
        { id: 3, from: "them", text: "۲۰ کارتن سیب قرمز درجه یک.", time: "10:45", type: "text", read: false },
        { id: 4, from: "me", text: "قیمت هر کارتن ۱۲۰,۰۰۰ تومان. موجودی کافی داریم.", time: "10:46", type: "text", read: false },
    ]);

    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleOpenChat = (chat: Chat) => {
        setSelectedChat(chat);
        setIsChatModalOpen(true);
    };

    const sendMessage = () => {
        if (!input.trim() || !selectedChat) return;

        const newMessage: Message = {
            id: messages.length + 1,
            from: "me",
            text: input.trim(),
            time: "اکنون",
            type: "text",
            read: false
        };

        setMessages([...messages, newMessage]);

        setChats(prevChats =>
            prevChats.map(chat =>
                chat.id === selectedChat.id
                    ? { ...chat, lastMessage: input.trim(), time: "اکنون", unread: 0 }
                    : chat
            )
        );

        setInput("");
    };

    const totalUnread = chats.reduce((sum, chat) => sum + chat.unread, 0);
    const onlineCount = chats.filter(c => c.online).length;

    const getRoleConfig = (role: string) => {
        const configs = {
            "تأمین‌کننده": { label: "تأمین‌کننده", color: "blue" },
            "فروشنده": { label: "فروشنده", color: "green" },
            "کشاورز": { label: "کشاورز", color: "orange" },
        };
        return configs[role as keyof typeof configs] || { label: role, color: "default" };
    };

    const menuItems: MenuProps['items'] = [
        {
            key: 'profile',
            label: 'مشاهده پروفایل',
            icon: <InfoCircleOutlined />,
        },
        {
            key: 'audio',
            label: 'تماس صوتی',
            icon: <PhoneOutlined />,
        },
        {
            key: 'video',
            label: 'تماس تصویری',
            icon: <VideoCameraOutlined />,
        },
        {
            key: 'location',
            label: 'اشتراک‌گذاری موقعیت',
            icon: <EnvironmentOutlined />,
        },
        {
            type: 'divider',
        },
        {
            key: 'block',
            label: 'بلاک کردن',
            icon: <BlockOutlined />,
            danger: true,
        },
    ];

    return (
        <div className="min-h-screen from-gray-50 to-gray-100 p-6">
            {/* Header */}
            <div className="mb-6 animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <MessageCircle className="text-white" size={24} />
                            </div>
                            پیام‌ها
                        </h1>
                        <p className="text-gray-500 mt-2">مکالمات و ارتباطات شما</p>
                    </div>
                </div>

                {/* آمار */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="shadow-md hover:shadow-lg transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">کل مکالمات</p>
                                <p className="text-2xl font-bold text-gray-800">{chats.length}</p>
                            </div>
                            <MessageOutlined className="text-3xl text-blue-500" />
                        </div>
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">پیام‌های خوانده نشده</p>
                                <p className="text-2xl font-bold text-orange-600">{totalUnread}</p>
                            </div>
                            {totalUnread > 0 && (
                                <Badge count={totalUnread} style={{ backgroundColor: '#fa8c16' }} />
                            )}
                        </div>
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">آنلاین</p>
                                <p className="text-2xl font-bold text-green-600">{onlineCount}</p>
                            </div>
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* لیست مکالمات */}
            <Card className="shadow-lg rounded-2xl">
                <div className="mb-4">
                    <Input
                        placeholder="جستجوی مخاطب..."
                        prefix={<SearchOutlined />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        size="large"
                        className="rounded-lg"
                    />
                </div>

                {filteredChats.length > 0 ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={filteredChats}
                        renderItem={(chat) => {
                            const roleConfig = getRoleConfig(chat.role);
                            return (
                                <List.Item
                                    className="hover:bg-gray-50 rounded-lg p-4 cursor-pointer transition-all"
                                    onClick={() => handleOpenChat(chat)}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Badge dot={chat.online} offset={[-5, 35]} color="green">
                                                <Avatar src={chat.avatar} size={56} />
                                            </Badge>
                                        }
                                        title={
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-gray-800">
                                                        {chat.name}
                                                    </span>
                                                    {chat.verified && (
                                                        <BadgeCheck className="text-blue-500 flex-shrink-0" size={16} />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {chat.unread > 0 && (
                                                        <Badge count={chat.unread} />
                                                    )}
                                                    <span className="text-xs text-gray-400">
                                                        {chat.time}
                                                    </span>
                                                </div>
                                            </div>
                                        }
                                        description={
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Tag color={roleConfig.color} className="text-xs">
                                                        {roleConfig.label}
                                                    </Tag>
                                                    <div className="flex items-center gap-1">
                                                        <StarFilled className="text-yellow-500 text-xs" />
                                                        <span className="text-xs text-gray-600">{chat.rating}</span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 text-sm truncate">
                                                    {chat.lastMessage}
                                                </p>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            );
                        }}
                    />
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500">مکالمه‌ای پیدا نشد</p>
                    </div>
                )}
            </Card>

            {/* Modal چت */}
            <Modal
                title={
                    selectedChat && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Badge dot={selectedChat.online} offset={[-5, 35]} color="green">
                                    <Avatar src={selectedChat.avatar} size={48} />
                                </Badge>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-gray-800">{selectedChat.name}</h3>
                                        {selectedChat.verified && (
                                            <Shield className="text-blue-500" size={16} />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span>{selectedChat.role}</span>
                                        <span>•</span>
                                        <div className="flex items-center gap-1">
                                            <StarFilled className="text-yellow-500 text-xs" />
                                            <span>{selectedChat.rating}</span>
                                        </div>
                                        <span>•</span>
                                        <span className={selectedChat.online ? 'text-green-500' : 'text-gray-400'}>
                                            {selectedChat.online ? 'آنلاین' : 'آفلاین'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    icon={<PhoneOutlined />}
                                    shape="circle"
                                    className="text-green-600 border-green-200 hover:bg-green-50"
                                />
                                <Button
                                    icon={<VideoCameraOutlined />}
                                    shape="circle"
                                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                />
                                <Dropdown
                                    menu={{ items: menuItems }}
                                    placement="bottomRight"
                                    trigger={['click']}
                                >
                                    <Button
                                        icon={<MoreOutlined />}
                                        shape="circle"
                                        className="text-gray-600 border-gray-200 hover:bg-gray-50"
                                    />
                                </Dropdown>
                            </div>
                        </div>
                    )
                }
                open={isChatModalOpen}
                onCancel={() => setIsChatModalOpen(false)}
                footer={null}
                width={700}
                style={{ backdropFilter: "blur(10px)" }}
                bodyStyle={{ padding: 0 }}
                className="chat-modal"
            >
                {selectedChat && (
                    <div className="flex flex-col h-[500px]">
                        {/* پیام‌ها */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className="flex items-end gap-2 max-w-[70%]">
                                        {msg.from === "them" && (
                                            <Avatar
                                                src={selectedChat.avatar}
                                                size={32}
                                            />
                                        )}

                                        <div
                                            className={`px-4 py-3 rounded-2xl ${msg.from === "me"
                                                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                                                    : "bg-white text-gray-800 shadow-md"
                                                }`}
                                        >
                                            <p className="text-sm leading-relaxed">{msg.text}</p>
                                            <p
                                                className={`text-xs mt-2 ${msg.from === "me" ? "text-blue-100" : "text-gray-400"
                                                    }`}
                                            >
                                                {msg.time}
                                                {msg.from === "me" && (
                                                    <span className="mr-1">
                                                        {msg.read ? '✓✓' : '✓'}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <Divider style={{ margin: 0 }} />

                        {/* ورودی پیام */}
                        <div className="p-4 bg-white">
                            <div className="flex items-center gap-2">
                                <Button
                                    icon={<PaperClipOutlined />}
                                    shape="circle"
                                    className="text-gray-600 border-gray-200 hover:bg-gray-50"
                                />

                                <Input
                                    placeholder="پیام خود را بنویسید..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onPressEnter={sendMessage}
                                    size="large"
                                    className="flex-1"
                                />

                                <Button
                                    icon={<AudioOutlined />}
                                    shape="circle"
                                    className="text-gray-600 border-gray-200 hover:bg-gray-50"
                                />

                                <Button
                                    type="primary"
                                    icon={<SendOutlined />}
                                    onClick={sendMessage}
                                    disabled={!input.trim()}
                                    className="bg-blue-600"
                                    size="large"
                                >
                                    ارسال
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
                
                .chat-modal .ant-modal-content {
                    backdrop-filter: blur(20px);
                    background: rgba(255, 255, 255, 0.95);
                }
                
                .chat-modal .ant-modal-body {
                    border-radius: 0 0 8px 8px;
                }
                
                /* بلور شدن پس‌زمینه وقتی مدال باز است */
                .ant-modal-mask {
                    backdrop-filter: blur(8px);
                    background: rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </div>
    );
}