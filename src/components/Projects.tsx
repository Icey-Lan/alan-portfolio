"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";

interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    highlights: string[];
    technologies: string[];
    image: string;
    link?: string;
    github?: string;
}

const projects: Project[] = [
    {
        id: "PRJ-01",
        title: "JobBuff",
        subtitle: "职场外挂——一站式AI求职辅助神器",
        description: "把求职变成打怪升级 —— 基于 Gemini AI 的求职助手，帮你读透 JD、定制简历、模拟面试，一站搞定。像素游戏风格设计，让求职也能有仪式感。",
        highlights: [
            "JD 深度解析 + 风险预警",
            "AI 简历重写 + Diff 对比",
            "模拟面试 + AI 点评",
            "用户认证 + 云端存储",
        ],
        technologies: ["Next.js 15", "React 19", "Gemini AI", "Supabase"],
        image: "/images/jobbuff.png",
        link: "https://job-buff.vercel.app",
        github: "https://github.com/Icey-Lan/JobBuff",
    },
    {
        id: "PRJ-02",
        title: "Job Hunter",
        subtitle: "Boss直聘岗位采集 & 追踪工具",
        description: "本地全栈 Web 工具，自动化抓取 Boss 直聘岗位信息，支持批量采集、抗反爬、岗位追踪、状态流转管理，帮助求职者高效管理求职进度。",
        highlights: [
            "批量采集 + 抗反爬设计",
            "岗位追踪 + 状态流转",
            "实时看板 + 一键导出",
            "行内编辑 + 撤销删除",
        ],
        technologies: ["React 18", "Vite", "Python FastAPI", "Playwright"],
        image: "/images/jobhunter.png",
        github: "https://github.com/Icey-Lan/job-hunter-web",
    },
    {
        id: "PRJ-03",
        title: "个人网站",
        subtitle: "Vibe Coding 作品",
        description: "使用 AI 编程工具（Claude Code + Antigravity）从零构建的个人作品集网站，展示 Vibe Coding 的开发理念。",
        highlights: [
            "AI 辅助编程开发",
            "复古印刷设计风格",
            "纸张纹理质感",
            "流畅动画体验",
        ],
        technologies: ["Next.js", "Tailwind", "Framer Motion"],
        image: "/images/projects/portfolio-cover.png",
        link: "https://alan-portfolio-rose.vercel.app/",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
                    <h2
                        className="text-4xl lg:text-5xl font-bold mb-4 text-[var(--primary)]"
                        style={{ fontFamily: "'Abril Fatface', serif" }}
                    >
                        我的作品
                    </h2>
                    <p className="text-[var(--text-muted)] text-lg">
                        用 AI 打造的产品与工具
                    </p>
                </motion.div>

                {/* 项目卡片网格 */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={cardVariants}
                            onClick={() => setSelectedProject(project)}
                            className="glass overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-300 hover:shadow-lg"
                        >
                            {/* 项目图片 */}
                            <div className="relative h-48 bg-[var(--background-alt)] overflow-hidden">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover object-top"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-6xl opacity-50">🚀</span>
                                    </div>
                                )}
                                {/* 悬浮时显示查看详情 */}
                                <div className="absolute inset-0 bg-[var(--primary)]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white font-medium">查看详情 →</span>
                                </div>
                            </div>

                            {/* 项目信息 */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-1">{project.title}</h3>
                                <p className="text-[var(--text-muted)] text-sm mb-4">{project.subtitle}</p>

                                {/* 功能亮点标签 */}
                                <div className="flex flex-wrap gap-2">
                                    {project.highlights.slice(0, 2).map((highlight, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 text-xs rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20"
                                        >
                                            {highlight}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* 项目详情弹窗 */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        >
                            {/* 关闭按钮 */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[var(--background-alt)] flex items-center justify-center hover:bg-[var(--border)] transition-colors cursor-pointer z-10"
                            >
                                <X className="w-5 h-5 text-[var(--text-primary)]" />
                            </button>

                            <div className="grid lg:grid-cols-2 gap-0">
                                {/* 左侧：项目信息 */}
                                <div className="p-8">
                                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[var(--primary)]/10 text-[var(--primary)] mb-4">
                                        {selectedProject.id}
                                    </span>

                                    <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                                        {selectedProject.title}
                                    </h3>
                                    <p className="text-[var(--text-muted)] mb-6">{selectedProject.subtitle}</p>

                                    <div className="mb-6">
                                        <h4 className="text-sm text-[var(--text-muted)] mb-3">功能亮点</h4>
                                        <ul className="space-y-2">
                                            {selectedProject.highlights.map((highlight, index) => (
                                                <li key={index} className="flex items-start gap-2 text-[var(--text-primary)]">
                                                    <span className="text-[var(--primary)] mt-1">●</span>
                                                    {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="text-sm text-[var(--text-muted)] mb-3">TECHNOLOGIES</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.technologies.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1.5 text-sm rounded-lg bg-[var(--background-alt)] text-[var(--text-primary)] border border-[var(--border)]"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 操作按钮 */}
                                    <div className="flex gap-3">
                                        {selectedProject.link && (
                                            <a
                                                href={selectedProject.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] rounded-full font-medium text-white hover:bg-[var(--primary-dark)] transition-all cursor-pointer"
                                            >
                                                VIEW PROJECT
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                        {selectedProject.github && (
                                            <a
                                                href={selectedProject.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-5 py-2.5 border-2 border-[var(--border)] rounded-full font-medium text-[var(--text-primary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all cursor-pointer"
                                            >
                                                <Github className="w-4 h-4" />
                                                GitHub
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* 右侧：项目介绍 */}
                                <div className="p-8 bg-[var(--background-alt)]">
                                    {/* 项目图片 */}
                                    <div className="relative h-48 bg-white rounded-xl mb-6 overflow-hidden shadow-md">
                                        {selectedProject.image ? (
                                            <img
                                                src={selectedProject.image}
                                                alt={selectedProject.title}
                                                className="w-full h-full object-cover object-top"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-6xl">🚀</span>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                                            <span className="w-1 h-5 bg-[var(--primary)] rounded-full"></span>
                                            About Project
                                        </h4>
                                        <p className="text-[var(--text-muted)] leading-relaxed">
                                            {selectedProject.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
