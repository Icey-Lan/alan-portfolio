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
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        <span className="gradient-text">联系我</span>
                    </h2>
                    <p className="text-white/60 text-lg">
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
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {contactItems.map((item, index) => (
                            <motion.button
                                key={index}
                                onClick={() => handleClick(item, index)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#6EC5FF]/30 transition-all cursor-pointer group"
                            >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6EC5FF]/20 to-[#FFB3D9]/20 flex items-center justify-center text-[#6EC5FF] group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <span className="text-white font-medium">{item.label}</span>
                                <span className="text-white/50 text-sm flex items-center gap-1">
                                    {item.action === "copy" ? (
                                        copiedIndex === index ? (
                                            <>
                                                <Check className="w-3 h-3 text-green-400" />
                                                <span className="text-green-400">已复制</span>
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
                    <div className="glass inline-block px-8 py-4 rounded-full">
                        <p className="text-white/60 text-sm">
                            © 2026 阿兰🦋. 保留所有权利。
                        </p>
                        <p className="text-white/40 text-xs mt-1">
                            Vibe Coded with Claude
                        </p>
                    </div>
                </motion.footer>
            </div>
        </section>
    );
}
