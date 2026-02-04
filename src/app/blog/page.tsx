"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ExternalLink, Sparkles, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/data/blogs";

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = blogPosts.filter(
        (post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.aiSummary && post.aiSummary.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <main className="min-h-screen bg-[var(--background)]">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--border)]">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>返回首页</span>
                    </Link>
                    <div className="px-4 py-2 rounded-full border border-[var(--primary)] text-[var(--primary)]">
                        <span className="font-medium">博客</span>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1 rounded-full border border-[var(--border)] text-[var(--text-muted)] text-sm mb-6"
                    >
                        📚 READING ROOM
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-[var(--primary)] mb-6"
                        style={{ fontFamily: "'Abril Fatface', serif" }}
                    >
                        The Blogs
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[var(--text-muted)] text-lg mb-8"
                    >
                        探索 AI 产品思维、Vibe Coding 实践和项目开发心得
                    </motion.p>

                    {/* Search Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative max-w-2xl mx-auto"
                    >
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-light)]" />
                        <input
                            type="text"
                            placeholder="搜索文章标题或关键词..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-light)] focus:outline-none focus:border-[var(--primary)] transition-all shadow-sm"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Blog Cards */}
            <section className="px-6 pb-20">
                <div className="max-w-4xl mx-auto space-y-6">
                    {filteredPosts.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <p className="text-[var(--text-light)] text-lg">没有找到匹配的文章</p>
                        </motion.div>
                    ) : (
                        filteredPosts.map((post, index) => (
                            <motion.a
                                key={post.id}
                                href={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="block bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all group border border-[var(--border)]"
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Cover Image */}
                                    <div className="md:w-1/3 h-48 md:h-auto md:min-h-[200px] relative overflow-hidden bg-[var(--background-alt)] flex items-center justify-center p-4">
                                        {post.coverImage ? (
                                            <img
                                                src={post.coverImage}
                                                alt={post.title}
                                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-6xl">{post.cover}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="md:w-2/3 p-6 flex flex-col justify-between">
                                        <div>
                                            {/* Meta */}
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-[var(--primary)]">
                                                    {post.tag}
                                                </span>
                                                <span className="flex items-center gap-1 text-[var(--text-light)] text-sm">
                                                    <Calendar className="w-4 h-4" />
                                                    {post.date}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                                                {post.title}
                                            </h2>

                                            {/* Description */}
                                            <p className="text-[var(--text-muted)] text-sm mb-4 line-clamp-2">
                                                {post.description}
                                            </p>

                                            {/* AI Summary */}
                                            {post.aiSummary && (
                                                <div className="bg-[var(--primary)]/5 rounded-xl p-4 border border-[var(--primary)]/10">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Sparkles className="w-4 h-4 text-[var(--primary)]" />
                                                        <span className="text-xs font-medium text-[var(--text-muted)]">
                                                            AI 智能总结
                                                        </span>
                                                    </div>
                                                    <p className="text-[var(--text-muted)] text-sm line-clamp-3">
                                                        {post.aiSummary}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Arrow */}
                                        <div className="flex justify-end mt-4">
                                            <div className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:border-[var(--primary)] transition-colors">
                                                <ExternalLink className="w-5 h-5 text-[var(--text-muted)] group-hover:text-white transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.a>
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}
