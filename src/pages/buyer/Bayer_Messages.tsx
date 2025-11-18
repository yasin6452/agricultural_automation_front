import { useState, useRef, useEffect } from "react";
import { Search, Send, Paperclip, Mic, MoreVertical, Phone, Video, Info, Star, MapPin, Clock, Shield, BadgeCheck } from "lucide-react";
import { Avatar, Badge, Dropdown, Menu, Input } from "antd";

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
    // لیست چت‌ها
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

    const [activeChat, setActiveChat] = useState(1);
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

    const activeChatData = chats.find(chat => chat.id === activeChat);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim()) return;

        const newMessage: Message = {
            id: messages.length + 1,
            from: "me",
            text: input.trim(),
            time: "اکنون",
            type: "text",
            read: false
        };

        setMessages([...messages, newMessage]);

        // آپدیت last message در لیست چت‌ها
        setChats(prevChats =>
            prevChats.map(chat =>
                chat.id === activeChat
                    ? { ...chat, lastMessage: input.trim(), time: "اکنون", unread: 0 }
                    : chat
            )
        );

        setInput("");
    };

    const chatMenu = (
        <Menu
            items={[
                { key: '1', label: 'مشاهده پروفایل', icon: <Info size={16} /> },
                { key: '2', label: 'تماس صوتی', icon: <Phone size={16} /> },
                { key: '3', label: 'تماس تصویری', icon: <Video size={16} /> },
                { key: '4', label: 'اشتراک‌گذاری موقعیت', icon: <MapPin size={16} /> },
                { key: '5', label: 'بلاک کردن', danger: true },
            ]}
        />
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6 font-[IRANSans]">
            <div className="max-w-7xl mx-auto">
                {/* هدر */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Send className="text-white" size={24} />
                        </div>
                        پیام‌ها
                    </h1>
                    <p className="text-gray-600 mt-2">ارتباط مستقیم با تأمین‌کنندگان و کشاورزان</p>
                </div>

                <div className="flex h-[calc(100vh-180px)] bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
                    {/* سایدبار چت‌ها */}
                    <div className="w-1/3 border-l border-gray-200 flex flex-col">
                        {/* هدر سایدبار */}
                        <div className="p-4 border-b border-gray-200">
                            <div className="relative">
                                <Search className="absolute right-3 top-3 text-gray-400" size={18} />
                                <Input
                                    placeholder="جستجو در پیام‌ها..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pr-10 rounded-xl"
                                    size="large"
                                />
                            </div>
                        </div>

                        {/* لیست چت‌ها */}
                        <div className="flex-1 overflow-y-auto">
                            {filteredChats.map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => setActiveChat(chat.id)}
                                    className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 ${activeChat === chat.id
                                            ? "bg-gradient-to-r from-green-50 to-emerald-50 border-r-4 border-green-500"
                                            : "hover:bg-gray-50"
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="relative">
                                            <Avatar
                                                src={chat.avatar}
                                                size={48}
                                                className="border-2 border-white shadow-sm"
                                            />
                                            {chat.online && (
                                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-gray-800 truncate">
                                                        {chat.name}
                                                    </span>
                                                    {chat.verified && (
                                                        <BadgeCheck className="text-blue-500" size={16} />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-500">{chat.time}</span>
                                                    {chat.unread > 0 && (
                                                        <Badge count={chat.unread} className="bg-green-500" />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                    {chat.role}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <Star size={12} className="text-yellow-500 fill-current" />
                                                    <span className="text-xs text-gray-600">{chat.rating}</span>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 text-sm truncate">
                                                {chat.lastMessage}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* پنجره چت */}
                    <div className="flex-1 flex flex-col">
                        {/* هدر چت فعال */}
                        {activeChatData && (
                            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Avatar
                                            src={activeChatData.avatar}
                                            size={48}
                                            className="border-2 border-green-200 shadow-sm"
                                        />
                                        {activeChatData.online && (
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-800">{activeChatData.name}</h3>
                                            {activeChatData.verified && (
                                                <Shield className="text-blue-500" size={16} />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span>{activeChatData.role}</span>
                                            <span>•</span>
                                            <div className="flex items-center gap-1">
                                                <Star size={12} className="text-yellow-500 fill-current" />
                                                <span>{activeChatData.rating}</span>
                                            </div>
                                            <span>•</span>
                                            <span className={`text-xs ${activeChatData.online ? 'text-green-500' : 'text-gray-400'}`}>
                                                {activeChatData.online ? 'آنلاین' : 'آفلاین'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-xl transition">
                                        <Phone size={20} />
                                    </button>
                                    <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-xl transition">
                                        <Video size={20} />
                                    </button>
                                    <Dropdown overlay={chatMenu} placement="bottomRight">
                                        <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-xl transition">
                                            <MoreVertical size={20} />
                                        </button>
                                    </Dropdown>
                                </div>
                            </div>
                        )}

                        {/* پیام‌ها */}
                        <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-white to-green-50">
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className="flex items-end gap-2 max-w-[70%]">
                                            {msg.from === "them" && (
                                                <Avatar
                                                    src={activeChatData?.avatar}
                                                    size={32}
                                                    className="border border-gray-200"
                                                />
                                            )}

                                            <div
                                                className={`px-4 py-3 rounded-2xl shadow-sm ${msg.from === "me"
                                                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-br-none"
                                                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                                                    }`}
                                            >
                                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                                <div className={`text-xs mt-1 flex items-center gap-1 ${msg.from === "me" ? "text-green-100" : "text-gray-500"
                                                    }`}>
                                                    <Clock size={10} />
                                                    {msg.time}
                                                    {msg.from === "me" && (
                                                        <span className={`${msg.read ? 'text-blue-300' : 'text-green-200'}`}>
                                                            {msg.read ? '✓✓' : '✓'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* نوار ارسال پیام */}
                        <div className="p-4 border-t border-gray-200 bg-white">
                            <div className="flex items-center gap-3">
                                <button className="p-3 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-xl transition">
                                    <Paperclip size={20} />
                                </button>

                                <div className="flex-1">
                                    <Input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                        placeholder="پیام خود را بنویسید..."
                                        size="large"
                                        className="rounded-xl"
                                    />
                                </div>

                                <button className="p-3 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-xl transition">
                                    <Mic size={20} />
                                </button>

                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim()}
                                    className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}