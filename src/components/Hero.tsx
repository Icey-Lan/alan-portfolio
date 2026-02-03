"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

// 星星装饰组件
const Star = ({ className = "", delay = 0 }: { className?: string; delay?: number }) => (
    <motion.svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`absolute text-white/30 ${className}`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
    >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </motion.svg>
);

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
            {/* 背景装饰 */}
            <div className="absolute inset-0 pointer-events-none">
                {/* 星星装饰 */}
                <Star className="w-4 h-4 top-[10%] left-[10%]" delay={0.2} />
                <Star className="w-6 h-6 top-[20%] right-[15%]" delay={0.4} />
                <Star className="w-3 h-3 top-[40%] left-[5%]" delay={0.6} />
                <Star className="w-5 h-5 bottom-[30%] right-[10%]" delay={0.8} />
                <Star className="w-4 h-4 bottom-[20%] left-[20%]" delay={1} />

                {/* 渐变光晕 */}
                <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#6EC5FF]/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[#FFB3D9]/20 rounded-full blur-[120px]" />
            </div>

            {/* 主内容 */}
            <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* 左侧：文字内容 */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center lg:text-left"
                >
                    {/* 问候语 */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-white/60 mb-2"
                    >
                        Hello! 我是 →
                    </motion.p>

                    {/* 名字 */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-6xl lg:text-7xl font-bold mb-6"
                    >
                        <span className="gradient-text">ALan.</span>
                    </motion.h1>

                    {/* 标签 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6"
                    >
                        <span className="glass px-4 py-2 text-sm font-medium text-white/90">
                            🤖 AI 产品经理
                        </span>
                        <span className="glass px-4 py-2 text-sm font-medium text-white/90">
                            ⚡ Vibe Coder
                        </span>
                    </motion.div>

                    {/* Slogan */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl text-white/70 mb-8"
                    >
                        用 AI 重新定义工作流程
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
                            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6EC5FF] to-[#C7B8EA] rounded-full font-medium text-white transition-all hover:shadow-[0_0_30px_rgba(110,197,255,0.5)] hover:-translate-y-1 cursor-pointer"
                        >
                            查看作品
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="#contact"
                            className="group flex items-center gap-2 px-6 py-3 glass rounded-full font-medium text-white/90 hover:bg-white/20 transition-all cursor-pointer"
                        >
                            <Sparkles className="w-4 h-4" />
                            联系我
                        </Link>
                    </motion.div>
                </motion.div>

                {/* 右侧：头像 */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    className="flex justify-center lg:justify-end"
                >
                    <div className="relative">
                        {/* 发光背景 */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#6EC5FF]/30 to-[#FFB3D9]/30 rounded-full blur-2xl scale-110" />

                        {/* 头像 */}
                        <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full glass overflow-hidden animate-float">
                            <img
                                src="/images/avatar.jpg"
                                alt="ALan's avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* 装饰元素 */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-4 w-12 h-12 glass rounded-full flex items-center justify-center"
                        >
                            <span className="text-2xl">✨</span>
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
                    className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1 h-2 bg-white/50 rounded-full"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
