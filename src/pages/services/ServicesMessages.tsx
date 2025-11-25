// src/pages/services/ServicesMessages.tsx
import { useState } from "react";

interface Message {
    id: number;
    sender: string;
    content: string;
    time: string;
    isRead: boolean;
}

export default function ServicesMessages() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: "علی رضایی", content: "سلام، درخواست سم‌پاشی ثبت کردم.", time: "10:30", isRead: false },
        { id: 2, sender: "زهرا احمدی", content: "می‌خوام آبیاری هوشمند داشته باشم.", time: "11:15", isRead: true },
    ]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-orange-600 mb-6">پیام‌ها</h1>

            <div className="bg-white rounded shadow p-4 max-w-2xl">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`mb-4 p-3 rounded ${msg.isRead ? "bg-gray-100" : "bg-orange-100"} `}
                    >
                        <div className="flex justify-between">
                            <span className="font-semibold">{msg.sender}</span>
                            <span className="text-sm text-gray-500">{msg.time}</span>
                        </div>
                        <p className="mt-1">{msg.content}</p>
                    </div>
                ))}

                {/* فرم ارسال پیام (ظاهر ساده) */}
                <div className="mt-4 flex gap-2">
                    <input
                        type="text"
                        placeholder="پیام جدید..."
                        className="flex-1 border border-gray-300 rounded px-3 py-2"
                    />
                    <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                        ارسال
                    </button>
                </div>
            </div>
        </div>
    );
}
