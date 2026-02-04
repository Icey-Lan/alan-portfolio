"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "你好！👋 我是阿兰的 AI 分身，可以回答关于我的项目、经历和技能的问题。有什么想了解的吗？",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input.trim() }),
            });

            const data = await response.json();

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.reply || "抱歉，我暂时无法回答这个问题。",
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "网络连接出现问题，请稍后再试。",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* 悬浮按钮 - 像素小人头像 */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full overflow-hidden shadow-xl border-4 border-[var(--primary)] bg-white hover:scale-110 transition-transform cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            >
                <img
                    src="/images/chat-avatar.png"
                    alt="Chat with AI"
                    className="w-full h-full object-cover"
                />
                {/* 在线状态点 */}
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            </motion.button>

            {/* 对话框 */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="fixed bottom-6 right-6 z-50 w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl border border-[var(--border)] flex flex-col overflow-hidden"
                    >
                        {/* 头部 */}
                        <div className="flex items-center justify-between px-4 py-3 bg-[var(--primary)] text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50">
                                    <img
                                        src="/images/chat-avatar.png"
                                        alt="AI Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">阿兰的 AI 分身</h3>
                                    <p className="text-xs text-white/80 flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" />
                                        由 Coze 驱动
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* 消息区域 */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--background)]">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${message.role === "user"
                                                ? "bg-[var(--primary)] text-white rounded-br-md"
                                                : "bg-white border border-[var(--border)] text-[var(--text-primary)] rounded-bl-md shadow-sm"
                                            }`}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-[var(--border)] px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                                        <div className="flex gap-1.5">
                                            <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* 输入区域 */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--border)] bg-white">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="输入你的问题..."
                                    className="flex-1 px-4 py-2.5 rounded-full border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--primary)] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--primary-dark)] transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
