"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    size: number;
    color: string;
    alpha: number;
    decay: number;
    vx: number;
    vy: number;
}

const colors = [
    "#6EC5FF", // 天蓝
    "#FFB3D9", // 粉紫
    "#C7B8EA", // 淡紫
    "#4DA8FF", // 深蓝
    "#FF8AC4", // 玫红
    "#FFFFFF", // 白色
];

export default function CursorSparkle() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // 设置画布尺寸
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // 鼠标移动时生成粒子
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };

            // 生成多个粒子形成烟花效果
            for (let i = 0; i < 3; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 2;
                particlesRef.current.push({
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 4 + 2,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: 1,
                    decay: Math.random() * 0.02 + 0.02,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                });
            }

            // 限制粒子数量避免性能问题
            if (particlesRef.current.length > 150) {
                particlesRef.current = particlesRef.current.slice(-100);
            }
        };

        // 动画循环
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 更新和绘制粒子
            particlesRef.current = particlesRef.current.filter((particle) => {
                // 更新位置
                particle.x += particle.vx;
                particle.y += particle.vy;

                // 更新透明度（淡出效果）
                particle.alpha -= particle.decay;

                // 缩小粒子
                particle.size *= 0.98;

                if (particle.alpha <= 0 || particle.size < 0.5) {
                    return false;
                }

                // 绘制粒子
                ctx.save();
                ctx.globalAlpha = particle.alpha;
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                // 添加发光效果
                ctx.shadowBlur = 10;
                ctx.shadowColor = particle.color;
                ctx.fill();
                ctx.restore();

                return true;
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
            style={{ mixBlendMode: "screen" }}
        />
    );
}
