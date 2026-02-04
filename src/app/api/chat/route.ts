import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // 扣子 API 配置
        const COZE_API_URL = process.env.COZE_API_URL || "https://api.coze.cn/open_api/v2/chat";
        const COZE_BOT_ID = process.env.COZE_BOT_ID;
        const COZE_API_TOKEN = process.env.COZE_API_TOKEN;

        // 如果没有配置扣子 API，返回模拟回复
        if (!COZE_BOT_ID || !COZE_API_TOKEN) {
            // 模拟回复 - 稍后替换为真实 API
            const mockReplies: Record<string, string> = {
                "你好": "你好！我是阿兰的 AI 分身，很高兴见到你！有什么想了解的吗？",
                "你是谁": "我是阿兰的 AI 数字分身，由扣子(Coze)驱动。我可以回答关于阿兰的项目、技能和经历的问题。",
                "项目": "阿兰目前有两个主要项目：\n1. **JobBuff** - AI 求职助手，帮助分析岗位和优化简历\n2. **JobHunter** - 职位信息采集工具\n\n想了解哪个项目的详情？",
                "技能": "阿兰的技能包括：\n- 产品管理：ToB 数据产品经验\n- AI 编程：Vibe Coding、Claude Code\n- 技术栈：Next.js、React、Python\n\n还想了解什么？",
            };

            // 简单关键词匹配
            let reply = "感谢你的提问！我正在学习中，请稍后再试或换个问题问我。";
            for (const [keyword, response] of Object.entries(mockReplies)) {
                if (message.includes(keyword)) {
                    reply = response;
                    break;
                }
            }

            return NextResponse.json({ reply });
        }

        // 调用扣子 API
        const response = await fetch(COZE_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${COZE_API_TOKEN}`,
            },
            body: JSON.stringify({
                bot_id: COZE_BOT_ID,
                user: "web_user",
                query: message,
                stream: false,
            }),
        });

        const data = await response.json();

        if (data.code !== 0) {
            throw new Error(data.msg || "Coze API error");
        }

        // 提取回复内容
        const reply = data.messages?.find((m: { role: string }) => m.role === "assistant")?.content || "抱歉，我暂时无法回答这个问题。";

        return NextResponse.json({ reply });

    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { error: "Failed to process message", reply: "抱歉，发生了错误，请稍后再试。" },
            { status: 500 }
        );
    }
}
