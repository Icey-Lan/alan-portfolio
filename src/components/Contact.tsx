"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, BookOpen, Check, Copy } from "lucide-react";

// X (Twitter) 图标
const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

// 微信图标
const WeChatIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M8.5 2C4.08 2 0.5 5.36 0.5 9.5c0 2.44 1.27 4.62 3.25 6.05.04.54-.53 1.84-.71 2.45-.06.2.14.36.3.25 1-.68 2.46-1.63 2.91-1.93.7.17 1.45.28 2.25.28 4.42 0 8-3.36 8-7.5S12.92 2 8.5 2zM16.5 6c-2.76 0-5 2.01-5 4.5 0 2.49 2.24 4.5 5 4.5.57 0 1.12-.11 1.62-.3.31.25 1.25.86 1.94 1.33.1.07.24-.04.2-.18-.12-.41-.5-1.28-.48-1.64 1.35-.97 2.22-2.43 2.22-4.08 0-2.49-2.24-4.5-5-4.5z" />
    </svg>
);

interface ContactItem {
    icon: React.ReactNode;
    label: string;
    value: string;
    action: "copy" | "link";
    link?: string;
}

const contactItems: ContactItem[] = [
    {
        icon: <Mail className="w-5 h-5" />,
        label: "Email",
        value: "alan.tanya2023@gmail.com",
        action: "copy",
    },
    {
        icon: <Github className="w-5 h-5" />,
        label: "GitHub",
        value: "github.com/Icey-Lan",
        action: "link",
        link: "https://github.com/Icey-Lan",
    },
    {
        icon: <WeChatIcon />,
        label: "微信",
        value: "ALanCanbebetter",
        action: "copy",
    },
    {
        icon: <BookOpen className="w-5 h-5" />,
        label: "小红书",
        value: "@阿兰",
        action: "link",
        link: "https://www.xiaohongshu.com/user/profile/6246a86b000000001000cb7c",
    },
    {
        icon: <XIcon />,
        label: "X",
        value: "@alanlan_123",
        action: "link",
        link: "https://x.com/alanlan_123",
    },
];

export default function Contact() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = async (value: string, index: number) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleClick = (item: ContactItem, index: number) => {
        if (item.action === "copy") {
            handleCopy(item.value, index);
        } else if (item.link) {
            window.open(item.link, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <section className="py-24 px-4">
            <div className="max-w-4xl mx-auto">
                {/* 标题 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2
                        className="text-4xl lg:text-5xl font-bold mb-4 text-[var(--primary)]"
                        style={{ fontFamily: "'Abril Fatface', serif" }}
                    >
                        联系我
                    </h2>
                    <p className="text-[var(--text-muted)] text-lg">
                        期待与你建立连接，共同探索 AI 的无限可能
                    </p>
                </motion.div>

                {/* 联系方式卡片 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass p-8"
                >
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {contactItems.map((item, index) => (
                            <motion.button
                                key={index}
                                onClick={() => handleClick(item, index)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-[var(--background-alt)] border border-[var(--border)] hover:border-[var(--primary)] transition-all cursor-pointer group"
                            >
                                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <span className="text-[var(--text-primary)] font-medium">{item.label}</span>
                                <span className="text-[var(--text-muted)] text-sm flex items-center gap-1">
                                    {item.action === "copy" ? (
                                        copiedIndex === index ? (
                                            <>
                                                <Check className="w-3 h-3 text-green-500" />
                                                <span className="text-green-500">已复制</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-3 h-3" />
                                                复制
                                            </>
                                        )
                                    ) : (
                                        "打开"
                                    )}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* 页脚 */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center"
                >
                    <div className="inline-block px-8 py-4 rounded-full border border-[var(--border)]">
                        <p className="text-[var(--text-muted)] text-sm">
                            © 2026 阿兰. 保留所有权利。
                        </p>
                        <p className="text-[var(--text-light)] text-xs mt-1">
                            Vibe Coded with Claude
                        </p>
                    </div>
                </motion.footer>
            </div>
        </section>
    );
}
