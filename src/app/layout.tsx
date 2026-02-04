import type { Metadata } from "next";
import { Abril_Fatface, Merriweather, Noto_Sans_SC, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CursorSparkle from "@/components/CursorSparkle";

const abrilFatface = Abril_Fatface({
  variable: "--font-abril-fatface",
  subsets: ["latin"],
  weight: ["400"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "ALan | AI 产品经理 & Vibe Coder",
  description: "用 AI 重新定义工作流程 - AI 产品经理、Vibe Coder、探索 AI 与产品的无限可能",
  keywords: ["AI产品经理", "Vibe Coder", "AI编程", "Claude Code", "个人网站", "Portfolio"],
  authors: [{ name: "ALan" }],
  openGraph: {
    title: "ALan | AI 产品经理 & Vibe Coder",
    description: "用 AI 重新定义工作流程",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body
        className={`${abrilFatface.variable} ${merriweather.variable} ${notoSansSC.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <CursorSparkle />
        {children}
      </body>
    </html>
  );
}
