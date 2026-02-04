"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/data/blogs";

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
    // 只显示前 3 篇
    const displayPosts = blogPosts.slice(0, 3);

    return (
        <section className="py-24 px-4" id="blog">
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
                        博客画廊
                    </h2>
                    <p className="text-[var(--text-muted)] text-lg">
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
                    {displayPosts.map((post) => (
                        <motion.a
                            key={post.id}
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={cardVariants}
                            className="glass overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-300 hover:shadow-lg"
                        >
                            {/* 封面图 */}
                            <div className="relative h-40 bg-[var(--background-alt)] flex items-center justify-center overflow-hidden">
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
                                <div className="absolute inset-0 bg-[var(--primary)]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="flex items-center gap-2 text-white font-medium">
                                        阅读全文 <ExternalLink className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>

                            {/* 文章信息 */}
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-[var(--text-muted)] text-sm mb-4 line-clamp-2">
                                    {post.description}
                                </p>

                                {/* 标签 */}
                                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[var(--primary)] text-white">
                                    {post.tag}
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                {/* 查看更多按钮 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--primary)] rounded-full text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all group"
                    >
                        查看全部博客
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
