import { useState, useEffect, useRef } from "react";
import { Input, Button, List, Typography, Avatar } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface MessageType {
    id: number;
    sender: string; // 'self' یا 'expert'
    content: string;
    timestamp: string;
}

export const Messages = () => {
    const [messages, setMessages] = useState<MessageType[]>([
        { id: 1, sender: "expert", content: "سلام! برای خاک زمینت چه آزمایشی نیاز داری؟", timestamp: "09:00" },
        { id: 2, sender: "self", content: "سلام، می‌خوام آزمایش خاک انجام بدم.", timestamp: "09:05" },
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;
        const newMessage: MessageType = {
            id: Date.now(),
            sender: "self",
            content: inputValue,
            timestamp: new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages([...messages, newMessage]);
        setInputValue("");
    };

    return (
        <div className="flex flex-col h-full p-4 bg-white rounded-2xl shadow-md" style={{ maxHeight: "600px" }}>
            <h2 className="text-xl font-semibold text-[#328E6E] mb-4">پیام‌ها</h2>

            <div className="flex-1 overflow-y-auto mb-4 px-2">
                <List
                    dataSource={messages}
                    renderItem={(msg) => (
                        <List.Item
                            className={`flex ${msg.sender === "self" ? "justify-end" : "justify-start"} mb-2`}
                        >
                            <div className={`max-w-[70%] p-3 rounded-xl ${msg.sender === "self" ? "bg-[#328E6E] text-white" : "bg-gray-100 text-gray-800"}`}>
                                <Text>{msg.content}</Text>
                                <div className="text-xs text-gray-500 mt-1 text-right">{msg.timestamp}</div>
                            </div>
                        </List.Item>
                    )}
                />
                <div ref={messagesEndRef}></div>
            </div>

            <div className="flex items-center gap-2">
                <Input
                    placeholder="پیام خود را بنویسید..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={handleSendMessage}
                />
                <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage} className="bg-[#328E6E]" />
            </div>
        </div>
    );
};
