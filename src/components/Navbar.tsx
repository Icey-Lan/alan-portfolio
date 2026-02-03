"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navItems = [
    { label: "首页", href: "#hero" },
    { label: "关于", href: "#about" },
    { label: "项目", href: "#projects" },
    { label: "博客", href: "#blog" },
    { label: "联系", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // 检测当前活动区域
            const sections = navItems.map((item) => item.href.replace("#", ""));
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${isScrolled ? "glass-nav" : ""
                }`}
        >
            <div className="flex items-center gap-1 px-2 py-2">
                {navItems.map((item) => {
                    const isActive = activeSection === item.href.replace("#", "");
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`relative px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${isActive ? "text-white" : "text-white/60 hover:text-white/90"
                                }`}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="activeNav"
                                    className="absolute inset-0 bg-white/10 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </motion.nav>
    );
}
