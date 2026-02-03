"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Lightbulb, Code, Database, Zap, Brain } from "lucide-react";

const aboutCards = [
    {
        icon: GraduationCap,
        title: "教育背景",
        content: "中国传媒大学 硕士",
        subContent: "传播学专业",
    },
    {
        icon: Briefcase,
        title: "工作经历",
        content: "2年+ 产品经验",
        subContent: "ToB SaaS行业 & 社媒分析 & 指标体系",
    },
    {
        icon: Lightbulb,
        title: "核心理念",
        content: "AI Builder",
        subContent: "Vibe Coding 改变世界",
    },
];

const skillCategories = [
    {
        icon: Brain,
        title: "AI 编程",
        skills: ["Claude Code", "Antigravity", "Cursor"],
        color: "from-[#6EC5FF] to-[#4DA8FF]",
    },
    {
        icon: Database,
        title: "数据分析",
        skills: ["Python", "SQL", "BI 工具"],
        color: "from-[#FFB3D9] to-[#FF8AC4]",
    },
    {
        icon: Code,
        title: "产品设计",
        skills: ["PRD 撰写", "用户调研", "Figma"],
        color: "from-[#C7B8EA] to-[#A890D3]",
    },
    {
        icon: Zap,
        title: "自动化",
        skills: ["N8N", "Dify", "Coze"],
        color: "from-[#6EC5FF] to-[#C7B8EA]",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function About() {
    return (
        <section className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
                {/* 标题 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        <span className="gradient-text">关于我</span>
                    </h2>
                    <p className="text-white/60 text-lg">
                        探索 AI 与产品的无限可能
                    </p>
                </motion.div>

                {/* 关于我卡片 */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-6 mb-16"
                >
                    {aboutCards.map((card, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="glass p-6 text-center group hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                        >
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#6EC5FF]/20 to-[#FFB3D9]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <card.icon className="w-6 h-6 text-[#6EC5FF]" />
                            </div>
                            <h3 className="text-sm text-white/60 mb-2">{card.title}</h3>
                            <p className="text-xl font-semibold text-white mb-1">{card.content}</p>
                            <p className="text-sm text-white/50">{card.subContent}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 技能标题 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h3 className="text-3xl font-bold mb-4">
                        <span className="gradient-text">技能</span>
                    </h3>
                </motion.div>

                {/* 技能卡片 */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="glass p-6 group hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                        >
                            <div className={`w-10 h-10 mb-4 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                                <category.icon className="w-5 h-5 text-white" />
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-3">{category.title}</h4>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, skillIndex) => (
                                    <span
                                        key={skillIndex}
                                        className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80 border border-white/10"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
