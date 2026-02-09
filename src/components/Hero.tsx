"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
            {/* 主内容 - 更紧凑的布局 */}
            <div className="relative z-10 max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
                {/* 左侧：文字内容 */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center lg:text-left flex-1"
                >
                    {/* 问候语 */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-[var(--text-muted)] mb-2"
                    >
                        Hello！我是
                    </motion.p>

                    {/* 名字 - 复古粗体字 */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-7xl lg:text-8xl font-display mb-4 text-[var(--primary)]"
                        style={{ fontFamily: "'Abril Fatface', serif" }}
                    >
                        阿兰
                    </motion.h1>

                    {/* 副标题 */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl lg:text-3xl text-[var(--text-primary)] mb-5"
                    >
                        曾做数据产品，现在用 AI 创造产品，探索创作的边界
                    </motion.p>

                    {/* 标签 */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-[var(--text-muted)] text-base mb-6"
                    >
                        INFP | ToB Data PM | Vibe coder | Post-rock fan | Part-time Drummer
                    </motion.p>

                    {/* CTA 按钮 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap gap-4 justify-center lg:justify-start"
                    >
                        <Link
                            href="#projects"
                            className="group flex items-center gap-2 px-6 py-3 bg-[var(--primary)] rounded-full font-medium text-white transition-all hover:bg-[var(--primary-dark)] hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                        >
                            查看作品
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="#contact"
                            className="group flex items-center gap-2 px-6 py-3 border-2 border-[var(--border)] rounded-full font-medium text-[var(--text-primary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all cursor-pointer"
                        >
                            <Mail className="w-4 h-4" />
                            联系我
                        </Link>
                    </motion.div>
                </motion.div>

                {/* 右侧：头像 - 更靠近文字 */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    className="flex-shrink-0"
                >
                    <div className="relative">
                        {/* 头像 */}
                        <div className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-3xl overflow-hidden border-4 border-[var(--primary)] shadow-xl">
                            <img
                                src="/images/avatar.jpg"
                                alt="阿兰's avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* 装饰元素 */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-4 w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                        >
                            ✦
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* 滚动提示 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-[var(--text-muted)] flex justify-center pt-2"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1 h-2 bg-[var(--text-muted)] rounded-full"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
