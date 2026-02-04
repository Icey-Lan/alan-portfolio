"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    rotation: number;
    rotationSpeed: number;
}

export default function CursorSparkle() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // 设置画布尺寸
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // 鼠标移动时添加粒子
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };

            // 每次移动添加 1-2 个星星粒子
            for (let i = 0; i < 2; i++) {
                particlesRef.current.push({
                    x: e.clientX + (Math.random() - 0.5) * 20,
                    y: e.clientY + (Math.random() - 0.5) * 20,
                    size: Math.random() * 8 + 4,
                    speedX: (Math.random() - 0.5) * 2,
                    speedY: (Math.random() - 0.5) * 2 - 1,
                    opacity: 1,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.2,
                });
            }

            // 限制粒子数量
            if (particlesRef.current.length > 50) {
                particlesRef.current = particlesRef.current.slice(-50);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        // 绘制星星
        const drawStar = (
            ctx: CanvasRenderingContext2D,
            x: number,
            y: number,
            size: number,
            rotation: number,
            opacity: number
        ) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.globalAlpha = opacity;

            // 使用深蓝色
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
            gradient.addColorStop(0, "#1E40AF");
            gradient.addColorStop(0.5, "#2563EB");
            gradient.addColorStop(1, "rgba(30, 64, 175, 0)");

            // 绘制四角星
            ctx.beginPath();
            const spikes = 4;
            const outerRadius = size;
            const innerRadius = size * 0.4;

            for (let i = 0; i < spikes * 2; i++) {
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                const angle = (i * Math.PI) / spikes;
                const px = Math.cos(angle) * radius;
                const py = Math.sin(angle) * radius;

                if (i === 0) {
                    ctx.moveTo(px, py);
                } else {
                    ctx.lineTo(px, py);
                }
            }

            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.fill();

            // 添加发光效果
            ctx.shadowColor = "#2563EB";
            ctx.shadowBlur = 15;
            ctx.fill();

            ctx.restore();
        };

        // 动画循环
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current = particlesRef.current.filter((particle) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.opacity -= 0.02;
                particle.size *= 0.98;
                particle.rotation += particle.rotationSpeed;

                if (particle.opacity > 0 && particle.size > 0.5) {
                    drawStar(
                        ctx,
                        particle.x,
                        particle.y,
                        particle.size,
                        particle.rotation,
                        particle.opacity
                    );
                    return true;
                }
                return false;
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
        />
    );
}
