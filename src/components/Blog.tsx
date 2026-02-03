"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface BlogPost {
    id: string;
    title: string;
    description: string;
    cover: string;
    coverImage?: string;
    tag: string;
    tagColor: string;
    link: string;
}

const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "JobBuff 开发全纪录",
        description: "从 PRD 到部署上线，记录职场外挂项目的完整开发历程，含 Supabase 配置和 Vibe Coding 实践",
        cover: "🎮",
        coverImage: "/images/blog-jobbuff.png",
        tag: "产品思考",
        tagColor: "from-[#6EC5FF] to-[#4DA8FF]",
        link: "https://my.feishu.cn/wiki/SDawwNFQAid7W7kplR1clpGOnic",
    },
    {
        id: "2",
        title: "打造你的 Agent Skills",
        description: "从入门到实战，解释 Skills、MCP、Subagent 之间的关系，含 4 步创建工作流程",
        cover: "🛠️",
        coverImage: "/images/blog-skills.png",
        tag: "Skills",
        tagColor: "from-[#FFB3D9] to-[#FF8AC4]",
        link: "https://my.feishu.cn/wiki/LEhowkil0iOerqklo54cEZnanKg",
    },
    {
        id: "3",
        title: "Vercel 部署心得",
        description: "JobBuff 从本地开发到 Vercel 部署的完整复盘，含踩坑指南和版本迭代历程",
        cover: "🚀",
        tag: "项目实战",
        tagColor: "from-[#6EC5FF] to-[#4DA8FF]",
        link: "https://my.feishu.cn/wiki/BcSTwBsbhi77pHk0aXLc6g88nxh",
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

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export default function Blog() {
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
                        <span className="gradient-text">博客画廊</span>
                    </h2>
                    <p className="text-white/60 text-lg">
                        我的学习笔记与产品思考
                    </p>
                </motion.div>

                {/* 博客卡片网格 */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {blogPosts.map((post) => (
                        <motion.a
                            key={post.id}
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={cardVariants}
                            className="glass overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(110,197,255,0.2)]"
                        >
                            {/* 封面图 */}
                            <div className="relative h-40 bg-gradient-to-br from-[#6EC5FF]/10 to-[#FFB3D9]/10 flex items-center justify-center overflow-hidden">
                                {post.coverImage ? (
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                                        {post.cover}
                                    </span>
                                )}

                                {/* 悬浮时显示阅读提示 */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="flex items-center gap-2 text-white font-medium">
                                        阅读全文 <ExternalLink className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>

                            {/* 文章信息 */}
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#6EC5FF] transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-white/60 text-sm mb-4 line-clamp-2">
                                    {post.description}
                                </p>

                                {/* 标签 */}
                                <span
                                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${post.tagColor} text-white`}
                                >
                                    {post.tag}
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
