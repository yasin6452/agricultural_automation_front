import { useState } from "react";
import { Card, List, Avatar, Badge, Input, Tag, Empty, Modal, Button, Divider } from "antd";
import { SearchOutlined, MessageOutlined, SendOutlined, PhoneOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { MessageCircle } from "lucide-react";

interface Message {
    id: number;
    content: string;
    sender: "me" | "other";
    timestamp: string;
}

interface Conversation {
    id: number;
    contactName: string;
    contactAvatar: string;
    contactRole: "expert" | "buyer" | "seller" | "service";
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    online: boolean;
    messages: Message[];
}

export const Messages = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const [messageInput, setMessageInput] = useState("");

    const [conversations] = useState<Conversation[]>([
        {
            id: 1,
            contactName: "دکتر احمد رضایی",
            contactAvatar: "https://i.pravatar.cc/150?img=12",
            contactRole: "expert",
            lastMessage: "نتایج آزمایش شما آماده شد",
            lastMessageTime: "10 دقیقه پیش",
            unreadCount: 2,
            online: true,
            messages: [
                { id: 1, sender: "other", content: "سلام، نتایج آزمایش خاک شما آماده شد", timestamp: "14:30" },
                { id: 2, sender: "me", content: "سلام، ممنون. نتایج چطوره؟", timestamp: "14:32" },
                { id: 3, sender: "other", content: "pH خاک شما 6.5 هست که عالیه. ولی نیتروژن کمه", timestamp: "14:35" },
                { id: 4, sender: "me", content: "چه کودی پیشنهاد می‌کنید؟", timestamp: "14:40" },
                { id: 5, sender: "other", content: "نتایج آزمایش شما آماده شد", timestamp: "14:45" },
            ],
        },
        {
            id: 2,
            contactName: "کارخانه روغن پاک",
            contactAvatar: "https://i.pravatar.cc/150?img=33",
            contactRole: "buyer",
            lastMessage: "پیشنهاد قیمت شما رو بررسی کردیم",
            lastMessageTime: "2 ساعت پیش",
            unreadCount: 0,
            online: false,
            messages: [
                { id: 1, sender: "other", content: "سلام، پیشنهاد شما برای پیاز رو دیدیم", timestamp: "12:00" },
                { id: 2, sender: "me", content: "سلام، نظرتون چیه؟", timestamp: "12:05" },
                { id: 3, sender: "other", content: "پیشنهاد قیمت شما رو بررسی کردیم", timestamp: "12:30" },
            ],
        },
        {
            id: 3,
            contactName: "محمد احمدی",
            contactAvatar: "https://i.pravatar.cc/150?img=51",
            contactRole: "seller",
            lastMessage: "بله، ذرت موجود داریم",
            lastMessageTime: "دیروز",
            unreadCount: 0,
            online: false,
            messages: [
                { id: 1, sender: "me", content: "سلام، ذرت دارید؟", timestamp: "دیروز 15:00" },
                { id: 2, sender: "other", content: "بله، ذرت موجود داریم", timestamp: "دیروز 15:30" },
            ],
        },
        {
            id: 4,
            contactName: "شرکت اجاره ماشین‌آلات",
            contactAvatar: "https://i.pravatar.cc/150?img=8",
            contactRole: "service",
            lastMessage: "تراکتور فردا آماده تحویل است",
            lastMessageTime: "3 روز پیش",
            unreadCount: 1,
            online: true,
            messages: [
                { id: 1, sender: "me", content: "سلام، تراکتور کی آماده میشه؟", timestamp: "3 روز پیش" },
                { id: 2, sender: "other", content: "تراکتور فردا آماده تحویل است", timestamp: "3 روز پیش" },
            ],
        },
    ]);

    const getRoleConfig = (role: string) => {
        const configs = {
            expert: { label: "کارشناس", color: "blue" },
            buyer: { label: "خریدار", color: "green" },
            seller: { label: "فروشنده", color: "orange" },
            service: { label: "خدمات", color: "purple" },
        };
        return configs[role as keyof typeof configs];
    };

    const filteredConversations = conversations.filter(conv =>
        conv.contactName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenChat = (conversation: Conversation) => {
        setSelectedConversation(conversation);
        setIsChatModalOpen(true);
    };

    const handleSendMessage = () => {
        if (!messageInput.trim() || !selectedConversation) return;

        const newMessage: Message = {
            id: Date.now(),
            sender: "me",
            content: messageInput,
            timestamp: new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }),
        };

        // اینجا باید message رو به state اضافه کنی
        setMessageInput("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
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
                                <p className="text-2xl font-bold text-gray-800">{conversations.length}</p>
                            </div>
                            <MessageOutlined className="text-3xl text-blue-500" />
                        </div>
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">پیام‌های خوانده نشده</p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)}
                                </p>
                            </div>
                            <Badge count={conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)} />
                        </div>
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">آنلاین</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {conversations.filter(c => c.online).length}
                                </p>
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        size="large"
                        className="rounded-lg"
                    />
                </div>

                {filteredConversations.length > 0 ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={filteredConversations}
                        renderItem={(conversation) => {
                            const roleConfig = getRoleConfig(conversation.contactRole);
                            return (
                                <List.Item
                                    className="hover:bg-gray-50 rounded-lg p-4 cursor-pointer transition-all"
                                    onClick={() => handleOpenChat(conversation)}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Badge dot={conversation.online} offset={[-5, 35]} color="green">
                                                <Avatar src={conversation.contactAvatar} size={56} />
                                            </Badge>
                                        }
                                        title={
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-gray-800">
                                                        {conversation.contactName}
                                                    </span>
                                                    <Tag color={roleConfig.color} className="text-xs">
                                                        {roleConfig.label}
                                                    </Tag>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {conversation.unreadCount > 0 && (
                                                        <Badge count={conversation.unreadCount} />
                                                    )}
                                                    <span className="text-xs text-gray-400">
                                                        {conversation.lastMessageTime}
                                                    </span>
                                                </div>
                                            </div>
                                        }
                                        description={
                                            <p className="text-gray-600 truncate">{conversation.lastMessage}</p>
                                        }
                                    />
                                </List.Item>
                            );
                        }}
                    />
                ) : (
                    <Empty description="مکالمه‌ای پیدا نشد" />
                )}
            </Card>

            {/* Modal چت */}
            <Modal
                title={
                    selectedConversation && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Badge dot={selectedConversation.online} offset={[-5, 35]} color="green">
                                    <Avatar src={selectedConversation.contactAvatar} size={48} />
                                </Badge>
                                <div>
                                    <h3 className="font-bold text-gray-800">{selectedConversation.contactName}</h3>
                                    <p className="text-xs text-gray-500">
                                        {selectedConversation.online ? "آنلاین" : "آفلاین"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button icon={<PhoneOutlined />} shape="circle" className="text-green-600" />
                                <Button icon={<VideoCameraOutlined />} shape="circle" className="text-blue-600" />
                            </div>
                        </div>
                    )
                }
                open={isChatModalOpen}
                onCancel={() => setIsChatModalOpen(false)}
                footer={null}
                width={700}
                bodyStyle={{ padding: 0 }}
            >
                {selectedConversation && (
                    <div className="flex flex-col h-[500px]">
                        {/* پیام‌ها */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
                            {selectedConversation.messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[70%] rounded-2xl px-4 py-3 ${msg.sender === "me"
                                                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                                                : "bg-white text-gray-800 shadow-md"
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed">{msg.content}</p>
                                        <p
                                            className={`text-xs mt-2 ${msg.sender === "me" ? "text-blue-100" : "text-gray-400"
                                                }`}
                                        >
                                            {msg.timestamp}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Divider style={{ margin: 0 }} />

                        {/* ورودی پیام */}
                        <div className="p-4 bg-white">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="پیام خود را بنویسید..."
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onPressEnter={handleSendMessage}
                                    size="large"
                                />
                                <Button
                                    type="primary"
                                    icon={<SendOutlined />}
                                    onClick={handleSendMessage}
                                    disabled={!messageInput.trim()}
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
            `}</style>
        </div>
    );
};